import moment from "moment";

export function enumerateDaysBetweenDates(startDate, endDate) {
    const currDate = moment(startDate, "YYYY-MM-DD");
    const lastDate = moment(endDate, "YYYY-MM-DD");
    let dates = [currDate.toDate()];
    while (currDate.add(1, "days").diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
    }
    return dates;
  }