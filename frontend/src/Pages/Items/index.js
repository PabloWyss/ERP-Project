import React, {useEffect, useState} from "react";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";
import PrimaryDetails from "./PrimaryDetails";
import ItemVariant from "./ItemVariant";
import ItemModel from "./ItemModel";
import ItemTag from "./ItemTag";
import ItemPartners from "./ItemPartners";
import callAPI from "../../Axios/callAPI";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function Items() {
    const [showVariantDetails, setShowVariantDetails] = useState(false)
    const [showModelDetails, setShowModelDetails] = useState(false)
    const [showTagsDetails, setShowTagsDetails] = useState(false)
    const [showPartnersDetails, setShowPartnersDetails] = useState(false)
    const [itemVariant, setItemVariant] = useState({})
    const [initialDate, setInitialDate] = useState("")
    const [finalDate, setFinalDate] = useState("")
    const navigate = useNavigate()
    const itemID = 1
    const handleShowVariantDetails = (e) =>{
        e.preventDefault()
        setShowVariantDetails(!showVariantDetails)
    }
    const handleClickCreateVariant = (e) => {
        e.preventDefault()
        navigate(`/items/itemVariant/${itemID}`)
    }

    const handleShowModelDetails = (e) =>{
        e.preventDefault()
        setShowModelDetails(!showModelDetails)
    }
    const handleShowTagsDetails = (e) =>{
        e.preventDefault()
        setShowTagsDetails(!showTagsDetails)
    }
    const handleShowPartnersDetails = (e) =>{
        e.preventDefault()
        setShowPartnersDetails(!showPartnersDetails)
    }

    const obtainItemsCurrentVariantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/variants/current/${itemID}/`, config)
            setItemVariant(response.data[0])
            setInitialDate(itemVariant.valid_from)
            setFinalDate(itemVariant.valid_to)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        obtainItemsCurrentVariantInfo()
    }, [])

  return (
    <div className="flex h-screen w-full justify-center overflow-y-scroll">
      <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
          <div className="flex justify-start w-2/5">
              <div className="flex items-center justify-between w-full">
                  <div >
                      <img src={arrow_left_image}/>
                  </div>
                  <h1 className="text-2xl">
                      Espadilla Fomentera Yellow
                  </h1>
              </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
              <PrimaryDetails/>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center  bg-backgroundGrey px-4">
                    <div className="text-xl">
                        Item variants Specifications (Current)
                    </div>
                    <div className="items-center flex gap-4 justify-items-center">
                        {
                            showVariantDetails ?
                                <button className="p-0" onClick={handleClickCreateVariant}>Create Variant</button>:
                                ""
                        }
                        <button className="p-0" onClick={handleShowVariantDetails}>
                            {showVariantDetails ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}
                        </button>
                    </div>
                </div>
              </div>
              {
                  showVariantDetails ?
                      <ItemVariant itemVariant={itemVariant} itemID={itemID}/>:
                      ""
              }
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xl bg-backgroundGrey px-4">
                        <div>
                            Item model Specifications (Current)
                        </div>
                        <button className="p-0" onClick={handleShowModelDetails}>
                        {showModelDetails ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}
                        </button>
                  </div>
              </div>
              {
                  showModelDetails ?
                      <ItemModel/>:
                      ""
              }
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center px-4 bg-backgroundGrey text-xl">
                        <div>
                            Item tags
                        </div>
                        <button className="p-0" onClick={handleShowTagsDetails}>
                        {showTagsDetails ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}
                        </button>
                  </div>
              </div>
              {
                  showTagsDetails ?
                      <ItemTag/>:
                      ""
              }
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center px-4 bg-backgroundGrey text-xl">
                        <div>
                            Partners
                        </div>
                        <button className="p-0" onClick={handleShowPartnersDetails}>
                        {showPartnersDetails ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}
                        </button>
                  </div>
              </div>
              {
                  showPartnersDetails ?
                      <ItemPartners/>:
                      ""
              }
          </div>
      </div>
    </div>
);
}

export default Items;