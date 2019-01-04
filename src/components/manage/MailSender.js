import React from "react";
import moment from "moment";
import SmtpService from "../../SmtpService";
import { people } from "../../data/people";
import { reservationsRef } from "../../firebase";

function switchName(item) {
  switch (true) {
    case item.includes("vrtacka"):
      return ["vrtačky", "vrtačku"];
    case item.includes("capoeira"):
      return ["drytoolových bot", "drytoolové boty"];
    default:
      return "";
  }
}

function sendMail(i, days) {
  const { key, userId, itemName, date, notification } = i;
  if (notification) return;
  const mailTo = people.find(i => i.id === userId).mail;
  const itemA = switchName(itemName)[0];
  const itemB = switchName(itemName)[1];
  const sender = new SmtpService();
  sender.send(
    "lokalkasklad@gmail.com",
    mailTo,
    `Vrácení ${itemA}`,
    `Ahoj, 
      dne ${
        date.to
      } jsi měl do oddílového skladu vrátit ${itemB}. Máš skluz ${days} ${
      days === 1 ? "den" : days < 5 ? "dny" : "dnů"
    }, prosíme proto o vrácení co nejdříve. 
      Lokálka`,
    "smtp.gmail.com",
    "lokalkasklad@gmail.com",
    "lokalka2019!!!"
  );
  updateReservation(key);
}

function updateReservation(id) {
    const formattedDate = moment().format("YYYY-MM-DD")
  reservationsRef.child(id).update({ notification: formattedDate });
}

const MailSender = ({ i, color, daysToReturn }) => {
  return (
    <i
      className={"fa fa-envelope"}
      onClick={() => sendMail(i, daysToReturn * -1)}
      style={{
        color: i.notification ? "grey" : color,
        cursor: i.notification ? "not-allowed" : "pointer"
      }}
    />
  );
};

export default MailSender;
