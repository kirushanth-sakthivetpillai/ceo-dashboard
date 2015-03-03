from django.shortcuts import render
from django.contrib.auth import (
    REDIRECT_FIELD_NAME,
    authenticate as django_auth,
    login as django_login,
    logout as django_logout
)
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse

from django.core import serializers

from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect

from django.utils.http import is_safe_url
from django.shortcuts import resolve_url

from django.db import connections

from .models import Article, Author, Company, Concept, Phrase

def meltwater(request):
	return render(request, 'portfolio/meltwater/index.html')

def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]

# very basic api
def data_mentions(request):
	companies = ["LexisNexis",
				"Cision",
				"Trunk Club",
				"Frank & Oak"]

	result = "Key,Value\n"

	for c in companies:
		result += c + ","
		count = Company.objects.filter(company=c).count()
		result += str(count) + "\n"

	return HttpResponse(result)

def data_advertising(request):
	companies = ["LexisNexis",
				"Cision",
				"Trunk Club",
				"Frank & Oak"]

	result = "Key,Value\n"

	for c in companies:
		result += c + ","
		count = Company.objects.filter(company=c).count()
		result += str(count) + "\n"

	return HttpResponse(result)

def data_sources(request):
	companies = ["LexisNexis",
				"Cision",
				"Trunk Club",
				"Frank & Oak"]

	cursor = connections['meltwater'].cursor()

	cursor.execute('''
		select id, phrase, count(*) 
			from phrase 
			group by phrase 
			order by count(*) 
			desc 
			limit 5''')
	result = dictfetchall(cursor)
	print result

	csv = "Key"
	for c in companies:
		csv += "," + c

	for r in result:
		phrase = r.phrase
	

	return HttpResponse(csv)

def data_themes(request):
	return HttpResponse(serializers.serialize("json", {}), mimetype='application/json')	

def data_sentiment(request):
	return HttpResponse(serializers.serialize("json", {}), mimetype='application/json')	

def data_reach(request):
	return HttpResponse(serializers.serialize("json", {}), mimetype='application/json')
