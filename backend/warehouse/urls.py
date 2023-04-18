from django.urls import path
from warehouse.views import ListWarehouseView, CreateWarehouseView, UpdateOneItemInWarehouseView, \
    SearchWarehouseView, RetrieveUpdateDestroyWarehouseView

urlpatterns = [
    # backend/api/warehouses/
    path('', ListWarehouseView.as_view()),
    path('new/', CreateWarehouseView.as_view()),
    path('update_one/<int:warehouse_id>/', UpdateOneItemInWarehouseView.as_view()),
    # path('update_many/<int:warehouse_id>/', UpdateManyItemInWarehouseView.as_view()),
    path('search/', SearchWarehouseView.as_view()),
    path('<int:warehouse_id>/', RetrieveUpdateDestroyWarehouseView.as_view())
]
