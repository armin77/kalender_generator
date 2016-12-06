let config = require('./config.json');
let pdfkit = require('pdfkit');
let fs     = require('fs');
let moment = require('moment');

// Datum auf Deutsch umstellen
moment.locale('de');

// neues PDF-Dokument erstellen
let doc = new pdfkit({autoFirstPage: false});
// Ausgabe in Datei umleiten
doc.pipe( fs.createWriteStream('out.pdf') );

// Erste leere eite, wg. Beidseitigem Ausdruck
doc.addPage({ size: 'A4' });

// Schriftart setzen
doc.font('./HelveticaNeueLTStd-ThCn.otf');

// Seiten-Funktionen einbinden
let kalender = require('./functions')(doc, config);

// Startdatum setzen, und Jahr durchlaufen
let datum = moment(config.startDatum);
while (datum.isBefore(config.endDatum)) {   

  kalender.linkeSeite(datum);

  // Samstags -> Sonntag
  if (datum.weekday() === 5) {
    datum.add(1, 'days');
    kalender.rechteSeiteSonntag(datum);
    logStatus(datum);
  } else {
    kalender.rechteSeite(datum)
  }

  datum.add(1, 'days');
  logStatus(datum);
}

// PDF-File abschließen
doc.end();

function logStatus(datum) {
    if (datum.format("D") === "1")
      console.log("generiere '"+ datum.format("MMMM YYYY") +"'");
}