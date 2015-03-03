from django.shortcuts import render
from django.contrib.auth import (
    REDIRECT_FIELD_NAME,
    authenticate as django_auth,
    login as django_login,
    logout as django_logout
)
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect

from django.utils.http import is_safe_url
from django.shortcuts import resolve_url

def landing(request):
	return render(request, 'home/landing.html')