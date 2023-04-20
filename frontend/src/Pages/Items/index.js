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

    const data_if_empty = [{
      sku: ""
    }]


  return (
    <div className="flex w-full">
        {
            itemList.length > 0 ?
                <ItemsTable tableData={itemList}/>:
                <ItemsTable tableData={data_if_empty}/>
        }
    </div>
  );
}

export default Items