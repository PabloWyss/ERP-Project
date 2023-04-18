import React from "react";

const ItemVariantInput = ({description, value}) => {
    return (
        <div className="flex gap-1 items-center justify-between">
            <label className="w-3/5" htmlFor="item_variant_input">{description} </label>
            <input className="w-2/5" id="item_variant_input" name="item_variant_input"
                   value={value} disabled/>
        </div>
    )
}

export default ItemVariantInput