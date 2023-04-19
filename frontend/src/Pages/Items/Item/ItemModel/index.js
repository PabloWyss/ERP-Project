import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemModelInput from "./IitemModelInput";
import callAPI from "../../../../Axios/callAPI";
import ItemModelImages from "./ItemModelImages";
import {useParams} from "react-router-dom";
import ItemVariantInput from "../ItemVariant/itemVariantInput";

const ItemModel = ({fromCreate}) => {

    const [itemModel, setItemModel] = useState({})
    const [name, setName] = useState("")
    const [color, setColor] = useState("")
    const [condition, setCondition] = useState("")
    const [category, setCategory] = useState("")
    const [brandName, setBrandName] = useState("")
    const [brandCollection, setBrandCollection] = useState("")

    const handleNameInput = (e) =>{
        setName(e.target.value)
    }

    const handleColorInput = (e) =>{
        setColor(e.target.value)
    }

    const handleConditionInput = (e) =>{
        setCondition(e.target.value)
    }

    const handleCategoryInput = (e) =>{
        setCategory(e.target.value)
    }

    const handleBrandNameInput = (e) =>{
        setBrandName(e.target.value)
    }

    const handleBrandCollectionInput = (e) =>{
        setBrandCollection(e.target.value)
    }


    const { itemID } = useParams();

    const obtainItemsModelVariantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/models/current/${itemID}/`, config);
            setItemModel(response.data[0])
            setName(response.data[0].name)
            setColor(response.data[0].color)
            setCondition(response.data[0].condition)
            setCategory(response.data[0].category)
            setBrandName(response.data[0].brand_name)
            setBrandCollection(response.data[0].brand_collection)
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        obtainItemsModelVariantInfo()
        if(!fromCreate){
        }
    }, [])

    return (
          <div className="flex flex-col gap-4">
              <div className="flex w-full justify-around gap-10 justify-around">
                  <div className="flex flex-col gap-1 w-1/2">
                      <ItemModelInput description={"Name:"}
                                      disabled={!fromCreate}
                                      value={name}
                                      type={"text"}
                                      handleInput={handleNameInput}/>
                      <ItemModelInput description={"Color:"}
                                      disabled={!fromCreate}
                                      value={color}
                                      type={"text"}
                                      handleInput={handleColorInput}/>
                      {/*<ItemModelInput description={"Valid from:"}*/}
                      {/*                value={initialDate.slice(0,15)}/>*/}
                      {/*<ItemModelInput description={"Valid to:"}*/}
                      {/*                value={finalDate.slice(0,15)}/>*/}
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                      <ItemModelInput description={"Condition:"}
                                      disabled={!fromCreate}
                                      value={condition}
                                      type={"text"}
                                      handleInput={handleConditionInput}/>
                      <ItemModelInput description={"Category:"}
                                      disabled={!fromCreate}
                                      value={category}
                                      type={"text"}
                                      handleInput={handleCategoryInput}/>
                      <ItemModelInput description={"Brand name:"}
                                      disabled={!fromCreate}
                                      value={brandName}
                                      type={"text"}
                                      handleInput={handleBrandNameInput}/>
                      <ItemModelInput description={"Brand collection:"}
                                      disabled={!fromCreate}
                                      value={brandCollection}
                                      type={"text"}
                                      handleInput={handleBrandCollectionInput}/>
                  </div>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="description_short"> Short Description: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="description_short" name="description_short"
                         value={itemModel?.description_short} disabled/>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="description_long"> Long Description: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="description_long" name="description_long"
                         value={itemModel?.description_long} disabled/>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="care_instructions"> Care Instructions: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="care_instructions" name="care_instructions"
                         value={itemModel?.care_instructions} disabled/>
              </div>
              <div className="flex flex-wrap gap-4">
                  {
                      itemModel?.images?.map((image)=>{
                          return <ItemModelImages image={image.image} disabled/>
                      })
                  }
              </div>
          </div>
    )
}

export default ItemModel