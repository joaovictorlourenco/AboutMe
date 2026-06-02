export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export const education: Education[] = [
  {
    degree: 'Pós-Graduação em Engenharia de Software',
    institution: 'PUC Minas',
    period: '2025 – 2026 (prev.)',
    description:
      'Foco em Arquitetura de Software, Métodos Ágeis, Bancos de Dados e UX.',
  },
  {
    degree: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    institution: 'IFTM — Instituto Federal do Triângulo Mineiro',
    period: '2021 – 2024',
  },
];
