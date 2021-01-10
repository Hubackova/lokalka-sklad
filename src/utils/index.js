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
    case itemName.includes("ice-axes-bandit"):
      return itemName.replace("ice-axes-bandit", "Cepín SR Bandit");
    case itemName.includes("ice-axes-raveltik"):
      return itemName.replace("ice-axes-raveltik", "Cepín Raveltik");
    case itemName.includes("ice-axes-ergo"):
      return itemName.replace("ice-axes-ergo", "Cepín - Petzl Ergo");
    case itemName.includes("ice-axes-gladiator-01"):
      return itemName.replace("ice-axes-gladiator-01", "Cepín Gladiator G1");
    case itemName.includes("ice-axes-gladiator-02"):
      return itemName.replace("ice-axes-gladiator-02", "Cepín Gladiator G2");

    //u demon a super cup trochu komplikovane cislovani, takze to musi byt takto
    case itemName.includes("ice-axes-supercup-01"):
      return itemName.replace("ice-axes-supercup-01", "Cepín Demon R3");
    case itemName.includes("ice-axes-supercup-02"):
      return itemName.replace("ice-axes-supercup-02", "Cepín Demon R4");
    case itemName.includes("ice-axes-supercup-03"):
      return itemName.replace("ice-axes-supercup-03", "Cepín Super Cup R1");
    case itemName.includes("ice-axes-supercup-04"):
      return itemName.replace("ice-axes-supercup-04", "Cepín Super Cup R2");

    case itemName.includes("ice-axes-RE-turistic"):
      return itemName.replace("ice-axes-RE-turistic", "Cepín Turistický RE ");
    case itemName.includes("ice-axes-Raveltic-turistic"):
      return itemName.replace(
        "ice-axes-Raveltic-turistic",
        "Cepín Turistický Raveltik"
      );
    case itemName.includes("ice-axes-BD-turistic"):
      return itemName.replace("ice-axes-BD-turistic", "Cepín Turistický BD");
    case itemName.includes("ice-axes-Grivel-turistic"):
      return itemName.replace(
        "ice-axes-Grivel-turistic",
        "Cepín Turistický Grivel"
      );

    case itemName.includes("crampons-semi-01"):
      return itemName.replace("crampons-semi-01", "Mačky RE - poloautomaty 01");
    case itemName.includes("crampons-semi-02"):
      return itemName.replace("crampons-semi-02", "Mačky RE - poloautomaty 09");
    case itemName.includes("crampons-semi-03"):
      return itemName.replace("crampons-semi-03", "Mačky RE - poloautomaty 04");

    case itemName.includes("crampons-uni-01"):
      return itemName.replace("crampons-uni-01", "Mačky RE - uni 13");
    case itemName.includes("crampons-uni-02"):
      return itemName.replace("crampons-uni-02", "Mačky RE - uni 03");
    case itemName.includes("crampons-uni-03"):
      return itemName.replace("crampons-uni-03", "Mačky RE - uni 07");
    case itemName.includes("crampons-uni-04"):
      return itemName.replace("crampons-uni-04", "Mačky RE - uni 08");
    case itemName.includes("crampons-uni-05"):
      return itemName.replace("crampons-uni-05", "Mačky RE - uni 06");

    case itemName.includes("crampons-petzl"):
      return itemName.replace("crampons-petzl", "Mačky Petzl Plaut");

    case itemName.includes("crampons-cassin-01"):
      return itemName.replace("crampons-cassin-01", "Mačky Cassin 10");
    case itemName.includes("crampons-cassin-02"):
      return itemName.replace("crampons-cassin-02", "Mačky Cassin 11");
    case itemName.includes("crampons-cassin-03"):
      return itemName.replace("crampons-cassin-03", "Mačky Cassin 12");

    case itemName.includes("crampons-frame"):
      return itemName.replace("crampons-frame", "Mačky automat/rámovky");
    case itemName.includes("shovel"):
      return itemName.replace("shovel", "Lopata");
    case itemName.includes("probe"):
      return itemName.replace("probe", "Sonda");
    case itemName.includes("beacon"):
      return itemName.replace("beacon", "Vyhledávač");
    case itemName.includes("drytool-shoes"):
      return itemName.replace(
        "drytool-shoes",
        "Drytool boty Triop Capoeira 39"
      );
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
  if (
    document.location.hostname === "localhost" &&
    user.email === "hubackova.lenka@gmail.com"
  )
    return true;
  return (
    user.uid === process.env.REACT_APP_ADMIN_KEY_1 ||
    user.uid === process.env.REACT_APP_ADMIN_KEY_2 ||
    user.uid === process.env.REACT_APP_ADMIN_KEY_3
  );
}
