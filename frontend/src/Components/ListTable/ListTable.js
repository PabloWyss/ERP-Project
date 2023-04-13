import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

function ListTable() {
  const data = useMemo(
    () => [
      {
        name: "Espadrilla Formentera Yellow",
        supplier: "Manifactura Castellana",
        quantity: 47,
      },
      {
        name: "Poncho Multicolor",
        supplier: "Manifactura Mexicana",
        quantity: 12,
      },
    ],
    []
  );

  //create the columns model
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("data.name", {
      header: () => "Name",
    }),
    columnHelper.accessor("data.supplier", {
      header: () => "Supplier",
    }),
    columnHelper.accessor("data.quantity", {
      header: () => "Qty.",
    }),
  ];

  //create the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div></div>;
}

export default ListTable;
