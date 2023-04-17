from django.urls import path
from inventory_ledger.views import ListInventoryLedgerPositionView, SearchInventoryLedgerPositionView

urlpatterns = [
    # backend/api/inventory_ledgers/
    path('', ListInventoryLedgerPositionView.as_view()),
    path('search/', SearchInventoryLedgerPositionView.as_view())
]
