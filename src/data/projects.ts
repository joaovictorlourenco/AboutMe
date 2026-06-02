export interface Project {
  name: string;
  description: string;
  techs: string[];
  image?: string;
  githubUrl: string;
  deployUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Groot Terminal',
    description:
      'IA integrada ao terminal desenvolvida em Go. Interface interativa com spinners, cores e CLI robusto via Cobra.',
    techs: ['Go', 'Cobra', 'CLI', 'OpenAI'],
    githubUrl: 'https://github.com/joaovictorlourenco/IaDeTerminal',
    featured: true,
  },
];
