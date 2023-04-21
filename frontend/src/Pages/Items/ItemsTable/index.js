import React, {useEffect, useState} from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";

const ItemsTable = ({tableData}) => {

  const navigate = useNavigate()
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

  const handleCreateButton = (e) => {
    e.preventDefault()
    navigate(`/items/new/`)
  }

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
        <div>
          <h1 className="text-title mb-2">Items</h1>
          <button>Go to Models</button>
        </div>
        <ListTable data={tableData} columns={columns}></ListTable>
        <div>
          <img className="cursor-pointer" src={addButton} alt={"create new item"} onClick={handleCreateButton}/>
        </div>
      </div>
    </div>
  );
}

export default ItemsTable