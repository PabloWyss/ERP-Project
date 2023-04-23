import callAPI from "../../../Axios/callAPI";
import {useEffect, useState} from "react";
import ShowItemInfo from "./showItemInfo";

const AddFromQRCode = ({fileResult}) => {
    //define const
    const [item, setItem] = useState({})

    //fetch data of Item
    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${fileResult.id}/`, config)
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainItemInfo()

    }, [fileResult])

    return (
        <div>
            <div>
                {
                    item ?
                        <ShowItemInfo item={item}/> :
                        "item not found"
                }
            </div>
        </div>
    )
}
export default AddFromQRCode
