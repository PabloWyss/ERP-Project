import React, { useEffect, useState } from "react";
import SelectPartner from "./SelectPartner";

function NewOrder() {
  //handle choice buy or sell
  const [isBuy, setIsBuy] = useState(true);
  let supplierOrCustomer = "Supplier";
  const changeOrderType = () => {
    setIsBuy(!isBuy);
    supplierOrCustomer = isBuy ? "Supplier" : "Customer";
    //TODO trigger fetching list of suppliers or customers
  };
  useEffect(() => {}, [isBuy]);

  //handle choice refund or not
  const [isRefund, setIsRefund] = useState(false);
  const changeIsRefund = () => {
    setIsRefund(!isRefund);
  };

  return (
    <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <h1 className="text-title mb-4">New Order</h1>
        <div className="flex gap-8">
          <div className="flex">
            <div className="pt-2 mr-2 text-buttonGrey">Type: </div>
            <button
              onClick={changeOrderType}
              className={
                isBuy
                  ? "rounded-r-none bg-ifOrange text-white"
                  : "rounded-r-none border-2 border-ifOrange text-buttonGrey"
              }
            >
              Buy
            </button>
            <button
              onClick={changeOrderType}
              className={
                isBuy
                  ? "rounded-l-none border-2 border-ifOrange text-buttonGrey"
                  : "rounded-l-none bg-ifOrange text-white"
              }
            >
              Sell
            </button>
          </div>
          <div className="flex">
            <div className="pt-2 mr-2 text-buttonGrey">Refund: </div>
            <button
              onClick={changeIsRefund}
              className={
                isRefund
                  ? "rounded-r-none bg-ifOrange text-white"
                  : "rounded-r-none border-2 border-ifOrange text-buttonGrey"
              }
            >
              Yes
            </button>
            <button
              onClick={changeIsRefund}
              className={
                isRefund
                  ? "rounded-l-none border-2 border-ifOrange text-buttonGrey"
                  : "rounded-l-none bg-ifOrange text-white"
              }
            >
              No
            </button>
          </div>
        </div>
        <h2 className=" bg-backgroundGrey text-section px-4 mt-4">
          {isBuy ? "Supplier" : "Customer"}
        </h2>
        <div className="my-2">
          {/* it will need to get the data for the table as props */}
          <SelectPartner />
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
