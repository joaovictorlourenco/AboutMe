export interface Project {
  name: string;
  category: string;
  description: string;
  techs: string[];
  visual: 'groot' | 'pivot' | 'idpro';
  status: string;
  githubUrl?: string;
  featured?: boolean;
}
export const projects: Project[] = [
  {
    name: 'Groot Terminal',
    category: 'Inteligência artificial + developer tools',
    description: 'IA onde o trabalho acontece: no terminal. Uma CLI em Go com respostas interativas, comandos via Cobra e uma interface que torna o fluxo mais simples.',
    techs: ['Go', 'Cobra', 'IA', 'CLI'],
    visual: 'groot',
    status: 'Código aberto',
    githubUrl: 'https://github.com/joaovictorlourenco/IaDeTerminal',
    featured: true,
  },
  {
    name: 'PivotSmart',
    category: 'Internet das coisas + agritech',
    description: 'Do backend ao campo. Plataforma de monitoramento e controle de pivôs de irrigação, com API em Go, comunicação MQTT e atualizações em tempo real.',
    techs: ['Go', 'PostgreSQL', 'MQTT', 'SSE', 'ESP32'],
    visual: 'pivot',
    status: 'Em desenvolvimento',
  },
  {
    name: 'ID PRO',
    category: 'Engenharia + produto digital',
    description: 'Clareza para projetar irrigação. Protótipo de uma plataforma que conecta propriedades, geometria e cenários técnicos em um fluxo de trabalho integrado.',
    techs: ['React', 'TypeScript', 'Vite', 'Penpot'],
    visual: 'idpro',
    status: 'Protótipo',
  },
];
