import React from "react";
import ListTable from "../../Components/ListTable/ListTable";

function Orders() {
  //TODO fetch orders

  //fake data for table testing
  const data = [
    {
      partner: "Darren Daniels",
      is_merchant_supplier: false,
      is_refund: true,
      address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
      order_date: "07/07/2020",
      order_number: "22906126785176",
      quantity: 12,
      id: "5",
    },
    {
      partner: "Ted McDonald",
      is_merchant_supplier: true,
      is_refund: false,
      address: "796 Bryan Avenue, Minneapolis, MN 55406",
      order_date: "07/07/2020",
      order_number: "87574505851064",
      quantity: 8,
      id: "6",
    },
    {
      partner: "Abra Kebabra",
      is_merchant_supplier: false,
      is_refund: false,
      address: "4420 Rua de la Paz, Toledo, NY 10923",
      order_date: "07/11/2023",
      order_number: "67349585892118",
      quantity: 51,
      id: "7",
    },
    {
      partner: "Diane Keaton",
      is_merchant_supplier: true,
      is_refund: true,
      address: "4420 4th Avenue, Anaheim, WY 10923",
      order_date: "05/11/2023",
      order_number: "37349585892118",
      quantity: 3,
      id: "9",
    },
  ];

  //create columns model

  //convert is_merchant_supplier to order type
  const BoolToOrderType = ({ value }) => {
    return value ? "Supply" : "Purchase";
  };

  //convert is_refund to yes or empty string
  const BoolToIsRefund = ({ value }) => {
    return value ? "Yes" : "";
  };

  const columns = [
    {
      Header: "Type",
      accessor: "is_merchant_supplier",
      Cell: BoolToOrderType,
    },
    {
      Header: "Refund",
      accessor: "is_refund",
      Cell: BoolToIsRefund,
    },
    {
      Header: "Order #",
      accessor: "order_number",
    },
    {
      Header: "Date",
      accessor: "order_date",
    },
    // {
    //   Header: "Shipping",
    //   accessor: "order_date", //TODO how is the field called?
    // },
    {
      Header: "Partner",
      accessor: "partner",
    },
    {
      Header: "Item Qty.",
      accessor: "quantity",
    },
    // {
    //   Header: "Total",
    //   accessor: "quantity", //TODO how is the field called?
    // },
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
        <h1 className="text-title mb-2">Orders</h1>
        <ListTable data={data} columns={columns}></ListTable>
      </div>
    </div>
  );
}
export default Orders;
