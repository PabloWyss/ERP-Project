import React, { useState } from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import { useParams } from "react-router-dom";
import OrderPrimaryDetails from "./OrderPrimaryDetails";
import callAPI from "../../../Axios/callAPI";
import { useEffect } from "react";

function OrderDetails() {
  //fetch order data
  //read id of the order to fetch
  const orderId = useParams().orderID;

  const [orderData, setOrderData] = useState({});

  //TODO fetch order -> endpoint missing?
  const getOrderById = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/orders/${orderId}`, config);
      setOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderById();
  }, []);

  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "items[0].name",
    },
    {
      Header: "Size",
      accessor: "items[0].item_specifications[0].size",
    },
    {
      Header: "SKU",
      accessor: "items[0].sku",
    },
    {
      Header: "EAN",
      accessor: "items[0].ean",
    },
    {
      Header: "UPC",
      accessor: "items[0].upc",
    },
    {
      Header: "Stock",
      accessor: "items[0].stock_level_total_current",
    },
    {
      Header: "Cost",
      accessor: "items[0].item_specifications[0].purchase_price_net_eur",
    },
    {
      Header: "Price",
      accessor: "items[0].item_specifications[0].sale_price_net_eur",
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
        <h1 className="text-title mb-4">Order # {orderData.order_number}</h1>
        <OrderPrimaryDetails order={orderData} />
        <div className="flex items-center justify-between bg-backgroundGrey px-4 mb-2">
          <h2 className="text-section">Items</h2>
        </div>
        <ListTable data={[orderData]} columns={columns}></ListTable>
      </div>
    </div>
  );
}
export default OrderDetails;
