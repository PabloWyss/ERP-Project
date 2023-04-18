import React, {useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ItemVariant = () => {

    const [showDetails, setShowDetails] = useState(false)

    const handleShowDetails = (e) =>{
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between text-xl">
                <div>
                    Item variants Specifications (Current)
                </div>
                <button className="product-minified-button" onClick={handleShowDetails}>
                {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {showDetails && (
                <div className="flex flex-col gap-4">
                    <div className="flex w-full justify-around">
                    <div className="flex flex-col w-1/3 gap-1">
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_valid_from">Valid From: </label>
                            <input id="product_valid_from" name="product_valid_from" placeholder={'Valid From'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_valid_to">Valid To: </label>
                            <input id="product_valid_to" name="product_valid_to" placeholder={'Valid To'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_purchase_price">Purchase Price [eur]: </label>
                            <input id="product_purchase_price" name="product_purchase_price"
                                   placeholder={'Purchase Price [eur]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_sale_price">Sale Price [eur]: </label>
                            <input id="product_sale_price" name="product_sale_price" placeholder={'Sale Price [eur]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_minimum_stock_level">Stock level minimum [qty]: </label>
                            <input id="product_minimum_stock_level" name="product_minimum_stock_level"
                                   placeholder={'Stock level minimum [qty]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_reorder_stock_level">Stock level reorder [qty]: </label>
                            <input id="product_reorder_stock_level" name="product_reorder_stock_level"
                                   placeholder={'Stock level reorder [qty]'}/>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 gap-1">
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_length">Length [cm]: </label>
                            <input id="product_length" name="product_length" placeholder={'Length [cm]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_width">Width [cm]: </label>
                            <input id="product_width" name="product_width" placeholder={'Width [cm]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_height">Height [cm]: </label>
                            <input id="product_height" name="product_height" placeholder={'Height [cm]'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_size">Size: </label>
                            <input id="product_size" name="product_size" placeholder={'Size'}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="product_weight">Weight gross [kg]: </label>
                            <input id="product_weight" name="product_weight" placeholder={'Weight gross [kg]'}/>
                        </div>
                    </div>
                    </div>
                    <div>
                        <input className="w-full h-16 flex justify-start items-start" placeholder={'Item Changes'}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemVariant