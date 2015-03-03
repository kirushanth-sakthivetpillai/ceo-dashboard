# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines for those models you wish to give write DB access
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from django.db import models

class Article(models.Model):
    id = models.BigIntegerField(primary_key=True)
    country_code = models.CharField(max_length=255, blank=True)
    domain = models.CharField(max_length=255, blank=True)
    fair_hair_id = models.CharField(max_length=255, blank=True)
    language_code = models.CharField(max_length=255, blank=True)
    publish_date = models.DateTimeField(blank=True, null=True)
    sentiment = models.FloatField(blank=True, null=True)
    source_id = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=510, blank=True)
    class Meta:
        managed = False
        app_label = 'meltwater'
        db_table = 'article'

class Author(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=510, blank=True)
    article = models.ForeignKey(Article, blank=True, null=True)
    class Meta:
        managed = False
        app_label = 'meltwater'
        db_table = 'author'

class Company(models.Model):
    id = models.BigIntegerField(primary_key=True)
    company = models.CharField(max_length=510, blank=True)
    occurrences_num = models.IntegerField(blank=True, null=True)
    sentiment = models.FloatField(blank=True, null=True)
    article = models.ForeignKey(Article, blank=True, null=True)
    class Meta:
        managed = False
        app_label = 'meltwater'
        db_table = 'company'

class Concept(models.Model):
    id = models.BigIntegerField(primary_key=True)
    concept = models.CharField(max_length=510, blank=True)
    article = models.ForeignKey(Article, blank=True, null=True)
    class Meta:
        managed = False
        app_label = 'meltwater'
        db_table = 'concept'

class Phrase(models.Model):
    id = models.BigIntegerField(primary_key=True)
    phrase = models.CharField(max_length=510, blank=True)
    article = models.ForeignKey(Article, blank=True, null=True)
    class Meta:
        managed = False
        app_label = 'meltwater'
        db_table = 'phrase'


