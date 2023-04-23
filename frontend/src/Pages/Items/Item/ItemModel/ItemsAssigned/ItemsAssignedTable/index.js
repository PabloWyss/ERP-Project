import ListTable from "../../../../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../../../../Components/ListTableIfEmpty/ListTable";
import React from "react";

const ItemsAssignedTable = ({tableData}) => {


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

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (
        <div>
            {
                tableData?.length > 0 ?
                    <ListTable data={tableData} columns={columns}></ListTable> :
                    <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
            }
        </div>
    );
}

export default ItemsAssignedTable