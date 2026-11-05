export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export const education: Education[] = [
  {
    degree: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    institution: 'IFTM — Instituto Federal do Triângulo Mineiro',
    period: '2021 – 2024',
  },
];
