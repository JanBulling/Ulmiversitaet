export const announcements: Announcement[] = [
    {
    title: "🎓 Ulmiversität 2.0",
    description:
      "Wir arbeiten aktuell intensiv an einer neuen Version der Ulmiversität. Diese wird ein neues Design und viele neue Funktionen beinhalten. Falls du Ideen oder Vorschläge hast, kannst du uns gerne kontaktieren!",
  },
  {
    title: "🚍 ÖPNV-Echtzeitdaten!",
    description: "Die Ulmiversität hat nun Echtzeitdaten für den ÖPNV integriert. Die Abfahrtenanzeige zeigt jetzt die nächsten Abfahrten in Echtzeit an.",
  },

  {
    title: "📚 Klausurenphase!",
    description:
      "Wir wünschen euch viel Erfolg in der Klausurenphase!",
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
