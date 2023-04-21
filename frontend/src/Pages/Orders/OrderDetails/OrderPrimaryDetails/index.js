import React from "react";

function OrderPrimaryDetails(props) {
  return (
    <div>
      <div className="flex items-center justify-between bg-backgroundGrey px-4">
        <h2 className="text-section">Primary Details</h2>
      </div>
      <div className="flex w-full py-4">
        <div className="flex w-full justify-around gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            <div>
              Type:
              <span className="pl-2">
                {props.order.is_merchant_supplier ? "Supply" : "Purchase"}
              </span>
            </div>
            <div>
              Date: <span className="pl-2">{props.order.order_date}</span>
            </div>
            <div>
              Partner: <span className="pl-2">{props.order.partner}</span>
            </div>
            <div>
              Item qty.: <span className="pl-2">{props.order.quantity}</span>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div>
              Refund:
              <span className="pl-2">{props.order.is_refund ? "Yes" : ""}</span>
            </div>
            <div>
              Shipping date:
              <span className="pl-2">{props.order.shipment_date}</span>
            </div>
            <div>
              Warehouse: <span className="pl-2">{props.order.warehouse}</span>
            </div>
            <div>
              Total: <span className="pl-2">!TBD! {props.order.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPrimaryDetails;
