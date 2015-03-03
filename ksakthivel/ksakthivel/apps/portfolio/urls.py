from django.conf.urls import patterns, url, include
from django.contrib import auth

urlpatterns = patterns('apps.portfolio',

	url(r'^meltwater/', include('apps.portfolio.meltwater.urls')),

)