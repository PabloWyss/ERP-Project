import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemModelInput from "./IitemModelInput";
import callAPI from "../../../../Axios/callAPI";
import ItemModelImages from "./ItemModelImages";
import {useParams} from "react-router-dom";
import ItemDetailsInput from "../PrimaryDetails/ItemDetailsInput";

const ItemModel = ({fromCreate}) => {

    const [itemModel, setItemModel] = useState({})
    const [name, setName] = useState("")
    const [archived, setArchived] = useState("")
    const [status, setStatus] = useState("")
    const [color, setColor] = useState("")
    const [condition, setCondition] = useState("")
    const [category, setCategory] = useState("")
    const [brandName, setBrandName] = useState("")
    const [brandCollection, setBrandCollection] = useState("")
    const [images, setImages] = useState([])
    const [pictures, setPictures] = useState([]);
    const [colorOptions, setColorOptions] = useState([])
    const [conditionOptions, setConditionOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [comesFromCreate, setComesFromCreate] = useState(fromCreate ? fromCreate : false)

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

    const handleArchivedInput = (e) =>{
        setArchived(e.target.value)
    }

    const handleStatusInput = (e) =>{
        setStatus(e.target.value)
    }

    const handlePictureChange = (e) => {
    const files = e.target.files;
    const fileList = Array.from(e.target.files);
    setImages(fileList);

    const newPictures = [];

    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);

      fileReader.onload = (event) => {
        newPictures.push(event.target.result);
        setPictures([...newPictures]);
      };
    }
  };
    const createModel = async () => {
        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            console.log(images)
            console.log(pictures)

            const formData = new FormData();
                formData.append("color", color);
                formData.append("name", name);
                formData.append("status", status);
                formData.append("condition", condition);
                formData.append("category", category);
                formData.append("brandName", brandName);
                images.forEach((image) => {
                  formData.append("images", image);
                });


            for (let pair of formData.entries()){
                console.log(pair)
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/formdata',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.post(`/item_models/new/`, formData, config)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
  };

    const getColorOptions = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
              };

              const response = await callAPI.get(`/item_models/choices/colors/`, config)
              const options = response.data.colors.unshift("")
              setColorOptions(response.data.colors)
          } catch (error) {
              console.log(error);
          }
      }

      const getConditionsOptions = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
              };

              const response = await callAPI.get(`/item_models/choices/conditions/`, config)
              const options = response.data.conditions.unshift("")
              setConditionOptions(response.data.conditions)
          } catch (error) {
              console.log(error);
          }
      }

      const getCategoryOptions = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
              };

              const response = await callAPI.get(`/item_models/choices/categories/`, config)
              const options = response.data.categories.unshift("")
              setCategoryOptions(response.data.categories)
          } catch (error) {
              console.log(error);
          }
      }


    // const obtainItemsModelVariantInfo = async () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         };
    //
    //         const response = await callAPI.get(`/items/models/current/`, config);
    //         setItemModel(response.data[0])
    //         setName(response.data[0].name)
    //         setColor(response.data[0].color)
    //         setCondition(response.data[0].condition)
    //         setCategory(response.data[0].category)
    //         setBrandName(response.data[0].brand_name)
    //         setBrandCollection(response.data[0].brand_collection)
    //         setArchived(response.data.category)
    //     } catch (error) {
    //         console.log(error);
    //     }
    //
    // }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        createModel()
    }



    useEffect(() => {
        getColorOptions()
        getConditionsOptions()
        getCategoryOptions()
        if(!fromCreate){
            getColorOptions()
            getConditionsOptions()
            getCategoryOptions()
        }

    }, [])

    console.log(fromCreate)

    return (
          <form className="flex flex-col gap-4 " onSubmit={handleOnSubmit}>
              <div className="flex w-full gap-10 justify-around">
                  <div className="flex flex-col w-1/2 gap-1">
                      <ItemDetailsInput description={"Name:"}
                                      disableInput={!comesFromCreate}
                                      value={name}
                                      type={"text"}
                                      handleInput={handleNameInput}/>
                      <ItemDetailsInput description={"Color:"}
                                      disableInput={!comesFromCreate}
                                      value={color}
                                      type={"text"}
                                      handleInput={handleColorInput}
                                        choicesEnabeled={true}
                                      choices={colorOptions}/>
                      {/*<ItemDetailsInput description={"Archived:"}*/}
                      {/*                disabled={!fromCreate}*/}
                      {/*                value={archived}*/}
                      {/*                type={"text"}*/}
                      {/*                handleInput={handleArchivedInput}*/}
                      {/*                  choicesEnabeled={true}*/}
                      {/*                choices={[true,false]}/>*/}
                      <ItemDetailsInput value={status}
                                        disableInput={!fromCreate}
                                        handleInput={handleStatusInput}
                                        description={"Item Status: "}
                                        choicesEnabeled={true}
                                        choices={["","Active",'No restock']}/>
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                      <ItemDetailsInput description={"Condition:"}
                                      disableInput={!fromCreate}
                                      value={condition}
                                      type={"text"}
                                      handleInput={handleConditionInput}
                                        choicesEnabeled={true}
                                      choices={conditionOptions}/>
                      <ItemDetailsInput description={"Category:"}
                                      disableInput={!fromCreate}
                                      value={category}
                                      type={"text"}
                                      handleInput={handleCategoryInput}
                                        choicesEnabeled={true}
                                      choices={categoryOptions}/>
                      <ItemDetailsInput description={"Brand name:"}
                                      disableInput={!fromCreate}
                                      value={brandName}
                                      type={"text"}
                                      handleInput={handleBrandNameInput}/>
                  </div>
              </div>
              <div className="flex flex-col flex-wrap gap-4">
                  <div className="flex flex-wrap gap-4">
                    {pictures.map((picture, index) => (
                      <img className="flex flex-wrap gap-4"
                        key={index}
                        src={picture}
                        alt={`Picture ${index}`}
                        style={{ maxWidth: "200px" }}
                      />
                    ))}
                  </div>
                  {
                      fromCreate ?

                      <div>
                          <label className="flex flex-wrap" htmlFor="pictures">
                                </label>
                                <input
                                  type="file"
                                  id="pictures"
                                  name="pictures"
                                  accept="image/*"
                                  multiple
                                  onChange={handlePictureChange}/>
                      </div>
                          :
                          ""
                  }
              </div>
              <div className="flex flex-wrap gap-4">
                  {
                      itemModel?.images?.map((image)=>{
                          return <ItemModelImages image={image.image} disabled/>
                      })
                  }
              </div>
              <div className="flex w-full justify-center">
                {
                 (fromCreate) ?
                     <button className="text-xl p-0 bg-ifOrange w-20 text-white" type={"submit"}>
                        Submit
                     </button>:
                     ""
                }
            </div>
          </form>
    )
}

export default ItemModel