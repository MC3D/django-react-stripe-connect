from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('courses/', include('courses.urls')),
    path('accounts/', include('accounts.urls')),
]
