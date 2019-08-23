import React from "react";

const fakeData = {
  accountStatement: {
    info: {
      accountId: "2801236055",
      bankId: "2010",
      currency: "CZK",
      iban: "CZ9020100000002801236055",
      bic: "FIOBCZPPXXX",
      openingBalance: 586048.35,
      closingBalance: 570896.35,
      dateStart: "2019-01-25+0100",
      dateEnd: "2019-02-05+0100",
      yearList: null,
      idList: null,
      idFrom: 18244049850,
      idTo: 18247671520,
      idLastDownload: null
    },
    transactionList: {
      transaction: [
        {
          column22: { value: 18244049850, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-25+0100", name: "Datum", id: 0 },
          column1: { value: 800.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "204300929", name: "Protiúčet", id: 2 },
          column10: { value: "VLASATÝ JAN", name: "Název protiúčtu", id: 10 },
          column3: { value: "0600", name: "Kód banky", id: 3 },
          column12: {
            value: "MONETA Money Bank, a.s.",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: { value: "1981", name: "VS", id: 5 },
          column6: { value: "900", name: "SS", id: 6 },
          column7: {
            value: "VLASATÝ JAN",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Jan Vlasatý - ČHS + oddíl",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "VLASATÝ JAN", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21504346969, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244049851, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-25+0100", name: "Datum", id: 0 },
          column1: { value: 800.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "204300929", name: "Protiúčet", id: 2 },
          column10: { value: "VLASATÝ JAN", name: "Název protiúčtu", id: 10 },
          column3: { value: "0600", name: "Kód banky", id: 3 },
          column12: {
            value: "MONETA Money Bank, a.s.",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: { value: "1985", name: "VS", id: 5 },
          column6: { value: "900", name: "SS", id: 6 },
          column7: {
            value: "VLASATÝ JAN",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Zuzana Vlasatá - ČHS + oddíl",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "VLASATÝ JAN", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21504346970, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244333554, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-25+0100", name: "Datum", id: 0 },
          column1: { value: 200.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "201068992", name: "Protiúčet", id: 2 },
          column10: { value: "ÚHRADA-KARTA", name: "Název protiúčtu", id: 10 },
          column3: { value: "0600", name: "Kód banky", id: 3 },
          column12: {
            value: "MONETA Money Bank, a.s.",
            name: "Název banky",
            id: 12
          },
          column4: { value: "0000", name: "KS", id: 4 },
          column5: null,
          column6: null,
          column7: {
            value: "ÚHRADA-KARTA",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: null,
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "ÚHRADA-KARTA", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21505633631, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812200, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -530.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "670100-2205587617", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "6210", name: "Kód banky", id: 3 },
          column12: {
            value: "mBank S.A., organizační složka",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: null,
          column6: null,
          column7: {
            value: "Pronájem místnosti pro VH",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Pronájem místnosti pro VH",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní platba", name: "Typ", id: 8 },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Pronájem místnosti pro VH",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507573373, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812201, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -4415.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "2400143202", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "2010", name: "Kód banky", id: 3 },
          column12: { value: "Fio banka, a.s.", name: "Název banky", id: 12 },
          column4: { value: "0308", name: "KS", id: 4 },
          column5: { value: "1910054", name: "VS", id: 5 },
          column6: null,
          column7: {
            value: "Tisk Výroční zprávy - 60 Ks",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "HO Lokomotiva, obj CZ-KniWeb-19-00020",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: {
            value: "Platba převodem uvnitř banky",
            name: "Typ",
            id: 8
          },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Tisk Výroční zprávy - 60 Ks",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507573374, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812202, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -415.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "670100-2204577345", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "6210", name: "Kód banky", id: 3 },
          column12: {
            value: "mBank S.A., organizační složka",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: null,
          column6: null,
          column7: {
            value: "Členské kartičky - tisk 190 ks",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Členské kartičky - tisk 190 ks",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní platba", name: "Typ", id: 8 },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Členské kartičky - tisk 190 ks",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507573375, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812203, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -237.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "2300202455", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "2010", name: "Kód banky", id: 3 },
          column12: { value: "Fio banka, a.s.", name: "Název banky", id: 12 },
          column4: null,
          column5: null,
          column6: null,
          column7: {
            value: "Organizace VH - občerstvení",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Organizace VH - občerstvení",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: {
            value: "Platba převodem uvnitř banky",
            name: "Typ",
            id: 8
          },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Organizace VH - občerstvení",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507573376, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812204, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -485.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "670100-2210019278", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "6210", name: "Kód banky", id: 3 },
          column12: {
            value: "mBank S.A., organizační složka",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: null,
          column6: null,
          column7: {
            value: "Organizace VH - občerstvení",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Organizace VH - občerstvení",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní platba", name: "Typ", id: 8 },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Organizace VH - občerstvení",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507573377, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812929, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -15905.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "2200913049", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "2010", name: "Kód banky", id: 3 },
          column12: { value: "Fio banka, a.s.", name: "Název banky", id: 12 },
          column4: null,
          column5: { value: "4679035", name: "VS", id: 5 },
          column6: null,
          column7: {
            value: "CHS clenstvi - obj4",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: null,
          column8: {
            value: "Platba převodem uvnitř banky",
            name: "Typ",
            id: 8
          },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: { value: "CHS clenstvi - obj4", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21507576966, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244812998, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-26+0100", name: "Datum", id: 0 },
          column1: { value: -400.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "2300145825", name: "Protiúčet", id: 2 },
          column10: null,
          column3: { value: "2010", name: "Kód banky", id: 3 },
          column12: { value: "Fio banka, a.s.", name: "Název banky", id: 12 },
          column4: null,
          column5: null,
          column6: null,
          column7: {
            value: "Vratka - ČHS si zajistí sama",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Vratka - ČHS si zajistí sama",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: {
            value: "Platba převodem uvnitř banky",
            name: "Typ",
            id: 8
          },
          column9: { value: "Koutská, Petra", name: "Provedl", id: 9 },
          column18: null,
          column25: {
            value: "Vratka - ČHS si zajistí sama",
            name: "Komentář",
            id: 25
          },
          column26: null,
          column17: { value: 21507577312, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18244969723, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-28+0100", name: "Datum", id: 0 },
          column1: { value: 400.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "1668829083", name: "Protiúčet", id: 2 },
          column10: {
            value: "Barák Petr,Mgr.",
            name: "Název protiúčtu",
            id: 10
          },
          column3: { value: "0800", name: "Kód banky", id: 3 },
          column12: {
            value: "Česká spořitelna, a.s.",
            name: "Název banky",
            id: 12
          },
          column4: { value: "0000", name: "KS", id: 4 },
          column5: { value: "2019", name: "VS", id: 5 },
          column6: { value: "900", name: "SS", id: 6 },
          column7: {
            value: "Barák Petr,Mgr.",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Petr Barák. Platba členství HO.",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "Barák Petr,Mgr.", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21508107442, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18245153235, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-28+0100", name: "Datum", id: 0 },
          column1: { value: 3585.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "224933475", name: "Protiúčet", id: 2 },
          column10: { value: "CERNA DASA", name: "Název protiúčtu", id: 10 },
          column3: { value: "0300", name: "Kód banky", id: 3 },
          column12: { value: "ČSOB, a.s.", name: "Název banky", id: 12 },
          column4: null,
          column5: { value: "1988", name: "VS", id: 5 },
          column6: { value: "950", name: "SS", id: 6 },
          column7: {
            value: "CERNA DASA",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Dasa Cerna",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "CERNA DASA", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21508845418, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18245378889, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-28+0100", name: "Datum", id: 0 },
          column1: { value: 1050.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "670100-2204577345", name: "Protiúčet", id: 2 },
          column10: {
            value: "MICHAELA BOUDOVA",
            name: "Název protiúčtu",
            id: 10
          },
          column3: { value: "6210", name: "Kód banky", id: 3 },
          column12: {
            value: "mBank S.A., organizační složka",
            name: "Název banky",
            id: 12
          },
          column4: null,
          column5: { value: "400", name: "VS", id: 5 },
          column6: null,
          column7: {
            value: "MICHAELA BOUDOVA",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "CLENSKE POPLATKY V HOTOVOSTI Z VALNE, VIZ MAIL",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "MICHAELA BOUDOVA", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21509868546, name: "ID pokynu", id: 17 }
        },
        {
          column22: { value: 18247671520, name: "ID pohybu", id: 22 },
          column0: { value: "2019-01-31+0100", name: "Datum", id: 0 },
          column1: { value: 400.0, name: "Objem", id: 1 },
          column14: { value: "CZK", name: "Měna", id: 14 },
          column2: { value: "1036849123", name: "Protiúčet", id: 2 },
          column10: { value: "Štefek Petr", name: "Název protiúčtu", id: 10 },
          column3: { value: "0800", name: "Kód banky", id: 3 },
          column12: {
            value: "Česká spořitelna, a.s.",
            name: "Název banky",
            id: 12
          },
          column4: { value: "0000", name: "KS", id: 4 },
          column5: { value: "215790", name: "VS", id: 5 },
          column6: { value: "900", name: "SS", id: 6 },
          column7: {
            value: "Štefek Petr",
            name: "Uživatelská identifikace",
            id: 7
          },
          column16: {
            value: "Petr štefek",
            name: "Zpráva pro příjemce",
            id: 16
          },
          column8: { value: "Bezhotovostní příjem", name: "Typ", id: 8 },
          column9: null,
          column18: null,
          column25: { value: "Štefek Petr", name: "Komentář", id: 25 },
          column26: null,
          column17: { value: 21519438963, name: "ID pokynu", id: 17 }
        }
      ]
    }
  }
};

const rentedItems = [
  {
    VS: "215790",
    date: { from: "2019-07-04", to: "2019-07-22" },
    daysNum: 18,
    email: "hubackova.lenka@gmail.com",
    itemName: "crampons-straps-old-20",
    itemNames: ["crampons-straps-old-19", "crampons-straps-old-20"],
    lokoId: "sdfsf",
    payed: false,
    phone: "sdf",
    price: 120,
    rent: false,
    reservationDate: "2019-07-01",
    returned: false,
    key: "-LlOUuppERYLwcmc4h92"
  },
  {
    VS: "215791",
    date: { from: "2019-08-11", to: "2019-08-13" },
    daysNum: 2,
    email: "hubackova.lenka@gmail.com",
    itemName: "beacon-BCA-06",
    itemNames: ["beacon-BCA-06"],
    lokoId: "sdfsf",
    notification: false,
    payed: false,
    phone: "sdf",
    price: 100,
    rent: false,
    reservationDate: "2019-08-11",
    returned: false,
    key: "-Lm-G9RoBVJ3z83CWjzJ"
  }
];

//dejme tomu, ze Spec.S. (column5) bude pro sklad platby 900 (spis neco jinyho)), vyfiltrujeme jen sklad platby:
const fiotest = () => {
  const fioData = fakeData.accountStatement.transactionList.transaction.filter(
    i => {
      return i.column6 && i.column6.value === "900";
    }
  );

  //promapujeme vypujcene polozky a pokud je ve fio zaznam s danym VS, zmenime hodnotu
  // zaplaceno na datum zaplaceni (true)
  const dataWithPaymentDate = rentedItems.map(item => {
    const wasPayed = fioData.find(
      j => (j.column5 && j.column5.value) === item.VS
    );
    if (wasPayed)
      return { ...item, payed: wasPayed.column0.value };
    else return item;
  });

  console.log(dataWithPaymentDate);
  return <div />;
};

export default fiotest;
