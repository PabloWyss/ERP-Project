import {useNavigate} from "react-router-dom";
import ListTable from "../../../../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../../../../Components/ListTableIfEmpty/ListTable";
import addButton from "../../../../../../Assets/Icons/plus_orange.png";
import React from "react";

const ItemsToAssignTable = ({tableData}) => {

  const navigate = useNavigate()
  //create columns model
  const columns = [
      {
      Header: "Model",
      accessor: "item_model.name",
    },
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
  ];

  const handleCreateButton = (e) => {
    e.preventDefault()
    navigate(`/items/new/`)
  }

  const handleGoToModels = (e) => {
    e.preventDefault()
    navigate(`/models`)
  }

  const data_if_empty = [{
      name: ""
    }]

  console.log(tableData)

  return (
        <div>
        {
          tableData?.length > 0 ?
              <ListTable data={tableData} columns={columns}></ListTable>:
              <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
        }
        </div>
  );
}

export default ItemsToAssignTable