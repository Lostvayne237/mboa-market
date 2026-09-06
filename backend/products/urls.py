from django.urls import path

from .views import (
    CategoryListView,
    ContactClickView,
    MyProductsView,
    MyStoreView,
    ProductDetailView,
    ProductListCreateView,
    ProductUpdateView,
    SearchView,
    VendorListView,
    VendorStorefrontView,
)

urlpatterns = [
    path("products/", ProductListCreateView.as_view(), name="product-list"),
    path("products/mine/", MyProductsView.as_view(), name="product-mine"),
    path("products/categories/", CategoryListView.as_view(), name="product-categories"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("products/<int:pk>/edit/", ProductUpdateView.as_view(), name="product-edit"),
    path("products/<int:pk>/contact/", ContactClickView.as_view(), name="product-contact"),
    path("vendors/", VendorListView.as_view(), name="vendor-list"),
    path("vendors/me/store/", MyStoreView.as_view(), name="vendor-my-store"),
    path("vendors/<int:pk>/", VendorStorefrontView.as_view(), name="vendor-storefront"),
    path("search/", SearchView.as_view(), name="search"),
]
