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
  paymentParking,
  busStops,
  other,
];
