from http.client import HTTPResponse
import json
from credsform import models as creds_model
from credsform import serializers as creds_serializer
from rest_framework import views as rest_framework_views

from credsform.utils import create_response

class CredsForm(rest_framework_views.APIView):
    def post(self,request):
        serializer_instance = creds_serializer.LoginFormSerializers(data=request.data)

        if not serializer_instance.is_valid():
            return create_response("Enter valid Data",400)
        else:
            creds_model.LoginForm.objects.create(
                username = request.data.get("username"),
                email = request.data.get("email"),
                password = request.data.get("password"),

            )
            return create_response("Data Inserted Successfully",200)

    def get(self,request):
        creds_data = creds_model.LoginForm.objects.all()
        print("Get all the data",[obj.get_details() for obj in creds_data])
        return create_response([obj.get_details() for obj in creds_data],200)

class CredsFormData(rest_framework_views.APIView):
    def get(self,request,id):
        creds_data = creds_model.LoginForm.objects.filter(id=id).last()
        return create_response(creds_data.get_details(),200)


        