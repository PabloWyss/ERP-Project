from django.urls import path
from warehouse.views import ListWarehouseView, CreateWarehouseView, InboundItemToWarehouseView, SearchWarehouseView, \
    RetrieveUpdateDestroyWarehouseView

urlpatterns = [
    # backend/api/warehouses/
    path('', ListWarehouseView.as_view()),
    path('new/', CreateWarehouseView.as_view()),
    path('add/<int:warehouse_id>/', InboundItemToWarehouseView.as_view()),
    # path('assign_many/<int:warehouse_id>/', AssignManyItemToWarehouseView.as_view()),
    path('search/', SearchWarehouseView.as_view()),
    path('<int:warehouse_id>/', RetrieveUpdateDestroyWarehouseView.as_view())
]
