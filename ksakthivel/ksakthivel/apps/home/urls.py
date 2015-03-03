from django.conf.urls import patterns, url, include
from django.contrib import auth

urlpatterns = patterns('apps.home.views',
	url(r'^$', 'landing', name="home_landing")
)