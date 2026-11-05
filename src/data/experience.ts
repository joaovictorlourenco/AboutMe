import type { ImageMetadata } from 'astro';
import agriskLogo from '../assets/companies/agrisk.svg';
import luizalabsLogo from '../assets/companies/luizalabs.png';
import valmontLogo from '../assets/companies/valmont.svg';
import candidoLogo from '../assets/companies/candido.png';
import bugwareLogo from '../assets/companies/bugware.png';
import fetiLogo from '../assets/companies/feti.png';

export interface Experience {
  company: string;
  logo: ImageMetadata;
  role: string;
  period: string;
  description: string[];
  techs: string[];
  isAcademic?: boolean;
  positions?: { role: string; period: string }[];
}

export const experiences: Experience[] = [
  {
    company: 'AgRisk',
    logo: agriskLogo,
    role: 'Engenheiro de Software',
    period: 'jul de 2026 - Presente',
    description: [
      'Evolução das plataformas AgFlow e AgRisk Consultas, com foco em APIs, microsserviços e confiabilidade na decisão de crédito.',
      'Arquitetura de um módulo de entidades dinâmicas multi-tenant, permitindo cadastros personalizados sem novos deploys.',
      'Modelagem e otimização de consultas no MongoDB, com índices, validação e isolamento por cliente.',
      'Processamento assíncrono com GCP, Cloud Tasks e Cloud Functions, além de eventos em tempo real via SSE.',
      'Integração de serviços de dados de crédito e risco, com idempotência e tolerância a falhas.',
    ],
    techs: ['Node.js', 'NestJS', 'TypeScript', 'MongoDB', 'GCP', 'SSE'],
  },
  {
    company: 'Luizalabs (Magalu)',
    logo: luizalabsLogo,
    role: 'Desenvolvedor de Software',
    period: 'ago de 2025 - jun de 2026',
    description: [
      'Atuação no ecossistema de fretes transicionais, processando mais de 2.000 RPS.',
      'Desenvolvimento de microsserviços de alta performance em Go e Node.js.',
      'Otimização da camada de persistência com ScyllaDB e bancos relacionais.',
      'Mensageria distribuída para processamento assíncrono e arquitetura orientada a eventos.',
      'Padrões de resiliência (Circuit Breaker, Retries) para sustentação fim a fim.',
    ],
    techs: ['Go', 'Node.js', 'ScyllaDB', 'PostgreSQL', 'Kafka', 'Docker'],
  },
  {
    company: 'Valmont Industries, Inc.',
    logo: valmontLogo,
    role: 'Desenvolvedor de Software / Full Stack',
    period: 'jul de 2022 – ago de 2025',
    positions: [
      { role: 'Desenvolvedor de Software / Full Stack', period: 'out de 2023 - ago de 2025' },
      { role: 'Desenvolvedor de Software', period: 'jul de 2022 - out de 2023' },
    ],
    description: [
      'Migração de aplicação monolítica (PHP/Laravel) para microsserviços em Node.js, Python e C#.',
      'Gerenciamento de servidores EC2 com Docker e pipelines CI/CD (GitHub Actions / Azure DevOps).',
      'Desenvolvimento de funções AWS Lambda para processamento em tempo real.',
      'Automação de rotinas com NodeCron e Python, reduzindo em 40% o tempo manual.',
      'Documentação de APIs via Swagger e liderança em cerimônias ágeis.',
    ],
    techs: ['Node.js', 'Python', 'C#', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    company: 'Cândido Empresarial',
    logo: candidoLogo,
    role: 'Desenvolvedor Full Stack',
    period: 'mar de 2022 – jul de 2022',
    description: [
      'Desenvolvimento de aplicações web com Angular e AdonisJS.',
      'Integração de APIs RESTful para conectar sistemas ERP legados.',
      'Modelagem e otimização de consultas em PostgreSQL.',
    ],
    techs: ['Angular', 'AdonisJS', 'PostgreSQL', 'REST APIs'],
  },
  {
    company: 'bugWare',
    logo: bugwareLogo,
    role: 'Desenvolvedor de Software',
    period: 'jul de 2021 – jul de 2022',
    description: [
      'Desenvolvimento web e front-end com Angular, Node.js e Flutter.',
      'Atuação estratégica na diretoria de Administração e Financeiro.',
    ],
    techs: ['Angular', 'Node.js', 'Flutter'],
    isAcademic: true,
  },
  {
    company: 'FETI Uberaba',
    logo: fetiLogo,
    role: 'Desenvolvedor Front-end',
    period: 'jul de 2021 – mar de 2022',
    description: [
      'Desenvolvimento e manutenção de sistemas em PHP.',
      'Documentação de bancos de dados e criação de layouts responsivos com Figma.',
    ],
    techs: ['PHP', 'Figma', 'MySQL'],
  },
];
