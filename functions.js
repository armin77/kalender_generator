let _ = require("underscore");
let moment = require("moment");

module.exports = (doc, config) => {
  return {
    // linke Seite für einen normalen Wochentag
    tischkalenderSeite: (datum) => {
      doc.addPage({
        size: "A4",
        layout: "landscape",
        margins: { top: 25, bottom: 20, left: 20, right: 20 },
      });

      let von = datum.clone();
      let bis = datum.clone().add(6, "days");
      von = von.isSame(bis, "month")
        ? von.format("DD.")
        : von.format("DD. MMMM");

      titel(`Woche vom ${von} bis ${bis.format("DD. MMMM")}`, {
        align: "left",
      });

      // Titel-Linie
      doc.moveTo(20, 52).lineTo(820, 52).stroke("#000");

      // Linie unter dem Datum
      doc.moveTo(20, 95).lineTo(820, 95).stroke("#666");

      delta = 133.333;
      for (let i = 0; i < 6; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20 + i * delta, 60, delta, 243).stroke("#000");

        // Tagesdatum
        const txt =
          i < 5
            ? date.format("DD.dddd")
            : `${date.format("DD.")}Sa / ${date.add(1, "day").format("DD.")}So`;
        doc
          .font("bold")
          .fontSize(14)
          .fillColor("black")
          .text(txt, 25 + i * delta, 65, {
            width: 556 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left", fontSize: 8 });
      }
      // Linien
      delta2 = 26;
      for (let j = 1; j < 8; j++) {
        doc
          .moveTo(20, 95 + j * delta2)
          .lineTo(820, 95 + j * delta2)
          .stroke("#bbb");
      }
    },

    // linke Seite für drei Wochentag2
    linkeSeiteSingleDay: (datum, woche) => {
      // Linke Seite Wochentag
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      let von = woche.clone();
      let bis = woche.clone().add(6, "days");
      von = von.isSame(bis, "month")
        ? von.format("DD.")
        : von.format("DD. MMMM");

      titel(`Woche vom ${von} bis ${bis.format("DD. MMMM")}`, {
        align: "left",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      delta = 250;
      for (let i = 0; i < 1; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60, 556, 3 * delta).stroke("#000");
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 27; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },

    // Standard rechte Seite für normalen Wochentag
    rechteSeiteSingleDay: (datum, woche) => {
      // Rechte Seite Wochentag
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      const wo = woche.clone().format("wo");
      const yr = woche.clone().format("gggg");
      titel(`${wo} Kalenderwoche ${yr}`, {
        align: "right",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      // Donnerstag + Freitag
      delta = 250;
      for (let i = 0; i < 1; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60, 556, 3 * delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "right",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "right" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 27; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },

    // linke Seite für drei Wochentag2
    linkeSeite1: (datum, woche) => {
      // Linke Seite Wochentag
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      let von = woche.clone();
      let bis = woche.clone().add(6, "days");
      von = von.isSame(bis, "month")
        ? von.format("DD.")
        : von.format("DD. MMMM");

      titel(`Woche vom ${von} bis ${bis.format("DD. MMMM")}`, {
        align: "left",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      delta = 250;
      for (let i = 0; i < 3; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556, delta).stroke("#000");
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },

    linkeSeite2: (datum, woche) => {
      // Linke Seite Wochentag für Herzkatheter
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      let von = woche.clone();
      let bis = woche.clone().add(6, "days");
      von = von.isSame(bis, "month")
        ? von.format("DD.")
        : von.format("DD. MMMM");

      titel(`Woche vom ${von} bis ${bis.format("DD. MMMM")}`, {
        align: "left",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      delta = 250;
      for (let i = 0; i < 3; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556, delta).stroke("#000");
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
      // SAMSTAG
      {
        let i = 2;
        const date = datum.clone().add(2, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556 / 2, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576 / 2 + 10, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 / 2 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576 / 2 + 10, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }

      // SONNTAG
      {
        let i = 2;
        const date = datum.clone().add(3, "days");

        // Kasten
        doc.rect(576 / 2 + 10, 60 + i * delta, 556 / 2, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(576 / 2 + 10, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fillColor("black")
          .fontSize(16)
          .text(txt, 556 / 2 + 20, 65 + i * delta, {
            width: 556 / 2 - 5,
            align: "right",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "right", width: 556 / 2 - 5 });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(576 / 2 + 10, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },

    // Standard rechte Seite für normalen Wochentag
    rechteSeite1: (datum, woche) => {
      // Rechte Seite Wochentag
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      const wo = woche.clone().format("wo");
      const yr = woche.clone().format("gggg");
      titel(`${wo} Kalenderwoche ${yr}`, {
        align: "right",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      // Donnerstag + Freitag
      delta = 250;
      for (let i = 0; i < 3; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "right",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "right" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },

    // Standard rechte Seite für normalen Wochentag für Herzkatheter
    rechteSeite2: (datum, woche) => {
      // Rechte Seite Wochentag
      doc.addPage({
        size: "A4",
        margins: { top: 20, bottom: 20, left: 20, right: 20 },
      });

      const wo = woche.clone().format("wo");
      const yr = woche.clone().format("gggg");
      titel(`${wo} Kalenderwoche ${yr}`, {
        align: "right",
      });

      // Titel-Linie
      doc.moveTo(20, 49.4).lineTo(576, 49.4).stroke("#000");

      // Donnerstag + Freitag
      delta = 250;
      for (let i = 0; i < 2; i++) {
        const date = datum.clone().add(i, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 - 10,
            align: "right",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "right" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }

      // SAMSTAG
      {
        let i = 2;
        const date = datum.clone().add(2, "days");

        // Kasten
        doc.rect(20, 60 + i * delta, 556 / 2, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(20, 100 + i * delta)
          .lineTo(576 / 2 + 10, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fontSize(16)
          .fillColor("black")
          .text(txt, 25, 65 + i * delta, {
            width: 556 / 2 - 10,
            align: "left",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "left" });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(20, 101 + i * delta + j * delta2)
            .lineTo(576 / 2 + 10, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }

      // SONNTAG
      {
        let i = 2;
        const date = datum.clone().add(3, "days");

        // Kasten
        doc.rect(576 / 2 + 10, 60 + i * delta, 556 / 2, delta).stroke("#000");
        // Linie unter Datum
        doc
          .moveTo(576 / 2 + 10, 100 + i * delta)
          .lineTo(576, 100 + i * delta)
          .stroke("#666");

        // Tagesdatum
        const txt = date.format("dddd, DD.MMMM");
        doc
          .font("bold")
          .fillColor("black")
          .fontSize(16)
          .text(txt, 556 / 2 + 20, 65 + i * delta, {
            width: 556 / 2 - 5,
            align: "right",
          });

        // ggfs. Feiertage / Ferien
        subtitel(date, { align: "right", width: 556 / 2 - 5 });

        // Linien
        delta2 = 26;
        for (let j = 1; j < 8; j++) {
          doc
            .moveTo(576 / 2 + 10, 101 + i * delta + j * delta2)
            .lineTo(576, 101 + i * delta + j * delta2)
            .stroke("#bbb");
        }
      }
    },
  };

  // Wenn Ferientag oder Feiertag, dann Untertitel anzeigen
  function titel(title, params) {
    doc
      .font("default")
      .fontSize(28)
      .fillColor("black")
      .text(title, {
        ...params,
      });
  }

  // Wenn Ferientag oder Feiertag, dann Untertitel anzeigen
  function subtitel(datum, params) {
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

    doc
      .font("bold")
      .fontSize(params.fontSize || 14)
      .fillColor("red")
      .text(subtitel, { width: 556 - 10, ...params });
  }

  // Prüfen, ob Datum ein Feiertag ist
  function isFeiertag(datum) {
    let found = false;
    _(config.feiertage).each((d) => {
      if (datum.isSame(d.datum, "day")) {
        found = d;
      }
    });

    return found;
  }

  // Prüfen, ob Datum in einem Ferienzeitraum liegt
  function isFerientag(datum) {
    let found = false;
    _(config.ferien).each((d) => {
      if (datum.isBetween(d.von, d.bis, null, "[]")) {
        found = d;
      }
    });

    return found;
  }
};
