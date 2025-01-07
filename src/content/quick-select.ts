export const quickSelect = [
  {
    name: "Moodle",
    href: "https://moodle.uni-ulm.de",
    description: "Lernplatform",
  },
  {
    name: "CampusOnline",
    href: "https://moodle.uni-ulm.de",
    description: "Notenübersicht",
  },
  {
    name: "Campus 4",
    href: "https://moodle.uni-ulm.de",
    description: "Studienbescheinigungen",
  },
  {
    name: "Mensa",
    href: "https://mensa.jan-bulling.com",
    description: "Tägliches Essensangebot an der Uni Ulm",
  },
];

export type QuickSelect = (typeof quickSelect)[number];
