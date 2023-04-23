from django.urls import path
from partner.views import ListPartnerView, CreatePartnerView, SearchPartnerView, RetrieveUpdateDestroyPartnerView, \
    ListSupplierView, SearchSupplierView, UpdateIsSupplierView, ListCustomerView, SearchCustomerView, \
    UpdateIsCustomerView, AssignItemToPartnerView, ListPartnerAssignedToItemView, ListSupplierAssignedToItemView, \
    ListCustomerAssignedToItemView

urlpatterns = [
    # backend/api/partners/
    path('', ListPartnerView.as_view()),
    path('new/', CreatePartnerView.as_view()),
    path('search/', SearchPartnerView.as_view()),
    path('<int:partner_id>/', RetrieveUpdateDestroyPartnerView.as_view()),

    path('suppliers/', ListSupplierView.as_view()),
    path('suppliers/search/', SearchSupplierView.as_view()),
    path('suppliers/update/<int:partner_id>/', UpdateIsSupplierView.as_view()),

    path('customers/', ListCustomerView.as_view()),
    path('customers/search/', SearchCustomerView.as_view()),
    path('customers/update/<int:partner_id>/', UpdateIsCustomerView.as_view()),

    path('assign/<int:item_partner_id>/', AssignItemToPartnerView.as_view()),

    path('items/<int:item_id>/', ListPartnerAssignedToItemView.as_view()),
    path('suppliers/items/<int:item_id>/', ListSupplierAssignedToItemView.as_view()),
    path('customers/items/<int:item_id>/', ListCustomerAssignedToItemView.as_view())
]
