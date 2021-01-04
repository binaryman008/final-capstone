"""server2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from ecomm.views import category_list, category_detail, product_list, review_product, review_detail, cart_detail, order_detail, order_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/categories', category_list),
    path('api/categories/<int:pk>/', category_detail),
    path('api/products', product_list),
    path('api/reviews', review_product),
    path('api/reviews/<int:pk>/', review_detail),
    path('api/cart/<str:pks>', cart_detail),
    path('api/orders', order_detail),
    path('api/orders/<int:pk>/', order_list),
]