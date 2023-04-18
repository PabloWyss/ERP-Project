import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemModelInput from "./IitemModelInput";
import callAPI from "../../../Axios/callAPI";
import ItemModelImages from "./ItemModelImages";

const ItemModel = () => {

    const [showDetails, setShowDetails] = useState(false)
    const [itemModel, setItemModel] = useState({})
    const [initialDate, setInitialDate] = useState("")
    const [finalDate, setFinalDate] = useState("")

    const item_id = 1

    const obtainItemsModelVariantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/models/current/${item_id}/`, config);
            setItemModel(response.data[0])
            setInitialDate(Date(itemModel.valid_from))
            setFinalDate(Date(itemModel.valid_to))
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        obtainItemsModelVariantInfo()
    }, [])

    return (
          <div className="flex flex-col gap-4">
              <div className="flex w-full justify-around gap-10 justify-around">
                  <div className="flex flex-col gap-1 w-1/2">
                      <ItemModelInput description={"Name:"} value={itemModel.name}/>
                      <ItemModelInput description={"Color:"} value={itemModel.color}/>
                      <ItemModelInput description={"Valid from:"}
                                      value={initialDate.slice(0,15)}/>
                      <ItemModelInput description={"Valid to:"}
                                      value={finalDate.slice(0,15)}/>
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                      <ItemModelInput description={"Condition:"} value={itemModel.condition}/>
                      <ItemModelInput description={"Category:"} value={itemModel.category}/>
                      <ItemModelInput description={"Brand name:"} value={itemModel.brand_name}/>
                      <ItemModelInput description={"Brand collection:"} value={itemModel.brand_collection}/>
                  </div>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="description_short"> Short Description: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="description_short" name="description_short"
                         value={itemModel.description_short} disabled/>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="description_long"> Long Description: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="description_long" name="description_long"
                         value={itemModel.description_long} disabled/>
              </div>
              <div >
                  <label className="w-3/5" htmlFor="care_instructions"> Care Instructions: </label>
                  <input className="w-full h-16 flex justify-start items-start"
                         id="care_instructions" name="care_instructions"
                         value={itemModel.care_instructions} disabled/>
              </div>
              <div className="flex flex-wrap gap-4">
                  {
                      itemModel.images?.map((image)=>{
                          return <ItemModelImages image={image.image} disabled/>
                      })
                  }
              </div>
          </div>
    )
}

export default ItemModel