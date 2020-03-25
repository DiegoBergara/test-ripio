import datetime
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from .models import *

# Create your views here.

# class PersonGetView(generics.CreateAPIView):
#     serializer_class = PersonSerializer


class PersonView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PersonSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = self.request.user
            data_request = request.data
            bday = datetime.datetime(*[int(item) for item in data_request["birthday"].split('/')]).strftime("%Y-%m-%d")
            print("data_request : ",data_request)
            person = Person(
                user=user,
                name=data_request["name"],
                lastname=data_request["lastname"],
                ci=data_request["ci"],
                birthday=bday,
                address=data_request["address"],
            )
            print("person", person)
            person.save()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        try:
            user = self.request.user
            query = Person.objects.get(user=user)
            result = self.get_serializer_class()(query)
            return Response(result.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CurrencyView(generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()


class AccountView(generics.GenericAPIView):
    serializer_class = AccountSerializer
    
    def post(self, request, format=None):
        try:
            user = self.request.user
            data_request = request.data
            currency = Currency.objects.get(currency_name = data_request["currency"])
            checker = Account.objects.filter(currency = currency, user=user).first()
            if checker is None:
                account = Account(
                    user=user,
                    currency=currency,
                )
                account.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_BAD_REQUEST)
       
class AccountListView(generics.ListAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        query = Account.objects.filter(user=user)
        return query


class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        user_accounts = Account.objects.filter(user=user)
        result = []
        for user_account in user_accounts:
            queryset1 = Transaction.objects.filter(origin=user_account)
            queryset2 = Transaction.objects.filter(destiny=user_account)
            result_aux = queryset1.union(queryset2, all=False)
            result += result_aux
        return list(set(result))

class TransactionView(generics.GenericAPIView):
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        data_request = request.data
        user = self.request.user
        checker = Account.objects.filter(account_id = int(data_request['origin']),user=user.id).first()
        if checker is not None:
            origin = Account.objects.get(account_id = int(data_request['origin']))
            destiny = Account.objects.get(account_id = int(data_request['destiny']))
            currency = origin.currency
            transaction = Transaction(
                origin = origin,
                destiny= destiny,
                amount= int(data_request['amount']),
                transaction_currency = currency
            )
            transaction.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
