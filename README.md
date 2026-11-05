# João Victor Lourenço · Portfólio

Portfólio em português com Astro, ilhas React e componentes da Aceternity UI adaptados à identidade visual do projeto.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Abra `http://localhost:4321/AboutMe/`.

```sh
npm run build
npm run preview
```

O build executa a checagem de tipos antes de gerar o site estático em `dist/`. Também é possível usar Bun com `bun install --frozen-lockfile` e `bun run build`. Mantenha os dois lockfiles atualizados ao alterar dependências.

## Conteúdo

- `src/data/profile.ts`: identidade, e-mail e links profissionais.
- `src/data/experience.ts`: empresas, períodos, atividades e tecnologias.
- `src/data/projects.ts`: projetos, status e links de código público.
- `src/data/education.ts`: formação.
- `src/styles/global.css`: identidade visual, responsividade e temas.

A AgRisk é a experiência atual desde julho de 2026. O histórico foi conferido com o currículo fornecido: Luizalabs até junho de 2026 e dois cargos agrupados na Valmont. A formação exibe apenas o curso superior no IFTM. PivotSmart aparece como projeto em desenvolvimento e ID PRO como protótipo; não representam produtos com todas as funcionalidades concluídas. As artes dos projetos são composições gráficas, não capturas dos produtos.

## Interações e acessibilidade

- Background Beams With Collision da Aceternity na hero: feixes automáticos com partículas de colisão, sem depender do mouse, com controle para pausar.
- Revelação do título por linhas e abertura lateral da foto. Os feixes param fora da tela, com a aba oculta ou ao ativar movimento reduzido.
- 3D Card e Card Spotlight nas artes dos projetos.
- Revelação de seções ao entrar na tela, sem esconder conteúdo quando JavaScript está indisponível.
- Tema conforme a preferência do sistema, com alternância manual persistida.
- Menu mobile com Escape, restauração de foco e fechamento após navegar.
- Âncoras nativas, link para pular ao conteúdo e preferência por movimento reduzido.
- Fontes hospedadas localmente e foto otimizada em WebP.

Os componentes Aceternity são distribuídos como código copiável. As adaptações ficam em `src/components/ui/`, com referências às fontes:

- [3D Card](https://ui.aceternity.com/components/3d-card-effect)
- [Card Spotlight](https://ui.aceternity.com/components/card-spotlight)
- [Background Beams With Collision](https://ui.aceternity.com/components/background-beams-with-collision)

Foram adaptados estilos, suporte a toque, preferência de movimento e limpeza das animações. O efeito de iluminação usa a máscara radial do Card Spotlight sem seu canvas WebGL opcional.

## Verificação no navegador

Com o [agent-browser](https://github.com/vercel-labs/agent-browser) disponível:

```powershell
npx agent-browser --session portfolio open http://localhost:4321/AboutMe/
npx agent-browser --session portfolio set viewport 390 844
Get-Content -Raw scripts/browser-smoke.js | npx agent-browser --session portfolio eval --stdin
```

Repita em desktop. O script verifica conteúdo, links internos, carregamento de imagens, rolagem horizontal, tema persistido, menu mobile e expansão das experiências. O botão de copiar e-mail pode ser verificado clicando nele no navegador; em ambientes sem permissão para a área de transferência, ele exibe o endereço como alternativa.

## Publicação

O workflow existente publica no GitHub Pages ao receber um push na branch `master`. `astro.config.mjs` define a origem e a base `/AboutMe/`; links de recursos respeitam essa base. O workflow verifica tipos e usa o lockfile do Bun antes do build. Alterações locais não são publicadas automaticamente sem push.
