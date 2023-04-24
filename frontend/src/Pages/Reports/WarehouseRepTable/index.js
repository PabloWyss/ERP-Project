import ListTable from "../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import moment from "moment/moment";
import React from "react";

const WarehouseRepTable = ({tableData}) => {

    //create columns model
    const columns = [
        {
            Header: "Event Date",
            accessor: "event_date",
            Cell : (props)=>{
            const custom_date = moment(props.value).format("MMMM Do YYYY")
            return <span>{custom_date}</span>
        }
        },
        {
            Header: "Type",
            accessor: "event_type",
        },
        {
            Header: "Warehouse",
            accessor: "warehouse.name",
        },
        {
            Header: "Item",
            accessor: "item.name",
        },
        {
            Header: "Quantity Altered",
            accessor: "quantity_altered",
        },
        {
            Header: "Initial Sock Level",
            accessor: "stock_level_initial",
        },
        {
            Header: "Final Sock Level",
            accessor: "stock_level_final",
        },
    ];



    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (
        <div
            className="flex h-full w-full py-6 px-8 justify-between
    bg-backgroundGrey"
        >
            <div
                className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
            >
                <div className="flex gap-10">
                    <h1 className="text-title mb-2">Inventory Ledgers</h1>
                </div>
                {
                    tableData?.length > 0 ?
                        <ListTable data={tableData} columns={columns}></ListTable> :
                        <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                }
            </div>

        </div>
    );
}

export default WarehouseRepTable