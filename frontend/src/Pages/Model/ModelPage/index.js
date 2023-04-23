import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../../Axios/callAPI";
import ItemModel from "../../Items/Item/ItemModel";

const ModelPage = () => {
    const navigate = useNavigate()
    const {modelID} = useParams()
    const [model, setModel] = useState("")
    const [fromEdit, setFromEdit] = useState(false)
    const handleClickGoBack = (e) =>{
        e.preventDefault()
        navigate(-1)
    }

    useEffect(()=>{
        getModel()
    },[])

     const getModel = async () => {
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
              };

              const response = await callAPI.get(`/item_models/${modelID}/`, config)
              setModel(response.data)
          } catch (error) {
              console.log(error);
          }
      }

    return (
        <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius px-5 bg-white  overflow-y-scroll">
                <div className="flex h-screen w-full justify-center">
                    <div className="flex flex-col h-full w-full pt-10 pb-10 gap-4">
                        <ItemModel fromCreate={false} fromList={true} model={model}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModelPage