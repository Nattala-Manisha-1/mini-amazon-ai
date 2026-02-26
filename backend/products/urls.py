from django.urls import path
from .views import get_products, ask_products

urlpatterns = [
    path('products', get_products),
    path('ask', ask_products),
]