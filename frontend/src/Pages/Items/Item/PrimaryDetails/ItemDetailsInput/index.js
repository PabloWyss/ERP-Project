import React from "react";
import ItemDetailsChoicesInput from "./ItemDetailsChoicesInput";

const ItemDetailsInput = ({value, disableInput, handleInput, description, choicesEnabeled, choices}) => {

    return (
        <div className="flex gap-1 items-center justify-between">
            <label className="w-3/5" htmlFor="item_input"> {description} </label>
            {
                choicesEnabeled ?
                    <select className="w-2/5" id="item_input" name="item_input" disabled={disableInput} onChange={handleInput} value={value ? value : ""}>
                        <ItemDetailsChoicesInput choices={choices ? choices : []}/>
                    </select>
                        :
                    <input className="w-2/5" id="item_input" name="item_input"
                   value={value ? value : ""}
                   disabled={disableInput}
                   onChange={handleInput}/>
            }
        </div>
    )
}

export default ItemDetailsInput