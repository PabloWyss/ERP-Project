import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import callAPI from "../../../Axios/callAPI";
import ItemVariantInput from "./itemVariantInput";
import {useNavigate, useParams} from "react-router-dom";

const ItemVariant = ({itemVariant, fromCreate, itemID}) => {
    const [disableInput, setDisableInput] = useState(true)
    const [validFrom, setValidFrom] = useState(fromCreate ? "" : formatDate(new Date(itemVariant.valid_from)))
    const [validTo, setValidTo] = useState(fromCreate ? "" : formatDate(new Date(itemVariant.valid_to)))
    const [purchasePrice, setPurchasePrice] = useState(fromCreate ? "" : itemVariant.purchase_price_net_eur)
    const [salePrice, setSalePrice] = useState(fromCreate ? "" : itemVariant.sale_price_net_eur)
    const [stockMinimum, setStockMinimum] = useState(fromCreate ? "" : itemVariant.stock_level_minimum)
    const [stockReorder, setStockReorder] = useState(fromCreate ? "" : itemVariant.stock_level_reorder)
    const [length, setLength] = useState(fromCreate ? "" : itemVariant.length_cm)
    const [width, setWidth] = useState(fromCreate ? "" : itemVariant.width_cm)
    const [height, setHeight] = useState(fromCreate ? "" : itemVariant.height_cm)
    const [weightGross, setWeightGross] = useState(fromCreate ? "" : itemVariant.weight_gross_kg)
    const [weightNet, setWeightNet] = useState(fromCreate ? "" : itemVariant.weight_net_kg)
    const [size, setSize] = useState(fromCreate ? "" : itemVariant.size)
    const [changes, setChanges] = useState(fromCreate ? "" : itemVariant.item_changes)
    const navigate = useNavigate()

    useEffect(()=>{
        if(fromCreate){
            setDisableInput(false)
        }
    },[])

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
        updateItemVariant()
        navigate("/items/${itemID}")
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
            const response = await callAPI.post(`/items/variants/new/${itemID}/`, data, config)
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


    console.log(validFrom);
    return (
        <form className="flex flex-col gap-4 " onSubmit={handleOnSubmit}>
            <div className="flex w-full gap-10 justify-around">
                <div className="flex flex-col w-1/2 gap-1">
                    {
                        fromCreate?
                            "":
                            <ItemVariantInput description={"Item Variant ID:"}
                                      value={itemVariant?.id}
                                      disabled={disableInput}/>
                    }
                    <ItemVariantInput description={"Valid From:"}
                                      value={validFrom}
                                      disabled={disableInput} type={"date"} handleInput={handleInitialDateInput}/>
                    <ItemVariantInput description={"Valid To:"}
                                      value={validTo} type={"date"}
                                      disabled={disableInput} handleInput={handleFinalDateInput}/>
                    <ItemVariantInput description={"Purchase Price [eur]:"}
                                      value={purchasePrice}
                                      disabled={disableInput} handleInput={handlePurchasePriceInput}/>
                    <ItemVariantInput description={"Sale Price [eur]:"}
                                      value={salePrice}
                                      handleInput={handleSalePriceInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Stock level minimum [qty]:"}
                                      value={stockMinimum}
                                      handleInput={handleStockMinimumInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Stock level reorder [qty]:"}
                                      value={stockReorder}
                                      handleInput={handleStockReorderInput}
                                      disabled={disableInput}/>
                </div>
                <div className="flex flex-col w-1/2 gap-1">
                    <ItemVariantInput description={"Length [cm]:"}
                                      value={length}
                                      handleInput={handleLengthInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Width [cm]:"}
                                      value={width}
                                      handleInput={handleWidthInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Height [cm]:"}
                                      value={height}
                                      handleInput={handleHeightInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Weight gross [kg]:"}
                                      value={weightGross}
                                      handleInput={handleWeightGrossInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Weight net [kg]:"}
                                      value={weightNet}
                                      handleInput={handleWeightNetInput}
                                      disabled={disableInput}/>
                    <ItemVariantInput description={"Size:"}
                                      value={size}
                                      handleInput={handleSizeInput}
                                      disabled={disableInput}/>
                </div>
            </div>
            <div>
                <input className="w-full h-16 flex justify-start items-start"
                       value={changes} onChange={handleChangesInput} disabled={false}/>
            </div>
            <button type={"submit"}>
                Submit
            </button>
        </form>
    )
}

export default ItemVariant