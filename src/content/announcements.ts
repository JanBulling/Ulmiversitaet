export const announcements: Announcement[] = [
        {
    title: "Semesterferien",
    description:
      "Wir wünschen euch allen eine schöne vorlesungsfreie Zeit!",
  },
    {
    title: "Hörsaal verschwunden",
    description:
      "Hat irgendjemand schon mal den Hörsaal H6 gefunden?",
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
