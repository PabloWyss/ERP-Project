import React, {useEffect, useState} from "react";
import MerchDetails from "../../Components/MerchComp/MerchDetails";
import MerchPartner from "../../Components/MerchComp/MerchPartner";


function Merchant() {




  return (
    <div className="flex h-screen w-full justify-center overflow-y-scroll">
      <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
          <div className="flex justify-start w-2/5">
              <div className="flex items-center justify-between w-full">
                  <h1 className="text-2xl">
                      Espadilla Fomentera Yellow
                  </h1>
              </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
              <MerchDetails/>>
              <MerchPartner/>
          </div>
      </div>
    </div>
);
}

export default Merchant;