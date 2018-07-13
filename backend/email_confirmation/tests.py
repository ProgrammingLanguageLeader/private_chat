from django.test import TestCase
from django.conf import settings


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
