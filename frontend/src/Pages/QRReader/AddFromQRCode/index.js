import callAPI from "../../../Axios/callAPI";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
            console.log(item.id)
            navigate(`/items/${response.data.id}`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainItemInfo()

    }, [fileResult])



    return(
        <div>
            <div>
            </div>
        </div>
    )
}
export default AddFromQRCode
