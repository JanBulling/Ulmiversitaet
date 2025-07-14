export const announcements: Announcement[] = [
  
  {
    title: "ÖPNV-Echtzeitdaten!",
    description: "Die Ulmiversität hat nun Echtzeitdaten für den ÖPNV integriert. Die Abfahrtenanzeige zeigt jetzt die nächsten Abfahrten in Echtzeit an.",
  },

  

    {
    title: "Klausurenphase!",
    description:
      "Wir wünschen euch viel Erfolg in der Klausurenphase!",
  },
  {
    title: "Jan ist wieder da!",
    description:
      "Jan ist aus Uppsala zurückgekehrt und wieder in Ulm!",
  },


];

export type Announcement = {
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
  };
};
