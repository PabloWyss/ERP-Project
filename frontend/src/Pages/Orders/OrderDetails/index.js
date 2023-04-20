import React from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import { useLocation } from "react-router-dom";
import OrderPrimaryDetails from "./OrderPrimaryDetails";

function OrderDetails() {
  //read id of the order to fetch from the URL
  const location = useLocation();
  const orderId = location.pathname.slice(8); //remove "/order/" from the path
  //TODO fetch order

  //fake order for testing
  const order = {
    id: orderId,
    partner: "Darren Daniels",
    is_merchant_supplier: false,
    is_refund: true,
    order_date: "07/07/2020",
    order_number: "22906126785176",
    quantity: 12,
  };

  //fake data for table testing
  const data = [
    {
      product: "Kim Parrish",
      address: "4420 Valley Street, Garnerville, NY 10923",
      date: "07/11/2020",
      order: "87349585892118",
      partner: "supplier",
      id: "8",
    },
  ];

  //create columns model
  const columns = [
    {
      Header: "Product",
      accessor: "product",
    },
    {
      Header: "Variant",
      accessor: "address",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Qty.",
      accessor: "order",
    },
    {
      Header: "Warehouse",
      accessor: "partner",
    },
  ];

  return (
    <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <h1 className="text-title mb-2">Order # {order.order_number}</h1>
        <OrderPrimaryDetails order={order} />
        <div className="flex items-center justify-between bg-backgroundGrey px-4">
          <h2 className="text-section">Items</h2>
        </div>
        <ListTable data={data} columns={columns}></ListTable>
      </div>
    </div>
  );
}
export default OrderDetails;
