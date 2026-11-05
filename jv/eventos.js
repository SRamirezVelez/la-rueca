
/* ==================================
   LA RUECA - PRÓXIMOS TALLERES
================================== */

// Número de WhatsApp de La Rueca.
// Confirma que sea el número correcto antes de publicar.
const whatsappLaRueca = "573006522403";

// AGREGA AQUÍ LOS PRÓXIMOS TALLERES
// No se incluyen fechas inventadas.
// Descomenta el ejemplo y cambia los datos
// cuando tengas un taller confirmado.

const eventos = [

  /*
  {
    nombre: "Bordado para principiantes",
    fecha: "2027-02-20",
    hora: "10:00 a. m.",
    lugar: "Medellín",
    imagen: "img/hero-bordado.png",
    cupos: "Consultar disponibilidad"
  },
  */

];

// Mostrar eventos
const contenedor = document.getElementById("lista-eventos");

function crearFechaLocal(fecha) {
  return new Date(`${fecha}T00:00:00`);
}

function obtenerDia(fecha) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit"
  }).format(fecha);
}

function obtenerMes(fecha) {
  return new Intl.DateTimeFormat("es-CO", {
    month: "short"
  }).format(fecha).replace(".", "");
}

function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function mostrarEventos() {
  if (!contenedor) return;

  contenedor.replaceChildren();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const proximos = eventos
    .filter(e => {
      const fecha = crearFechaLocal(e.fecha);
      return !Number.isNaN(fecha.getTime()) && fecha >= hoy;
    })
    .sort((a, b) =>
      crearFechaLocal(a.fecha) - crearFechaLocal(b.fecha)
    );

  if (proximos.length === 0) {
    const vacio = crearElemento("div", "sin-eventos");
    vacio.append(
      crearElemento("h3", "", "Próximamente nuevas fechas 🧵"),
      crearElemento(
        "p",
        "",
        "Estamos preparando nuevas experiencias creativas. Escríbenos para conocer las próximas fechas."
      )
    );

    const boton = crearElemento("a", "boton", "Consultar por WhatsApp ↗");
    boton.href = `https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(
      "Hola, me gustaría conocer las próximas fechas de los talleres de La Rueca."
    )}`;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
    vacio.append(boton);
    contenedor.append(vacio);
    return;
  }

  proximos.forEach(evento => {
    const fecha = crearFechaLocal(evento.fecha);
    const tarjeta = crearElemento("article", "evento");

    const cajaFecha = crearElemento("div", "evento-fecha");
    cajaFecha.append(
      crearElemento("span", "evento-dia", obtenerDia(fecha)),
      crearElemento("span", "evento-mes", obtenerMes(fecha))
    );

    const imagen = document.createElement("img");
    imagen.className = "evento-imagen";
    imagen.src = evento.imagen;
    imagen.alt = evento.nombre;
    imagen.loading = "lazy";

    const detalles = crearElemento("div", "evento-detalles");
    detalles.append(
      crearElemento("span", "evento-etiqueta", evento.cupos),
      crearElemento("h3", "", evento.nombre),
      crearElemento("p", "", `🕐 ${evento.hora}`),
      crearElemento("p", "", `📍 ${evento.lugar}`)
    );

    const boton = crearElemento("a", "boton evento-boton", "Consultar cupo ↗");
    boton.href = `https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(
      `Hola, quiero información sobre el taller ${evento.nombre} del ${evento.fecha}.`
    )}`;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";

    tarjeta.append(cajaFecha, imagen, detalles, boton);
    contenedor.append(tarjeta);
  });
}

mostrarEventos();

/* ==================================
   FORMULARIO DE CONTACTO
================================== */

const formulario = document.getElementById("formulario-contacto");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const texto = [
      "Hola, La Rueca. Me gustaría recibir información.",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo: ${correo || "No indicado"}`,
      `Taller: ${servicio}`,
      `Mensaje: ${mensaje || "Quisiera conocer más detalles."}`
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

/* Cerrar menú móvil al seleccionar una sección */

document.querySelectorAll("#menuPrincipal .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("menuPrincipal");
    if (menu && menu.classList.contains("show") && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
