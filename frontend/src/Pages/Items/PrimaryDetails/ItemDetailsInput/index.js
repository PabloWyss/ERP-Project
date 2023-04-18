import React from "react";

const ItemDetailsInput = ({value, disableInput, handleInput, description}) => {

    return (
        <div className="flex gap-1 items-center justify-between">
            <label className="w-3/5" htmlFor="item_input"> {description} </label>
            <input className="w-2/5" id="item_input" name="item_input" value={value ? value : ""}
                   disabled={disableInput}
                   onChange={handleInput}/>
        </div>
    )

}

export default ItemDetailsInput