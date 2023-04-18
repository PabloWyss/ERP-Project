import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemModelInput from "./IitemModelInput";
import callAPI from "../../../Axios/callAPI";

const ItemModel = () => {

    const [showDetails, setShowDetails] = useState(false)
    const [itemModel, setItemModel] = useState({})

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
            console.log(response)
            setItemModel(response.data[0])
            console.log(itemModel)
        } catch (error) {
            console.log(error);
        }

    }

    const handleShowDetails = (e) =>{
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    // useEffect(() => {
    //     obtainItemsModelVariantInfo()
    // }, [])

    return (
        <div>
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xl bg-backgroundGrey px-4">
                        <div>
                            Item model Specifications (Current)
                        </div>
                        <button className="product-minified-button" onClick={handleShowDetails}>
                        {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                  </div>
                  {showDetails && (
                      <div className="flex flex-col gap-4">
                          <div className="flex w-full justify-around gap-10 justify-around">
                              <div className="flex flex-col gap-1 w-1/2">
                                  <ItemModelInput description={"Name:"} value={"name"}/>
                                  <ItemModelInput description={"Color:"} value={"color"}/>
                                  <ItemModelInput description={"Valid from:"} value={"valid_from"}/>
                                  <ItemModelInput description={"Valid to:"} value={"valid_to"}/>
                              </div>
                              <div className="flex flex-col gap-1 w-1/2">
                                  <ItemModelInput description={"Condition:"} value={"condition"}/>
                                  <ItemModelInput description={"Category:"} value={"category"}/>
                                  <ItemModelInput description={"Brand name:"} value={"brand_name"}/>
                                  <ItemModelInput description={"Brand collection:"} value={"brand_collection"}/>
                              </div>
                          </div>
                          <div >
                              <input className="w-full h-16 flex justify-start items-start" placeholder={'Item description long '}/>
                          </div>
                          <div >
                              <input className="w-full h-16 flex justify-start items-start" placeholder={'description short '}/>
                          </div>
                          <div >
                              <input className="w-full h-16 flex justify-start items-start" placeholder={'care istructions'}/>
                          </div>
                          <div >
                              <input className="w-full h-16 flex justify-start items-start" placeholder={'Images'}/>
                          </div>
                      </div>
                  )}
              </div>
        </div>
    )
}

export default ItemModel