export const quickSelect = [
  {
    name: "Moodle",
    href: "https://moodle.uni-ulm.de",
    description: "Lernplatform",
    image: "/img/moodle.png",
  },
  {
    name: "CampusOnline",
    href: "https://campusonline.uni-ulm.de/",
    description: "Prüfungsübersicht",
    image: "/img/uni-logo.png",
    darkImageInvert: true,
  },
  {
    name: "Sogo",
    href: "https://sogo.uni-ulm.de/",
    description: "E-Mails",
    image: "/img/sogo.png",
  },
  {
    name: "Campus 4",
    href: "https://campus4.uni-ulm.de/",
    description: "Studienbescheinigungen",
    image: "/img/campus4.png",
    darkImageInvert: true,
  },
  {
    name: "Mensa",
    href: "https://mensa.jan-bulling.com",
    description: "Essensangebot",
    image: "/img/studierendenwerk.png",
  },
  {
    name: "CloudStore",
    href: "https://cloudstore.uni-ulm.de",
    description: "Cloud Speicherplatz",
    image: "/img/cloudstore.webp",
  },
  {
    name: "Print@Uni",
    href: "https://print.uni-ulm.de",
    description: "Drucken im Uninetz",
    image: "/img/print-logo.png",
  },
];

export type QuickSelect = (typeof quickSelect)[number];
