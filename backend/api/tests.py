from django.urls import reverse
from django.conf import settings
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.status import HTTP_200_OK

from .models import User, Email


class SignUpTests(APITestCase):
    def test_sign_up(self):
        url = reverse('sign_up')
        params = {
            "username": "neo",
            "password": "you_will_never_guess_3228",
            "email": "the_one@matrix.net",
            "first_name": "Thomas",
            "last_name": "Anderson"
        }
        response = self.client.post(url, params, format='json')
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        created_user = User.objects.get(pk=1)
        self.assertEqual(created_user.username, 'neo')
        self.assertEqual(created_user.first_name, 'Thomas')
        self.assertEqual(created_user.last_name, 'Anderson')
        self.assertEqual(created_user.is_active, False)
        self.assertNotEqual(created_user.password, 'you_will_never_guess_3228')
        email = Email.objects.get(address='the_one@matrix.net')
        self.assertEqual(email.is_main, True)
        self.assertEqual(email.verified, False)


class EmailSettingsTests(TestCase):
    def test_email_host_setup(self):
        self.assertIsNotNone(settings.EMAIL_HOST)

    def test_email_host_password_setup(self):
        self.assertIsNotNone(settings.EMAIL_HOST_PASSWORD)

    def test_email_host_user_setup(self):
        self.assertIsNotNone(settings.EMAIL_HOST_USER)

    def test_email_use_tls_setup(self):
        self.assertTrue(settings.EMAIL_USE_TLS)

    def test_email_host_port_setup(self):
        self.assertIsNotNone(settings.EMAIL_PORT)
