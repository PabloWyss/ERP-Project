import React from "react";

function NewOrder() {
  //fake data for table testing
  const data = [
    {
      name: "Kim Parrish",
      address: "4420 Valley Street, Garnerville, NY 10923",
      date: "07/11/2020",
      order: "87349585892118",
      partner: "supplier",
      id: "8",
    },
    {
      name: "Michele Castillo",
      address: "637 Kyle Street, Fullerton, NE 68638",
      date: "07/11/2020",
      order: "58418278790810",
      partner: "customer",
      id: "2",
    },
  ];

  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Order No.",
      accessor: "order",
    },
    {
      Header: "Partner Type",
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
        <h1 className="text-title mb-2">New Order</h1>
      </div>
    </div>
  );
}

export default NewOrder;
