import React, { useContext, useEffect } from "react";
import moment from "moment";
import "./reservations.scss";
// import MailSender from "./MailSender";
// import SearchBox from "./SearchBox";
import { useFetch, isAdmin as adminFunction } from "../../utils";
import { UserContext } from "../../Contexts";
import Table from "./ReservationsTable";
import { reservationsFb } from "../../firebase/firebase";

const Reservations = ({ reservations }) => {
  const { user } = useContext(UserContext); //TODO: fce isAdmin()
  const isAdmin = adminFunction(user);
  const active = isAdmin
    ? reservations.filter(
        (i) => i.rent && (!i.returned || !(i.payed || i.free))
      )
    : reservations.filter(
        (i) =>
          i.rent &&
          (!i.returned || !(i.payed || i.free)) &&
          i.email === user.email
      );
  const reserved = isAdmin
    ? reservations.filter(
        (i) => !i.rent && (!i.returned || !(i.payed || i.free))
      )
    : reservations.filter(
        (i) =>
          !i.rent &&
          (!i.returned || !(i.payed || i.free)) &&
          i.email === user.email
      );
  const archived = isAdmin
    ? reservations.filter((i) => i.returned && (i.payed || i.free))
    : reservations.filter(
        (i) => i.returned && (i.payed || i.free) && i.email === user.email
      );

  const now = moment(new Date()).format("YYYY-MM-DD");
  const fioDateFrom = moment
    .min(active.map((reservation) => moment(reservation.reservationDate)))
    .format("YYYY-MM-DD");
  const [dataFio, loading] = useFetch(
    `https://www.fio.cz/ib_api/rest/periods/${process.env.REACT_APP_FIO_TOKEN}/${fioDateFrom}/${now}/transactions.json`
  );
  const fioData = dataFio.accountStatement
    ? dataFio.accountStatement.transactionList.transaction
    : [];

  useEffect(() => {
    //promapujeme vypujcene polozky a pokud je ve fio zaznam s danym VS, zmenime hodnotu
    // zaplaceno na datum zaplaceni (true)
    active.forEach((item) => {
      //TODO: not use forEach
      const wasPayed = fioData.find(
        (j) => (j.column5 && j.column5.value) === item.VS
      );
      if (wasPayed && !item.payed) {
        reservationsFb
          .child(item.key)
          .update({ payed: wasPayed.column0.value });
      }
    });
  }, [fioData]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      {/* <SearchBox
      value={this.state.search}
      handleChange={this.props.handleChange}
    /> */}
      {isAdmin && (
        <a
          style={{ margin: "1rem" }}
          href="https://docs.google.com/document/d/1IJs6FdNeMlR4myrgf4g91vLA4Pc-dF1oEsIwtOgwD5s/edit?usp=sharing"
        >
          Dokumentace
        </a>
      )}
      <div className="admin-layout">
        <h3>Aktuálně zapůjčeno</h3>
        <div className="reservation-table">
          {active.length > 0 ? (
            <Table
              reservations={active}
              title={"Aktuálně zapůjčeno"}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="noData">žádné zapůjčené položky</div>
          )}
        </div>
        <h3>Aktuálně rezervováno</h3>
        <div className="reservation-table">
          {reserved.length > 0 ? (
            <Table
              reservations={reserved}
              title={"Aktuálně rezervováno"}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="noData">žádné rezervované položky</div>
          )}
        </div>
        <h3>Archivované rezervace</h3>
        <div className="reservation-table">
          {archived.length > 0 ? (
            <Table
              reservations={archived}
              title={"Archivované rezervace"}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="noData">žádné archivované rezervace</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reservations;
