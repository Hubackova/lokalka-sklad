import React, { useContext } from "react";
import moment from "moment";
import "./manage.scss";
// import MailSender from "./MailSender";
// import SearchBox from "./SearchBox";
import { useFetch } from "../../utils";
import { UserContext } from "../../Contexts";
import Table from "./ReservationsTable";

const token = "WGnT6TjV92C7w65VWczsCacYKQChLZQjkU3pipZObYXpQMiXoOQKuKwG4QBo2Zai";

const Reservations = ({ reservations }) => {
  const { user } = useContext(UserContext); //TODO: fce isAdmin()
  const isAdmin =
    user.uid === "9AmWsb1PbcgIPTynkHvsYco5XLB3" || user.uid === "Xs0w4MJr5xakWA4XBtAVAhawqzI3";
  const active = isAdmin
    ? reservations.filter(i => i.rent && (!i.returned || !i.payed))
    : reservations.filter(i => i.rent && (!i.returned || !i.payed) && i.email === user.email);
  const reserved = isAdmin
    ? reservations.filter(i => !i.rent && (!i.returned || !i.payed))
    : reservations.filter(i => !i.rent && (!i.returned || !i.payed) && i.email === user.email);
  const archived = isAdmin
    ? reservations.filter(i => i.returned && i.payed)
    : reservations.filter(i => i.returned && i.payed && i.email === user.email);

  const now = moment(new Date()).format("YYYY-MM-DD");
  const fioDateFrom = moment
    .min(active.map(reservation => moment(reservation.reservationDate)))
    .format("YYYY-MM-DD");
  const [dataFio, loading] = useFetch(
    `https://www.fio.cz/ib_api/rest/periods/${token}/${fioDateFrom}/${now}/transactions.json`
  );
  const fioData = dataFio.accountStatement
    ? dataFio.accountStatement.transactionList.transaction
    : [];

  //promapujeme vypujcene polozky a pokud je ve fio zaznam s danym VS, zmenime hodnotu
  // zaplaceno na datum zaplaceni (true)
  const dataWithPaymentDate = active.map(item => {
    const wasPayed = fioData.find(j => (j.column5 && j.column5.value) === item.VS);
    if (wasPayed) {
      return { ...item, payed: wasPayed.column0.value };
    } else return item;
  });

  return loading ? (
    "Loading..."
  ) : (
    <>
      {/* <SearchBox
      value={this.state.search}
      handleChange={this.props.handleChange}
    /> */}
      <div className="admin-layout">
        <div className="reservation-table">
          <Table reservations={active} title={"Aktuálně zapůjčeno"} isAdmin={isAdmin} />
        </div>

        <div className="reservation-table">
          <Table reservations={reserved} title={"Aktuálně rezervováno"} isAdmin={isAdmin} />
        </div>

        <div className="reservation-table">
          <Table reservations={archived} title={"Archivované rezervace"} isAdmin={isAdmin} />
        </div>
      </div>
    </>
  );
};

export default Reservations;
