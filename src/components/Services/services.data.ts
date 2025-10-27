import { ServiceItem } from "./types";
import { PipeIcon, JetIcon, VacuumIcon } from "./icons";

export const SERVICES: ServiceItem[] = [
  {
    id: "desentupimento",
    title: "Desentupimento",
    Icon: PipeIcon,
    description:
      "Remoção de obstruções em tubulações, redes de esgoto, caixas de gordura, ralos, vasos sanitários e pias com cabos rotativos e/ou hidrojateamento — sem danificar a estrutura. Testes de fluxo antes da finalização e entrega com garantia.",
    residential: [
      "Banheiro",
      "Linhas de esgoto",
      "Tanque",
      "Vaso sanitário",
      "Linhas de cozinha",
      "Canos",
      "Localização de linha de esgoto",
    ],
    business: [
      "Colunas",
      "Cozinhas industriais",
      "Linhas de esgoto",
      "Tubulação predial",
      "Lavatórios",
      "Calhas",
      "Fossas sépticas",
    ],
    industrial: [
      "Esgotamento de resíduos líquidos/pastosos",
      "Tanques e redes",
      "Fossas sépticas e ETE",
    ],
  },
  {
    id: "hidrojateamento",
    title: "Hidrojateamento de Alta Pressão",
    Icon: JetIcon,
    description:
      "Jatos de água em alta pressão para limpeza e desobstrução de tubulações, superfícies e equipamentos. Versátil, ecológico e eficaz, com frotas dedicadas ao tipo de limpeza.",
    residential: [
      "Redes de esgoto e ralos",
      "Caixas de gordura/inspeção",
      "Desobstrução de colunas",
      "Manutenção preventiva",
    ],
    business: [
      "Redes de esgoto e ralos",
      "Caixas de gordura/inspeção (maior porte)",
      "Caixas de água",
      "Tubulações (restaurantes/hotéis/indústrias)",
      "Colunas, redes coletoras e caixas de passagem",
    ],
    industrial: [
      "Redes industriais e tanques",
      "Desincrustação",
      "Remoção de sedimentos/óleos/graxas/químicos (com EPI)",
      "Apoio em paradas/manutenções",
    ],
  },
  {
    id: "auto-vacuo",
    title: "Auto Vácuo",
    Icon: VacuumIcon,
    description:
      "Caminhões com bombas de sucção para resíduos líquidos e pastosos (tanques, fossas, redes e caixas de gordura) — capacidade até 15 m³ e descarte conforme regulamentação.",
    residential: [
      "Fossa séptica",
      "Resíduos de caixas de gordura",
      "Emergências (refluxo/alagamentos)",
    ],
    business: [
      "Manutenção preventiva",
      "Sucção de caixas de inspeção/poços de recalque",
      "Suporte ao desentupimento",
    ],
    industrial: [
      "Coleta/transporte de óleos e lodos",
      "Limpeza de tanques/decantadores",
      "Atendimento a emergências",
    ],
  },
];
