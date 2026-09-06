from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models


class Category(models.TextChoices):
    """Categories reflecting real local commerce in Cameroon."""

    PROVISIONS = "provisions", "Provisions"
    FOOD = "food", "Food"
    FASHION = "fashion", "Fashion"
    ELECTRONICS = "electronics", "Electronics"
    HARDWARE = "hardware", "Hardware"
    SPARE_PARTS = "spare-parts", "Spare parts"
    BEAUTY = "beauty", "Beauty"
    HOME = "home", "Home"
    OTHER = "other", "Other"


class StorePlan(models.TextChoices):
    """Monthly storefront plans. Fee is for visibility — never a deal commission."""

    FREE = "free", "Free"
    BOOST = "boost", "Boost"
    PRO = "pro", "Pro"


class StoreProfile(models.Model):
    """A vendor's public storefront identity on Mboa Market.

    Display-only: no cart checkout. Plan is a monthly store fee for visibility.
    """

    vendor = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="store",
    )
    store_name = models.CharField(max_length=120)
    about = models.TextField(blank=True)
    city = models.CharField(max_length=80, blank=True)
    # Neighborhood of the physical shop, if there is one (e.g. Akwa, Bastos).
    neighborhood = models.CharField(max_length=80, blank=True)
    # Each storefront is themed with the seller's chosen color.
    brand_color = models.CharField(max_length=7, default="#13315c")
    plan = models.CharField(
        max_length=10,
        choices=StorePlan.choices,
        default=StorePlan.FREE,
    )
    whatsapp_phone = models.CharField(max_length=20, blank=True)
    cover_image_url = models.URLField(blank=True)
    voice_intro_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.store_name

    @property
    def plan_rank(self) -> int:
        return {"pro": 2, "boost": 1}.get(self.plan, 0)


class Product(models.Model):
    """A displayed listing. Price is informational — the deal happens by phone."""

    vendor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products",
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    currency = models.CharField(max_length=3, default="XAF")
    whatsapp_phone = models.CharField(max_length=20)
    city = models.CharField(max_length=80, blank=True)
    category = models.CharField(
        max_length=20, choices=Category.choices, default=Category.OTHER
    )
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    # Honest trust/interest signals — no fake ratings.
    view_count = models.PositiveIntegerField(default=0)
    contact_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
