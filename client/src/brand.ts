/**
 * Direção: Clube Editorial Cinematográfico — dados reais e campos por configurar,
 * sem inventar contactos, métricas, profissionais ou avaliações.
 */

export const ASSETS = {
  interior: "/brand/interior-cachambi.jpg",
  interiorDetail: "/brand/interior-cachambi-detail.jpg",
  facade: "/brand/fachada-cachambi.jpg",
  haircut: "/brand/corte-hero.jpg",
  monogram: "/brand/studio-m8-logo.png",
  grainField: "/brand/grain-texture.svg",
  precisionLines: "/brand/precision-lines.svg",
  bonsucessoInterior1: "/brand/interior-bonsucesso-1.jpg",
  bonsucessoInterior2: "/brand/interior-bonsucesso-2.jpg",
  bonsucessoInterior3: "/brand/interior-bonsucesso-3.jpg",
  corte1: "/brand/corte-1.jpg",
  corte2: "/brand/corte-2.jpg",
  corte3: "/brand/corte-3.jpg",
  corte4: "/brand/corte-4.jpg",
  corte5: "/brand/corte-5.jpg",
  corte6: "/brand/corte-6.jpg",
} as const;

export const CONTACT: {
  whatsappNumber: string;
  whatsappDisplay: string;
  bookingUrl: string;
  instagramUrl: string;
  instagramHandle: string;
} = {
  whatsappNumber: "5521995762148",
  whatsappDisplay: "+55 21 99576-2148",
  bookingUrl: "https://cashbarber.com.br/studiom8/login",
  instagramUrl: "https://www.instagram.com/studiom8_/",
  instagramHandle: "@studiom8_",
};

export const LOCATIONS = [
  {
    name: "Cachambi",
    address: "R. Cirne Maia, 78 - Lj F - Cachambi, Rio de Janeiro - RJ, 20771-410",
    hours: "Seg a Sex: 10:00–20:00 · Sáb: 10:00–19:00 · Dom: Fechado",
    mapUrl: "https://share.google/QxYjkyzLjbn7F4EGj",
    facade: "/brand/fachada-cachambi.jpg",
  },
  {
    name: "Bonsucesso",
    address: "Av. Nova York, 138 - Bonsucesso, Rio de Janeiro - RJ, 21041-040",
    hours: "Seg a Sex: 10:00–20:00 · Sáb: 10:00–19:00 · Dom: Fechado",
    mapUrl: "https://share.google/THvrHlvyLdEWUI02l",
    facade: "/brand/fachada-bonsucesso.jpg",
  },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Corte masculino",
    description: "Geometria, acabamento e caimento pensados para a sua presença.",
  },
  {
    number: "02",
    title: "Barba",
    description: "Contorno rigoroso, proporção e cuidado num ritual preciso.",
  },
  {
    number: "03",
    title: "Corte + barba",
    description: "Uma leitura completa do rosto para um resultado coerente.",
  },
  {
    number: "04",
    title: "Sobrancelha",
    description: "Definição subtil para reforçar a expressão sem excessos.",
  },
  {
    number: "05",
    title: "Acabamento",
    description: "Ajustes essenciais para recuperar linhas e manter a forma.",
  },
  {
    number: "06",
    title: "Transformação",
    description: "Uma mudança orientada por técnica, identidade e intenção.",
  },
] as const;

export function getWhatsAppUrl(message = "Olá, gostaria de agendar um horário no Stúdio M8.") {
  if (!CONTACT.whatsappNumber) return null;
  const number = CONTACT.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
