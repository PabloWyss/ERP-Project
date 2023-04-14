import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

function TestTable() {
  const data = [
    {
      name: "Manolo",
      age: 72,
      location: "Sevilla",
    },
    {
      name: "Azulejo",
      age: 67,
      location: "Bogota",
    },
  ];

  //create columns (headers)
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", { //which property of the object in "data" to access
      header: "Name", //text to display on the header
    }),
    columnHelper.accessor("age", {
      header: "Age",
    }),
    columnHelper.accessor("location", {
      header: "City",
    }),
  ];

  //create table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="absolute left-80 top-80">
      <table>
        <thead> {/*create header*/}
          {table.getHeaderGroups().map((headerGroup) => ( /*headers can be grouped, if no groups are defined, there will be just one*/
            <tr key={headerGroup.id}> {/*one row per header group*/}
              {headerGroup.headers.map((header) => ( 
                <th key={header.id}> {/*create the header of each column*/}
                  {flexRender( /*handles dynamic values*/
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody> {/*create table body (content)*/}
          {table.getRowModel().rows.map((row) => ( /*create rows*/
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => ( /*create cells*/
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestTable;
