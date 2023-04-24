import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "../../../../../Redux/Slices/tableCheckedItems.js";
import OrderSelectWarehouse from "./OrderSelectWarehouse/OrderSelectWarehouse.js";
import callAPI from "../../../../../Axios/callAPI.js";
import SelectItemTable from "./SelectItemTable/SelectItemTable.js";
import { setItem } from "../../../../../Redux/Slices/orderBuySellRefund.js";

function OrderSelectItem() {
  //#### SHOW ITEM LIST ####
  //retrieve type buy or sell from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  // store fetched items list here
  const [itemList, setItemList] = useState([]);
  // fetch items list
  const obtainItemsInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const endpoint = isOrderBuy
        ? "/items/order_outbound/"
        : "/items/order_inbound/";
      const response = await callAPI.get(endpoint, config);
      setItemList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtainItemsInfo();
  }, []);

  //create columns model for item list
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "EAN",
      accessor: "ean",
    },
    {
      Header: "UPC",
      accessor: "upc",
    },
    {
      Header: "Series",
      accessor: "series",
    },
  ];

  //#### HANDLE ITEM SELECTION ####
  const [isItemSelected, setIsItemSelected] = useState(false);
  //retrieve id of selected item from redux
  const selectedItemId = useSelector(
    (store) => store.ordercheckeditem.ordercheckeditem
  );
  const handleSelectItem = () => {
    if (selectedItemId.length === 1) {
      setIsItemSelected(true);
    }
  };
  useEffect(handleSelectItem, [selectedItemId]);

  //store the selected items's data fetched from the backend here
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch(); //used later to update redux store
  //fetch item data from backend
  const fetchItemData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.get(
        `/items/${selectedItemId[0]}/`,
        config
      );
      setItemData(response.data);
      dispatch(setItem(itemData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItemData();
  }, [selectedItemId]);


  //TODO set isItemSelected to false if the user toggles Buy/Sell after selecting a partner

  //change an already selected item
  const handleChangeItem = () => {
    setIsItemSelected(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        {isItemSelected ? (
          <div className="flex justify-between">
            <div className="pt-4">
              {itemData.model_name}{" "}
              {itemData.item_name} - size:{" "}
              {itemData.size}
            </div>
            <div className="m-2">
              <button
                onClick={handleChangeItem}
                className="float-right text-buttonGrey border-2 border-buttonGrey"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <SelectItemTable data={itemList} columns={columns} />
        )}
      </div>
      <div>
        {isItemSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section px-4 mt-4">
              Quantity & Warehouse
            </h2>
            {/* <OrderSelectWarehouse /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderSelectItem;
