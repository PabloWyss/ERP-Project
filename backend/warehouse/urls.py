from django.urls import path
from warehouse.views import ListWarehouseView, CreateWarehouseView, AssignOneItemToWarehouseView, SearchWarehouseView, \
    RetrieveUpdateDestroyWarehouseView, AssignManyItemToWarehouseView

urlpatterns = [
    # backend/api/warehouses/
    path('', ListWarehouseView.as_view()),
    path('new/', CreateWarehouseView.as_view()),
    path('assign_one/<int:warehouse_id>/', AssignOneItemToWarehouseView.as_view()),
    path('assign_many/<int:warehouse_id>/', AssignManyItemToWarehouseView.as_view()),
    path('search/', SearchWarehouseView.as_view()),
    path('<int:warehouse_id>/', RetrieveUpdateDestroyWarehouseView.as_view())
]
