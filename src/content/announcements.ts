export const announcements: Announcement[] = [
        {
    title: "Sommersemester!",
    description:
      "Wir wünschen euch viel Spaß und Lernerfolg im Sommersemester",
  },
    {
    title: "Viva La PhyMa",
    description:
      "Am 05.06. findet die beste Uniparty des Jahres im Forum statt! Der Vorverkauf startet am 22.05. um 12 Uhr.",
  },
  {
    title: "Jan ist in Uppsala",
    description:
      "Ab dem 16. Januar 2025 ist Jan leider nicht mehr in Ulm. Aber keine Sorge: Er kommt wieder zurück!",
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
