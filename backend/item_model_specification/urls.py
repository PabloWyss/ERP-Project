from django.urls import path
from item_model_specification.views import ListItemModelView, CreateItemModelView, UpdateItemModelView, \
    CurrentItemModelView

urlpatterns = [
    # backend/api/items/models/
    path('<int:item_id>/', ListItemModelView.as_view()),
    path('new/<int:item_id>/', CreateItemModelView.as_view()),
    path('update/<int:item_model_id>/', UpdateItemModelView.as_view()),
    path('current/<int:item_id>/', CurrentItemModelView.as_view())
]
