// VolcanoTech site interactions

const socialLinks = {
  whatsapp: 'https://wa.me/243977712959',
  facebook: 'https://www.facebook.com/1140079832521152/',
  linkedin: 'https://www.linkedin.com/in/daniel-ngwej-78195b3a9',
};

const socialIcons = {
  whatsapp: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.74.45 3.43 1.31 4.91L2 22l5.42-1.42a9.9 9.9 0 0 0 4.61 1.17h.01c5.41 0 9.82-4.4 9.83-9.82a9.77 9.77 0 0 0-2.82-7.02Zm-7.02 15.18h-.01a8.23 8.23 0 0 1-4.19-1.14l-.3-.18-3.22.84.86-3.14-.2-.32a8.18 8.18 0 0 1-1.26-4.33c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.24Zm4.51-6.14c-.25-.13-1.47-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.97-.14.16-.29.19-.54.06-.25-.13-1.05-.39-2-1.25-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.91 2.42 1.04 2.58c.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.67-1.17.21-.58.21-1.08.15-1.17-.06-.1-.23-.16-.48-.29Z"></path>
    </svg>
  `,
  facebook: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46h1.7V5a20.5 20.5 0 0 0-2.48-.12c-2.46 0-4.14 1.5-4.14 4.25V11H7.5v3h2.56v8h3.44Z"></path>
    </svg>
  `,
  linkedin: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 18.5h2.88V9.78H5.5V18.5Zm4.69 0h2.87v-4.86c0-1.28.24-2.52 1.82-2.52 1.56 0 1.58 1.46 1.58 2.6v4.78h2.88v-5.36c0-2.63-.57-4.66-3.64-4.66-1.47 0-2.45.8-2.86 1.58h-.04V9.78h-2.61c.03.7 0 8.72 0 8.72Z"></path>
    </svg>
  `,
};

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
  { href: 'atelier-pro.html', label: 'AtelierPro', key: 'atelier-pro.html' },
  { href: 'contact.html', label: 'Contact', key: 'contact.html' },
];

const mobileMoreItems = [
  { href: 'a_propos.html', label: 'A propos' },
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

// Footer social links
document.querySelectorAll('.footer .footer-content').forEach((footerContent) => {
  const brandSection = footerContent.querySelector('.footer-section');
  if (!brandSection || brandSection.querySelector('.footer-socials')) return;

  const socials = document.createElement('div');
  socials.className = 'footer-socials';
  socials.setAttribute('aria-label', 'Reseaux sociaux VolcanoTech');
  socials.innerHTML = `
    <a href="${socialLinks.whatsapp}" class="social-link social-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp VolcanoTech">
      ${socialIcons.whatsapp}
    </a>
    <a href="${socialLinks.facebook}" class="social-link social-facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook VolcanoTech">
      ${socialIcons.facebook}
    </a>
    <a href="${socialLinks.linkedin}" class="social-link social-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn VolcanoTech">
      ${socialIcons.linkedin}
    </a>
  `;

  brandSection.appendChild(socials);
});

// Floating WhatsApp CTA
if (!document.querySelector('.whatsapp-float')) {
  const floatButton = document.createElement('a');
  floatButton.className = 'whatsapp-float';
  floatButton.href = socialLinks.whatsapp;
  floatButton.target = '_blank';
  floatButton.rel = 'noopener noreferrer';
  floatButton.setAttribute('aria-label', 'Contacter VolcanoTech sur WhatsApp');
  floatButton.innerHTML = `
    <span class="whatsapp-float-icon">${socialIcons.whatsapp}</span>
    <span class="whatsapp-float-text">WhatsApp</span>
  `;
  document.body.appendChild(floatButton);
}
