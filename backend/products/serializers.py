from django.db.models import Max
from rest_framework import serializers

from .models import Category, Product, StorePlan, StoreProfile


class VendorSummarySerializer(serializers.Serializer):
    """Honest, public-safe vendor info shown next to a product.

    Trust signals we can actually measure — no fake star ratings.
    """

    id = serializers.IntegerField()
    username = serializers.CharField()
    store_name = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    neighborhood = serializers.SerializerMethodField()
    brand_color = serializers.SerializerMethodField()
    plan = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    whatsapp_phone = serializers.SerializerMethodField()
    member_since = serializers.DateTimeField(source="date_joined")
    product_count = serializers.SerializerMethodField()
    last_active = serializers.SerializerMethodField()
    preview_products = serializers.SerializerMethodField()

    def get_neighborhood(self, user):
        store = getattr(user, "store", None)
        return store.neighborhood if store else ""

    def get_brand_color(self, user):
        store = getattr(user, "store", None)
        return store.brand_color if store else "#13315c"

    def get_plan(self, user):
        store = getattr(user, "store", None)
        return store.plan if store else "free"

    def get_store_name(self, user):
        store = getattr(user, "store", None)
        return store.store_name if store else user.username

    def get_city(self, user):
        store = getattr(user, "store", None)
        if store and store.city:
            return store.city
        latest = user.products.filter(is_active=True).first()
        return latest.city if latest else ""

    def get_cover_image_url(self, user):
        store = getattr(user, "store", None)
        return store.cover_image_url if store else ""

    def get_about(self, user):
        store = getattr(user, "store", None)
        return store.about if store else ""

    def get_whatsapp_phone(self, user):
        store = getattr(user, "store", None)
        if store and store.whatsapp_phone:
            return store.whatsapp_phone
        latest = user.products.filter(is_active=True).first()
        return latest.whatsapp_phone if latest else ""

    def get_product_count(self, user):
        return user.products.filter(is_active=True).count()

    def get_last_active(self, user):
        return user.products.aggregate(last=Max("updated_at"))["last"]

    def get_preview_products(self, user):
        """Up to four listings shown inside the shop-window card."""
        return [
            {
                "id": p.id,
                "title": p.title,
                "image_url": p.image_url,
                "price": str(p.price),
                "currency": p.currency,
                "category": p.category,
            }
            for p in user.products.filter(is_active=True)[:4]
        ]


class ProductSerializer(serializers.ModelSerializer):
    vendor = VendorSummarySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "description",
            "price",
            "currency",
            "whatsapp_phone",
            "city",
            "category",
            "image_url",
            "is_active",
            "view_count",
            "contact_count",
            "created_at",
            "updated_at",
            "vendor",
        ]
        read_only_fields = ["is_active", "view_count", "contact_count", "vendor"]


class ProductWriteSerializer(serializers.ModelSerializer):
    category = serializers.ChoiceField(choices=Category.choices, required=False)

    class Meta:
        model = Product
        fields = [
            "title",
            "description",
            "price",
            "currency",
            "whatsapp_phone",
            "city",
            "category",
            "image_url",
            "is_active",
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value

    def validate_whatsapp_phone(self, value):
        digits = value.replace("+", "").replace(" ", "")
        if not digits.isdigit() or len(digits) < 8:
            raise serializers.ValidationError(
                "Enter a valid phone number (e.g. +2376XXXXXXXX)."
            )
        return value


class StoreProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreProfile
        fields = [
            "store_name",
            "about",
            "city",
            "neighborhood",
            "brand_color",
            "plan",
            "whatsapp_phone",
            "cover_image_url",
            "voice_intro_url",
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def validate_brand_color(self, value):
        import re

        if not re.fullmatch(r"#[0-9a-fA-F]{6}", value):
            raise serializers.ValidationError(
                "Use a hex color like #13315c."
            )
        return value.lower()

    def validate_plan(self, value):
        if value not in StorePlan.values:
            raise serializers.ValidationError("Choose free, boost, or pro.")
        return value


class VendorStorefrontSerializer(serializers.Serializer):
    """Full public storefront payload: identity + trust + catalog."""

    id = serializers.IntegerField()
    username = serializers.CharField()
    store_name = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    neighborhood = serializers.SerializerMethodField()
    brand_color = serializers.SerializerMethodField()
    plan = serializers.SerializerMethodField()
    whatsapp_phone = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()
    voice_intro_url = serializers.SerializerMethodField()
    member_since = serializers.DateTimeField(source="date_joined")
    product_count = serializers.SerializerMethodField()
    last_active = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()

    def _store(self, user):
        return getattr(user, "store", None)

    def get_neighborhood(self, user):
        store = self._store(user)
        return store.neighborhood if store else ""

    def get_brand_color(self, user):
        store = self._store(user)
        return store.brand_color if store else "#13315c"

    def get_plan(self, user):
        store = self._store(user)
        return store.plan if store else "free"

    def get_store_name(self, user):
        store = self._store(user)
        return store.store_name if store else user.username

    def get_about(self, user):
        store = self._store(user)
        return store.about if store else ""

    def get_city(self, user):
        store = self._store(user)
        return store.city if store else ""

    def get_whatsapp_phone(self, user):
        store = self._store(user)
        if store and store.whatsapp_phone:
            return store.whatsapp_phone
        latest = user.products.filter(is_active=True).first()
        return latest.whatsapp_phone if latest else ""

    def get_cover_image_url(self, user):
        store = self._store(user)
        return store.cover_image_url if store else ""

    def get_voice_intro_url(self, user):
        store = self._store(user)
        return store.voice_intro_url if store else ""

    def get_product_count(self, user):
        return user.products.filter(is_active=True).count()

    def get_last_active(self, user):
        return user.products.aggregate(last=Max("updated_at"))["last"]

    def get_products(self, user):
        qs = user.products.filter(is_active=True)
        return ProductSerializer(qs, many=True).data
