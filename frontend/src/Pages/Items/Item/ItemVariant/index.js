import React, {useEffect, useState} from "react";
import callAPI from "../../../../Axios/callAPI";
import {useNavigate, useParams} from "react-router-dom";
import ItemDetailsInput from "../PrimaryDetails/ItemDetailsInput";

const ItemVariant = ({itemVariant, fromCreate, fromUpdate, itemID}) => {
    const [validFrom, setValidFrom] = useState(fromCreate ? "" : formatDate(new Date(itemVariant?.valid_from)))
    const [purchasePrice, setPurchasePrice] = useState(fromCreate ? "" : itemVariant?.purchase_price_net_eur)
    const [salePrice, setSalePrice] = useState(fromCreate ? "" : itemVariant?.sale_price_net_eur)
    const [stockMinimum, setStockMinimum] = useState(fromCreate ? "" : itemVariant?.stock_level_minimum)
    const [stockReorder, setStockReorder] = useState(fromCreate ? "" : itemVariant?.stock_level_reorder)
    const [length, setLength] = useState(fromCreate ? "" : itemVariant?.length_cm)
    const [width, setWidth] = useState(fromCreate ? "" : itemVariant?.width_cm)
    const [height, setHeight] = useState(fromCreate ? "" : itemVariant?.height_cm)
    const [weightGross, setWeightGross] = useState(fromCreate ? "" : itemVariant?.weight_gross_kg)
    const [weightNet, setWeightNet] = useState(fromCreate ? "" : itemVariant?.weight_net_kg)
    const [size, setSize] = useState(fromCreate ? "" : itemVariant?.size)
    const [changes, setChanges] = useState(fromCreate ? "" : itemVariant?.item_changes)
    const [comesFromUpdate, setComesFromUpdate] = useState(fromUpdate)
    const [sizeOptions, setSizeOptions] = useState(fromUpdate)
    const navigate = useNavigate()

    useEffect(()=>{
        getSizeOptions()
        if(fromUpdate){
            setComesFromUpdate(!comesFromUpdate)
        }
    },[fromCreate,fromUpdate])
    const handleInitialDateInput = (e) =>{
        setValidFrom(e.target.value)
    }

    const handlePurchasePriceInput = (e) =>{
        e.preventDefault()
        setPurchasePrice(e.target.value)
    }

    const handleSalePriceInput = (e) =>{
        e.preventDefault()
        setSalePrice(e.target.value)
    }

    const handleStockMinimumInput = (e) =>{
        e.preventDefault()
        setStockMinimum(e.target.value)
    }

    const handleStockReorderInput = (e) =>{
        e.preventDefault()
        setStockReorder(e.target.value)
    }

    const handleLengthInput = (e) =>{
        e.preventDefault()
        setLength(e.target.value)
    }

    const handleWidthInput = (e) =>{
        e.preventDefault()
        setWidth(e.target.value)
    }

    const handleHeightInput = (e) =>{
        e.preventDefault()
        setHeight(e.target.value)
    }

    const handleWeightGrossInput = (e) =>{
        e.preventDefault()
        setWeightGross(e.target.value)
    }

    const handleWeightNetInput = (e) =>{
        e.preventDefault()
        setWeightNet(e.target.value)
    }

    const handleSizeInput = (e) =>{
        e.preventDefault()
        setSize(e.target.value)
    }

   const handleChangesInput = (e) =>{
        e.preventDefault()
        setChanges(e.target.value)
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        if (fromCreate){
            createItemVariant()
            navigate(`/items/${itemID}/`)
        } else {
            updateItemVariant()
            setComesFromUpdate(!comesFromUpdate)
        }

    }

    const createItemVariant = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                weight_net_kg: weightNet,
                weight_gross_kg: weightGross,
                length_cm: length,
                width_cm: width,
                height_cm: height,
                size: size,
                purchase_price_net_eur: purchasePrice,
                sale_price_net_eur: salePrice,
                stock_level_minimum: stockMinimum,
                stock_level_reorder: stockReorder,
                item_changes: changes
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.post(`/item_specifications/new/${itemID}/`, data, config)
        } catch (error) {
            console.log(error)
        }
      }

      const updateItemVariant = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                weight_net_kg: weightNet,
                weight_gross_kg: weightGross,
                length_cm: length,
                width_cm: width,
                height_cm: height,
                size: size,
                purchase_price_net_eur: purchasePrice,
                sale_price_net_eur: salePrice,
                stock_level_minimum: stockMinimum,
                stock_level_reorder: stockReorder,
                item_changes: changes
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/item_specifications/update/${itemVariant.id}/`, data, config)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
      }
       const getSizeOptions = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
              };

              const response = await callAPI.get(`/item_specifications/choices/sizes/`, config)
              setSizeOptions(response.data.sizes)
          } catch (error) {
              console.log(error);
          }
      }

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
}

      function formatDate(date) {
          return [
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
          ].join('-');
        }

    return (
        <form className="flex flex-col gap-4 " onSubmit={handleOnSubmit}>
            <div className="flex w-full gap-10 justify-around">
                <div className="flex flex-col w-1/2 gap-1">
                    {
                        (fromCreate || comesFromUpdate) ?
                            "":
                            [<ItemDetailsInput description={"Item Variant ID:"}
                                      value={itemVariant?.id}
                                      disableInput={true} placeholder={itemVariant?.id}/>,
                                <ItemDetailsInput description={"Valid From:"}
                                      value={validFrom}
                                      disableInput={true}
                                      type={"date"}
                                      handleInput={handleInitialDateInput}/>]
                    }

                    <ItemDetailsInput description={"Purchase Price [eur]:"}
                                      value={purchasePrice}
                                      disableInput={!comesFromUpdate & !fromCreate}
                                      handleInput={handlePurchasePriceInput}/>
                    <ItemDetailsInput description={"Sale Price [eur]:"}
                                      value={salePrice}
                                      handleInput={handleSalePriceInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Stock level minimum [qty]:"}
                                      value={stockMinimum}
                                      handleInput={handleStockMinimumInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Stock level reorder [qty]:"}
                                      value={stockReorder}
                                      handleInput={handleStockReorderInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                </div>
                <div className="flex flex-col w-1/2 gap-1">
                    <ItemDetailsInput description={"Length [cm]:"}
                                      value={length}
                                      handleInput={handleLengthInput}
                                      type={"number"}
                                      step={0.01}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Width [cm]:"}
                                      value={width}
                                      handleInput={handleWidthInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Height [cm]:"}
                                      value={height}
                                      handleInput={handleHeightInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Weight gross [kg]:"}
                                      value={weightGross}
                                      handleInput={handleWeightGrossInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Weight net [kg]:"}
                                      value={weightNet}
                                      handleInput={handleWeightNetInput}
                                      disableInput={!comesFromUpdate & !fromCreate}/>
                    <ItemDetailsInput description={"Size:"}
                                      value={size}
                                      handleInput={handleSizeInput}
                                      disableInput={!comesFromUpdate & !fromCreate}
                                      choicesEnabeled={true}
                                      choices={sizeOptions}/>
                </div>
            </div>
            <div className="flex items-center">
                <label className="w-1/5" htmlFor="item_variant_changes">Changes </label>
                <input className="w-full h-16 flex justify-start items-start"
                       id="item_variant_changes" name="item_variant_changes"
                       value={changes} onChange={handleChangesInput} disabled={!comesFromUpdate & !fromCreate}/>
            </div>
            <div className="flex w-full justify-center">
                {
                 (fromCreate || comesFromUpdate) ?
                     <button className="text-xl p-0 bg-ifOrange w-20 text-white" type={"submit"}>
                        Submit
                     </button>:
                     ""
                }
            </div>
        </form>
    )
}

export default ItemVariant