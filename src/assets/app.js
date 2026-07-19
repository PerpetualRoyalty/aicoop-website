const header = document.querySelector('[data-site-header]');
const toggle = header?.querySelector('.menu-toggle');
const navigation = header?.querySelector('#primary-navigation');

function setMenu(open) {
  if (!header || !toggle || !navigation) return;
  header.dataset.menuOpen = String(open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
  if (!open) toggle.focus();
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a') && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
});

document.addEventListener('click', (event) => {
  if (header && !header.contains(event.target) && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
});
