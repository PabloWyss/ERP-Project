import { useEffect, useRef, useState } from "react";
import ListTable from "../../../../../../Components/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "../../../../../../Redux/Slices/tableCheckedItems";

function OrderSelectWarehouse() {
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
      Header: "Warehouse Type",
      accessor: "partner",
    },
  ];

  //handle input quantity
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setIsQuantityValid(true);
    // if (quantity > 0) {
    //   setIsQuantityValid(true);
    // }
  };
  //   useEffect(() => {
  //     if (quantity <= 0) {
  //       setIsQuantityValid(false);
  //     }
  //   }, [quantity]);

  //handle select warehouse
  //retrieve id of selected warehouse from redux
  const selectedWarehouse = useSelector(
    (store) => store.checkeditems.checkeditems
  );
  //handle warehouse selection
  let selectedWarehouseData = useRef(undefined); //will be fetched when selected
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);
  const handleSelectWarehouse = () => {
    if (selectedWarehouse.length === 1) {
      //TODO fetch partner data
      selectedWarehouseData.current = {
        name: "Lager 50",
        quantity: 18,
        id: 2,
      };
      setIsWarehouseSelected(true);
    }
  };
  useEffect(handleSelectWarehouse, [selectedWarehouse]);

  //toggle activate Save button
  const [allSelected, setAllSelected] = useState(false);
  useEffect(() => {
    if (isQuantityValid && isWarehouseSelected) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [isQuantityValid, isWarehouseSelected]);

  //TODO handle click on Save button
  const handleSave = () => {
    //TODO send data to backend
  };

  return (
    <div>
      <div className="flex my-2">
        <div className="mt-1 mr-4">Quantity:</div>
        <div>
          <input
            onChange={handleQuantityChange}
            value={quantity}
            type="number"
            min="1"
            className="w-20"
          />
        </div>
      </div>
      <ListTable data={data} columns={columns} />
      <div>
        <button
          className={
            allSelected
              ? "bg-ifOrange text-white float-right"
              : "border-2 border-drawGrey text-drawGrey cursor-default float-right"
          }
          onClick={allSelected ? handleSave : () => {}}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default OrderSelectWarehouse;
