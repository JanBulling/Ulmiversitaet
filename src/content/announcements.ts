export const announcements: Announcement[] = [
  {
    title: "Ulmiversität auf Instagram!",
    description: "Folge uns hier auf Insta!",
    link: {
      href: "https://instagram.com/ulmiversitaet",
      text: "Instagram",
    },
  },
  {
    title: "Jan ist in Uppsala",
    description:
      "Ab dem 16. Januar 2025 ist Jan leider nicht mehr in Ulm. Aber keine Sorge: Er kommt wieder zurück!",
  },
  {
    title: "Weihnachtsvorlesung",
    description:
      "Am 19.12.2024 findet dieses Jahr die Weihnachtsvorlesung in H4/5 um 16:00Uhr statt!",
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
