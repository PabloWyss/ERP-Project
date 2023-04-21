import React, {useEffect, useState} from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";

const ModelTable = ({tableData}) => {
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
      Header: "Condition",
      accessor: "condition",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Image",
      accessor: "images[0].image",
    },
  ];

  const handleCreateButton = (e) => {
    e.preventDefault()
    navigate(`/items/new/`)
  }

   const data_if_empty = [{
      name: ""
    }]

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
        <h1 className="text-title mb-2">Models</h1>
        {
          tableData?.length > 0 ?
              <ListTable data={tableData} columns={columns}></ListTable>:
              <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
        }
        <div>
          <img className="cursor-pointer" src={addButton} alt={"create new item"} onClick={handleCreateButton}/>
        </div>
      </div>

    </div>
  );
}

export default ModelTable