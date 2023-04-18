from django.urls import path
from inventory_ledger.views import ListInventoryLedgerPositionView, SearchInventoryLedgerPositionView, \
    ListInventoryLedgerFilteredByItemView, ListInventoryLedgerFilteredByWarehouseView

urlpatterns = [
    # backend/api/inventory_ledgers/
    path('', ListInventoryLedgerPositionView.as_view()),
    path('search/', SearchInventoryLedgerPositionView.as_view()),
    path('items/<int:item_id>/', ListInventoryLedgerFilteredByItemView.as_view()),
    path('warehouses/<int:warehouse_id>/', ListInventoryLedgerFilteredByWarehouseView.as_view()),
]
