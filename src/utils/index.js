import moment from "moment";
import { useState, useEffect } from "react";
import SmtpService from "../SmtpService";

export function sendRentInfo(mailTo, totalPrice, VS, otherNames) {
  const sender = new SmtpService();
  const mailText = `Ahoj, 
  prosím, uhraď ${totalPrice} Kč za zapůjčení věcí z oddílového skladu (${otherNames}). Díky.
  Platební údaje:
  Č.ú.: 2801236055;
  Banka: 2010;
  Variabilní symbol: ${VS};
  Specifický symbol : 300
  `;

  sender.send(
    "lokalkasklad@gmail.com",
    [mailTo, "hubackova.lenka@gmail.com"],
    `Lokálka-platba`,
    mailText,
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
    case itemName.includes("ice-axes-raveltik"):
      return itemName.replace("ice-axes-raveltik", "Cepín Raveltik");
    case itemName.includes("ice-axes-gladiator"):
      return itemName.replace("ice-axes-gladiator", "Cepín Gladiator");
    case itemName.includes("ice-axes-supercup"):
      return itemName.replace("ice-axes-supercup", "Cepín Super Cup");
    case itemName.includes("ice-axes-RE-turistic"):
      return itemName.replace("ice-axes-RE-turistic", "Cepín Turistický RE ");
    case itemName.includes("ice-axes-Raveltic-turistic"):
      return itemName.replace("ice-axes-Raveltic-turistic", "Cepín Turistický Raveltik");
    case itemName.includes("ice-axes-BD-turistic"):
      return itemName.replace("ice-axes-BD-turistic", "Cepín Turistický BD");
    case itemName.includes("ice-axes-Grivel-turistic"):
      return itemName.replace("ice-axes-Grivel-turistic", "Cepín Turistický Grivel");
    case itemName.includes("crampons-semi"):
      return itemName.replace("crampons-semi", "Mačky RE - poloautomaty");
    case itemName.includes("crampons-uni"):
      return itemName.replace("crampons-uni", "Mačky RE - uni");
    case itemName.includes("crampons-petzl"):
      return itemName.replace("crampons-petzl", "Mačky Petzl Plaut");
    case itemName.includes("crampons-cassin"):
      return itemName.replace("crampons-cassin", "Mačky Cassin");
    case itemName.includes("crampons-frame"):
      return itemName.replace("crampons-frame", "Mačky automat/rámovky");
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
  const lastUpdate = sessionStorage.getItem("timeupdate");
  const secondsDiff = moment(new Date()).diff(lastUpdate, "seconds");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(secondsDiff > 30 ? true : false);
  const CORSBYPASS = "https://api.codetabs.com/v1/proxy?quest=";
  async function fetchUrl() {
    const response = await fetch(`${CORSBYPASS}${url}`);
    const json = await response.json();
    setData(json);
    setLoading(false);
    sessionStorage.setItem("timeupdate", moment(new Date()));
  }

  useEffect(() => {
    (!secondsDiff || secondsDiff > 30) && fetchUrl();
  }, []);
  return [data, loading];
}

export function isAdmin(user) {
  return user.uid === process.env.REACT_APP_ADMIN_KEY_1 || user.uid === process.env.REACT_APP_ADMIN_KEY_2;
}