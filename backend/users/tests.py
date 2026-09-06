from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthAPITestCase(APITestCase):
    def setUp(self):
        self.register_url = reverse("auth-register")
        self.login_url = reverse("auth-login")
        self.me_url = reverse("auth-me")

    def _register_payload(self, **overrides):
        payload = {
            "email": "user@example.com",
            "username": "user1",
            "password": "strongpass123",
            "role": "buyer",
        }
        payload.update(overrides)
        return payload

    def test_register_buyer_success(self):
        response = self.client.post(
            self.register_url,
            self._register_payload(
                email="buyer@example.com",
                username="buyer1",
                role="buyer",
            ),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["email"], "buyer@example.com")
        self.assertEqual(response.data["role"], "buyer")
        self.assertNotIn("password", response.data)
        self.assertTrue(User.objects.filter(email="buyer@example.com").exists())

    def test_register_vendor_success(self):
        response = self.client.post(
            self.register_url,
            self._register_payload(
                email="vendor@example.com",
                username="vendor1",
                role="vendor",
            ),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["email"], "vendor@example.com")
        self.assertEqual(response.data["role"], "vendor")
        self.assertNotIn("password", response.data)
        self.assertTrue(User.objects.filter(email="vendor@example.com").exists())

    def test_register_rejects_duplicate_email(self):
        User.objects.create_user(
            email="taken@example.com",
            username="existing",
            password="strongpass123",
            role="buyer",
        )

        response = self.client.post(
            self.register_url,
            self._register_payload(
                email="taken@example.com",
                username="newuser",
                role="vendor",
            ),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_rejects_invalid_role(self):
        response = self.client.post(
            self.register_url,
            self._register_payload(
                email="bad@example.com",
                username="bad1",
                role="admin",
            ),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("role", response.data)

    def test_login_rejects_wrong_password(self):
        User.objects.create_user(
            email="login@example.com",
            username="loginuser",
            password="strongpass123",
            role="buyer",
        )

        response = self.client.post(
            self.login_url,
            {"email": "login@example.com", "password": "wrongpassword"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
