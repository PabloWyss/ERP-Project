import React, {useEffect, useState} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemModelInput from "./IitemModelInput";
import callAPI from "../../../../Axios/callAPI";
import ItemModelImages from "./ItemModelImages";
import {useNavigate, useParams} from "react-router-dom";
import ItemDetailsInput from "../PrimaryDetails/ItemDetailsInput";

const ItemModel = ({fromCreate, model, fromList}) => {

    const [itemModel, setItemModel] = useState({})
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [color, setColor] = useState("")
    const [condition, setCondition] = useState("")
    const [category, setCategory] = useState("")
    const [brandName, setBrandName] = useState("")
    const [images, setImages] = useState([])
    const [pictures, setPictures] = useState([]);
    const [colorOptions, setColorOptions] = useState([])
    const [conditionOptions, setConditionOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [comesFromCreate, setComesFromCreate] = useState(fromCreate ? fromCreate : false)
    const [itemList, setItemList] = useState([])
    const navigate = useNavigate()
    const {modelId} = useParams()


    useEffect(() => {
        getColorOptions()
        getConditionsOptions()
        getCategoryOptions()
        obtainItemsInfo()

         if(fromList){
            setItemModel(model)
            setName(model.name)
            setStatus(model.status)
            setCondition(model.condition)
            setCategory(model.category)
            setColor(model.color)
            setBrandName(model.brand_name)
             setImages(model.images)
    }

    }, [fromCreate, model, fromList])



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

    const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/`, config)
            let itemsNameList = response.data?.map((item)=>{
                return item.name
            })
            setItemList(itemsNameList)
        } catch (error) {
            console.log(error);
        }
    }
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


    const handleOnSubmit = (e) => {
        e.preventDefault()
        createModel()
        navigate(-1)
    }

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
              <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">
                  <p>
                      Images
                  </p>
              </div>
              <div className="flex flex-wrap gap-4">
                  {
                      images?.map((image)=>{
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