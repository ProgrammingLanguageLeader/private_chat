from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.status import HTTP_200_OK

from .models import User


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
        self.assertEqual(created_user.email, 'the_one@matrix.net')
        self.assertEqual(created_user.first_name, 'Thomas')
        self.assertEqual(created_user.last_name, 'Anderson')
        self.assertEqual(created_user.is_active, False)
