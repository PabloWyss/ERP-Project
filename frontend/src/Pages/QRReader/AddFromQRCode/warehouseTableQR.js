import ListTable from "../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import React, {useState} from "react";
import ItemDetailsInput from "../../Items/Item/PrimaryDetails/ItemDetailsInput";
import callAPI from "../../../Axios/callAPI";
import {useSelector} from "react-redux";

const WarehouseTableQR = ({tableData, itemID}) => {
    // def const
    const [qty, setQty] = useState(0)
    const [submitClicked, setSubmitClicked] = useState(false)
    const listWarehousesChecked = useSelector((store) => store.checkeditems.checkeditems)

    // handle input and buttons
    const handleInputQty = (e) => {
        e.preventDefault()
        setQty(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        assignItemsToWarehouse()
    }
    // fetch - assign item to warehouse
    const assignItemsToWarehouse = async () => {
        try {
            const data = {
                item_id: itemID,
                quantity: parseInt(qty, 10)

            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/warehouses/update_items_one/${listWarehousesChecked[0]}/`, data, config)
            setSubmitClicked(!submitClicked)
        } catch (error) {
            console.log(error);
        }
    }

    //create columns model
    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Total Stock",
            accessor: "stock_level_total_current",
        },
        {
            Header: "Total Value",
            accessor: "stock_level_total_purchase_value_current",
        },
    ];

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (

        <div
            className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
        >
            <div className="flex gap-10">
            </div>
            {
                submitClicked ?
                    <div className="flex justify-center gap-10">
                        {`Item successfully added to warehouse`}
                    </div> :
                    <div>
                        <div className="flex gap-10">
                            <ItemDetailsInput value={qty}
                                              disableInput={false}
                                              handleInput={handleInputQty}
                                              description={"Quantity: "}
                                              type={'number'}/>
                            <button className="m-4 text-xl p-0 bg-ifOrange w-40 text-white" onClick={handleSubmit}>
                                Submit
                            </button>

                        </div>
                        <h1 className="text-title mb-2">Warehouses Available</h1>
                        {
                            tableData?.length > 0 ?
                                <ListTable data={tableData} columns={columns}></ListTable> :
                                <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                        }
                    </div>
            }
        </div>
    );
}

export default WarehouseTableQR