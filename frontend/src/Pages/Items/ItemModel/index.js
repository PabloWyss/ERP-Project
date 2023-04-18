import React, {useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ItemModel = () => {

    const [showDetails, setShowDetails] = useState(false)

    const handleShowDetails = (e) =>{
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    return (
        <div>
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-xl">
                        <div>
                            Item model Specifications (Current)
                        </div>
                        <button className="product-minified-button" onClick={handleShowDetails}>
                        {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                  </div>
                  {showDetails && (
                      <div className="flex flex-col gap-4">
                          <div className="flex w-full justify-around">
                              <div className="flex flex-col gap-1 w-1/3">
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_name">Name: </label>
                                      <input id="product_variant_name" name="product_variant_name" placeholder={'Name'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_color">Name: </label>
                                      <input id="product_variant_color" name="product_variant_color" placeholder={'Color'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_valid_from">Valid from: </label>
                                      <input id="product_variant_valid_from" name="product_variant_valid_from" placeholder={'Valid from'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_valid_to">Valid to: </label>
                                      <input id="product_variant_valid_to" name="product_variant_valid_to" placeholder={'Valid to'}/>
                                  </div>
                              </div>
                              <div className="flex flex-col gap-1 w-1/3">
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_condition">Condition: </label>
                                      <input id="product_variant_condition" name="product_variant_condition" placeholder={'Condition'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_category">Category: </label>
                                      <input id="product_variant_category" name="product_variant_category" placeholder={'Category'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_brand_name">Brand Name: </label>
                                      <input id="product_variant_brand_name" name="product_variant_brand_name" placeholder={'Brand Name'}/>
                                  </div>
                                  <div className="flex gap-1 items-center justify-between">
                                      <label htmlFor="product_variant_brand_collection">Brand Collection: </label>
                                      <input id="product_variant_brand_collection" name="product_variant_brand_collection" placeholder={'Brand Collection'}/>
                                  </div>
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