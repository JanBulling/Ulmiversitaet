export type LinkCard = {
  heading: string;
  description?: string;
  links: {
    href: string;
    text: string;
    description?: string;
    descriptionLinks?: { href: string; text: string }[];
  }[];
};
