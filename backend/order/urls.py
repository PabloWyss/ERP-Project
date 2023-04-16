from django.urls import path

from order.views import ListOrderView, CreateOrderView

urlpatterns = [
    # backend/api/orders/
    path('', ListOrderView.as_view()),
    path('new/', CreateOrderView.as_view()),
    # path('search/', SearchOrderView.as_view()),
    # path('<int:order_id>/', RetrieveUpdateDestroyOrderView.as_view()),

    # path('supplies/', ListSupplyView.as_view()),
    # path('supplies/search/', SearchSupplyView.as_view()),

    # path('supplies/sales/', ListSupplySaleView.as_view()),
    # path('supplies/sales/search/', SearchSupplySaleView.as_view()),

    # path('supplies/refunds/', ListSupplyRefundView.as_view()),
    # path('supplies/refunds/search/', SearchSupplyRefundView.as_view()),

    # path('purchases/', ListPurchaseView.as_view()),
    # path('purchases/search/', SearchPurchaseView.as_view()),

    # path('purchases/sales/', ListPurchaseSaleView.as_view()),
    # path('purchases/sales/search/', SearchPurchaseSaleView.as_view()),

    # path('purchases/refunds/', ListPurchaseRefundView.as_view()),
    # path('purchases/refunds/search/', SearchPurchaseRefundView.as_view()),
]
