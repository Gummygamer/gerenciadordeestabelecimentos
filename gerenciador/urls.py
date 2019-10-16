
from django.contrib import admin
from django.urls import path
from estabelecimentos import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/estabelecimentos/$', views.estabelecimentos_list),
    url(r'^api/estabelecimentos/(?P<pk>[0-9]+)$', views.estabelecimentos_detail),
]
