from django.contrib import admin

from .models import Product, StoreProfile


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "vendor",
        "price",
        "currency",
        "category",
        "city",
        "is_active",
        "view_count",
        "contact_count",
        "created_at",
    )
    list_filter = ("is_active", "category", "city", "currency")
    search_fields = ("title", "description", "vendor__email", "vendor__username")
    readonly_fields = ("view_count", "contact_count", "created_at", "updated_at")


@admin.register(StoreProfile)
class StoreProfileAdmin(admin.ModelAdmin):
    list_display = ("store_name", "vendor", "city", "created_at")
    search_fields = ("store_name", "vendor__email", "vendor__username")
