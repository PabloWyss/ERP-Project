import ListTable from "../../Components/ListTable/ListTable";
import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ItemsTable from "./ItemsTable";

const Items = () => {
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
        {
            itemList.length > 0 ?
                <ItemsTable tableData={itemList}/>:
                ""
        }
    </div>
  );
}

export default Items