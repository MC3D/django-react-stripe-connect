from django.urls import path

from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    path('authorize/', IndexView.as_view(), name='authorize'),
    path('courses/', IndexView.as_view(), name='course_list'),
    path('courses/:slug/', IndexView.as_view(), name='course_detail'),
    path('', IndexView.as_view(), name='index'),
]
