let config = require("./config.json");
let pdfkit = require("pdfkit");
let fs = require("fs");
let moment = require("moment");

// Datum auf Deutsch umstellen
moment.locale("de");
let lastLogStatus;

// neues PDF-Dokument erstellen
let doc = new pdfkit({ autoFirstPage: false });
// Ausgabe in Datei umleiten
doc.pipe(fs.createWriteStream("out.pdf"));

// Erste leere eite, wg. Beidseitigem Ausdruck
doc.addPage({ size: "A4" });

// Schriftarten registrieren
doc.registerFont("default", "./HelveticaNeueLTStd-ThCn.otf");
doc.registerFont("bold", "./HelveticaNeueLTStd-MdCn.otf");

// Seiten-Funktionen einbinden
let kalender = require("./functions")(doc, config);

// Startdatum setzen, und Jahr durchlaufen
let datum = moment(config.startDatum);
let woche = moment(config.startDatum);
while (datum.isBefore(config.endDatum)) {
  // Montag - Freitag
  for (let i = 0; i < 5; i++) {
    // linke Seite mit Mo, Di und Mi
    kalender.linkeSeite1(datum, woche);
    datum.add(3, "days");
    // rechte Seite mit Do, Fr und Sa/So
    kalender.rechteSeite2(datum, woche);
    datum.add(4, "days");
  }

  // Nächste Woche
  woche.add(7, "days");
  logStatus(datum);
}

// PDF-File abschließen
doc.end();

function logStatus(datum) {
  if (lastLogStatus == undefined || !lastLogStatus.isSame(datum, "month")) {
    lastLogStatus = datum.clone();
    console.log("generiere '" + datum.format("MMMM YYYY") + "'");
  }
}
