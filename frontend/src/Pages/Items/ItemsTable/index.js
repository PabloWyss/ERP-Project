import React, {useEffect, useState} from "react";
import callAPI from "../../../Axios/callAPI";
import ListTable from "../../../Components/ListTable/ListTable";

const ItemsTable = ({tableData}) => {

  console.log(tableData)

  const data = [
    {
      sku: "Kim Parrish",
      address: "4420 Valley Street, Garnerville, NY 10923",
      date: "07/11/2020",
      order: "87349585892118",
      partner: "supplier",
      id: "8",
    },
    {
      sku: "Michele Castillo",
      address: "637 Kyle Street, Fullerton, NE 68638",
      date: "07/11/2020",
      order: "58418278790810",
      partner: "customer",
      id: "2",
    },
    {
      sku: "Eric Ferris",
      address: "906 Hart Country Lane, Toccoa, GA 30577",
      date: "07/10/2020",
      order: "81534454080477",
      partner: "supplier",
      id: "3",
    },
    {
      sku: "Gloria Noble",
      address: "2403 Edgewood Avenue, Fresno, CA 93721",
      date: "07/09/2020",
      order: "20452221703743",
      partner: "supplier",
      id: "4",
    },
    {
      sku: "Darren Daniels",
      address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
      date: "07/07/2020",
      order: "22906126785176",
      partner: "customer",
      id: "5",
    },
    {
      sku: "Ted McDonald",
      address: "796 Bryan Avenue, Minneapolis, MN 55406",
      date: "07/07/2020",
      order: "87574505851064",
      partner: "supplier",
      id: "6",
    },
    {
      sku: "Abra Kebabra",
      address: "4420 Rua de la Paz, Toledo, NY 10923",
      date: "07/11/2023",
      order: "67349585892118",
      partner: "customer",
      id: "7",
    },
    {
      sku: "Diane Keaton",
      address: "4420 4th Avenue, Anaheim, WY 10923",
      date: "05/11/2023",
      order: "37349585892118",
      partner: "customer",
      id: "9",
    },
  ];


  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "EAN",
      accessor: "ean",
    },
    {
      Header: "UPC",
      accessor: "upc",
    },
    {
      Header: "Series",
      accessor: "series",
    },
  ];

  return (
    <div
      className="flex h-full w-full py-6 px-6 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <h1 className="text-title mb-2">Items</h1>
        <ListTable data={tableData} columns={columns}></ListTable>
      </div>
    </div>
  );
}

export default ItemsTable