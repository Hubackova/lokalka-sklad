import moment from "moment";
import { useState, useEffect } from "react";
import SmtpService from "../SmtpService";



export function sendRentInfo(mailTo, totalPrice, VS) {
  const sender = new SmtpService();
  sender.send(
    "lokalkasklad@gmail.com",
    mailTo,
    `Lokálka-platba`,
    `Ahoj, 
      prosím, uhraď ${totalPrice} Kč za zapůjčení věcí z oddílového skladu.
      Platební údaje:
      Č.ú.: 2801236055 
      Banka: 2010
      VS: ${VS}
      KS: 0400
      Lokálka`,
    "smtp.gmail.com",
    "lokalkasklad@gmail.com",
    "lokalka2019!!!"
  );
}

export function enumerateDaysBetweenDates(startDate, endDate) {
  const currDate = moment(startDate, "YYYY-MM-DD");
  const lastDate = moment(endDate, "YYYY-MM-DD");
  let dates = [currDate.toDate()];
  while (currDate.add(1, "days").diff(lastDate) <= 0) {
    dates.push(currDate.clone().toDate());
  }
  return dates;
}

export function switchName(itemName) {
  switch (true) {
    case itemName.includes("ice-axes"):
      return itemName.replace("ice-axes", "Cepíny");
    case itemName.includes("crampons-frame"):
      return itemName.replace("crampons-frame", "Mačky rámové");
    case itemName.includes("crampons-straps"):
      return itemName.replace("crampons-straps", "Mačky řemínkové");
    case itemName.includes("crampons-semi"):
      return itemName.replace("crampons-semi", "Mačky poloautomaty");
    case itemName.includes("crampons-plastic"):
      return itemName.replace("crampons-plastic", "Mačky plast/plast");
    case itemName.includes("crampons-straps-old"):
      return itemName.replace("crampons-straps-old", "Mačky řemínkové (staré)");
    case itemName.includes("shovel"):
      return itemName.replace("shovel", "Lopata");
    case itemName.includes("probe"):
      return itemName.replace("probe", "Sonda");
    case itemName.includes("beacon"):
      return itemName.replace("beacon", "Vyhledávač");
    default:
      return "";
  }
}

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const CORSBYPASS = "https://api.codetabs.com/v1/proxy?quest=";
  async function fetchUrl() {
    const response = await fetch(`${CORSBYPASS}${url}`);
    const json = await response.json();
    setData(json)
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
