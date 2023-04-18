import React, {useEffect, useState} from "react";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";
import PrimaryDetails from "./PrimaryDetails";
import ItemVariant from "./ItemVariant";
import ItemModel from "./ItemModel";
import ItemTag from "./ItemTag";
import ItemPartners from "./ItemPartners";
import callAPI from "../../Axios/callAPI";

function Items() {




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
              <ItemVariant/>
              <ItemModel/>
              <ItemTag/>
              <ItemPartners/>
          </div>
      </div>
    </div>
);
}

export default Items;