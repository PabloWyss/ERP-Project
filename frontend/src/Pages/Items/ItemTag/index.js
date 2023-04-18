import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const ItemTag = () => {
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
                            Item tags
                        </div>
                        <button className="product-minified-button" onClick={handleShowDetails}>
                        {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                  </div>
                  {showDetails && (
                      <div className="flex w-full justify-around">
                          <div className="flex gap-1 flex-wrap">
                              <input placeholder={'Item Tag 1'}/>
                              <input placeholder={'Item Tag 2'}/>
                              <input placeholder={'Item Tag 3'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                              <input placeholder={'Item Tag 4'}/>
                          </div>
                      </div>
                  )}
              </div>
        </div>
    )
}

export default ItemTag