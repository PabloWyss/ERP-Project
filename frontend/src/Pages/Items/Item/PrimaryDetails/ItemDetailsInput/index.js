import React from "react";
import ItemDetailsChoicesInput from "./ItemDetailsChoicesInput";

const ItemDetailsInput = ({value, disableInput, handleInput, description, choicesEnabeled, choices, type,step}) => {
  return (
    <div className="flex items-center justify-between gap-7">
      <label className="w-3/12" htmlFor="item_input">
        {description}
      </label>
      {choicesEnabeled ? (
        <select
          className="flex-auto"
          id="item_input"
          name="item_input"
          disabled={disableInput}
          onChange={handleInput}
          value={value ? value : ""}
        >
          <ItemDetailsChoicesInput choices={choices ? choices : []} />
        </select>
      ) : (
        type === "checkbox" ? (
          <div className="flex items-center">
            <input
              className="w-7 h-7"
              id="item_input"
              name="item_input"
              value={value ? value : ""}
              disabled={disableInput}
              onChange={handleInput}
              type={type}
              checked={value ? value : ""}
            />

          </div>
        ) : (
          <input
            className="flex-auto"
            id="item_input"
            name="item_input"
            value={value ? value : ""}
            disabled={disableInput}
            onChange={handleInput}
            type={type}
            step={step}
            checked={value ? value : ""}
          />
        )
      )}
    </div>
  );
};

export default ItemDetailsInput;
