import React, { useEffect, useState } from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png";
import { useNavigate } from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";

const WarehouseTable = ({ tableData }) => {
  const navigate = useNavigate();
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
      Header: "Contact Name",
      accessor: "contact_name",
    },
    {
      Header: "Contact Email",
      accessor: "contact_email",
    },
    {
      Header: "Contact Phone",
      accessor: "contact_phone",
    },
  ];

  const handleCreateButton = (e) => {
    e.preventDefault();
    navigate(`/warehouses/new/`);
  };

  const data_if_empty = [
    {
      name: "",
    },
  ];

  return (
    <div
      className="flex h-full w-full py-6 px-6 justify-center bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8 flex flex-col bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <div className="flex gap-10">
          <h1 className="text-title mb-2">Warehouses</h1>
        </div>
        {tableData?.length > 0 ? (
          <ListTable data={tableData} columns={columns}></ListTable>
        ) : (
          <ListTableIfEmpty
            data={data_if_empty}
            columns={columns}
          ></ListTableIfEmpty>
        )}
        <div>
          <img
            className="cursor-pointer"
            src={addButton}
            alt={"create new warehouse"}
            onClick={handleCreateButton}
          />
        </div>
      </div>
    </div>
  );
};

export default WarehouseTable;

