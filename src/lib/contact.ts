export type Social = {
  name: string;
  href: string;
  iconPath: string;
};

export function onlyDigits(value: string) {
  return (value.match(/\d/g) || []).join("");
}

const PHONE = "(11) 4195-9000";
const WHATSAPP = "5511947850224";
const EMAIL = "rotec@rotecservice.com.br";

export const CONTACT = {
  phone: PHONE,
  phoneHref: `tel:+55${onlyDigits(PHONE)}`,
  whatsapp: WHATSAPP,
  whatsappDisplay: "(11) 94785-0224",
  whatsappMessage: "Olá! Vim pelo site da ROTEC e gostaria de um orçamento.",
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/rotecservice/", iconPath: "/images/redes/instagram.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/rotecservice/", iconPath: "/images/redes/linkedin.svg" },
  ] as Social[],
};

export function buildWhatsHref(message: string = CONTACT.whatsappMessage, whatsapp: string = CONTACT.whatsapp) {
  return `https://wa.me/${onlyDigits(whatsapp)}?text=${encodeURIComponent(message)}`;
}
