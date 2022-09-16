from credsform import models as creds_model
from rest_framework import serializers


class LoginFormSerializers(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)
    