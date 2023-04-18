import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import callAPI from "../../../Axios/callAPI";
import ItemVariantInput from "./itemVariantInput";

const ItemVariant = () => {

    const [showDetails, setShowDetails] = useState(false)
    const [itemVariant, setItemVariant] = useState({})

    const item_id = 1

    const obtainItemsCurrentVariantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/variants/current/${item_id}/`, config);
            setItemVariant(response.data[0])
        } catch (error) {
            console.log(error);
        }

    }

    const handleShowDetails = (e) =>{
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    useEffect(() => {
        obtainItemsCurrentVariantInfo()
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xl bg-backgroundGrey px-4">
                <div>
                    Item variants Specifications (Current)
                </div>
                <button className="item-minified-button" onClick={handleShowDetails}>
                {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {showDetails && (
                <div className="flex flex-col gap-4 ">
                    <div className="flex w-full gap-10 justify-around">
                        <div className="flex flex-col w-1/2 gap-1">
                            <ItemVariantInput description={"Item Variant ID:"}
                                              value={itemVariant.id}/>
                            <ItemVariantInput description={"Valid From:"}
                                              value={itemVariant.valid_from}/>
                            <ItemVariantInput description={"Valid To:"}
                                              value={itemVariant.valid_to}/>
                            <ItemVariantInput description={"Purchase Price [eur]:"}
                                              value={itemVariant.purchase_price_net_eur}/>
                            <ItemVariantInput description={"Sale Price [eur]:"}
                                              value={itemVariant.sale_price_net_eur}/>
                            <ItemVariantInput description={"Stock level minimum [qty]:"}
                                              value={itemVariant.stock_level_minimum}/>
                            <ItemVariantInput description={"Stock level reorder [qty]:"}
                                              value={itemVariant.stock_level_reorder}/>
                        </div>
                        <div className="flex flex-col w-1/2 gap-1">
                            <ItemVariantInput description={"Length [cm]:"}
                                              value={itemVariant.length_cm}/>
                            <ItemVariantInput description={"Width [cm]:"}
                                              value={itemVariant.width_cm}/>
                            <ItemVariantInput description={"Height [cm]:"}
                                              value={itemVariant.height_cm}/>
                            <ItemVariantInput description={"Weight gross [kg]:"}
                                              value={itemVariant.weight_gross_kg}/>
                            <ItemVariantInput description={"Weight net [kg]:"}
                                              value={itemVariant.weight_net_kg}/>
                            <ItemVariantInput description={"Size:"}
                                              value={itemVariant.size}/>
                        </div>
                    </div>
                    <div>
                        <input className="w-full h-16 flex justify-start items-start"
                               value={itemVariant.item_changes} disabled/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemVariant