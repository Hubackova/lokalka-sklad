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
          {rows.map(row => {
            const dateNow = moment(new Date());
            const notificationDate = moment(row.original.notification, "YYYY-MM-DD");
            const daysFromNotification = dateNow.diff(notificationDate, "days");
            return (
              prepareRow(row) || (
                <tr
                  {...row.getRowProps()}
                  key={row.key}
                  style={{
                    backgroundColor: daysFromNotification > 2 ? "#ffe6e6" : "transparent"
                  }}
                >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function App({ reservations, title, isAdmin }) {
  const data =
    title === "Aktuálně zapůjčeno"
      ? reservations.filter(i => i.rent && (!i.returned || !i.payed))
      : title === "Aktuálně rezervováno"
      ? reservations.filter(i => !i.rent && (!i.returned || !i.payed))
      : reservations.filter(i => i.returned && i.payed);

  const updateReservation = e => {
    const attr = e.target.getAttribute("name");
    const reservationValue = data && data.find(i => i.key === e.target.id)[attr];
    reservationsFb.child(e.target.id).update({ [attr]: !reservationValue });
  };

  const removeReservation = e => {
    reservationsFb.child(e.target.id).remove();
  };

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
            show: title === "Aktuálně rezervováno" || isAdmin,
            Header: "-",
            accessor: row => (
              <i
                id={row.key}
                key={row.key}
                onClick={removeReservation}
                className={`fa fa-trash remove`}
              />
            )
          },
          { show: isAdmin, Header: "Email", accessor: "email" },
          {
            Header: "Položka",
            accessor: row => switchName(row.itemName)
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
          {
            show: title !== "Aktuálně rezervováno" && isAdmin,
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
            show: isAdmin,
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
          {
            show: title === "Aktuálně rezervováno" && isAdmin,
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
          {
            show: title === "Aktuálně zapůjčeno",
            Header: "Dnů do vrácení",
            accessor: row => {
              const daysToReturn = getDaysToReturn(row.date.to);
              const color = daysToReturn > 0 ? "black" : daysToReturn < -10 ? "red" : "orange";
              return (
                <span style={{ color: color, fontWeight: "bold" }}>
                  {getDaysToReturn(row.date.to)}
                </span>
              );
            }
          },
          {
            show: title === "Aktuálně zapůjčeno" && isAdmin,
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
