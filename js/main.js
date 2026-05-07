// VolcanoTech site interactions

// Menu mobile
document.querySelectorAll('.navbar').forEach((navbar) => {
  const toggle = navbar.querySelector('.nav-toggle');
  if (!toggle) return;

  const closeMenu = () => {
    navbar.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navbar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  navbar.querySelectorAll('.nav-more-toggle').forEach((moreToggle) => {
    moreToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const item = moreToggle.closest('.nav-more');
      const isOpen = item.classList.toggle('is-open');
      moreToggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (navbar.contains(event.target)) return;
    navbar.querySelectorAll('.nav-more.is-open').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-more-toggle')?.setAttribute('aria-expanded', 'false');
    });
  });
});

// Header sticky state
const header = document.querySelector('.header');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile app-style navigation
const mobileNavItems = [
  { href: 'index.html', label: 'Accueil', key: 'index.html' },
  { href: 'solutions.html', label: 'Solutions', key: 'solutions.html' },
  { href: 'atelier-pro.html', label: 'Atelier Pro', key: 'atelier-pro.html' },
  { href: 'contact.html', label: 'Contact', key: 'contact.html' },
];

const mobileMoreItems = [
  { href: 'a_propos.html', label: 'À propos' },
  { href: 'projets.html', label: 'Projets' },
  { href: 'ressources.html', label: 'Ressources' },
  { href: 'livres.html', label: 'Documents' },
  { href: 'tutoriels.html', label: 'Guides' },
];

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const tabbar = document.createElement('nav');
tabbar.className = 'mobile-tabbar';
tabbar.setAttribute('aria-label', 'Navigation mobile');

tabbar.innerHTML = `
  ${mobileNavItems.map((item) => `
    <a href="${item.href}" ${currentPage === item.key ? 'aria-current="page"' : ''}>
      <span class="tab-icon" aria-hidden="true"></span>
      <span>${item.label}</span>
    </a>
  `).join('')}
  <button type="button" class="mobile-more-button" aria-expanded="false" aria-controls="mobile-more-panel">
    <span class="tab-icon" aria-hidden="true"></span>
    <span>Plus</span>
  </button>
`;

const morePanel = document.createElement('div');
morePanel.className = 'mobile-more-panel';
morePanel.id = 'mobile-more-panel';
morePanel.setAttribute('aria-hidden', 'true');
morePanel.innerHTML = `
  <div class="mobile-more-card">
    <div class="mobile-more-head">
      <strong>Navigation</strong>
      <button type="button" class="mobile-more-close" aria-label="Fermer le menu">Fermer</button>
    </div>
    <div class="mobile-more-links">
      ${mobileMoreItems.map((item) => `
        <a href="${item.href}" ${currentPage === item.href ? 'aria-current="page"' : ''}>${item.label}</a>
      `).join('')}
    </div>
  </div>
`;

document.body.append(tabbar, morePanel);

const moreButton = tabbar.querySelector('.mobile-more-button');
const closeMore = () => {
  morePanel.classList.remove('is-open');
  morePanel.setAttribute('aria-hidden', 'true');
  moreButton.setAttribute('aria-expanded', 'false');
};

moreButton.addEventListener('click', () => {
  const isOpen = morePanel.classList.toggle('is-open');
  morePanel.setAttribute('aria-hidden', String(!isOpen));
  moreButton.setAttribute('aria-expanded', String(isOpen));
});

morePanel.querySelector('.mobile-more-close').addEventListener('click', closeMore);
morePanel.addEventListener('click', (event) => {
  if (event.target === morePanel) closeMore();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMore();
});
