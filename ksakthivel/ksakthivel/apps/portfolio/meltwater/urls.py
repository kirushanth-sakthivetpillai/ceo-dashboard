from django.conf.urls import patterns, url, include
from django.contrib import auth

urlpatterns = patterns('apps.portfolio.meltwater.views',

	url(r'^$', 'meltwater', name='portfolio_meltwater'),

	url(r'^api/mentions/$', 'data_mentions', name="portfolio_meltwater_mentions"),
	url(r'^api/advertising/$', 'data_advertising', name="portfolio_meltwater_advertising"),
	url(r'^api/sources/$', 'data_sources', name="portfolio_meltwater_sources"),
	url(r'^api/themes/$', 'data_themes', name="portfolio_meltwater_themes"),
	url(r'^api/sentiment/$', 'data_sentiment', name="portfolio_meltwater_sentiment"),
	url(r'^api/reach/$', 'data_reach', name="portfolio_meltwater_reach")
	
)