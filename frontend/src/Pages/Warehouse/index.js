import React from "react";
import ListTable from "../../Components/ListTable/ListTable";

function Warehouse() {

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
      {
        name: "Eric Ferris",
        address: "906 Hart Country Lane, Toccoa, GA 30577",
        date: "07/10/2020",
        order: "81534454080477",
        partner: "supplier",
        id: "3",
      },
      {
        name: "Gloria Noble",
        address: "2403 Edgewood Avenue, Fresno, CA 93721",
        date: "07/09/2020",
        order: "20452221703743",
        partner: "supplier",
        id: "4",
      },
      {
        name: "Darren Daniels",
        address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        date: "07/07/2020",
        order: "22906126785176",
        partner: "customer",
        id: "5",
      },
      {
        name: "Ted McDonald",
        address: "796 Bryan Avenue, Minneapolis, MN 55406",
        date: "07/07/2020",
        order: "87574505851064",
        partner: "supplier",
        id: "6",
      },
      {
        name: "Abra Kebabra",
        address: "4420 Rua de la Paz, Toledo, NY 10923",
        date: "07/11/2023",
        order: "67349585892118",
        partner: "customer",
        id: "7",
      },
      {
        name: "Diane Keaton",
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
      className="h-screen w-screen py-10 px-10 justify-center
    bg-backgroundGrey"
    >
      <div
        className="min-w-11/12 py-10 px-10
        flex flex-col justify-center
      bg-white rounded-ifRadius"
      >
        <h1 className="text-title mb-2">Warehouses</h1>
        <ListTable data={data} columns={columns}></ListTable>
      </div>
    </div>
  );
}

export default Warehouse;
