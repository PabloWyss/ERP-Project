from django.urls import path
from item_variant_specification.views import ListItemVariantView, CreateItemVariantView, SearchItemVariantView, \
    UpdateItemVariantView, CurrentItemVariantView, ListItemVariantSizeChoiceView

urlpatterns = [
    # backend/api/items/variants/
    path('<int:item_id>/', ListItemVariantView.as_view()),
    path('new/<int:item_id>/', CreateItemVariantView.as_view()),
    path('search/<int:item_id>/', SearchItemVariantView.as_view()),
    path('update/<int:item_variant_id>/', UpdateItemVariantView.as_view()),
    path('current/<int:item_id>/', CurrentItemVariantView.as_view()),
    path('choices/sizes/', ListItemVariantSizeChoiceView().as_view())
]
