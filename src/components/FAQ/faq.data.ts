export type FaqItem = {
  id: string;
  title: string;
  steps: string[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "desentupimento",
    title: "Desentupimento — Como funciona?",
    steps: [
      "Diagnóstico do ponto de obstrução.",
      "Uso de cabos rotativos e/ou hidrojato conforme necessidade.",
      "Sem danos à estrutura.",
      "Testes de fluxo antes da finalização.",
      "Entrega com garantia e conforme normas.",
    ],
  },
  {
    id: "hidrojateamento",
    title: "Hidrojateamento — Como funciona?",
    steps: [
      "Definição da pressão e EPIs adequados.",
      "Aplicação dos jatos de alta pressão.",
      "Limpeza e/ou desobstrução do alvo.",
      "Inspeção e orientação de preventiva.",
      "Conferência final de segurança/eficácia.",
    ],
  },
  {
    id: "auto-vacuo",
    title: "Auto Vácuo — Como funciona?",
    steps: [
      "Posicionamento do caminhão e mangueiras.",
      "Criação de vácuo para sucção dos resíduos.",
      "Remoção controlada de líquidos/lodos.",
      "Transporte e descarte regulamentado.",
      "Finalização com área limpa e segura.",
    ],
  },
];
