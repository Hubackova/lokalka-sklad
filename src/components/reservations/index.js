import React from "react";
import moment from "moment";
import "./manage.scss";
import MailSender from "./MailSender";
import SearchBox from "./SearchBox";
import { useFetch } from "../../utils";

import Table from "./ReservationsTable";
import { debug } from "util";

const token = "WGnT6TjV92C7w65VWczsCacYKQChLZQjkU3pipZObYXpQMiXoOQKuKwG4QBo2Zai"


const Reservations = ( { reservations }) => {

  const active = reservations.filter(i => i.rent && (!i.returned || !i.payed))
  const reserved = reservations.filter(i => !i.rent && (!i.returned || !i.payed))
  const archived = reservations.filter(i => i.returned && i.payed);

  const now = moment(new Date()).format("YYYY-MM-DD")
  const fioDateFrom = moment.min(active.map(reservation => moment(reservation.reservationDate))).format("YYYY-MM-DD")
  const [dataFio, loading] = useFetch(`https://www.fio.cz/ib_api/rest/periods/${token}/${fioDateFrom}/${now}/transactions.json`);
  const tr = dataFio.accountStatement ? dataFio.accountStatement.transactionList.transaction : []
  console.log(tr, reservations)

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
        <Table reservations={active} title={"Aktuálně zapůjčeno"} />
      </div>

      <div className="reservation-table">
        <Table reservations={reserved} title={"Aktuálně rezervováno"} />
      </div>

      <div className="reservation-table">
        <Table reservations={archived} title={"Archivované rezervace"} />
      </div>
    </div>
  </>
  );
};

export default Reservations;
