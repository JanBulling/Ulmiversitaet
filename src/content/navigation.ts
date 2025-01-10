export const paymentChipCard: NavigationLocations = {
  title: "Mensageld aufladen",
  color: "#dc2626",
  coordinates: [
    {
      lat: 48.42224495590038,
      lng: 9.955537565980075,
      comment: "2x nebeneinander",
    },
    {
      lat: 48.422342123752735,
      lng: 9.955451694348795,
      comment: "Mit Bargeld aufladen",
    },
    { lat: 48.42131433236436, lng: 9.948446646310833 },
    { lat: 48.42105370715579, lng: 9.948803763723342 },
    { lat: 48.423019021868804, lng: 9.953637805750667 },
  ],
};

export const printing: NavigationLocations = {
  title: "Drucken",
  color: "#737373",
  coordinates: [
    { lat: 48.42159412621158, lng: 9.948311686305349 },
    {
      lat: 48.42082148425913,
      lng: 9.947634002127085,
      comment: "PC-Pool 2, 41.2.1011/2",
    },
    {
      lat: 48.42064234182948,
      lng: 9.947789819952131,
      comment: "PC-Pool 9, 41.2.101.4",
    },
    {
      lat: 48.42263097122526,
      lng: 9.953297448337,
      comment: "PC-Pool 1, M23/263",
    },
    {
      lat: 48.42273521464681,
      lng: 9.955427569850416,
      comment: "PC-Pool 5, N25/1303",
    },
    {
      lat: 48.423139534615935,
      lng: 9.957176941104994,
      comment: "PC-Pool 6, O27/214",
    },
    {
      lat: 48.42323071680837,
      lng: 9.954346176535772,
      comment: "PC-Pool 8, M25/2403",
    },
    {
      lat: 48.42245289618264,
      lng: 9.95620799218685,
      comment: "PC-Pool 11, O26/198",
    },
    { lat: 48.42297244793778, lng: 9.957280029312436, comment: "O27/2204" },
  ],
};

export const paymentParking: NavigationLocations = {
  title: "Parkgebüren aufladen",
  color: "#2563eb",
  coordinates: [
    {
      lat: 48.42441077473411,
      lng: 9.951792301905845,
      comment: "Parkhaus Mitte",
    },
    {
      lat: 48.4240044577673,
      lng: 9.950879369841175,
      comment: "Parkhaus Mitte",
    },
    // {
    //   lat: 48.426236203352,
    //   lng: 9.959383888519588,
    //   comment: "Auf Parkplatz P41",
    // },
    // {
    //   lat: 48.4259736499066,
    //   lng: 9.962540892110141,
    //   comment: "Auf Parkplatz 44 (Helmholtzstr.)",
    // },
    { lat: 48.4235805437592, lng: 9.955630155789553 },
    {
      lat: 48.4198069335824,
      lng: 9.9436233247993,
      comment: "Auf Parkplatz P10",
    },
    {
      lat: 48.42185492820063,
      lng: 9.947865482703637,
      comment: "Auf Parkplatz P15",
    },
    {
      lat: 48.421619998380955,
      lng: 9.951283143440738,
      comment: "Vor der Strahlentherapie",
    },
    { lat: 48.42364452293554, lng: 9.952224076377856 },
  ],
};

export const renewChipCard: NavigationLocations = {
  title: "Chipkarte erneuern",
  color: "#16a34a",
  coordinates: [
    { lat: 48.422248520512774, lng: 9.955587812596077 },
    { lat: 48.42321150415397, lng: 9.95376306378205 },
  ],
};

export const busStops: NavigationLocations = {
  title: "ÖPNV Haltestellen",
  color: "#eab308",
  coordinates: [
    {
      lat: 48.425072937575536,
      lng: 9.956742112126806,
      comment: "Botanischer Garten",
    },
    {
      lat: 48.421965500564134,
      lng: 9.956550153435014,
      comment: "Universität Süd",
    },
    {
      lat: 48.424353877346114,
      lng: 9.952444347466288,
      comment: "Kliniken-Wissenschaftsstadt",
    },
    {
      lat: 48.42197597416791,
      lng: 9.947119308256777,
      comment: "Universität West",
    },
    {
      lat: 48.41972975451537,
      lng: 9.942633566570018,
      comment: "Manfred-Börner-Straße",
    },
  ],
};

export const other: NavigationLocations = {
  title: "Sonstiges",
  color: "#db2777",
  coordinates: [
    { lat: 48.419265957719226, lng: 9.943009685578437, comment: "Börner-Bar" },
    { lat: 48.42204568561756, lng: 9.951635873756777, comment: "Notaufnahme" },
    { lat: 48.42150798902182, lng: 9.9485932029148, comment: "Bibliothek" },
  ],
};

type NavigationLocations = {
  title: string;
  color: string;
  coordinates: { lat: number; lng: number; comment?: string }[];
};

export const navigationLocations = [
  renewChipCard,
  paymentChipCard,
  printing,
  paymentParking,
  busStops,
  other,
];
