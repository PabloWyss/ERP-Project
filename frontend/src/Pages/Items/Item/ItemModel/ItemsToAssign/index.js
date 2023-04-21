import React, {useEffect, useState} from "react";
import callAPI from "../../../../../Axios/callAPI";
import ItemsTable from "../../../ItemsTable";
import ItemsToAssignTable from "./ItemsToAssignTable";

const ItemsToAssign = () => {
  const [itemList, setItemList] = useState([])

  const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/`, config)
            setItemList(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtainItemsInfo()
    }, [])

  return (
    <div className="flex w-full">
        <ItemsToAssignTable tableData={itemList}/>:
    </div>
  );
}

export default ItemsToAssign