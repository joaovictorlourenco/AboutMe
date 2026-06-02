# Design: Portfólio Completo Single-Page

**Data:** 2026-06-02  
**Autor:** OpenCode (brainstorming com João Victor Lourenço)  
**Status:** Aprovado para implementação  
**Escopo:** Evoluir o link-in-bio atual (`AboutMe`) para um portfólio single-page com 5 seções empilhadas, mantendo a identidade visual warm, approachable, skilled definida em `PRODUCT.md`.

---

## 1. Objetivo

Transformar a página atual (link-in-bio focada) em um portfólio profissional completo que:

- Comunique quem João é em < 30 segundos (hero).
- Demonstre trajetória técnica via experiência profissional estruturada.
- Destaque projetos com contexto e tech stack.
- Mantenha a identidade visual existente (cores `oklch`, fontes `Bricolage`/`Sora`, warm + skilled).
- Seja facilmente expansível (adicionar projetos, experiências sem tocar no layout).

---

## 2. Decisões de Arquitetura

### 2.1 Single-Page com Navegação por Âncoras

**Decisão:** Uma única página Astro (`index.astro`) com 5 seções verticais empilhadas e navegação fixa com scroll suave.

**Racional:**
- O `PRODUCT.md` define o job-to-be-done como "entender em 30 segundos e conectar". Single-page preserva esse scan rápido.
- Multi-page fragmentaria a jornada do recruiter. A proposta atual já é um "bridge, not billboard" — expandir seções, não adicionar cliques.
- A estrutura existente (card centralizado, links sociais) evolui naturalmente para um hero full-viewport + seções abaixo.

**Trade-offs considerados:**
- *Single-page (escolhida):* Scan rápido, uma jornada contínua, SEO suficiente para nome pessoal.
- *Multi-page:* Melhor SEO por seção, mas quebra o propósito do link-in-bio. Rejeitada.
- *Híbrida (single + páginas de projeto):* Overkill com 1 projeto. Revisitada quando houver 6+ projetos detalhados.

### 2.2 Dados em Arquivos de Dados Tipados (`src/data/`)

Experiências, projetos e formação serão arrays TypeScript em `src/data/` (ex: `src/data/experience.ts`), importados como props nos componentes Astro.

**Racional:**
- Facilita adicionar novos itens sem editar markup.
- Type-safety nativa do Astro/TS.
- Sem overhead de CMS ou Markdown para conteúdo estático de um portfólio pessoal.

---

## 3. Seções da Página

### 3.1 Hero

**Propósito:** Warm first impression + identidade imediata.

**Conteúdo:**
- Foto de perfil com anel gradiente (`--color-primary` → `--color-accent`).
- Label: "Olá, eu sou"
- Nome: "João Victor Lourenço"
- Subtítulo: "Desenvolvedor de Software — do backend de alta performance ao frontend polido."
- Tagline: "Construo sistemas escaláveis em Go, Node e Python. Gosto de código limpo, arquitetura bem pensada e produtos que funcionam."
- CTAs: "Ver experiência" e "Ver projetos" (scroll suave para seções).
- Links sociais: LinkedIn, GitHub, Instagram, Email (fileira horizontal de ícones, compacta).

**Layout:**
- Desktop: Foto à esquerda, texto à direita, alinhados verticalmente ao centro.
- Mobile: Foto acima, texto abaixo, centralizado.
- `min-height: 100dvh`, conteúdo centralizado vertical e horizontalmente.
- Animação de entrada suave (fade + translateY, respeitando `prefers-reduced-motion`).

**Decisão:** A tagline foi reformulada do original ("Transformo ideias em aplicações web...") para refletir a amplitude técnica (Go, CLI, backend pesado), não só full-stack web.

### 3.2 Experiência Profissional

**Propósito:** Mostrar trajetória e competências em contexto.

**Layout:** Timeline vertical alinhada à esquerda.
- Linha conectora fina (`1px solid var(--color-border)`).
- Círculos (`0.5rem`, `background: var(--color-primary)`) marcam cada cargo.
- Cards de experiência à direita da linha (desktop) ou abaixo (mobile).

**Card de Experiência:**
- Header: `[Empresa] · [Cargo] · [Período]`
  - Ex: "Luizalabs (Magalu) · Desenvolvedor de Software · ago/2025 – Presente"
- Descrição: 3–5 bullets concisos (do que o usuário forneceu).
- Tags de tech: pequenas tags ao final (ex: `Go`, `Node`, `ScyllaDB`).

**Ordenação:** Mais recente primeiro.

**Empresas:**
1. Luizalabs (Magalu) — ago/2025 – Presente — Desenvolvedor de Software
2. Valmont Industries, Inc. — jul/2022 – ago/2025 — Desenvolvedor de Software / Full Stack
3. Cândido Empresarial — mar/2022 – jul/2022 — Desenvolvedor Full Stack / Software
4. bugWare — jul/2021 – jul/2022 — Desenvolvedor de Software (Empresa Júnior — IFTM)
5. FETI Uberaba — jul/2021 – mar/2022 — Desenvolvedor Front-end

**Nota sobre overlap:** bugWare é explicitamente marcada como "Empresa Júnior (IFTM)" para clarificar que era atividade acadêmica/paralela. A FETI é a experiência efetiva durante parte desse período.

**Decisão:** A seção de skills soltas (`SkillsSection.astro`) será **removida** do topo. As skills agora vivem contextualizadas dentro de cada experiência e projeto, evitando a "parede de buzzwords" criticada no `PRODUCT.md`.

### 3.3 Projetos

**Propósito:** Demonstrar capacidade técnica com provas concretas.

**Layout:** Grid de cards. 1 coluna mobile, 2 colunas desktop (`gap: var(--space-xl)`).

**Card de Projeto:**
- **Imagem/screenshot:** Se disponível. Se não, um placeholder visual com o nome do projeto e cor de fundo `var(--color-surface)`.
- **Nome do projeto:** `h3`, bold.
- **Descrição:** 1–2 frases.
- **Tech stack:** Tags pequenas (mesmo estilo das tags de experiência).
- **Links:** Ícone GitHub (sempre visível) e "Ver projeto" (se houver deploy).

**Projetos iniciais:**
1. **Groot Terminal** (featured) — IA integrada ao terminal em Go. CLI com Cobra, spinners, cores. [GitHub](https://github.com/joaovictorlourenco/IaDeTerminal)

**Escalabilidade:** O array de projetos em `src/data/projects.ts` permite adicionar novos itens sem tocar no layout.

### 3.4 Formação

**Propósito:** Contexto acadêmico e aprendizado contínuo.

**Layout:** Lista simples (sem timeline). Cada item:
- Nome do curso em bold.
- Instituição + período na mesma linha, `var(--color-muted)`.
- Descrição curta opcional (foco do curso).

**Itens:**
1. **Pós-Graduação em Engenharia de Software** — PUC Minas · 2025 – 2026 (prev.) — Foco em Arquitetura de Software, Métodos Ágeis, Bancos de Dados e UX.
2. **Tecnologia em Análise e Desenvolvimento de Sistemas** — IFTM · 2021 – 2024 (concluído)

### 3.5 Contato / Footer

**Propósito:** Bridge — converter interesse em ação (email, redes).

**Conteúdo:**
- Título convidativo: "Vamos conversar?"
- Texto: "Seja para uma oportunidade, uma ideia maluca ou só para trocar uma ideia sobre tech."
- Email em destaque: `joaovictorlourenco886@gmail.com` como link grande (`text-xl`), claramente clicável.
- Links sociais: fileira horizontal (LinkedIn, GitHub, Instagram, Email).
- Footer: `© 2026 · João Victor Lourenço`. Frase opcional: "Feito com Astro, café e muitas linhas de código."

---

## 4. Componentes

### 4.1 Componentes Novos

| Componente | Responsabilidade |
|---|---|
| `NavBar.astro` | Barra de navegação fixa no topo. Desktop: links textuais. Mobile: hamburger menu. Links para âncoras das 5 seções. Aparece/se esconde com blur sutil ao scrollar (ou sempre visível em desktop). |
| `SmoothScroll.astro` | Script inline para scroll suave ao clicar em âncoras (ou link `<a href="#id">`). |
| `SectionHeading.astro` | Reutilizável: label pequeno (ex: "Onde trabalhei") + título da seção (`h2`). Estilo consistente em todas as seções. |
| `ExperienceTimeline.astro` | Wrapper da timeline. Recebe array de `ExperienceItem` e renderiza a linha conectora. |
| `ExperienceItem.astro` | Card de uma experiência. Recebe: empresa, cargo, período, descrição (array de strings), techs (array de strings). |
| `ProjectCard.astro` | Card de projeto. Recebe: nome, descrição, techs, imagem (opcional), links (github, deploy). |
| `ProjectsGrid.astro` | Grid wrapper. Recebe array de `ProjectCard`. |
| `EducationItem.astro` | Item de formação. Recebe: curso, instituição, período, descrição opcional. |
| `SocialLinks.astro` | Fileira horizontal de ícones sociais (reutilizável no hero e no contato). |

### 4.2 Componentes Reaproveitados / Atualizados

| Componente | Mudanças |
|---|---|
| `ProfileHeader.astro` | Expandido para incluir CTAs e `SocialLinks` abaixo do texto. Tagline e subtítulo atualizados. |
| `SocialLink.astro` | Mantido como está (estilo de botão). Usado no grid antigo e potencialmente no footer, mas o hero/contato usam `SocialLinks` (ícones compactos). |
| `Layout.astro` | Atualizado para incluir `NavBar` e `SmoothScroll`. Mantém SEO, fontes, favicon. |

### 4.3 Componentes Removidos

| Componente | Razão |
|---|---|
| `SkillsSection.astro` | Skills agora vivem contextualizadas em tags dentro de experiências e projetos. Evita parede de buzzwords. |

---

## 5. Navegação

### 5.1 Desktop
- Barra fixa no topo, `position: fixed`, `z-index: 50`.
- Links: "Início", "Experiência", "Projetos", "Formação", "Contato".
- Cada link aponta para `id` da seção (`#hero`, `#experiencia`, etc.).
- Scroll suave ao clicar.
- Estética: fundo transparente inicialmente, blur + fundo semi-transparente (`backdrop-filter: blur(8px)`) após scrollar ~100px.
- Skip link invisível: "Pular para conteúdo" para acessibilidade.

### 5.2 Mobile
- Hamburger menu no topo direito.
- Menu expande como overlay ou dropdown.
- Mesmos links do desktop.
- Acessibilidade: `aria-expanded`, foco gerenciado.

### 5.3 Scroll Spy (opcional, pós-MVP)
- Destacar o link ativo conforme o scroll da página. Não é obrigatório para o MVP.

---

## 6. Estilo e Design Visual

### 6.1 Cores
Mantém o sistema `oklch` atual de `global.css` e `tailwind.config.js`. Nenhuma mudança.

### 6.2 Fontes
Mantém `Bricolage` (display) e `Sora` (body). Nenhuma mudança.

### 6.3 Espaçamento
- Entre seções: `var(--space-4xl)` (6rem) ou mais, para criar "respiro" e separação visual.
- Dentro de seções: `var(--space-xl)` (2rem) a `var(--space-2xl)` (3rem).
- Timeline: gap entre cards de `var(--space-2xl)`.

### 6.4 Animações
- **Entrada do hero:** Fade-in + `translateY(16px → 0)`, 0.5s ease-out (já existe, reaproveitar).
- **Entrada de seções:** IntersectionObserver para animar elementos quando entram no viewport (fade-up suave). Implementação leve, sem biblioteca externa.
- **Hover nos cards:** Mesmos padrões atuais (`translateY(-1px)`, sombra sutil).
- **Reduced motion:** Todas as animações desabilitadas via `@media (prefers-reduced-motion: reduce)`.

---

## 7. Dados (Estrutura TypeScript)

### 7.1 Experiência
```typescript
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[]; // bullets
  techs: string[];
  isAcademic?: boolean; // para marcar bugWare como Empresa Júnior
}
```

### 7.2 Projeto
```typescript
interface Project {
  name: string;
  description: string;
  techs: string[];
  image?: string; // path opcional
  githubUrl: string;
  deployUrl?: string;
  featured?: boolean;
}
```

### 7.3 Formação
```typescript
interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}
```

---

## 8. Responsividade

| Breakpoint | Comportamento |
|---|---|
| < 480px | Hero empilhado, timeline sem linha (cards empilhados), projetos 1 coluna, nav hamburger. |
| 480px – 768px | Hero empilhado, timeline com linha, projetos 1 coluna. |
| 768px – 1024px | Hero lado a lado, timeline com linha, projetos 2 colunas. |
| > 1024px | Hero lado a lado com mais espaçamento, timeline, projetos 2 colunas, nav fixa visível. |

---

## 9. Acessibilidade

- WCAG AA: contrastes mantidos, fontes legíveis.
- Skip link no topo.
- Foco visível em todos os elementos interativos.
- `aria-label` na navegação e nos links sociais.
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, headings hierárquicos (`h1` no hero, `h2` nas seções, `h3` nos cards).
- Respeita `prefers-reduced-motion`.
- Alt text na foto de perfil (já existe).

---

## 10. Estrutura de Arquivos Final

```
src/
├── pages/
│   └── index.astro
├── layouts/
│   └── Layout.astro
├── components/
│   ├── NavBar.astro
│   ├── SmoothScroll.astro
│   ├── SectionHeading.astro
│   ├── ProfileHeader.astro          (atualizado)
│   ├── SocialLinks.astro
│   ├── SocialLink.astro             (mantido)
│   ├── ExperienceTimeline.astro
│   ├── ExperienceItem.astro
│   ├── ProjectsGrid.astro
│   ├── ProjectCard.astro
│   ├── EducationItem.astro
│   └── ... (outros se necessário)
├── data/
│   ├── experience.ts
│   ├── projects.ts
│   └── education.ts
└── styles/
    └── global.css                   (mantido, talvez + animações de seção)
```

---

## 11. Fora de Escopo (para esta fase)

- Página dedicada para cada projeto (quando houver 6+ projetos detalhados, revisamos).
- Blog ou seção de artigos.
- Sistema de tema dark/light (o tema atual é light; se solicitado, vira fase separada).
- Integração com CMS.
- Testes E2E (foco em implementar o portfólio primeiro).

---

## 12. Notas de Implementação

- O `SocialLinks` do hero e do contato são esteticamente diferentes: hero usa ícones grandes + label abaixo, contato usa ícones menores em fileira. Podem ser o mesmo componente com variantes (`compact` vs `large`).
- A timeline em mobile pode perder a linha conectora visual e ficar só como cards empilhados — isso é aceitável e melhora a legibilidade em telas pequenas.
- A foto do Groot Terminal no card de projeto pode ser o screenshot que o usuário anexou na conversa (`2025-03-30-12-13-58.png`), se disponível no repo.

---

## 13. Checklist de Aprovação

- [x] Arquitetura single-page aprovada
- [x] 5 seções definidas (Hero, Experiência, Projetos, Formação, Contato)
- [x] Componentes mapeados (novos, reaproveitados, removidos)
- [x] Dados estruturados em `src/data/`
- [x] Navegação fixa com scroll suave
- [x] Acessibilidade e responsividade cobertas
- [x] Fora de escopo delimitado

**Próximo passo:** Criar plano de implementação via `writing-plans`.
