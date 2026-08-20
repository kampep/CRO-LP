const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar__links');

if (menuButton && menu) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menu.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

const revealItems = document.querySelectorAll('.reveal, .reveal-stagger');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('[data-accordion]').forEach((accordion) => {
  const items = accordion.querySelectorAll('details');

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const previousLabel = button.textContent;
    button.textContent = 'Dziękujemy — odezwiemy się';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = previousLabel;
      button.disabled = false;
    }, 4000);
  });
}
