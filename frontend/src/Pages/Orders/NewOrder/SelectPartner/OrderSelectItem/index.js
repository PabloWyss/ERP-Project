import React, { useEffect, useRef } from "react";
import ListTable from "../../../../../Components/ListTable/ListTable.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "../../../../../Redux/Slices/tableCheckedItems.js";
import OrderSelectWarehouse from "./OrderSelectWarehouse/index.js";

function OrderSelectItem() {
  //fake data for table testing
  const data = [
    {
      name: "Kim Parrish",
      address: "4420 Valley Street, Garnerville, NY 10923",
      date: "07/11/2020",
      order: "87349585892118",
      partner: "supplier",
      id: "8",
    },
    {
      name: "Michele Castillo",
      address: "637 Kyle Street, Fullerton, NE 68638",
      date: "07/11/2020",
      order: "58418278790810",
      partner: "customer",
      id: "2",
    },
    {
      name: "Eric Ferris",
      address: "906 Hart Country Lane, Toccoa, GA 30577",
      date: "07/10/2020",
      order: "81534454080477",
      partner: "supplier",
      id: "3",
    },
    {
      name: "Gloria Noble",
      address: "2403 Edgewood Avenue, Fresno, CA 93721",
      date: "07/09/2020",
      order: "20452221703743",
      partner: "supplier",
      id: "4",
    },
    {
      name: "Darren Daniels",
      address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
      date: "07/07/2020",
      order: "22906126785176",
      partner: "customer",
      id: "5",
    },
    {
      name: "Ted McDonald",
      address: "796 Bryan Avenue, Minneapolis, MN 55406",
      date: "07/07/2020",
      order: "87574505851064",
      partner: "supplier",
      id: "6",
    },
    {
      name: "Abra Kebabra",
      address: "4420 Rua de la Paz, Toledo, NY 10923",
      date: "07/11/2023",
      order: "67349585892118",
      partner: "customer",
      id: "7",
    },
    {
      name: "Diane Keaton",
      address: "4420 4th Avenue, Anaheim, WY 10923",
      date: "05/11/2023",
      order: "37349585892118",
      partner: "customer",
      id: "9",
    },
  ];

  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Order No.",
      accessor: "order",
    },
    {
      Header: "Partner Type",
      accessor: "partner",
    },
  ];

  //show the items list or the selected item
  const dispatch = useDispatch(); //used later to reset redux store
  //retrieve id of selected item from redux
  const selectedItem = useSelector((store) => store.checkeditems.checkeditems);
  //handle item selection
  let selectedItemData = useRef(undefined); //will be fetched when selected
  const [isItemSelected, setIsItemSelected] = useState(false);
  const handleSelectItem = () => {
    if (selectedItem.length === 1) {
      //TODO fetch item data
      selectedItemData.current = {
        model_name: "Espadrilla",
        item_name: "Formentera Yellow",
        size: "38",
      };
      setIsItemSelected(true);
      dispatch(setCheckedItems([])); //reset redux store for warehouse selection
    }
  };
  useEffect(handleSelectItem, [selectedItem]);

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
              {selectedItemData.current.model_name}{" "}
              {selectedItemData.current.item_name} - size:{" "}
              {selectedItemData.current.size}
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
          <ListTable data={data} columns={columns} />
        )}
      </div>
      <div>
        {isItemSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section px-4 mt-4">
              Quantity & Warehouse
            </h2>
            <OrderSelectWarehouse />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderSelectItem;
