
/* ============================================
   LA RUECA — FUNCIONES GENERALES
   Archivo: js/main.js

   Funciones:
   1. Cerrar el menú móvil al navegar.
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     01. MENÚ DE NAVEGACIÓN MÓVIL
  ======================================== */

  const menu = document.getElementById("menuPrincipal");

  if (!menu) return;

  const enlaces = menu.querySelectorAll(".nav-link");

  enlaces.forEach((enlace) => {

    enlace.addEventListener("click", () => {

      // Solo se cierra cuando el menú está abierto.
      if (!menu.classList.contains("show")) return;

      // Bootstrap controla la apertura y el cierre.
      if (window.bootstrap?.Collapse) {
        const menuBootstrap =
          bootstrap.Collapse.getOrCreateInstance(menu);

        menuBootstrap.hide();
      }

    });

  });

});
