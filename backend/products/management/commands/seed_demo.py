"""Seed demo vendors and product listings for local development.

Usage: python manage.py seed_demo
Idempotent: safe to run twice (matches on email / product title).
"""

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from products.models import Product, StoreProfile

User = get_user_model()

VENDORS = [
    {
        "email": "marie@demo.mboa",
        "username": "chez-marie",
        "store_name": "Chez Marie Provisions",
        "about": "Family provisions shop in Akwa for over 10 years. Rice, oil, "
        "spices and everything for the kitchen. Call us, we deliver in Douala.",
        "city": "Douala",
        "neighborhood": "Akwa",
        "brand_color": "#b45309",
        "plan": "pro",
        "phone": "+237650000001",
        "products": [
            ("Palm oil 5L", "Pure local palm oil, 5 litre container.", "15000", "provisions", ""),
            ("Rice 25kg (parfumé)", "Perfumed rice, 25kg bag. Wholesale price for 5+ bags.", "22000", "provisions", ""),
            ("Ground crayfish 1kg", "Dried and ground crayfish from Limbé.", "9000", "food", ""),
        ],
    },
    {
        "email": "jean@demo.mboa",
        "username": "electro-jean",
        "store_name": "Electro Jean",
        "about": "Phones, accessories and small electronics. New and UK used. "
        "Marché Central, Yaoundé. WhatsApp us for today's prices.",
        "city": "Yaoundé",
        "neighborhood": "Marché Central",
        "brand_color": "#1d4ed8",
        "plan": "boost",
        "phone": "+237670000002",
        "products": [
            ("Infinix Hot 40 (new)", "Sealed box, 1 year warranty, 256GB.", "115000", "electronics", ""),
            ("Power bank 20000mAh", "Fast charge power bank, perfect for power cuts.", "12500", "electronics", ""),
            ("Bluetooth speaker", "Loud, solid battery. Good for small events.", "18000", "electronics", ""),
        ],
    },
    {
        "email": "fatima@demo.mboa",
        "username": "fatima-styles",
        "store_name": "Fatima Styles",
        "about": "Tailored wear and pagne. Bring your own fabric or choose ours. "
        "Photos of past work on request via WhatsApp.",
        "city": "Douala",
        "neighborhood": "Bonapriso",
        "brand_color": "#be185d",
        "plan": "free",
        "phone": "+237690000003",
        "products": [
            ("Kaba ngondo (custom)", "Custom sewn kaba, choose your pagne. 5 day turnaround.", "25000", "fashion", ""),
            ("Men's senator wear", "Two piece senator, measured to fit.", "30000", "fashion", ""),
        ],
    },
    {
        "email": "paul@demo.mboa",
        "username": "quincaillerie-paul",
        "store_name": "Quincaillerie Paul & Fils",
        "about": "Hardware and building materials since 2009. Cement, iron rods, "
        "paint, plumbing. We advise on quantities for your project.",
        "city": "Yaoundé",
        "neighborhood": "Mvog Mbi",
        "brand_color": "#166534",
        "plan": "free",
        "phone": "+237655000004",
        "products": [
            ("Cement 50kg (CIMENCAM)", "Fresh stock, price per bag. Discounts from 20 bags.", "5200", "hardware", ""),
            ("Iron rod 12mm", "Standard 12m length, per rod.", "4500", "hardware", ""),
            ("Emulsion paint 20L", "White emulsion, interior. Other colours on request.", "16000", "hardware", ""),
        ],
    },
]


class Command(BaseCommand):
    help = "Seed demo vendors, storefronts and product listings."

    def handle(self, *args, **options):
        created_products = 0
        for spec in VENDORS:
            vendor, created = User.objects.get_or_create(
                email=spec["email"],
                defaults={"username": spec["username"], "role": "vendor"},
            )
            if created:
                vendor.set_password("demopass123")
                vendor.save()

            StoreProfile.objects.update_or_create(
                vendor=vendor,
                defaults={
                    "store_name": spec["store_name"],
                    "about": spec["about"],
                    "city": spec["city"],
                    "neighborhood": spec["neighborhood"],
                    "brand_color": spec["brand_color"],
                    "plan": spec.get("plan", "free"),
                    "whatsapp_phone": spec["phone"],
                },
            )

            for title, description, price, category, image_url in spec["products"]:
                _, was_created = Product.objects.get_or_create(
                    vendor=vendor,
                    title=title,
                    defaults={
                        "description": description,
                        "price": price,
                        "whatsapp_phone": spec["phone"],
                        "city": spec["city"],
                        "category": category,
                        "image_url": image_url,
                    },
                )
                created_products += int(was_created)

        buyer, created = User.objects.get_or_create(
            email="buyer@demo.mboa",
            defaults={"username": "demo-buyer", "role": "buyer"},
        )
        if created:
            buyer.set_password("demopass123")
            buyer.save()

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {len(VENDORS)} vendors, {created_products} new products, 1 buyer. "
                "All demo passwords: demopass123"
            )
        )
