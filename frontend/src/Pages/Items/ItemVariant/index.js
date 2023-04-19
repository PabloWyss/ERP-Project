import React, {useEffect, useState} from "react";
import callAPI from "../../../Axios/callAPI";
import ItemVariantInput from "./itemVariantInput";
import {useNavigate, useParams} from "react-router-dom";

const ItemVariant = ({itemVariant, fromCreate, fromUpdate, itemID}) => {
    const [disableInput, setDisableInput] = useState(true)
    const [validFrom, setValidFrom] = useState(fromCreate ? "" : formatDate(new Date(itemVariant?.valid_from)))
    const [validTo, setValidTo] = useState(fromCreate ? "" : formatDate(new Date(itemVariant?.valid_to)))
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
    const navigate = useNavigate()

    console.log(comesFromUpdate)

    useEffect(()=>{

        if(fromUpdate){
            setComesFromUpdate(!comesFromUpdate)
        }
    },[fromCreate,fromUpdate])
    const handleInitialDateInput = (e) =>{
        setValidFrom(e.target.value)
    }
    const handleFinalDateInput = (e) =>{
        setValidTo(e.target.value)
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
                valid_from: validFrom,
                valid_to: validTo,
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
            const response = await callAPI.post(`/items/variants/new/${itemID}/`, data, config)
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
                valid_from: validFrom,
                valid_to: validTo,
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
            const response = await callAPI.patch(`/items/variants/update/${itemID}/`, data, config)
        } catch (error) {
            console.log(error)
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
                            <ItemVariantInput description={"Item Variant ID:"}
                                      value={itemVariant?.id}
                                      disabled={disableInput} placeholder={itemVariant?.id}/>
                    }
                    <ItemVariantInput description={"Valid From:"}
                                      value={validFrom ? validFrom : ""}
                                      disabled={!comesFromUpdate & !fromCreate}
                                      type={"date"}
                                      handleInput={handleInitialDateInput}/>
                    <ItemVariantInput description={"Valid To:"}
                                      value={validTo ? validTo : ""} type={"date"}
                                      disabled={!comesFromUpdate & !fromCreate}
                                      handleInput={handleFinalDateInput}/>
                    <ItemVariantInput description={"Purchase Price [eur]:"}
                                      value={purchasePrice ? purchasePrice : ""}
                                      disabled={!comesFromUpdate & !fromCreate}
                                      handleInput={handlePurchasePriceInput}/>
                    <ItemVariantInput description={"Sale Price [eur]:"}
                                      value={salePrice ? salePrice : ""}
                                      handleInput={handleSalePriceInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Stock level minimum [qty]:"}
                                      value={stockMinimum ? stockMinimum : ""}
                                      handleInput={handleStockMinimumInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Stock level reorder [qty]:"}
                                      value={stockReorder ? stockReorder : ""}
                                      handleInput={handleStockReorderInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                </div>
                <div className="flex flex-col w-1/2 gap-1">
                    <ItemVariantInput description={"Length [cm]:"}
                                      value={length ? length: ""}
                                      handleInput={handleLengthInput}
                                      type={"number"}
                                      step={0.01}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Width [cm]:"}
                                      value={width ? width : ""}
                                      handleInput={handleWidthInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Height [cm]:"}
                                      value={height ? height : ""}
                                      handleInput={handleHeightInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Weight gross [kg]:"}
                                      value={weightGross ? weightGross : ""}
                                      handleInput={handleWeightGrossInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Weight net [kg]:"}
                                      value={weightNet ? weightNet : ""}
                                      handleInput={handleWeightNetInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                    <ItemVariantInput description={"Size:"}
                                      value={size ? size : ""}
                                      handleInput={handleSizeInput}
                                      disabled={!comesFromUpdate & !fromCreate}/>
                </div>
            </div>
            <div className="flex items-center">
                <label className="w-1/5" htmlFor="item_variant_changes">Changes </label>
                <input className="w-full h-16 flex justify-start items-start"
                       id="item_variant_changes" name="item_variant_changes"
                       value={changes} onChange={handleChangesInput} disabled={!comesFromUpdate & !fromCreate}/>
            </div>
            {
                 (fromCreate || comesFromUpdate) ?
                     <button type={"submit"}>
                        Submit
                     </button>:
                     ""
            }

        </form>
    )
}

export default ItemVariant