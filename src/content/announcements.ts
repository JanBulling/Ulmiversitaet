export const announcements: Announcement[] = [
  {
    title: "Jan ist in wieder da!",
    description:
      "Jan ist aus Uppsala zurückgekehrt und wieder in Ulm!",
  },


        
        {
    title: "Sommersemester!",
    description:
      "Wir wünschen euch viel Spaß und Lernerfolg im Sommersemester",
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
