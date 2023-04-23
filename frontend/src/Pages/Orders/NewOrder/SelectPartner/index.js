import React, { useEffect, useRef } from "react";
import ListTable from "../../../../Components/ListTable/ListTable.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSelectItem from "./OrderSelectItem/index.js";
import { setCheckedItems } from "../../../../Redux/Slices/tableCheckedItems.js";

function SelectPartner() {
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

  //show the partner list or the selected partner
  const dispatch = useDispatch(); //used later to reset redux store
  //retrieve id of selected partner from redux
  const selectedPartner = useSelector(
    (store) => store.checkeditems.checkeditems
  );
  let selectedPartnerData = useRef(undefined); //will be fetched when selected
  const [isPartnerSelected, setIsPartnerSelected] = useState(false);
  const handleSelectPartner = () => {
    if (selectedPartner.length === 1) {
      //TODO fetch partner data
      selectedPartnerData.current = {
        name: "Manifactura Zapatera",
        address: "Callecita Muy Linda, 5 - Alcorcon",
        id: 5,
      };
      setIsPartnerSelected(true);
      dispatch(setCheckedItems([])); //reset redux store for item selection
    }
  };
  useEffect(handleSelectPartner, [selectedPartner]);
  useEffect(() => {}, [selectedPartner]);

  //TODO set isPartnerSelected to false if the user toggles Buy/Sell after selecting a partner

  //change an already selected partner
  const handleChangePartner = () => {
    setIsPartnerSelected(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        {isPartnerSelected ? (
          <div className="flex justify-between">
            <div className="pt-4">
              {selectedPartnerData.current.name} -{" "}
              {selectedPartnerData.current.address}
            </div>
            <div className="m-2">
              <button
                onClick={handleChangePartner}
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
        {isPartnerSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section px-4 mt-4">Items</h2>
            <OrderSelectItem partnerid={selectedPartnerData.current.id} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SelectPartner;
