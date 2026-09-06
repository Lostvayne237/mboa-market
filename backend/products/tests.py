from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product

User = get_user_model()


def make_vendor(email="vendor@example.com", username="vendor1"):
    return User.objects.create_user(
        email=email, username=username, password="strongpass123", role="vendor"
    )


def make_buyer(email="buyer@example.com", username="buyer1"):
    return User.objects.create_user(
        email=email, username=username, password="strongpass123", role="buyer"
    )


def make_product(vendor, **overrides):
    defaults = {
        "title": "Palm oil 5L",
        "description": "Locally produced",
        "price": "15000.00",
        "whatsapp_phone": "+237650000001",
        "city": "Douala",
        "category": "provisions",
    }
    defaults.update(overrides)
    return Product.objects.create(vendor=vendor, **defaults)


class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.vendor = make_vendor()
        self.buyer = make_buyer()
        self.list_url = reverse("product-list")

    def _login(self, user):
        response = self.client.post(
            reverse("auth-login"),
            {"email": user.email, "password": "strongpass123"},
            format="json",
        )
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}"
        )

    def _payload(self, **overrides):
        payload = {
            "title": "Plantains (bunch)",
            "description": "Fresh from the farm",
            "price": "3500.00",
            "whatsapp_phone": "+237650000002",
            "city": "Douala",
            "category": "food",
        }
        payload.update(overrides)
        return payload

    def test_vendor_can_create_product(self):
        self._login(self.vendor)
        response = self.client.post(self.list_url, self._payload(), format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Plantains (bunch)")
        self.assertEqual(response.data["vendor"]["id"], self.vendor.id)
        product = Product.objects.get(pk=response.data["id"])
        self.assertEqual(product.vendor, self.vendor)

    def test_buyer_cannot_create_product(self):
        self._login(self.buyer)
        response = self.client.post(self.list_url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_anonymous_cannot_create_product(self):
        response = self.client.post(self.list_url, self._payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_invalid_phone_rejected(self):
        self._login(self.vendor)
        response = self.client.post(
            self.list_url, self._payload(whatsapp_phone="abc"), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("whatsapp_phone", response.data)

    def test_mine_lists_only_own_products(self):
        other = make_vendor(email="other@example.com", username="other1")
        make_product(self.vendor, title="Mine")
        make_product(other, title="Not mine")

        self._login(self.vendor)
        response = self.client.get(reverse("product-mine"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [p["title"] for p in response.data["results"]]
        self.assertEqual(titles, ["Mine"])

    def test_public_list_excludes_inactive(self):
        make_product(self.vendor, title="Visible")
        make_product(self.vendor, title="Hidden", is_active=False)

        response = self.client.get(self.list_url)

        titles = [p["title"] for p in response.data["results"]]
        self.assertIn("Visible", titles)
        self.assertNotIn("Hidden", titles)

    def test_search_by_q_and_city(self):
        make_product(self.vendor, title="Palm oil", city="Douala")
        make_product(self.vendor, title="Cement bag", city="Yaoundé")

        response = self.client.get(self.list_url, {"q": "palm"})
        titles = [p["title"] for p in response.data["results"]]
        self.assertEqual(titles, ["Palm oil"])

        response = self.client.get(self.list_url, {"city": "yaoundé"})
        titles = [p["title"] for p in response.data["results"]]
        self.assertEqual(titles, ["Cement bag"])

    def test_detail_increments_view_count_and_404s_inactive(self):
        product = make_product(self.vendor)
        url = reverse("product-detail", args=[product.pk])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["view_count"], 1)

        product.is_active = False
        product.save()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_contact_click_increments(self):
        product = make_product(self.vendor)
        url = reverse("product-contact", args=[product.pk])

        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["contact_count"], 1)

    def test_owner_can_edit_and_deactivate(self):
        product = make_product(self.vendor)
        self._login(self.vendor)
        url = reverse("product-edit", args=[product.pk])

        response = self.client.patch(url, {"is_active": False}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        product.refresh_from_db()
        self.assertFalse(product.is_active)

    def test_non_owner_cannot_edit(self):
        product = make_product(self.vendor)
        other = make_vendor(email="other@example.com", username="other1")
        self._login(other)
        url = reverse("product-edit", args=[product.pk])

        response = self.client.patch(url, {"title": "Hijacked"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class StorefrontAPITestCase(APITestCase):
    def setUp(self):
        self.vendor = make_vendor()

    def _login(self, user):
        response = self.client.post(
            reverse("auth-login"),
            {"email": user.email, "password": "strongpass123"},
            format="json",
        )
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}"
        )

    def test_vendor_updates_store_profile(self):
        self._login(self.vendor)
        url = reverse("vendor-my-store")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.patch(
            url,
            {"store_name": "Chez Marie", "city": "Douala", "about": "Fresh goods"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["store_name"], "Chez Marie")

    def test_public_storefront_shows_trust_signals(self):
        make_product(self.vendor, title="Palm oil")
        make_product(self.vendor, title="Hidden", is_active=False)

        response = self.client.get(reverse("vendor-storefront", args=[self.vendor.pk]))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["product_count"], 1)
        self.assertIn("member_since", response.data)
        titles = [p["title"] for p in response.data["products"]]
        self.assertEqual(titles, ["Palm oil"])

    def test_storefront_404_for_buyer_or_missing(self):
        buyer = make_buyer()
        response = self.client.get(reverse("vendor-storefront", args=[buyer.pk]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_mixed_search_returns_products_and_vendors(self):
        store_vendor = self.vendor
        self._login(store_vendor)
        self.client.patch(
            reverse("vendor-my-store"), {"store_name": "Palm Palace"}, format="json"
        )
        self.client.credentials()
        make_product(store_vendor, title="Palm oil")

        response = self.client.get(reverse("search"), {"q": "palm"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["products"]), 1)
        self.assertEqual(len(response.data["vendors"]), 1)
        self.assertEqual(response.data["vendors"][0]["store_name"], "Palm Palace")
