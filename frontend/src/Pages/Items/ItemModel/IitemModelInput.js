import React from "react";

const ItemModelInput = ({description, value, disabled, type}) => {

    return(
        <div className="flex gap-1 items-center justify-between">
            <label className="w-3/5" htmlFor="product_model">{description} </label>
            <input className="w-2/5" id="product_model" name="product_model"
                   value={value ? value : ""}
                   type={type}
                   disabled = {disabled}
            />
        </div>
    )
}

export default ItemModelInput