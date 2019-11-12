import json

import stripe

from django.urls import reverse
from django.views.generic import ListView, DetailView
from django.http import HttpResponseRedirect
from django.conf import settings
from django.views import View
from django.http import JsonResponse

from rest_framework import generics

from .models import Course
from .serializers import CourseSerializer


class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


#################
# direct charge #
#################

class CourseChargeView(View):

    def post(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        json_data = json.loads(request.body)
        course = Course.objects.filter(id=json_data['course_id']).first()
        fee_percentage = .01 * int(course.fee)
        try:
            customer = get_or_create_customer(
                # self.request.user.email,
                # pull the email off the request
                json_data['email'],
                json_data['token'],
                course.seller.stripe_access_token,
                course.seller.stripe_user_id,
            )
            charge = stripe.Charge.create(
                amount=json_data['amount'],
                currency='usd',
                customer=customer.id,
                description=json_data['description'],
                application_fee=int(json_data['amount'] * fee_percentage),
                stripe_account=course.seller.stripe_user_id,
            )
            if charge:
                return JsonResponse({'status': 'success'}, status=202)
        except stripe.error.StripeError as e:
            return JsonResponse({'status': 'error'}, status=500)

# helpers

def get_or_create_customer(email, token, stripe_access_token, stripe_account):
    stripe.api_key = stripe_access_token
    connected_customers = stripe.Customer.list()
    for customer in connected_customers:
        if customer.email == email:
            print(f'{email} found')
            return customer
    print(f'{email} created')
    return stripe.Customer.create(
        email=email,
        source=token,
        stripe_account=stripe_account,
    )
