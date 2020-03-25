from django.urls import path, include
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
urlpatterns = router.urls

urlpatterns = [
    path("account", AccountView.as_view()),
    path("transaction", TransactionView.as_view()),
    path("accountlist", AccountListView.as_view()),
    path("transactionlist", TransactionListView.as_view()),
    path("currency", CurrencyView.as_view()),
    path("person", PersonView.as_view()),
]

urlpatterns += router.urls
