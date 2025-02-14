export const announcements: Announcement[] = [

    {
    title: "Viva La PhyMa Kick-Off am 27.02.!",
    description: "weitere Infos folgen...",
    link: {
      href: "https://wiki.stuve.uni-ulm.de/de/events/partys/vivalawima",
      text: "StuVe-Wiki",
    },
  },
    {
    title: "Hörsaal verschwunden",
    description:
      "Hat irgendjemand schon mal den Hörsaal H6 gefunden?",
  },
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

];

export type Announcement = {
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
  };
};
