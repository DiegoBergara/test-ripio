from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Person(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    ci = models.CharField(max_length=10)
    birthday = models.DateField()
    address = models.CharField(max_length=60)

    def __str__(self):
        return f"{self.user} : {self.name}, {self.lastname}, {self.ci}, {self.birthday}, {self.address}"


class Currency(models.Model):
    currency_name = models.CharField(max_length=5, primary_key=True)
    exchange_rate = models.FloatField()


class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    funds = models.FloatField(default=1000)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)

    def addFunds(self, amount):
        self.funds = self.funds + amount
        return self.save()

    def removeFunds(self, amount):
        self.funds = self.funds - amount
        return self.save()

    def __str__(self):
        return f"{self.account_id} : {self.user}, {self.funds}, {self.currency}"


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    origin = models.ForeignKey(
        Account, related_name="origin", null=False, on_delete=models.CASCADE
    )
    destiny = models.ForeignKey(
        Account, related_name="destiny", null=False, on_delete=models.CASCADE
    )
    amount = models.IntegerField()
    transaction_currency = models.ForeignKey(Currency, on_delete=models.SET_DEFAULT, default = "")
    date_time = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        origin = Account.objects.filter(account_id=self.origin.account_id).first()
        receiver = Account.objects.filter(account_id=self.destiny.account_id).first()
        if origin is not None and receiver is not None:
            exchange_funds = self.amount * (origin.currency.exchange_rate / receiver.currency.exchange_rate)
            receiver.addFunds(exchange_funds)
            origin.removeFunds(self.amount)

            return super(Transaction, self).save(*args, **kwargs)
        else:
            return {"error": "true"}

    def __str__(self):
        return f"{self.transaction_id} : {self.origin}, {self.destiny}, {self.amount}, {self.date_time}"
