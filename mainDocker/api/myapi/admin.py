from django.contrib import admin
from .models import Currency, Account, Transaction
# Register your models here.
admin.site.register(Currency)
admin.site.register(Account)
admin.site.register(Transaction)


