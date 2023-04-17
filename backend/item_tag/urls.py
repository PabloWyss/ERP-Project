from django.urls import path

from item_tag.views import ListItemTagView, CreateItemTagView, SearchItemTagView, RetrieveUpdateDestroyItemTagView

urlpatterns = [
    # backend/api/item_tags/
    path('', ListItemTagView.as_view()),
    path('new/<int:item_id>/', CreateItemTagView.as_view()),
    path('search/', SearchItemTagView.as_view()),
    path('<int:item_serializer_id>/', RetrieveUpdateDestroyItemTagView.as_view())
]
