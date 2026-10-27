// Mobile navigation and project category filters.
(function () {
  const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('navbar-links');

  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }
})();

(function () {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.featured-card, .project-card');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;

      filters.forEach(filter => {
        const isActive = filter === button;
        filter.classList.toggle('active', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });
})();
