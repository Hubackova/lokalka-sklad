import React from "react";
import moment from "moment";
import { useTable, useSortBy } from "react-table";
import { reservationsFb } from "../../firebase/firebase";
import { switchName } from "../../utils";
import MailSender from "./MailSender";

const defaultColumn = {
  sort: "numeric"
};

function Table({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      debug: true
    },
    useSortBy
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>{column.sorted ? (column.sortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map(
            row =>
              prepareRow(row) || (
                <tr {...row.getRowProps()} key={row.key}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
}

function App({ data, title }) {
  const updateReservation = e => {
    const attr = e.target.getAttribute("name");
    const reservationValue = data.find(i => i.key === e.target.id)[attr];
    reservationsFb.child(e.target.id).update({ [attr]: !reservationValue });
  };

  const removeReservation = e => {
    reservationsFb.child(e.target.id).remove();
  };
  console.log(data);

  const getDaysToReturn = dateTo => {
    const dateNow = moment(new Date());
    return moment(dateTo, "YYYY-MM-DD").diff(dateNow, "days");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: title,
        columns: [
          {
            Header: "-",
            accessor: row => (
              <i id={row.key} onClick={removeReservation} className={`fa fa-trash remove`} />
            )
          },
          {
            Header: "Položka",
            accessor: row => switchName(row.itemName)
          },
          {
            Header: "ID člena",
            accessor: "lokoId"
          },
          {
            Header: "Půjčit od",
            accessor: row => moment(row.date.from).format("DD.MM.YY")
          },
          {
            Header: "Půjčit do",
            accessor: row => moment(row.date.to).format("DD.MM.YY")
          },
          {
            Header: "Počet dní",
            accessor: "daysNum"
          },
          {
            Header: "Cena",
            accessor: row => `${row.price},-`
          },
          {show: title !== "Aktuálně rezervováno",
            Header: "Vráceno",
            accessor: row => (
              <i
                id={row.key}
                name="returned"
                onClick={updateReservation}
                className={`fa fa-check-square${row.returned ? " success" : ""}`}
              />
            )
          },
          {
            Header: "Zaplaceno",
            accessor: row => (
              <i
                id={row.key}
                name="payed"
                onClick={updateReservation}
                className={`fa fa-check-square${row.payed ? " success" : ""}`}
              />
            )
          },
          {show: title === "Aktuálně rezervováno",
            Header: "Zapůjčeno",
            accessor: row => (
              <i
                id={row.key}
                name="rent"
                onClick={updateReservation}
                className={`fa fa-check-square${row.rent ? " success" : ""}`}
              />
            )
          },
          {show: title === "Aktuálně zapůjčeno",
            Header: "Dnů do vrácení",
            accessor: row => getDaysToReturn(row.date.to)
          },
          {
            show: title === "Aktuálně zapůjčeno",
            Header: "!",
            accessor: row => {
              const daysToReturn = getDaysToReturn(row.date.to);
              const color = daysToReturn > 0 ? "black" : daysToReturn < -10 ? "red" : "orange";
              return (
                daysToReturn < 0 && <MailSender i={row} color={color} daysToReturn={daysToReturn} />
              );
            }
          }
        ]
      }
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}

export default App;
