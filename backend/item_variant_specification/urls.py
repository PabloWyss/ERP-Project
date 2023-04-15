from django.urls import path

from item_variant_specification.views import ListItemVariantView, CreateItemVariantView, SearchItemVariantView, \
    RetrieveUpdateDestroyItemVariantView

urlpatterns = [
    # backend/api/items/variants/
    path('<int:item_id>/', ListItemVariantView.as_view()),
    path('<int:item_id>/new/', CreateItemVariantView.as_view()),
    path('<int:item_id>/search/', SearchItemVariantView.as_view()),
    path('update/<int:item_id>/', RetrieveUpdateDestroyItemVariantView.as_view())
]
