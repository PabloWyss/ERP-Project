from django.urls import path
from item_variant_specification.views import ListItemVariantView, CreateItemVariantView

urlpatterns = [
    # backend/api/items/variants/
    path('<int:item_id>/', ListItemVariantView.as_view()),
    path('new/<int:item_id>/', CreateItemVariantView.as_view())
]
