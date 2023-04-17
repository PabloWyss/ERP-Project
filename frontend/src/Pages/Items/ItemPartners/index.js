import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const ItemPartner = () => {
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
                            Partners
                        </div>
                        <button className="product-minified-button" onClick={handleShowDetails}>
                        {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                  </div>
                  {showDetails && (
                      <div className="flex w-full justify-start">
                          <div className="flex gap-1 flex-wrap">
                              <input placeholder={'Partner 1'}/>
                              <input placeholder={'Partner 2'}/>
                              <input placeholder={'Partner 3'}/>
                              <input placeholder={'Partner 4'}/>
                          </div>
                      </div>
                  )}
              </div>
        </div>
    )
}

export default ItemPartner