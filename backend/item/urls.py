from django.urls import path

from item.views import ListItemView, CreateItemView

urlpatterns = [
    # backend/api/items/
    path('', ListItemView.as_view()),
    path('new/', CreateItemView.as_view()),
    # path('search/', SearchItemView.as_view()),
    # path('<int:item_id>/', RetrieveUpdateDestroyItemView.as_view())
]
