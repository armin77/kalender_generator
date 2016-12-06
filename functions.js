let _      = require('underscore');
let moment = require('moment');

module.exports = (doc, config) => {

  return {
    // linke Seite für einen normalen Wochentag
    linkeSeite: (datum) => {
      // Linke Seite Wochentag
      doc.addPage({
        size: 'A4',
        margins: {top: 20, bottom: 20, left: 20, right: 20}
      });

      doc.fontSize(28)
        .text(datum.format(config.formatDatum), {
          align: 'left'
        });

      subtitel(datum, 'left');

      // Titel-Linie
      doc.moveTo(20,69.4)
        .lineTo(576, 69.4)
        .stroke('#000');

      let delta = 28;
      let uhrzeit = 7;
      for(let i = 0; i<=25; i++) {
        doc.moveTo(20,100 + i*delta).lineTo(556, 100 + i*delta).stroke('#ccc');

        let tmp = (i % 2 == 0) ? (uhrzeit + ":00") : ((uhrzeit++) + ":30");
        tmp = (tmp.length < 5) ? "0"+tmp : tmp;

        doc.fontSize(14).fillColor( (i % 2 == 0) ? '#000' : '#aaa' ).text(tmp, 20, 100-14 + i*delta)
      }
    },

    // rechte Seite für einen Sonntag
    rechteSeiteSonntag: (datum) => {
      // Linke Seite Wochentag
      doc.addPage({
        size: 'A4',
        margins: {top: 20, bottom: 20, left: 20, right: 20}
      });

      doc.fontSize(28)
        .text(datum.format(config.formatDatum), {
          align: 'right'
        });

      subtitel(datum, 'right');

      // Titel-Linie
      doc.moveTo(20,69.4)
        .lineTo(576, 69.4)
        .stroke('#000');

      let delta = 28;
      let uhrzeit = 7;
      for(let i = 0; i<=25; i++) {
        doc.moveTo(40,100 + i*delta).lineTo(576, 100 + i*delta).stroke('#bbb');

        let tmp = (i % 2 == 0) ? (uhrzeit + ":00") : ((uhrzeit++) + ":30");
        tmp = (tmp.length < 5) ? "0"+tmp : tmp;

        doc.fontSize(14).fillColor( (i % 2 == 0) ? '#000' : '#aaa' ).text(tmp, 20, 100-14 + i*delta, {align: 'right'})
      }
    },

    // Standard rechte Seite für normalen Wochentag
    rechteSeite: (datum) => {

      // Rechte Seite Wochentag
      doc.addPage({
        size: 'A4',
        margins: {top: 20, bottom: 20, left: 20, right: 20}
      });

      doc.fontSize(28)
        .text(datum.format(config.formatDatum), {
          align: 'right'
        });

      subtitel(datum, 'right');

      // Titel-Linie
      doc.moveTo(20,69.4)
        .lineTo(576, 69.4)
        .stroke('#000');

      let delta = 28;
      for(let i = 0; i<=25; i++) {
        doc.moveTo(40,100 + i*delta).lineTo(576, 100 + i*delta).stroke('#bbb');
      }

      delta = 5*delta;
      for(let i = 0; i<5; i++) {
        doc.rect(40, 100 + i*delta, 536/2, delta).stroke('#000');
        doc.rect(308, 100 + i*delta, 536/2, delta).stroke('#000');
      }
    },
  }

  // Wenn Ferientag oder Feiertag, dann Untertitel anzeigen
  function subtitel(datum, align) {
    let subtitel = "";

    let feiertag = isFeiertag(datum);
    let ferientag = isFerientag(datum);

    if (feiertag) {
      subtitel += feiertag.titel;
    }

    if (ferientag) {
      if (feiertag) subtitel += " ";
      subtitel += "(" + ferientag.titel + ")";
    }

    doc.fontSize(17).text(subtitel, {align});
  }

  // Prüfen, ob Datum ein Feiertag ist
  function isFeiertag(datum) {
    let found = false;
    _(config.feiertage).each(d => {
      if (datum.isSame(d.datum, 'day')) { found = d; }
    });

    return found;
  }

  // Prüfen, ob Datum in einem Ferienzeitraum liegt
  function isFerientag(datum) {
    let found = false;
    _(config.ferien).each(d => {
      if (datum.isBetween(d.von, d.bis, null, '[]')) { found = d; }
    });

    return found;
  }
}