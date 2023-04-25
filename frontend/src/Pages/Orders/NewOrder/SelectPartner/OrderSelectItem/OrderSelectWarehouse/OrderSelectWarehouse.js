import { useEffect, useState } from "react";
import ListTable from "../../../../../../Components/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import callAPI from "../../../../../../Axios/callAPI";
import { setWarehouse, setOrderQuantity } from "../../../../../../Redux/Slices/orderBuySellRefund";
import { useNavigate } from "react-router-dom";

function OrderSelectWarehouse() {
  //#### SHOW WAREHOUSE LIST ####
  //retrieve type buy or sell and refund from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  const isOrderRefund = useSelector(
    (store) => store.orderbuysellrefund.isrefund
  );
  // store fetched Warehouse list here
  const [warehouseList, setWarehouseList] = useState([]);
  // retrieve selected item id from redux
  // (could be changed to be done only when needed -> see fetch below)
  const selectedItemId = useSelector(
    (store) => store.orderbuysellrefund.item.id
  );
  // fetch warehouse list
  const obtainItemsInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const endpoint =
        (isOrderBuy && isOrderRefund) || (!isOrderBuy && !isOrderRefund)
          ? `/warehouses/items/${selectedItemId}`
          : "/warehouses/";
      const response = await callAPI.get(endpoint, config);
      setWarehouseList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtainItemsInfo();
  }, []);

  //create columns model for warehouse list
  //different columns are shown depending on buy/sell/refund
  const columns =
    (isOrderBuy && isOrderRefund) || (!isOrderBuy && !isOrderRefund)
      ? [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Item Stock",
            accessor: `warehouse_item_inventory.filter(warehouse => warehouse.item === ${selectedItemId})[0].stock_level_current`,
          },
        ]
      : [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Total Stock",
            accessor: "stock_level_total_current",
          },
        ];

  //#### HANDLE WAREHOUSE SELECTION ####
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);
  const dispatch = useDispatch(); //used later to update redux store
  //retrieve id of selected warehouse from redux
  const selectedWarehouseId = useSelector(
    (store) => store.checkeditems.checkeditems
  );
  //change status and store warehouse id in redux
  const handleSelectWarehouse = () => {
    if (selectedWarehouseId.length === 1) {
      setIsWarehouseSelected(true);
      dispatch(setWarehouse(selectedWarehouseId));
    }
  };
  useEffect(handleSelectWarehouse, [selectedWarehouseId]);

  //#### HANDLE INPUT QUANTITY ####
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setIsQuantityValid(true);
    if (quantity > 0) {
      dispatch(setOrderQuantity(quantity));
    }
    // if (quantity > 0) {
    //   setIsQuantityValid(true);
    // }
  };
  //   useEffect(() => {
  //     if (quantity <= 0) {
  //       setIsQuantityValid(false);
  //     }
  //   }, [quantity]);

  //#### SAVE BUTTON ####
  //toggle activate Save button
  const [allSelected, setAllSelected] = useState(false);
  useEffect(() => {
    if (isQuantityValid && isWarehouseSelected) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [isQuantityValid, isWarehouseSelected]);

  //retrieve order data from redux
  const orderNumber = "Test1"; //TODO
  const shipmentDate = "2024-04-19T21:41:00.366027Z"; //TODO
  const partner = useSelector((store) => store.orderbuysellrefund.partner.id);
  //TODO console.log(partner)
  const isMerchantSupplier = !useSelector(
    (store) => store.orderbuysellrefund.isbuy
  );
  const isRefund = useSelector((store) => store.orderbuysellrefund.isrefund);
  const warehouse = useSelector((store) => store.orderbuysellrefund.warehouse);
  const items = useSelector((store) => store.orderbuysellrefund.item.id);
  //TODO console.log(items)
  const orderQuantity = useSelector(
    (store) => store.orderbuysellrefund.quantity
  );
  //TODO console.log(orderQuantity)
  //post new order to backend when button clicked
  const createNewOrder = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const formData = new FormData();
      formData.append("order_number", orderNumber);
      formData.append("shipment_date", shipmentDate);
      formData.append("partner", partner);
      formData.append("is_merchant_supplier", isMerchantSupplier);
      formData.append("is_refund", isRefund);
      formData.append("warehouse", warehouse);
      formData.append("items", items);
      formData.append("quantity", orderQuantity);
      const response = await callAPI.post(`/orders/new/`, formData, config);
    } catch (error) {
      console.log(error);
    }
  };
  //handle click on Save button
  const navigate = useNavigate();
  const handleSave = () => {
    createNewOrder();
    navigate("/orders");
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
      <ListTable data={warehouseList} columns={columns} />
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
