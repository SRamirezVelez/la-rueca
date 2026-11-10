/* La Rueca: navegación y mejoras comunes */
document.querySelectorAll('#menuPrincipal .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menuPrincipal');
    if (menu && menu.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
