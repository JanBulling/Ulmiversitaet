export type LinkCard = {
  heading: string;
  description?: string;
  links: {
    shortLink?: boolean;
    href: string;
    text: string;
    description?: string;
    descriptionLinks?: { href: string; text: string }[];
  }[];
};
