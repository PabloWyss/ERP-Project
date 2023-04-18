from django.urls import path
from item_model_specification.views import ListItemModelView, CreateItemModelView, SearchItemModelView, \
    UpdateItemModelView, CurrentItemModelView, AssignItemToItemModelView, ListItemInItemModelView, \
    ListItemModelColorChoiceView, ListItemModelCategoryChoiceView

urlpatterns = [
    # backend/api/items/models/
    path('', ListItemModelView.as_view()),
    path('new/', CreateItemModelView.as_view()),
    path('search/', SearchItemModelView.as_view()),
    path('update/<int:item_model_id>/', UpdateItemModelView.as_view()),
    path('assign/<int:item_model_id>/', AssignItemToItemModelView.as_view()),
    path('<int:item_model_id>/', ListItemInItemModelView.as_view()),
    path('current/<int:item_id>/', CurrentItemModelView.as_view()),
    path('choices/colors/', ListItemModelColorChoiceView.as_view()),
    path('choices/categories/', ListItemModelCategoryChoiceView.as_view())
]
