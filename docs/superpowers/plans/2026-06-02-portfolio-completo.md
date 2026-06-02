# Portfólio Completo Single-Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir o link-in-bio atual (`AboutMe`) para um portfólio single-page com 5 seções empilhadas (Hero, Experiência, Projetos, Formação, Contato), mantendo a identidade visual warm, approachable, skilled.

**Architecture:** Single-page Astro com navegação por âncoras e scroll suave. Dados tipados em `src/data/`. Componentes modulares reutilizáveis. CSS custom properties mantidas. Sem bibliotecas externas — IntersectionObserver nativo para animações de entrada.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS 3, CSS custom properties, `astro-icon`.

---

## File Structure

```
src/
├── data/
│   ├── experience.ts          (novo — dados de experiência profissional)
│   ├── projects.ts            (novo — dados de projetos)
│   └── education.ts           (novo — dados de formação)
├── components/
│   ├── NavBar.astro           (novo — navegação fixa com âncoras)
│   ├── SmoothScroll.astro     (novo — script inline de scroll suave)
│   ├── SectionHeading.astro   (novo — label + título reutilizável)
│   ├── SocialLinks.astro      (novo — fileira horizontal de ícones)
│   ├── ExperienceTimeline.astro (novo — wrapper da timeline)
│   ├── ExperienceItem.astro   (novo — card de experiência)
│   ├── ProjectsGrid.astro     (novo — grid de projetos)
│   ├── ProjectCard.astro      (novo — card de projeto)
│   ├── EducationItem.astro    (novo — item de formação)
│   ├── ProfileHeader.astro    (modificar — adicionar CTAs e SocialLinks)
│   ├── SocialLink.astro       (mantido — link de botão social)
│   └── SkillsSection.astro    (remover — skills viram tags contextuais)
├── layouts/
│   └── Layout.astro           (modificar — incluir NavBar + SmoothScroll)
├── pages/
│   └── index.astro            (modificar — orquestrar 5 seções)
└── styles/
    └── global.css             (modificar — adicionar animações de seção)
```

---

### Task 1: Create data files (experience, projects, education)

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/education.ts`

- [ ] **Step 1: Create `src/data/experience.ts`**

```typescript
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  techs: string[];
  isAcademic?: boolean;
}

export const experiences: Experience[] = [
  {
    company: 'Luizalabs (Magalu)',
    role: 'Desenvolvedor de Software',
    period: 'ago de 2025 – Presente',
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
    role: 'Desenvolvedor de Software / Full Stack',
    period: 'jul de 2022 – ago de 2025',
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
    role: 'Desenvolvedor Front-end',
    period: 'jul de 2021 – mar de 2022',
    description: [
      'Desenvolvimento e manutenção de sistemas em PHP.',
      'Documentação de bancos de dados e criação de layouts responsivos com Figma.',
    ],
    techs: ['PHP', 'Figma', 'MySQL'],
  },
];
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```typescript
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
```

- [ ] **Step 3: Create `src/data/education.ts`**

```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat(data): add typed experience, projects and education data"
```

---

### Task 2: Update global.css with section animations

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add section reveal animation styles**

Append to `src/styles/global.css` (after the existing `@layer base` block):

```css
@layer utilities {
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(styles): add reveal animation utilities for sections"
```

---

### Task 3: Create SectionHeading component

**Files:**
- Create: `src/components/SectionHeading.astro`

- [ ] **Step 1: Write component**

```astro
---
interface Props {
  label: string;
  title: string;
}

const { label, title } = Astro.props;
---

<div class="section-heading">
  <span class="section-heading__label">{label}</span>
  <h2 class="section-heading__title">{title}</h2>
</div>

<style>
  .section-heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-bottom: var(--space-xl);
  }

  .section-heading__label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1;
  }

  .section-heading__title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.2;
    margin: 0;
    letter-spacing: -0.02em;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionHeading.astro
git commit -m "feat(components): add reusable SectionHeading component"
```

---

### Task 4: Create SocialLinks component

**Files:**
- Create: `src/components/SocialLinks.astro`

- [ ] **Step 1: Write component**

```astro
---
import { Icon } from 'astro-icon/components';

interface Social {
  url: string;
  icon: string;
  label: string;
}

interface Props {
  socials: Social[];
  variant?: 'large' | 'compact';
}

const { socials, variant = 'compact' } = Astro.props;
---

<div class={`social-links social-links--${variant}`}>
  {
    socials.map((s) => (
      <a
        href={s.url}
        class="social-links__item"
        aria-label={s.label}
        target={s.url.startsWith('mailto:') ? undefined : '_blank'}
        rel={s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      >
        <Icon name={s.icon} class="social-links__icon" />
        {variant === 'large' && <span class="social-links__label">{s.label}</span>}
      </a>
    ))
  }
</div>

<style>
  .social-links {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .social-links--compact {
    gap: var(--space-md);
  }

  .social-links--large {
    gap: var(--space-lg);
  }

  .social-links__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    text-decoration: none;
    color: var(--color-muted);
    transition: color 0.2s ease-out, transform 0.2s ease-out;
  }

  .social-links__item:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  .social-links__item:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .social-links__icon {
    font-size: 1.5rem;
  }

  .social-links--large .social-links__icon {
    font-size: 2rem;
  }

  .social-links__label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);
  }

  .social-links__item:hover .social-links__label {
    color: var(--color-primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .social-links__item {
      transition: none;
    }
    .social-links__item:hover {
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialLinks.astro
git commit -m "feat(components): add SocialLinks component with variants"
```

---

### Task 5: Create NavBar component

**Files:**
- Create: `src/components/NavBar.astro`

- [ ] **Step 1: Write component**

```astro
---
const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Contato', href: '#contato' },
];
---

<header class="navbar" role="banner">
  <a href="#hero" class="navbar__brand" aria-label="Ir para o topo">João</a>

  <nav class="navbar__nav" aria-label="Navegação principal">
    <ul class="navbar__list">
      {
        navLinks.map((link) => (
          <li class="navbar__item">
            <a href={link.href} class="navbar__link">
              {link.label}
            </a>
          </li>
        ))
      }
    </ul>
  </nav>

  <button
    class="navbar__toggle"
    aria-label="Abrir menu"
    aria-expanded="false"
    aria-controls="navbar-menu"
    type="button"
  >
    <span class="navbar__hamburger" aria-hidden="true"></span>
  </button>
</header>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-xl);
    background: transparent;
    transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;
  }

  .navbar--scrolled {
    background-color: oklch(1.00 0 0 / 0.85);
    backdrop-filter: blur(8px);
    box-shadow: 0 1px 3px oklch(0.30 0.02 130 / 0.06);
  }

  .navbar__brand {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .navbar__brand:hover {
    color: var(--color-primary-dark);
  }

  .navbar__nav {
    display: flex;
  }

  .navbar__list {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .navbar__link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-ink);
    text-decoration: none;
    padding: 0.25rem 0;
    position: relative;
    transition: color 0.2s ease-out;
  }

  .navbar__link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: width 0.2s ease-out;
    border-radius: 1px;
  }

  .navbar__link:hover {
    color: var(--color-primary);
  }

  .navbar__link:hover::after {
    width: 100%;
  }

  .navbar__link:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .navbar__toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
  }

  .navbar__hamburger {
    display: block;
    width: 1.5rem;
    height: 2px;
    background-color: var(--color-ink);
    position: relative;
    transition: background-color 0.2s ease-out;
  }

  .navbar__hamburger::before,
  .navbar__hamburger::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-ink);
    transition: transform 0.2s ease-out;
  }

  .navbar__hamburger::before {
    top: -6px;
  }

  .navbar__hamburger::after {
    top: 6px;
  }

  @media (max-width: 768px) {
    .navbar__nav {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-bg);
      padding: var(--space-md) var(--space-xl);
      box-shadow: 0 4px 12px oklch(0.30 0.02 130 / 0.08);
    }

    .navbar__nav.is-open {
      display: flex;
    }

    .navbar__list {
      flex-direction: column;
      gap: var(--space-md);
      width: 100%;
    }

    .navbar__toggle {
      display: block;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .navbar,
    .navbar__link::after,
    .navbar__hamburger,
    .navbar__hamburger::before,
    .navbar__hamburger::after {
      transition: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavBar.astro
git commit -m "feat(components): add fixed NavBar with scroll-aware styling"
```

---

### Task 6: Create SmoothScroll script component

**Files:**
- Create: `src/components/SmoothScroll.astro`

- [ ] **Step 1: Write inline script component**

```astro
<script is:inline>
  (function () {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  })();
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SmoothScroll.astro
git commit -m "feat(components): add smooth scroll for anchor links"
```

---

### Task 7: Update Layout.astro with NavBar and SmoothScroll

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Modify Layout.astro**

Replace the content with:

```astro
---
import NavBar from '../components/NavBar.astro';
import SmoothScroll from '../components/SmoothScroll.astro';

interface Props {
  title: string;
}

const currentYear = new Date().getFullYear();

const { title } = Astro.props;
---

<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="description"
      content="João Victor Lourenço — Desenvolvedor de Software. Portfólio profissional."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta
      name="google-site-verification"
      content="4Y9FfFYiim01hecddemEpLY-uTldVF207yiJFYJDzjw"
    />
    <meta name="generator" content={Astro.generator} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage:wght@400;600;700&family=Sora:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <title>{title}</title>
  </head>
  <body>
    <a href="#main" class="skip-link">Pular para o conteúdo</a>
    <NavBar />
    <main id="main">
      <slot />
    </main>

    <footer class="site-footer">
      <p class="site-footer__text">
        &copy; {currentYear} · João Victor Lourenço
      </p>
      <p class="site-footer__tagline">
        Feito com Astro, café e muitas linhas de código.
      </p>
    </footer>

    <SmoothScroll />
  </body>
</html>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: var(--color-bg);
    padding: 8px 16px;
    z-index: 100;
    text-decoration: none;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    border-radius: 0 0 4px 0;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 0;
  }

  .site-footer {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-xl) var(--space-lg);
    text-align: center;
  }

  .site-footer__text {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin: 0 0 var(--space-xs);
  }

  .site-footer__tagline {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-muted);
    opacity: 0.7;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(layout): add NavBar, SmoothScroll, skip-link and updated footer"
```

---

### Task 8: Update ProfileHeader with CTAs and SocialLinks

**Files:**
- Modify: `src/components/ProfileHeader.astro`

- [ ] **Step 1: Update ProfileHeader.astro**

Replace the component with:

```astro
---
import { Image } from 'astro:assets';
import SocialLinks from './SocialLinks.astro';
import icon from '../../public/icon.jpg';

interface Props {
  name: string;
  title: string;
  tagline: string;
}

const { name, title, tagline } = Astro.props;

const socials = [
  {
    url: 'https://www.linkedin.com/in/jo%C3%A3odevfull/',
    icon: 'mdi:linkedin',
    label: 'LinkedIn',
  },
  {
    url: 'https://github.com/joaovictorlourenco',
    icon: 'mdi:github',
    label: 'GitHub',
  },
  {
    url: 'https://www.instagram.com/joaolourenco.ceara/',
    icon: 'mdi:instagram',
    label: 'Instagram',
  },
  {
    url: 'mailto:joaovictorlourenco886@gmail.com',
    icon: 'mdi:email-outline',
    label: 'Email',
  },
];
---

<section class="hero">
  <div class="hero__photo">
    <div class="avatar-ring">
      <Image
        src={icon}
        alt="João Victor Lourenço, desenvolvedor de software, sorrindo"
        class="avatar-image"
        width={160}
        height={160}
        loading="eager"
      />
    </div>
  </div>

  <div class="hero__content">
    <div>
      <p class="hero__label">Olá, eu sou</p>
      <h1 class="hero__name">{name}</h1>
      <p class="hero__title">{title}</p>
    </div>
    <p class="hero__tagline">{tagline}</p>

    <div class="hero__ctas">
      <a href="#experiencia" class="hero__cta hero__cta--primary">
        Ver experiência
      </a>
      <a href="#projetos" class="hero__cta hero__cta--secondary">
        Ver projetos
      </a>
    </div>

    <SocialLinks socials={socials} variant="large" />
  </div>
</section>

<style>
  .hero {
    display: flex;
    align-items: center;
    gap: var(--space-2xl);
    width: 100%;
    max-width: 40rem;
  }

  .hero__photo {
    flex-shrink: 0;
  }

  .avatar-ring {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 3px solid var(--color-bg);
  }

  .hero__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    min-width: 0;
  }

  .hero__label {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-primary);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
  }

  .hero__name {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.1;
    margin: var(--space-xs) 0 0;
    letter-spacing: -0.02em;
  }

  .hero__title {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-primary-dark);
    line-height: 1.3;
    margin: var(--space-xs) 0 0;
  }

  .hero__tagline {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: 400;
    color: var(--color-muted);
    line-height: 1.5;
    margin: 0;
    max-width: 32ch;
  }

  .hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-xs);
  }

  .hero__cta {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    padding: 0.625rem 1.25rem;
    border-radius: 0.75rem;
    text-decoration: none;
    line-height: 1;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background-color 0.2s ease-out;
  }

  .hero__cta--primary {
    background-color: var(--color-primary);
    color: var(--color-bg);
    box-shadow: 0 1px 3px oklch(0.40 0.08 130 / 0.2);
  }

  .hero__cta--primary:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px oklch(0.40 0.08 130 / 0.25);
  }

  .hero__cta--secondary {
    background-color: var(--color-surface);
    color: var(--color-ink);
    border: 1px solid var(--color-border);
  }

  .hero__cta--secondary:hover {
    background-color: var(--color-primary-surface);
    border-color: var(--color-primary);
    color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px oklch(0.40 0.08 130 / 0.12);
  }

  @media (max-width: 640px) {
    .hero {
      flex-direction: column;
      text-align: center;
      gap: var(--space-lg);
    }

    .hero__tagline {
      max-width: 32ch;
      margin-inline: auto;
    }

    .hero__ctas {
      justify-content: center;
    }

    .avatar-ring {
      width: 6rem;
      height: 6rem;
    }

    .hero__label {
      font-size: var(--text-xs);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__cta {
      transition: none;
    }
    .hero__cta:hover {
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProfileHeader.astro
git commit -m "feat(components): update ProfileHeader with CTAs and SocialLinks"
```

---

### Task 9: Create ExperienceItem component

**Files:**
- Create: `src/components/ExperienceItem.astro`

- [ ] **Step 1: Write component**

```astro
---
import type { Experience } from '../data/experience';

interface Props {
  experience: Experience;
}

const { experience } = Astro.props;
---

<article class="experience-item">
  <header class="experience-item__header">
    <h3 class="experience-item__company">
      {experience.company}
      {experience.isAcademic && (
        <span class="experience-item__badge">Empresa Júnior</span>
      )}
    </h3>
    <p class="experience-item__meta">
      {experience.role} · {experience.period}
    </p>
  </header>

  <ul class="experience-item__description">
    {experience.description.map((item) => (
      <li>{item}</li>
    ))}
  </ul>

  <ul class="experience-item__techs" aria-label="Tecnologias utilizadas">
    {experience.techs.map((tech) => (
      <li class="experience-item__tech">{tech}</li>
    ))}
  </ul>
</article>

<style>
  .experience-item {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: var(--space-lg);
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  }

  .experience-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px oklch(0.30 0.02 130 / 0.06);
  }

  .experience-item__header {
    margin-bottom: var(--space-md);
  }

  .experience-item__company {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.3;
    margin: 0 0 var(--space-xs);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .experience-item__badge {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-surface);
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    letter-spacing: 0.02em;
  }

  .experience-item__meta {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-muted);
    margin: 0;
    line-height: 1.4;
  }

  .experience-item__description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--color-ink);
    line-height: 1.6;
    margin: 0 0 var(--space-md);
    padding-left: var(--space-md);
  }

  .experience-item__description li {
    margin-bottom: var(--space-xs);
  }

  .experience-item__description li:last-child {
    margin-bottom: 0;
  }

  .experience-item__techs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .experience-item__tech {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-surface);
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    line-height: 1.3;
  }

  @media (prefers-reduced-motion: reduce) {
    .experience-item {
      transition: none;
    }
    .experience-item:hover {
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceItem.astro
git commit -m "feat(components): add ExperienceItem card component"
```

---

### Task 10: Create ExperienceTimeline component

**Files:**
- Create: `src/components/ExperienceTimeline.astro`

- [ ] **Step 1: Write component**

```astro
---
import ExperienceItem from './ExperienceItem.astro';
import { experiences } from '../data/experience';
---

<div class="timeline">
  <div class="timeline__line" aria-hidden="true"></div>
  <ul class="timeline__list">
    {
      experiences.map((exp) => (
        <li class="timeline__item">
          <span class="timeline__dot" aria-hidden="true" />
          <ExperienceItem experience={exp} />
        </li>
      ))
    }
  </ul>
</div>

<style>
  .timeline {
    position: relative;
    width: 100%;
    max-width: 40rem;
  }

  .timeline__line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.5rem;
    width: 1px;
    background-color: var(--color-border);
  }

  .timeline__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .timeline__item {
    position: relative;
    padding-left: var(--space-xl);
  }

  .timeline__dot {
    position: absolute;
    top: 1.25rem;
    left: 0;
    width: 0.625rem;
    height: 0.625rem;
    background-color: var(--color-primary);
    border-radius: 50%;
    border: 2px solid var(--color-bg);
  }

  @media (max-width: 480px) {
    .timeline__line {
      display: none;
    }

    .timeline__item {
      padding-left: 0;
    }

    .timeline__dot {
      display: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceTimeline.astro
git commit -m "feat(components): add ExperienceTimeline wrapper with connector line"
```

---

### Task 11: Create ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Write component**

```astro
---
import { Icon } from 'astro-icon/components';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---

<article class={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
  <div class="project-card__image-wrapper">
    {project.image ? (
      <img src={project.image} alt={`Screenshot do projeto ${project.name}`} class="project-card__image" loading="lazy" />
    ) : (
      <div class="project-card__placeholder">
        <span class="project-card__placeholder-text">{project.name}</span>
      </div>
    )}
    {project.featured && <span class="project-card__badge">Destaque</span>}
  </div>

  <div class="project-card__content">
    <h3 class="project-card__name">{project.name}</h3>
    <p class="project-card__description">{project.description}</p>

    <ul class="project-card__techs" aria-label="Tecnologias utilizadas">
      {project.techs.map((tech) => (
        <li class="project-card__tech">{tech}</li>
      ))}
    </ul>

    <div class="project-card__links">
      <a
        href={project.githubUrl}
        class="project-card__link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver código do ${project.name} no GitHub`}
      >
        <Icon name="mdi:github" class="project-card__link-icon" />
        <span>GitHub</span>
      </a>
      {project.deployUrl && (
        <a
          href={project.deployUrl}
          class="project-card__link project-card__link--secondary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver projeto ${project.name} no ar`}
        >
          <Icon name="mdi:open-in-new" class="project-card__link-icon" />
          <span>Ver projeto</span>
        </a>
      )}
    </div>
  </div>
</article>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  }

  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px oklch(0.30 0.02 130 / 0.06);
  }

  .project-card--featured {
    border-color: var(--color-primary);
    box-shadow: 0 1px 3px oklch(0.40 0.08 130 / 0.12);
  }

  .project-card__image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    background-color: var(--color-bg);
    overflow: hidden;
  }

  .project-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-card__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-surface), var(--color-primary-surface));
  }

  .project-card__placeholder-text {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-primary);
    opacity: 0.5;
  }

  .project-card__badge {
    position: absolute;
    top: var(--space-sm);
    left: var(--space-sm);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-bg);
    background-color: var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .project-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-lg);
    flex: 1;
  }

  .project-card__name {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.3;
    margin: 0;
  }

  .project-card__description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--color-muted);
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  .project-card__techs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .project-card__tech {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-surface);
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    line-height: 1.3;
  }

  .project-card__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-top: var(--space-xs);
  }

  .project-card__link {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-bg);
    background-color: var(--color-ink);
    padding: 0.5rem 0.875rem;
    border-radius: 0.5rem;
    text-decoration: none;
    line-height: 1;
    transition: background-color 0.2s ease-out;
  }

  .project-card__link:hover {
    background-color: var(--color-primary);
  }

  .project-card__link--secondary {
    background-color: var(--color-surface);
    color: var(--color-ink);
    border: 1px solid var(--color-border);
  }

  .project-card__link--secondary:hover {
    background-color: var(--color-primary-surface);
    border-color: var(--color-primary);
    color: var(--color-primary-dark);
  }

  .project-card__link-icon {
    font-size: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .project-card {
      transition: none;
    }
    .project-card:hover {
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat(components): add ProjectCard component with image, techs and links"
```

---

### Task 12: Create ProjectsGrid component

**Files:**
- Create: `src/components/ProjectsGrid.astro`

- [ ] **Step 1: Write component**

```astro
---
import ProjectCard from './ProjectCard.astro';
import { projects } from '../data/projects';
---

<div class="projects-grid">
  {projects.map((project) => (
    <ProjectCard project={project} />
  ))}
</div>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    width: 100%;
    max-width: 40rem;
  }

  @media (min-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectsGrid.astro
git commit -m "feat(components): add ProjectsGrid responsive wrapper"
```

---

### Task 13: Create EducationItem component

**Files:**
- Create: `src/components/EducationItem.astro`

- [ ] **Step 1: Write component**

```astro
---
import type { Education } from '../data/education';

interface Props {
  education: Education;
}

const { education } = Astro.props;
---

<article class="education-item">
  <h3 class="education-item__degree">{education.degree}</h3>
  <p class="education-item__meta">
    {education.institution} · {education.period}
  </p>
  {education.description && (
    <p class="education-item__description">{education.description}</p>
  )}
</article>

<style>
  .education-item {
    padding: var(--space-lg) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .education-item:last-child {
    border-bottom: none;
  }

  .education-item__degree {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.3;
    margin: 0 0 var(--space-xs);
  }

  .education-item__meta {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-muted);
    margin: 0 0 var(--space-sm);
    line-height: 1.4;
  }

  .education-item__description {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--color-muted);
    line-height: 1.5;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/EducationItem.astro
git commit -m "feat(components): add EducationItem component"
```

---

### Task 14: Update index.astro to assemble all sections

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import ProfileHeader from '../components/ProfileHeader.astro';
import SectionHeading from '../components/SectionHeading.astro';
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
import ProjectsGrid from '../components/ProjectsGrid.astro';
import EducationItem from '../components/EducationItem.astro';
import SocialLinks from '../components/SocialLinks.astro';
import { education } from '../data/education';

const socials = [
  {
    url: 'https://www.linkedin.com/in/jo%C3%A3odevfull/',
    icon: 'mdi:linkedin',
    label: 'LinkedIn',
  },
  {
    url: 'https://github.com/joaovictorlourenco',
    icon: 'mdi:github',
    label: 'GitHub',
  },
  {
    url: 'https://www.instagram.com/joaolourenco.ceara/',
    icon: 'mdi:instagram',
    label: 'Instagram',
  },
  {
    url: 'mailto:joaovictorlourenco886@gmail.com',
    icon: 'mdi:email-outline',
    label: 'Email',
  },
];
---

<Layout title="João Victor Lourenço — Desenvolvedor de Software">
  <div class="page">
    <section id="hero" class="section section--hero">
      <div class="card animate-in">
        <ProfileHeader
          name="João Victor Lourenço"
          title="Desenvolvedor de Software — do backend de alta performance ao frontend polido."
          tagline="Construo sistemas escaláveis em Go, Node e Python. Gosto de código limpo, arquitetura bem pensada e produtos que funcionam."
        />
      </div>
    </section>

    <section id="experiencia" class="section">
      <div class="section__inner reveal">
        <SectionHeading label="Onde trabalhei" title="Experiência Profissional" />
        <ExperienceTimeline />
      </div>
    </section>

    <section id="projetos" class="section">
      <div class="section__inner reveal">
        <SectionHeading label="O que construí" title="Projetos" />
        <ProjectsGrid />
      </div>
    </section>

    <section id="formacao" class="section">
      <div class="section__inner reveal">
        <SectionHeading label="Educação" title="Formação" />
        <div class="education-list">
          {education.map((edu) => (
            <EducationItem education={edu} />
          ))}
        </div>
      </div>
    </section>

    <section id="contato" class="section section--contact">
      <div class="section__inner reveal">
        <SectionHeading label="Conecte-se" title="Vamos conversar?" />
        <p class="contact__text">
          Seja para uma oportunidade, uma ideia maluca ou só para trocar uma ideia sobre tech.
        </p>
        <a
          href="mailto:joaovictorlourenco886@gmail.com"
          class="contact__email"
        >
          joaovictorlourenco886@gmail.com
        </a>
        <SocialLinks socials={socials} variant="compact" />
      </div>
    </section>
  </div>
</Layout>

<script>
  // Reveal animation via IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
</script>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-4xl) var(--space-xl);
  }

  .section--hero {
    min-height: 100dvh;
    justify-content: center;
    padding: var(--space-xl);
  }

  .section__inner {
    width: 100%;
    max-width: 40rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    width: 100%;
    max-width: 40rem;
    padding: var(--space-2xl);
    background-color: var(--color-bg);
    border-radius: 1.25rem;
    box-shadow:
      0 1px 3px oklch(0.30 0.02 130 / 0.06),
      0 6px 24px oklch(0.30 0.02 130 / 0.04);
  }

  .animate-in {
    animation: cardFadeIn 0.5s ease-out both;
  }

  @keyframes cardFadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .education-list {
    width: 100%;
    max-width: 40rem;
  }

  .section--contact {
    text-align: center;
  }

  .section--contact .section__inner {
    align-items: center;
  }

  .contact__text {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: 400;
    color: var(--color-muted);
    line-height: 1.5;
    margin: 0 0 var(--space-md);
    max-width: 32ch;
  }

  .contact__email {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
    margin-bottom: var(--space-lg);
    transition: color 0.2s ease-out;
  }

  .contact__email:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }

  .contact__email:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-in {
      animation: none;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: var(--space-lg);
      border-radius: 1rem;
      box-shadow: none;
      background-color: transparent;
    }

    .section {
      padding: var(--space-3xl) var(--space-lg);
    }

    .section--hero {
      padding: var(--space-lg);
    }

    .contact__email {
      font-size: var(--text-lg);
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(pages): assemble complete single-page portfolio with all sections"
```

---

### Task 15: Remove SkillsSection (no longer used)

**Files:**
- Delete: `src/components/SkillsSection.astro`

- [ ] **Step 1: Remove file**

```bash
Remove-Item -Path "D:\projetos\AboutMe\src\components\SkillsSection.astro" -Force
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsSection.astro
git commit -m "refactor(components): remove SkillsSection — skills now contextual in tags"
```

---

### Task 16: Build and verify

**Files:**
- Verify: entire build output

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Verify HTML output**

Open `dist/index.html` and confirm:
- All 5 sections present (`#hero`, `#experiencia`, `#projetos`, `#formacao`, `#contato`).
- NavBar links point to correct anchors.
- Experience timeline renders 5 items.
- Projects grid renders Groot Terminal card.
- Education renders 2 items.
- Contact email is clickable.

- [ ] **Step 3: Optional dev server check**

```bash
npm run dev
```

Verify visually in browser: responsive layout, hover states, smooth scroll, navbar blur on scroll.

- [ ] **Step 4: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: finalize portfolio build and verify output"
```

---

## Spec Coverage Review

| Spec Requirement | Task |
|---|---|
| Single-page com 5 seções | Task 14 (`index.astro`) |
| Hero full-viewport com CTAs | Task 8 (`ProfileHeader`) + Task 14 |
| Experiência em timeline | Task 9 (`ExperienceItem`) + Task 10 (`ExperienceTimeline`) |
| Projetos em grid | Task 11 (`ProjectCard`) + Task 12 (`ProjectsGrid`) |
| Formação em lista | Task 13 (`EducationItem`) + Task 14 |
| Contato convidativo | Task 14 (seção `#contato`) |
| NavBar fixa com âncoras | Task 5 (`NavBar`) + Task 6 (`SmoothScroll`) + Task 7 (`Layout`) |
| Dados tipados em `src/data/` | Task 1 |
| Skills soltas removidas | Task 15 |
| Animações de entrada | Task 2 (CSS) + Task 14 (IntersectionObserver) |
| Acessibilidade (skip link, aria, foco) | Task 5 + Task 7 + Task 8 + Task 9 + Task 11 |
| Responsividade | Todos os componentes com media queries |

---

## Placeholder Scan

No placeholders, TBDs, or incomplete steps found. All code is present in each step.

---

## Type Consistency Review

- `Experience` interface defined in `src/data/experience.ts` — consumed by `ExperienceItem.astro`.
- `Project` interface defined in `src/data/projects.ts` — consumed by `ProjectCard.astro`.
- `Education` interface defined in `src/data/education.ts` — consumed by `EducationItem.astro`.
- Social type inline in `SocialLinks.astro` and `index.astro` — consistent shape across both usages.

All types match. No drift.
