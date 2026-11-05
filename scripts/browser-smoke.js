// Run in an agent-browser session, after opening the local preview:
// Get-Content -Raw scripts/browser-smoke.js | npx agent-browser --session portfolio eval --stdin
// Repeat at desktop/mobile widths and with reduced motion enabled.
(async () => {
  const checks = [];
  function check(condition, message) {
    if (!condition) throw new Error(message);
    checks.push(message);
  }
  await document.fonts.ready;
  check(document.querySelectorAll('h1').length === 1, 'One primary heading');
  check(document.documentElement.lang === 'pt-BR', 'Portuguese document language');
  check(document.documentElement.scrollWidth <= innerWidth, 'No horizontal page overflow');
  check([...document.images].every(image => image.loading === 'lazy' && !image.complete || image.complete && image.naturalWidth > 0), 'Visible and eager images loaded');
  check([...document.querySelectorAll('a[href^="#"]')].every(link => document.getElementById(link.hash.slice(1))), 'All anchor targets exist');
  check([...document.querySelectorAll('a[target="_blank"]')].every(link => link.rel.includes('noopener')), 'External links isolated');
  check(document.querySelector('.experience-current h3').textContent === 'AgRisk', 'AgRisk is the current employer');
  check(document.querySelector('ol.experience-list') !== null, 'Career timeline uses an ordered list');
  const companyLogos = [...document.querySelectorAll('.company-logo img')];
  check(companyLogos.length === document.querySelectorAll('.experience').length, 'Every company has a logo');
  const logoResponses = await Promise.all(companyLogos.map(image => fetch(image.currentSrc || image.src)));
  check(logoResponses.every(response => response.ok && response.headers.get('content-type')?.startsWith('image/')), 'All company logo files load');
  check(!document.querySelector('#formacao').textContent.includes('Pós-Graduação'), 'Postgraduate entry removed');
  check(document.querySelectorAll('.education-item').length === 1, 'IFTM degree retained');
  check(document.querySelectorAll('.experience-position').length === 2, 'Valmont roles grouped');
  check(document.querySelectorAll('.project').length === 3, 'Three selected projects');
  check([...document.querySelectorAll('a')].some(link => link.href === 'https://www.linkedin.com/in/joaovictorlourencodiniz/'), 'Updated LinkedIn URL');

  const effects = document.querySelector('.hero-effects');
  check(effects !== null, 'Aceternity hero effect present');
  const heroBounds = document.querySelector('#hero').getBoundingClientRect();
  const heroVisible = Math.min(heroBounds.bottom, innerHeight) - Math.max(heroBounds.top, 0) > heroBounds.height * 0.15;
  const nextPaint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  await nextPaint();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    check(effects.querySelectorAll('.hero-beam-trail').length === 0, 'No beams with reduced motion');
  } else if (heroVisible) {
    check(effects.dataset.playing === 'true', 'Hero animates without mouse interaction');
    const pause = effects.querySelector('button');
    pause.click();
    await nextPaint();
    check(effects.dataset.playing === 'false' && !effects.querySelector('.hero-beam-trail'), 'Hero animation can pause');
    pause.click();
    await nextPaint();
    check(effects.dataset.playing === 'true', 'Hero animation can resume');
  }

  const theme = document.documentElement.dataset.theme;
  const toggle = document.querySelector('.theme-toggle');
  toggle.click();
  check(document.documentElement.dataset.theme !== theme, 'Theme toggle changes theme');
  check(localStorage.getItem('portfolio-theme') === document.documentElement.dataset.theme, 'Theme preference saved');
  toggle.click();

  const menu = document.querySelector('.menu-toggle');
  if (getComputedStyle(menu).display !== 'none') {
    menu.click();
    check(menu.getAttribute('aria-expanded') === 'true', 'Mobile menu opens');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    check(menu.getAttribute('aria-expanded') === 'false', 'Escape closes menu');
    check(document.activeElement === menu, 'Menu focus restored');
    menu.click();
    document.querySelector('.navbar-link[href="#projetos"]').click();
    check(menu.getAttribute('aria-expanded') === 'false', 'Navigation closes mobile menu');
  }

  const disclosure = document.querySelector('.experience details');
  disclosure.querySelector('summary').click();
  check(disclosure.open, 'Experience details expand');
  disclosure.querySelector('summary').click();
  check(!disclosure.open, 'Experience details collapse');

  // Exercise both clipboard outcomes without changing the user's clipboard.
  const clipboard = navigator.clipboard;
  const originalWrite = clipboard.writeText;
  const copyButton = document.querySelector('.copy-email');
  const feedback = document.querySelector('.copy-feedback');
  try {
    let copied = '';
    clipboard.writeText = async text => { copied = text; };
    copyButton.click();
    await Promise.resolve();
    check(copied === copyButton.dataset.email && feedback.textContent.includes('copiado'), 'Copy email success feedback');
    clipboard.writeText = async () => { throw new Error('Permission denied'); };
    copyButton.click();
    await Promise.resolve();
    check(feedback.textContent.includes(copyButton.dataset.email), 'Clipboard denial shows email fallback');
  } finally { clipboard.writeText = originalWrite; feedback.textContent = ''; }

  return { width: innerWidth, theme, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, passed: checks.length, checks };
})()
