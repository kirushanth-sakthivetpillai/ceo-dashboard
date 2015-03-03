from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

import uwsgi
from uwsgidecorators import timer
from django.utils import autoreload

@timer(1)
def change_code_gracefull_reload(sig):
    if autoreload.code_changed():
        uwsgi.reload()