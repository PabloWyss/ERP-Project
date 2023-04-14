import React from "react";
import ListTable from "../../Components/ListTable/ListTable";
import TestTable from "../../Components/ListTable/TestTable";

function Items() {
  return (
    <div className="h-screen w-screen bg-blue-400">
      <ListTable></ListTable>
      <TestTable></TestTable>
    </div>
);
}

export default Items;
