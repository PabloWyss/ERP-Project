import callAPI from "../../../Axios/callAPI";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ShowItemInfo from "./showItemInfo";

const AddFromQRCode = ({fileResult}) => {

    const[item, setItem] = useState({})
    const navigate = useNavigate()

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

    console.log(item)

    return(
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
