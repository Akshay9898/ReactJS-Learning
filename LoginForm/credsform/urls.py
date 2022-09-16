from credsform import views
from django.urls import path


urlpatterns = [
    path("", views.CredsForm.as_view(), name="creds_form"),
    path("getdata/<id>/", views.CredsFormData.as_view(),name="getdata")

]