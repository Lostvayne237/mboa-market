from django.contrib.auth import get_user_model
from django.db.models import Case, IntegerField, Max, Q, Value, When
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product, StoreProfile
from .permissions import IsVendor
from .serializers import (
    ProductSerializer,
    ProductWriteSerializer,
    StoreProfileSerializer,
    VendorStorefrontSerializer,
    VendorSummarySerializer,
)

User = get_user_model()

# Pro → Boost → Free, then most recently active.
_PLAN_RANK = Case(
    When(store__plan="pro", then=Value(2)),
    When(store__plan="boost", then=Value(1)),
    default=Value(0),
    output_field=IntegerField(),
)

def _public_products():
    return Product.objects.filter(is_active=True).select_related("vendor")


class ProductListCreateView(generics.ListCreateAPIView):
    """GET: public browse/search. POST: vendor creates a listing."""

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsVendor()]
        return [AllowAny()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProductWriteSerializer
        return ProductSerializer

    def get_queryset(self):
        qs = _public_products()
        q = self.request.query_params.get("q")
        city = self.request.query_params.get("city")
        category = self.request.query_params.get("category")
        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(description__icontains=q))
        if city:
            qs = qs.filter(city__iexact=city)
        if category:
            qs = qs.filter(category=category)
        return qs

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save(vendor=request.user)
        return Response(
            ProductSerializer(product).data, status=status.HTTP_201_CREATED
        )


class MyProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsVendor]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


class ProductDetailView(generics.RetrieveAPIView):
    """Public detail. Increments the honest view counter."""

    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return _public_products()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Product.objects.filter(pk=instance.pk).update(view_count=F("view_count") + 1)
        instance.refresh_from_db()
        return Response(self.get_serializer(instance).data)


class ProductUpdateView(generics.UpdateAPIView):
    """Owner vendor edits or deactivates (is_active=false) a listing."""

    serializer_class = ProductWriteSerializer
    permission_classes = [IsVendor]
    http_method_names = ["patch", "put"]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(ProductSerializer(instance).data)


class ContactClickView(APIView):
    """Buyer tapped Call/WhatsApp — count it. Public, no auth needed."""

    permission_classes = [AllowAny]

    def post(self, request, pk):
        updated = Product.objects.filter(pk=pk, is_active=True).update(
            contact_count=F("contact_count") + 1
        )
        if not updated:
            return Response(status=status.HTTP_404_NOT_FOUND)
        product = Product.objects.get(pk=pk)
        return Response({"contact_count": product.contact_count})


class CategoryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            [{"value": value, "label": label} for value, label in Category.choices]
        )


class MyStoreView(APIView):
    """Vendor reads/updates their storefront profile."""

    permission_classes = [IsVendor]

    def get(self, request):
        store, _ = StoreProfile.objects.get_or_create(
            vendor=request.user, defaults={"store_name": request.user.username}
        )
        return Response(StoreProfileSerializer(store).data)

    def patch(self, request):
        store, _ = StoreProfile.objects.get_or_create(
            vendor=request.user, defaults={"store_name": request.user.username}
        )
        serializer = StoreProfileSerializer(store, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class VendorStorefrontView(APIView):
    """Public storefront: identity, trust signals, active catalog."""

    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            vendor = User.objects.get(pk=pk, role="vendor", is_active=True)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(VendorStorefrontSerializer(vendor).data)


class VendorListView(APIView):
    """Recently active vendors for the discovery page."""

    permission_classes = [AllowAny]

    def get(self, request):
        vendors = (
            User.objects.filter(
                role="vendor", is_active=True, products__is_active=True
            )
            .annotate(
                last_product=Max("products__updated_at"),
                plan_rank=_PLAN_RANK,
            )
            .order_by("-plan_rank", "-last_product")
            .distinct()[:12]
        )
        return Response(VendorSummarySerializer(vendors, many=True).data)


class SearchView(APIView):
    """Mixed search: matching products AND the vendors that carry them."""

    permission_classes = [AllowAny]

    def get(self, request):
        q = request.query_params.get("q", "").strip()
        city = request.query_params.get("city")
        category = request.query_params.get("category")

        products = _public_products()
        if q:
            products = products.filter(
                Q(title__icontains=q) | Q(description__icontains=q)
            )
        if city:
            products = products.filter(city__iexact=city)
        if category:
            products = products.filter(category=category)
        products = products[:24]

        # Shops match by their name OR by what they sell.
        vendors = User.objects.filter(role="vendor", is_active=True)
        if q:
            vendors = vendors.filter(
                Q(username__icontains=q)
                | Q(store__store_name__icontains=q)
                | Q(products__title__icontains=q, products__is_active=True)
                | Q(products__description__icontains=q, products__is_active=True)
            )
        if city:
            vendors = vendors.filter(
                Q(store__city__iexact=city)
                | Q(products__city__iexact=city, products__is_active=True)
            )
        if category:
            vendors = vendors.filter(
                products__category=category, products__is_active=True
            )
        vendors = vendors.filter(products__is_active=True).annotate(
            plan_rank=_PLAN_RANK,
            last_product=Max("products__updated_at"),
        ).distinct().order_by("-plan_rank", "-last_product")[:24]

        return Response(
            {
                "products": ProductSerializer(products, many=True).data,
                "vendors": VendorSummarySerializer(vendors, many=True).data,
            }
        )
