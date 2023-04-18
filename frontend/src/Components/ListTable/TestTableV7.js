import { useTable, useSortBy, useFilters, useRowSelect } from "react-table";
import { useMemo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function TestTableV7() {
  const data = useMemo(
    () => [
      {
        name: "Kim Parrish",
        address: "4420 Valley Street, Garnerville, NY 10923",
        date: "07/11/2020",
        order: "87349585892118",
        id: "8",
      },
      {
        name: "Michele Castillo",
        address: "637 Kyle Street, Fullerton, NE 68638",
        date: "07/11/2020",
        order: "58418278790810",
        id: "2",
      },
      {
        name: "Eric Ferris",
        address: "906 Hart Country Lane, Toccoa, GA 30577",
        date: "07/10/2020",
        order: "81534454080477",
        id: "3",
      },
      {
        name: "Gloria Noble",
        address: "2403 Edgewood Avenue, Fresno, CA 93721",
        date: "07/09/2020",
        order: "20452221703743",
        id: "4",
      },
      {
        name: "Darren Daniels",
        address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        date: "07/07/2020",
        order: "22906126785176",
        id: "5",
      },
      {
        name: "Ted McDonald",
        address: "796 Bryan Avenue, Minneapolis, MN 55406",
        date: "07/07/2020",
        order: "87574505851064",
        id: "6",
      },
      {
        name: "Abra Kebabra",
        address: "4420 Rua de la Paz, Toledo, NY 10923",
        date: "07/11/2023",
        order: "67349585892118",
        id: "7",
      },
    ],
    []
  );

  //create columns model
  const columns = useMemo(
    () => [
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
        Header: "Order #",
        accessor: "order",
      },
    ],
    []
  );

  //create input field for search
  function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    // const count = preFilteredRows.length;
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        // placeholder={`Search ${count} records...`}
        placeholder={`Search...`}
        className="float-left w-full mb-2"
      />
    );
  }

  //apply input field to every column
  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );

  //checkbox component besides row
  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  //create table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  //navigate to details page when clicking on a list item
  const location = useLocation();
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    navigate(location.pathname + "/" + row.id);
  };

  return (
    <div>
      <div className="absolute left-60 top-80 h-80 overflow-y-scroll bg-white">
        <table {...getTableProps()}>
          <thead className="sticky top-0 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="px-2">
                    <div
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )} /*handle sorting*/
                    >
                      <div className="float-left pt-2 pr-2 text-buttonGrey">
                        {column.render("Header")}
                      </div>
                      <div className="pt-3 h-7">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="w-full py-3">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        {...(index !== 0
                          ? { onClick: () => handleRowClick(row.original) }
                          : {})} /*exclude navigation to details page for checkbox*/
                        className="px-2 py-2 border-t-2 border-drawGrey text-textGrey"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                "selectedFlatRows[].original": selectedFlatRows.map(
                  (d) => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default TestTableV7;
