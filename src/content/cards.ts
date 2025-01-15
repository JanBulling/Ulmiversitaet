import type { LinkCard } from "@/lib/types/link-card";

export const accountCard: LinkCard = {
  heading: "Accounts",
  description: "Account-Management der Uni Ulm",
  links: [
    {
      href: "https://portal.uni-ulm.de/PortalWI/index.html",
      text: "kiz Web-Services",
      shortLink: true,
    }    
    {
      href: "https://portal.uni-ulm.de/idmFrontend/",
      text: "Identitätsmanagement",
      description: "Zentrale Verwaltung von Personendaten und der Chipkarte.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/account-zugang/idm/",
          text: "Mehr Informationen.",
        },
      ],
    },
    {
      href: "https://www.uni-ulm.de/in/sgi/services/account-system/account-erstellen/",
      text: "SGI-Account",
      description: "Zugang zu PCs der SG Informatik.",
      descriptionLinks: [
        {
          href: "https://psi.informatik.uni-ulm.de:1244/sgi/password-reset",
          text: "Passwort zurücksetzen.",
        },
      ],
    },
    {
      href: "https://imap.uni-ulm.de/lists",
      text: "Mailing-Listen",
      description: "Ein- / Austragen aus Mailinglisten.",
    },
    {
      href: "https://uulm.sona-systems.com/",
      text: "SONA",
      description: "Verwaltung psychologischer Experimente und Management der Versuchspersonenstunden.",
      descriptionLinks: [
        {
          href: "https://uulm.sona-systems.com/lost_password.aspx",
          text: "Passwort zurücksetzen.",
        },
      ],
    },
    
  ],
};

export const studiesCard: LinkCard = {
  heading: "Studium",
  links: [
    {
      href: "https://portal.uni-ulm.de/PortalWI/sso/vvz.html",
      text: "Veranstaltungsverzeichnis",
    },
    {
      href: "https://campusonline.uni-ulm.de/qislsf/rds?state=change&type=1&moduleParameter=VVZArchivMenue&nextdir=change&next=menu.vm&subdir=applications&xml=menu&purge=y&database=n&navigationPosition=lectures%2CVVZArchiv&topitem=lectures&subitem=VVZArchiv",
      text: "Veranstaltungsarchiv",
      shortLink: true,
    },
    {
      href: "https://campusonline.uni-ulm.de/qislsf/rds?state=change&type=1&moduleParameter=modulhandbuecherMenue&nextdir=change&next=menu.vm&subdir=applications&xml=menu&purge=y&database=n&navigationPosition=modules%2CModulhandbuecher&breadcrumb=mod_handbuecher_UL&topitem=modules&subitem=Modulhandbuecher",
      text: "Modulhandbücher",
      shortLink: true,
    },
    {
      href: "https://campusonline.uni-ulm.de/CoronaNG/index.html?token=1.0/1736343018/Corona/okb23/99699073e75a12c3a1c55359f6a1b511",
      text: "CoronaNG",
      description: "Anmeldungen für bestimmte Kurse (z.B. ASQ).",
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/kiz/weiteres/campus-navigation/hoersaalfinder/",
      text: "Hörsaalfinder",
      description: "Für eine genauere Zurechtfindung existiert der",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/weiteres/campus-navigation/campus-navigator/",
          text: "Campusnavigator.",
        },
      ],
    },
  ],
};

export const studienwerkCard: LinkCard = {
  heading: "Studierendenwerk",
  links: [
    {
      href: "https://studierendenwerk-ulm.de/bafoeg-finanzen/faq/",
      text: "BAföG",
      description: "Lohnt sich fast immer!",
      descriptionLinks: [
        {
          href: "https://www.bafoeg-digital.de/",
          text: "Antrag stellen.",
        },
      ],
    },
    {
      href: "https://studierendenwerk-ulm.de/wohnen/",
      text: "Wohnen",
      shortLink: true,
      description: "Wohnheimsplätze in Ulm.",
      descriptionLinks: [
        {
          href: "https://tl1host.eu/SWUL/#admission",
          text: "Wohnung beantragen.",
        },
      ],
    },
    {
      href: "https://studierendenwerk-ulm.de/beratung-betreuung/psychosoziale-beratung/",
      text: "Psychosoziale Beratungsstelle",
      description: "Bitte im Notfall nicht zurückschrecken!",
    },
    {
      href: "https://studierendenwerk-ulm.de/essen-trinken/mensen-und-cafeterien/",
      text: "Mensaplan",
      description: "Offizieller Mensaplan des Studienwerkes.",
      shortLink: true,
      descriptionLinks: [
        {
          href: "https://mensaplan.fs-et.de/",
          text: "Alternative FS ET.",
        },
        {
          href: "https://mensa.jan-bulling.com/",
          text: "Alternative von mir.",
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
      text: "Abschlussarbeiten drucken.",
      shortLink: true,
      description:
        "Das Drucken von Dissertationen verläuft etwas anders. Einfache Abholung in der Bib-Ausleihe (sehr preisgünstig).",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/medien/druck-weiterverarbeitung/abschlussarbeiten/",
          text: "Mehr Informationen.",
        },
      ],
    },
  ],
};

export const studisekCard: LinkCard = {
  heading: "Studiensekretariat",
  links: [
    {
      href: "mailto:studiensekretariat@uni-ulm.de",
      text: "studiensekretariat@uni-ulm.de",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/studium/studienorganisation/beurlaubung-rueckmeldung-studiengangwechsel-exmatrikulation/",
      text: "Beurlaubung / Rückmeldung",
      description: "Falls es mal notwendig sein solte:",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/fileadmin/website_uni_ulm/studium/Studienorganisation/Beurlaubung__Rueckmeldung_und_Exmatrikulation/Exmatrikulation/antrag_exmatrikulation_WEB.pdf",
          text: "Exmatrikulation",
        },
      ],
    },
    {
      href: "https://www.uni-ulm.de/studium/studienorganisation/studiengebuehren/",
      text: "Informationen zu den Studiengebüren.",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/studium/studienorganisation/studierendenausweis-chipkarte/",
      text: "Chipkarte verloren.",
      shortLink: true,
    },
  ],
};

export const freetimeCard: LinkCard = {
  heading: "Freizeit",
  description: "Was man in Ulm, um Ulm und um Ulm herum so alles machen kann.",
  links: [
    {
      href: "https://cloud.aktivkonzepte.de/hspulm/index.html#%23/Home/KursListe",
      text: "Hochschulsport",
      description: "Zu Beginn jedes Semesters wird eine Mail verschickt.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/hochschulsport/",
          text: "Mehr Informationen.",
        },
      ],
    },
    {
      href: "https://stuve.uni-ulm.de/struktur/hochschulgruppen",
      text: "Hochschulgruppen",
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/hochschulsport/unifit/information/",
      text: "UniFit",
    },
    {
      href: "https://www.ulm.de/leben-in-ulm/freizeit-und-sport",
      text: "Stadt Ulm",
    },
  ],
};

export const bibCard: LinkCard = {
  heading: "Bibliothek",
  description: "Bücher ausleihen muss nicht kompliziert sein!",
  links: [
    {
      href: "https://ulm.ibs-bw.de/",
      text: "Bibliothekskatalog",
      description:
        "Bücher in der Bibliothek einfach ausleihen und bequem nach Anmeldung über diesen Link verlängern.",
      descriptionLinks: [
        {
          href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/bibliotheksnutzung/",
          text: "Mehr Informationen.",
        },
      ],
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/kiz/home/service-points/service-point-ausleihe/",
      text: "Öffnungszeiten",
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/kiz/weiteres/formulare/reservierung-leseplatz-bibl-zentrale/",
      text: "Leseplatz / Raumbuchung",
      shortLink: true,
    },
  ],
};

export const explanationCard: LinkCard = {
  heading: "Erklärungen",
  links: [
    {
      href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/e-mail-kalender-zusammenarbeit/e-mail/e-mail-programme-konfigurieren/",
      text: "E-Mail Client einrichten",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/kiz/service-katalog/netzwerk-konnektivitaet/vpn/ssl-vpn/",
      text: "Uni-VPN Anleitung",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/fileadmin/website_uni_ulm/kiz/medien/Drucker/follow_me_prin/kiz_printing_linux_mac_win.pdf",
      text: "Drucker lokal hinzufügen",
      shortLink: true,
    },
  ],
};

export const internationalOfficeCard: LinkCard = {
  heading: "International Office",
  description: "Auslandssemester / Erasmus+ Programm",
  links: [
    {
      href: "https://www.uni-ulm.de/io/",
      text: "International Office",
      description: "Erreichbar unter",
      descriptionLinks: [
        {
          href: "mailto:study-abroad@uni-ulm.de",
          text: "study-abroad@uni-ulm.de",
        },
      ],
    },
    {
      href: "https://www.uni-ulm.de/io/mob-out/ausland-semester-jahr/erasmus-sms/bewerbung-intern/",
      text: "Erausmus+ & Bewerbung",
    },
    {
      href: "https://www.service4mobility.com/europe/PortalServlet?identifier=ULM01&showAll=0&showPartner=0&preselectTab=ver_nav_button&sprache=de",
      text: "Suchportal für Auslandsunis",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/zsp/test/daad/",
      text: "Sprachtests",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/io/mob-out/im-studium-ins-ausland/berichte/europa/?tx_filelist_filelist%5Baction%5D=list&tx_filelist_filelist%5Bcontroller%5D=File&tx_filelist_filelist%5Bpath%5D=%2Fwebsite_uni_ulm%2Fio%2F1_MOB-OUT_Erfahrungsberichte%2Feuropa%2F&cHash=f8a67a161e9401130cea8b38f36e0cf0",
      text: "Erfahrungsberichte",
      shortLink: true,
    },
    {
      href: "https://www.service4mobility.com/europe/LoginServlet",
      text: "Mobility-Online",
    },
  ],
};

export const stuveCard: LinkCard = {
  heading: "StuVe",
  description: "Studierendenvertretung der Universität Ulm.",
  links: [
    {
      href: "https://stuve.uni-ulm.de/aktuelles",
      text: "Aktuelles von der StuVe.",
      shortLink: true,
    },
    {
      href: "https://www.ulmiversitaet.de/uni-politik",
      text: "Uni-Politik",
      description: "Informationen zur Hochschulpolitik an der Universität Ulm.",
    },

    {
      href: "https://stuve.uni-ulm.de/infos-fuer-ersties/infos-zu-deiner-ese",
      text: "ESE",
      description: "Wichtige Informationen für Erstsemester-Studierende.",
    },
    {
      href: "https://wiki.stuve.uni-ulm.de/de/home",
      text: "StuVe-Wiki",
       description: "Der Blick hinter die Kulissen.",
      shortLink: true,
    },
    {
      href: "https://pad.stuve.uni-ulm.de/",
      text: "StuVe-Pad",
       description: "Wird beispielsweise für Sitzungsprotokolle verwendet.",
      shortLink: true,
    },
    {
      href: "https://it-tools.stuve.uni-ulm.de/",
      text: "StuVe-IT",
      shortLink: true,
    },
  ],
};

export const jobCard: LinkCard = {
  heading: "Jobs",
  links: [
    {
      href: "https://www.informatik.uni-ulm.de/hiwiboerse/",
      text: "Convenda",
       description: "HiWi-Börse der Uni Ulm.",
      shortLink: true,
    },
    {
      href: "https://stuve.uni-ulm.de/aktuelles/mitarbeit-jobs",
      text: "StuVe-Jobs",
      
       shortLink: true,
    },
    {
      href: "https://uni-ulm.jobteaser.com/de",
      text: "Career-Center",
      shortLink: true,
    },

        {
      href: "https://studierendenwerk-ulm.de/studierendenwerk/stellenangebote/",
      text: "Studierendenwerk",
      description: "Bitte sorgt mir eurer Bewerbung für mehr Mensapersonal.",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/universitaet/karriere/career-service/fuer-studierende/stellenboerse/",
      text: "Abschlussarbeiten",
      description: "Ihr verdient zwar nicht (viel), aber arbeiten muss man trotzdem.",
      shortLink: true,
    },
    {
      href: "https://www.uni-ulm.de/einrichtungen/zuv/dezernat-3/stellenportal/stellenangebote/",
      text: "Sonstiges",
      shortLink: true,
    },
    
  ],
};



export const cards: LinkCard[] = [
  accountCard,
  studiesCard,
  bibCard,
  stuveCard,
  studisekCard,
  studienwerkCard,
  printCard,
  freetimeCard,
  explanationCard,
  internationalOfficeCard,
  jobCard,
];
