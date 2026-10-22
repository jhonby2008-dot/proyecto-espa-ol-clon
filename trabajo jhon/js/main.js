const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const addPointerTilt = (element) => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !window.matchMedia('(hover: hover)').matches
  ) {
    return;
  }

  element.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;

    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;
    element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
  });

  element.addEventListener('pointerleave', () => {
    element.style.removeProperty('transform');
  });
};

document
  .querySelectorAll(
    '.visual-frame, .chrome-title, .mission-box, .value-card, .story-panel, .feature-scene, .network-visual, .network-panel, .opinion-feature, .quote-panel, .mini-opinion, .closing-scene, .article-hero-art'
  )
  .forEach(addPointerTilt);

const networkConfig = [
  { id: 'redes', label: 'Redes', x: 100, y: 115, description: 'Las redes sociales organizan visibilidad, atención y conversación en tiempo real.' },
  { id: 'ai', label: 'IA', x: 230, y: 220, description: 'La inteligencia artificial procesa patrones, tendencias y decisiones con rapidez creciente.' },
  { id: 'sociedad', label: 'Sociedad', x: 360, y: 120, description: 'Las personas interpretan, cuestionan y responden a los sistemas que las rodean.' },
  { id: 'cultura', label: 'Cultura', x: 540, y: 190, description: 'La creatividad, la identidad y la memoria colectiva se reconfiguran con la tecnología.' },
  { id: 'economia', label: 'Economía', x: 300, y: 320, description: 'La economía digital transforma modelos de trabajo, producción y consumo.' },
  { id: 'personas', label: 'Personas', x: 500, y: 310, description: 'Los seres humanos traducen datos, deseos y decisiones en acción real.' }
];

const networkSvg = document.getElementById('network-svg');
const networkTitle = document.getElementById('network-title');
const networkDescription = document.getElementById('network-description');
const resetButton = document.getElementById('reset-network');

if (networkSvg && networkTitle && networkDescription) {
  const lines = [
    ['redes', 'ai'],
    ['redes', 'sociedad'],
    ['redes', 'cultura'],
    ['ai', 'economia'],
    ['sociedad', 'personas'],
    ['cultura', 'personas'],
    ['economia', 'sociedad'],
    ['cultura', 'ai']
  ];

  const lineGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  lineGroup.setAttribute('class', 'network-lines');

  lines.forEach(([fromId, toId]) => {
    const from = networkConfig.find((node) => node.id === fromId);
    const to = networkConfig.find((node) => node.id === toId);

    if (!from || !to) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x);
    line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x);
    line.setAttribute('y2', to.y);
    line.setAttribute('stroke', 'rgba(169,184,215,0.45)');
    line.setAttribute('stroke-width', '1.5');
    lineGroup.appendChild(line);
  });

  networkSvg.appendChild(lineGroup);

  const centerX = 330;
  const centerY = 210;
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerCircle.setAttribute('cx', centerX);
  centerCircle.setAttribute('cy', centerY);
  centerCircle.setAttribute('r', 62);
  centerCircle.setAttribute('fill', 'rgba(32,221,245,0.12)');
  centerCircle.setAttribute('stroke', 'rgba(32,221,245,0.55)');
  centerCircle.setAttribute('stroke-width', '1.5');
  networkSvg.appendChild(centerCircle);

  const centerGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerGlow.setAttribute('cx', centerX);
  centerGlow.setAttribute('cy', centerY);
  centerGlow.setAttribute('r', 28);
  centerGlow.setAttribute('fill', 'rgba(135,60,255,0.2)');
  centerGlow.setAttribute('stroke', 'rgba(255,255,255,0.12)');
  networkSvg.appendChild(centerGlow);

  const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  networkConfig.forEach((node) => {
    const item = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    item.setAttribute('class', 'node');
    item.dataset.key = node.id;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', 32);
    circle.setAttribute('fill', node.id === 'sociedad' ? 'rgba(32,221,245,0.18)' : 'rgba(255,255,255,0.04)');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y + 4);
    text.textContent = node.label;

    item.appendChild(circle);
    item.appendChild(text);

    item.addEventListener('click', () => {
      networkTitle.textContent = node.label;
      networkDescription.textContent = node.description;

      const activeNode = networkSvg.querySelector('.node.is-active');
      if (activeNode) activeNode.classList.remove('is-active');
      item.classList.add('is-active');

      const allLines = networkSvg.querySelectorAll('line');
      allLines.forEach((line) => {
        const coords = [line.getAttribute('x1'), line.getAttribute('y1'), line.getAttribute('x2'), line.getAttribute('y2')];
        const starts = `${coords[0]},${coords[1]}`;
        const ends = `${coords[2]},${coords[3]}`;
        const matches = lines.some(([fromId, toId]) => {
          const from = networkConfig.find((n) => n.id === fromId);
          const to = networkConfig.find((n) => n.id === toId);
          if (!from || !to) return false;
          return `${from.x},${from.y}` === starts && `${to.x},${to.y}` === ends || `${to.x},${to.y}` === starts && `${from.x},${from.y}` === ends;
        });

        if (matches) {
          const fromNode = networkConfig.find((n) => `${n.x},${n.y}` === starts) || networkConfig.find((n) => n.id === node.id);
          const toNode = networkConfig.find((n) => `${n.x},${n.y}` === ends) || networkConfig.find((n) => n.id === node.id);
          const shouldHighlight = !!((fromNode && fromNode.id === node.id) || (toNode && toNode.id === node.id));
          line.setAttribute('stroke', shouldHighlight ? 'rgba(32,221,245,0.9)' : 'rgba(169,184,215,0.45)');
          line.setAttribute('stroke-width', shouldHighlight ? '2.5' : '1.5');
        }
      });
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });

    item.setAttribute('tabindex', '0');
    nodeGroup.appendChild(item);
  });

  networkSvg.appendChild(nodeGroup);

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      const allLines = networkSvg.querySelectorAll('line');
      allLines.forEach((line) => {
        line.setAttribute('stroke', 'rgba(169,184,215,0.45)');
        line.setAttribute('stroke-width', '1.5');
      });

      const activeNode = networkSvg.querySelector('.node.is-active');
      if (activeNode) activeNode.classList.remove('is-active');

      networkTitle.textContent = 'Tecnología';
      networkDescription.textContent = 'Las herramientas digitales moldean la forma en que vemos, decidimos y nos relacionamos.';
    });
  }

  const defaultNode = networkSvg.querySelector('.node[data-key="sociedad"]');
  if (defaultNode) {
    defaultNode.classList.add('is-active');
    networkTitle.textContent = 'Sociedad';
    networkDescription.textContent = 'Las personas interpretan, cuestionan y responden a los sistemas que las rodean.';
  }
}
