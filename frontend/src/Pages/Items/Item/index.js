import React, {useEffect, useState} from "react";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";
import PrimaryDetails from "./PrimaryDetails";
import ItemVariant from "./ItemVariant";
import ItemModel from "./ItemModel";
import ItemTag from "./ItemTag";
import ItemPartners from "./ItemPartners";
import callAPI from "../../../Axios/callAPI";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import ItemModelSpecs from "./ItemModelSpecs";

function Item() {
    const [showVariantDetails, setShowVariantDetails] = useState(false)
    const [showModelDetails, setShowModelDetails] = useState(false)
    const [showTagsDetails, setShowTagsDetails] = useState(false)
    const [showPartnersDetails, setShowPartnersDetails] = useState(false)
    const [fromUpdate, setFromUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [itemVariant, setItemVariant] = useState({})
    const [updateClicked, setUpdateClicked] = useState(true)
    const navigate = useNavigate()
    const { itemID } = useParams();

    // Handle Inputs


    const handleShowVariantDetails = (e) =>{
        e.preventDefault()
        setShowVariantDetails(!showVariantDetails)
    }
    const handleClickCreateVariant = (e) => {
        e.preventDefault()
        navigate(`/items/itemVariant/create/${itemID}`)
    }

    const handleClickListOfModel = (e) => {
        e.preventDefault()
        navigate(`/models`)
    }

    const handleClickGoToModel = (e) => {
        e.preventDefault()
        navigate(`/models/${item.item_model.id}`)
    }

    const handleClickUpdateVariant = () => {
        setUpdateClicked(!updateClicked)
        setFromUpdate(!fromUpdate)
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

    const handleShowVariantsDetails = (e) =>{
        e.preventDefault()
        navigate(`/variants/${itemID}`)
    }

    const handleClickGoBack = (e) =>{
        e.preventDefault()
        navigate(`/items`)
    }

    // Fetch Data
    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${itemID}/`, config)
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const obtainItemsCurrentVariantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/item_specifications/current/${itemID}/`, config)
            setItemVariant(response.data[0])
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        obtainItemsCurrentVariantInfo()
        obtainItemInfo()
    }, [])

  return (
    <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center p-6">
      <div className="flex flex-col h-full w-full rounded-ifRadius py-6 px-8 bg-white  overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey">
          <div className="flex flex-col h-full rounded-ifRadius bg-white gap-4">
              <div className="flex justify-start w-2/5">
                  <div className="flex w-full content-start items-center gap-4 px-4">
                      <div >
                          <img className="cursor-pointer" src={arrow_left_image} alt={"go back"} onClick={handleClickGoBack}/>
                      </div>
                      <h1 className="text-title">
                          {item.name}
                      </h1>
                  </div>
              </div>
              <div className="flex flex-col w-full gap-4 justify-between">
                  <PrimaryDetails fromItem={true} itemFromItem={item}/>
                  <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">
                          <div className="text-xl">
                              Item Specifications (Current)
                          </div>
                          <div className="items-center flex gap-4 justify-items-center">
                              {
                                  showVariantDetails ?
                                      [<button className="p-0 p-0 bg-ifOrange w-40 text-white" onClick={handleClickCreateVariant} key="1">Create Specifications</button>,
                                      <button className="p-0 p-0 bg-ifOrange w-40 text-white" onClick={handleClickUpdateVariant} key="2">Update Specifications</button>,
                                      <button className="p-0 p-0 bg-ifOrange w-40 text-white" onClick={handleShowVariantsDetails} key="3">List Specs</button>]:
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
                          <ItemModelSpecs itemVariant={itemVariant} itemID={itemID} fromUpdate={fromUpdate}/>:
                          ""
                  }
                  <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">
                          <div className="text-xl">
                              Item Model
                          </div>
                          <div className="items-center flex gap-4 justify-items-center">
                              {
                                  showModelDetails ?
                                      [<button className="p-0 p-0 bg-ifOrange w-40 text-white" onClick={handleClickListOfModel} key="3">Go to List of Models</button>,
                                      <button className="p-0 p-0 bg-ifOrange w-40 text-white" onClick={handleClickGoToModel} key="4">Go to Model</button>]:
                                      ""
                              }
                              <button className="p-0" onClick={handleShowModelDetails}>
                                  {showModelDetails ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}
                              </button>
                          </div>

                      </div>
                  </div>
                  {
                      showModelDetails ?
                          <ItemModel fromItem={true} modelFromItem={item.item_model} modelID={item.id}/>:
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
    </div>
);
}

export default Item;