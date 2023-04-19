import ItemVariant from "../Items/Item/ItemVariant";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import callAPI from "../../Axios/callAPI";

const CreateItemVariant = () => {
    const [item, setItem] = useState("")
    const { itemID } = useParams();

    useEffect(() => {
        obtainItemInfo()
    }, [])

    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${itemID}/`, config);
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="flex flex-col h-screen w-full justify-center w-full ">
            <div className="flex h-screen w-full pt-10 justify-center">
                <div className="flex w-11/12 justify-center bg-backgroundGrey px-4">
                    <div className="text-xl">
                        {`Create Item variants Specifications of item ${item.name} with id ${item.id}`}
                    </div>
                    <div className="items-center flex gap-4 justify-items-center">
                    </div>
                </div>
            </div>
            <div className="flex h-screen w-full justify-center">
                <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
                    <ItemVariant fromCreate={true} itemID={itemID}/>
                </div>
            </div>
        </div>

    )
}
export default CreateItemVariant