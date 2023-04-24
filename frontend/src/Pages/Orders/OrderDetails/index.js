import React from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import { useLocation } from "react-router-dom";
import OrderPrimaryDetails from "./OrderPrimaryDetails";

function OrderDetails() {
  //fetch order data
  //read id of the order to fetch from the URL
  const location = useLocation();
  const orderId = location.pathname.slice(8); //remove "/order/" from the path

  //TODO fetch order -> endpoint missing?
  //fake order for testing
  const order = {
    id: orderId,
    partner: "Darren Daniels",
    is_merchant_supplier: false,
    is_refund: true,
    address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
    order_date: "07/07/2020",
    shipment_date: "08/07/2020",
    order_number: "22906126785176",
    warehouse: "Amazon Warehouse",
    quantity: 12,
  };

  //TODO fetch data of the item(s) in the order? or is it already in the order data?

  
  //fake data for table testing
  const items = [
    {
      model_name: "Espadrilla",
      item_name: "Formentera Yellow",
      size: "38",
      quantity: 4,
      price: 12.58,
      total: 50.32,
    },
    {
      model_name: "Espadrilla",
      item_name: "Lanzarote Feta",
      size: "40",
      quantity: 2,
      price: 11.22,
      total: 22.44,
    },
    {
      model_name: "Bandana",
      item_name: "Gaucho Vino",
      size: "XL",
      quantity: 30,
      price: 7.05,
      total: 211.5,
    },
  ];

  //create columns model
  const columns = [
    {
      Header: "Category",
      accessor: "model_name",
    },
    {
      Header: "Model",
      accessor: "item_name",
    },
    {
      Header: "Size",
      accessor: "size",
    },
    {
      Header: "Qty.",
      accessor: "quantity",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Total",
      accessor: "total",
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
        <h1 className="text-title mb-4">Order # {order.order_number}</h1>
        <OrderPrimaryDetails order={order} />
        <div className="flex items-center justify-between bg-backgroundGrey px-4 mb-2">
          <h2 className="text-section">Items</h2>
        </div>
        <ListTable data={items} columns={columns}></ListTable>
      </div>
    </div>
  );
}
export default OrderDetails;
