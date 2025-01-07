import type { LinkCard } from "@/lib/types/link-card";

export const accountCard: LinkCard = {
  heading: "Accounts",
  description: "Account management der Uni Ulm",
  links: [
    {
      href: "https://portal.uni-ulm.de/idmFrontend/",
      text: "Identitätsmanagement",
      description: "Zentrale Verwaltung von Personendaten und der Chipkarte.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/account-zugang/idm/",
          text: "Mehr Informationen",
        },
      ],
    },
    {
      href: "https://www.uni-ulm.de/in/sgi/services/account-system/account-erstellen/",
      text: "SGI Account",
      description: "Zugang zu PCs der SG Informatik.",
      descriptionLinks: [
        {
          href: "https://psi.informatik.uni-ulm.de:1244/sgi/password-reset",
          text: "Passwort zurücksetzen",
        },
      ],
    },
    {
      href: "https://imap.uni-ulm.de/lists",
      text: "Mailing Listen",
      description: "Ein- / Austragen aus Mailinglisten",
    },
  ],
};

export const studienwerkCard: LinkCard = {
  heading: "Studierendenwerk",
  links: [
    {
      href: "https://www.bafoeg-digital.de/",
      text: "BAföG",
      description: "Bafög Antrag stellen.",
      descriptionLinks: [
        {
          href: "https://studierendenwerk-ulm.de/bafoeg-finanzen/faq/",
          text: "Offizielle Informationen",
        },
      ],
    },
    {
      href: "https://tl1host.eu/SWUL/#admission",
      text: "Wohnung beantragen",
      description: "Studentenwohnung in Ulm beantragen",
      descriptionLinks: [
        {
          href: "https://studierendenwerk-ulm.de/wohnen/",
          text: "Mehr Informationen",
        },
      ],
    },
    {
      href: "https://studierendenwerk-ulm.de/essen-trinken/mensen-und-cafeterien/",
      text: "Mensaplan",
      description: "Offizieller Mensa Plan des Studienwerkes",
      descriptionLinks: [
        {
          href: "https://mensaplan.fs-et.de/",
          text: "Alternative FS ET",
        },
        {
          href: "https://mensa.jan-bulling.com/",
          text: "Alternative von mir",
        },
      ],
    },
  ],
};

export const printCard: LinkCard = {
  heading: "Drucken",
  links: [
    {
      href: "https://print.uni-ulm.de",
      text: "Print@Uni",
      description: "Zum Drucken muss man im Uni-Netz (oder im VPN) sein!",
    },
    {
      href: "https://portal.uni-ulm.de/eKladdeNG/index.html",
      text: "Abschlussarbeiten drucken",
      description: "Das Drucken von Dissertationen verläuft etwas anders.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/medien/druck-weiterverarbeitung/abschlussarbeiten/",
          text: "Genauere Informationen",
        },
      ],
    },
  ],
};

export const freetimeCard: LinkCard = {
  heading: "Freizeit",
  description: "Was man in der schönen Stadt Ulm so alles machen kann",
  links: [
    {
      href: "https://cloud.aktivkonzepte.de/hspulm/index.html#%23/Home/KursListe",
      text: "Hochschulsport",
      description: "Zu beginn jedes Semesters wird eine Mail verschickt.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/hochschulsport/",
          text: "Mehr Informationen",
        },
      ],
    },
    {
      href: "https://stuve.uni-ulm.de/struktur/hochschulgruppen",
      text: "Hochschulgruppen",
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/hochschulsport/unifit/information/",
      text: "UniFIT",
    },
    {
      href: "https://www.ulm.de/",
      text: "Stadt Ulm",
    },
  ],
};

export const cards: LinkCard[] = [
  accountCard,
  printCard,
  studienwerkCard,
  freetimeCard,
];
