from django.urls import path

from .views import CourseListAPIView, CourseDetailAPIView, CourseChargeView


urlpatterns = [
  path('', CourseListAPIView.as_view(), name='course_list'),
  path('charge/', CourseChargeView.as_view(), name='charge'),
  path('<int:pk>/', CourseDetailAPIView.as_view(), name='course_detail'),
]
