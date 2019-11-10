import React from "react";
import moment from "moment";
import { useTable, useSortBy } from "react-table";
import { reservationsFb } from "../../firebase/firebase";
import { switchName } from "../../utils";
import MailSender from "./MailSender";
import { sendRentInfo } from "../../utils";
import { itemList, itemTypes } from "../../data/items";
const defaultColumn = {
  sort: "numeric"
};

function Table({ columns, data, isAdmin }) {
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
      <table {...getTableProps()} className={isAdmin ? "admin" : "noAdmin"}>
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
            const returnedNotPayed = row.original.returned && !row.original.payed;
            const soonRent =
              !row.original.rent &&
              moment(row.original.date.from, "YYYY-MM-DD").diff(dateNow, "days") < 2;

            return (
              prepareRow(row) || (
                <tr
                  {...row.getRowProps()}
                  key={row.key}
                  style={{
                    backgroundColor:
                      daysFromNotification > 2
                        ? "#ffe6e6"
                        : soonRent
                        ? "orange"
                        : returnedNotPayed
                        ? "#F5F5F5"
                        : "transparent"
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

  const getPrice = (i, daysNum) => {
    const item = itemList.find(j => j.id === i.itemName);
    const itemType = itemTypes.find(type => type.type === item.type);
    const price = daysNum === 1 ? itemType.price1 : daysNum < 5 ? itemType.price2 : itemType.price3;
    return price;
  };

  const getDaysNum = dateFrom => {
    const dateNow = moment(new Date());
    return moment(dateNow, "YYYY-MM-DD").diff(dateFrom, "days");
  };

  //TODO: potrebujeme mapovat pres vsechny rezervace, nebo jen pro konkretni typ ("zapujceno..") ???
  const updateReservation = e => {
    const attr = e.target.getAttribute("name");
    const reservation = reservations && reservations.find(i => i.key === e.target.id);
    const reservationValue = reservation && reservation[attr];

    if (reservation) {
      reservationsFb.child(e.target.id).update({ [attr]: !reservationValue });
    } else console.log("item was not find", reservationValue);
    if (reservation && attr === "returned" && e.target.className === "fa fa-check-square") {
      const daysToReturn = getDaysToReturn(reservation.date.to);
      const totalDays = daysToReturn >= 0 ? reservation.daysNum : getDaysNum(reservation.date.from);
      const price = getPrice(reservation, totalDays);
      reservationsFb.child(e.target.id).update({ daysNum: totalDays, price });

      const otherReservationsFromBlock = reservations.filter(
        i => i.VS === reservation.VS && i.key !== e.target.id
      );
      const itemName = switchName(reservation.itemName);
      const otherPrices =
        otherReservationsFromBlock.length > 0 ? otherReservationsFromBlock.map(i => i.price) : 0;
      const otherNames =
        otherReservationsFromBlock.length > 0
          ? otherReservationsFromBlock.map(i => switchName(i.itemName)).join() + `, ${itemName}`
          : itemName;
      const pricesAll = otherPrices ? [...otherPrices, price] : price;
      const isAllReturned = otherReservationsFromBlock.every(j => j.returned);
      const totalPrice = pricesAll.length > 0 ? pricesAll.reduce((a, b) => a + b) : pricesAll;
      isAllReturned && sendRentInfo(reservation.email, totalPrice, reservation.VS, otherNames); //TODO: vytunit mail
    }
  };

  const removeReservation = e => {
    reservationsFb.child(e.target.id).remove();
  };

  const getDaysToReturn = dateTo => {
    const dateNow = moment(new Date());
    return moment(dateTo, "YYYY-MM-DD").diff(dateNow, "days");
  };

  const getDaysNumOrig = (dateTo, dateFrom) => moment(dateTo, "YYYY-MM-DD").diff(dateFrom, "days");

  const columns = [
    {
      Header: title,
      columns: [
        {
          show: title === "Aktuálně rezervováno" || isAdmin,
          Header: "-",
          Cell: ({ row: { original } }) =>
            moment(original.date.from, "YYYY-MM-DD").diff(moment(new Date()), "days") < 2 && !isAdmin ? (
              "-"
            ) : (
              <i
                id={original.key}
                key={original.key}
                onClick={removeReservation}
                className={`fa fa-trash remove`}
              />
            )
        },
        {
          show: isAdmin,
          Header: "Telefonní číslo",
          Cell: ({ row: { original } }) => <span title={original.email}>{original.phone}</span>
        },
        {
          Header: "Položka",
          Cell: ({ row: { original } }) => <div className="table-itemName">{switchName(original.itemName)}</div>
        },
        {
          Header: "Od",
          accessor: row => moment(row.date.from).format("DD.MM.YY")
        },
        {
          Header: "Do",
          accessor: row => moment(row.date.to).format("DD.MM.YY")
        },
        {
          Header: "Dní",
          accessor: row =>
            row.returned
              ? row.daysNum
              : `${getDaysNumOrig(row.date.to, row.date.from)} ${
                  getDaysToReturn(row.date.to) >= 0 ? "" : `+ ${getDaysToReturn(row.date.to) * -1}`
                }`
        },
        {
          Header: "Cena",
          Cell: ({ row: { original } }) => {
            const daysToReturn = getDaysToReturn(original.date.to);
            const totalDays = daysToReturn >= 0 ? original.daysNum : daysToReturn * -1 + original.daysNum;
            return getDaysToReturn(original.date.to) >= 0 ? (
              `${original.price},-`
            ) : (
              <span>{`${getPrice(original, totalDays)} ,-`}</span>
            );
          }
        },
        {
          show: title !== "Aktuálně rezervováno" && isAdmin,
          Header: "Vráceno",
          Cell: ({ row: { original } }) => (
            <i
              id={original.key}
              name="returned"
              onClick={isAdmin ? updateReservation : () => console.log("no rights")}
              className={`fa fa-check-square${original.returned ? " success" : ""}`}
            />
          )
        },
        {
          show: isAdmin || title === "Aktuálně zapůjčeno",
          Header: "Zaplaceno",
          Cell: ({ row: { original } }) => (
            <i
              id={original.key}
              name="payed"
              onClick={isAdmin ? updateReservation : () => console.log("no rights")}
              className={`fa fa-check-square${original.payed ? " success" : ""}`}
            />
          )
        },
        {
          show: title === "Aktuálně rezervováno" && isAdmin,
          Header: "Zapůjčeno",
          Cell: ({ row: { original } }) => (
            <i
              id={original.key}
              name="rent"
              onClick={isAdmin ? updateReservation : () => console.log("no rights")}
              className={`fa fa-check-square${original.rent ? " success" : ""}`}
            />
          )
        },
        {
          show: title === "Aktuálně zapůjčeno",
          Header: "Dnů do vrácení",
          Cell: ({ row: { original } }) => {
            const daysToReturn = getDaysToReturn(original.date.to);
            const color = daysToReturn > 0 ? "black" : daysToReturn < -10 ? "red" : "orange";
            return original.returned ? (
              "vráceno"
            ) : (
              <span style={{ color: color, fontWeight: "bold" }}>
                {getDaysToReturn(original.date.to)}
              </span>
            );
          }
        },
        {
          show: title === "Aktuálně zapůjčeno" && isAdmin,
          Header: "!",
          Cell: ({ row: { original } }) => {
            const daysToReturn = getDaysToReturn(original.date.to);
            const color = daysToReturn > 0 ? "black" : daysToReturn < -10 ? "red" : "orange";
            return !original.returned && daysToReturn < 0 ? (
              <MailSender i={original} color={color} daysToReturn={daysToReturn} />
            ) : (
              "-"
            );
          }
        }
      ]
    }
  ];

  return <Table columns={columns} data={data} isAdmin={isAdmin} />;
}

export default App;
