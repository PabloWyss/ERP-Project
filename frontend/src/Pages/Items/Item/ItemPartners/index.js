import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const ItemPartner = () => {
    const [showDetails, setShowDetails] = useState(false)

    const handleShowDetails = (e) =>{
        e.preventDefault()
        setShowDetails(!showDetails)
    }
    return (
          <div className="flex w-full justify-start">
              <div className="flex gap-1 flex-wrap">
                  <input placeholder={'Partner 1'}/>
                  <input placeholder={'Partner 2'}/>
                  <input placeholder={'Partner 3'}/>
                  <input placeholder={'Partner 4'}/>
              </div>
          </div>
    )
}

export default ItemPartner