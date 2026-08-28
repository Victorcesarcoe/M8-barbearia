/**
 * Direção: Clube Editorial Cinematográfico — dados reais e campos por configurar,
 * sem inventar contactos, métricas, profissionais ou avaliações.
 */

export const ASSETS = {
  interior: "/manus-storage/interior_253142cf.jpeg",
  facade: "/manus-storage/fachada1_ed6a2ad8.jpeg",
  haircut: "/manus-storage/CORTE1_1ab034bd.jpg",
  monogram: "/manus-storage/onmen-monogram_6fdc9c59.png",
  grainField: "/manus-storage/onmen-grain-field_9a46c75c.jpg",
  precisionLines: "/manus-storage/onmen-precision-lines_fbe36f0c.png",
  metalSurface: "/manus-storage/onmen-metal-surface_dd8449a6.jpg",
} as const;

export const CONTACT: {
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  address: string;
  hours: string;
  mapUrl: string;
} = {
  whatsappNumber: "",
  instagramUrl: "",
  instagramHandle: "Instagram a configurar",
  address: "Morada a configurar",
  hours: "Horário a configurar",
  mapUrl: "",
};

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

export const TEAM_SLOTS = ["01", "02", "03"] as const;

export function getWhatsAppUrl(message = "Olá, gostaria de agendar um horário na ON MEN.") {
  if (!CONTACT.whatsappNumber) return null;
  const number = CONTACT.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
