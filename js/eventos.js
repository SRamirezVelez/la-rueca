
/* ============================================
   LA RUECA — EVENTOS Y CONTACTO
   Archivo: js/eventos.js

   Funciones:
   1. Configuración de WhatsApp.
   2. Programación de talleres.
   3. Mostrar próximas experiencias.
   4. Consultas de cupos.
   5. Formulario de contacto.

   IMPORTANTE:
   Agregar únicamente eventos confirmados.
============================================ */


/* ============================================
   01. CONFIGURACIÓN DE WHATSAPP
============================================ */

const whatsappLaRueca = "573006522403";

// Crea un enlace con un mensaje personalizado.
function crearEnlaceWhatsApp(mensaje) {
  return `https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(mensaje)}`;
}


/* ============================================
   02. PROGRAMACIÓN DE TALLERES
============================================ */

// Agrega aquí los próximos talleres confirmados.
// La fecha siempre debe tener formato AAAA-MM-DD.


const eventos = [
  {
    nombre: "Imágenes para habitar la memoria",
    descripcion: "Taller de fotobordado para hacer de tus memorias un objeto presente. No necesitas experiencia previa.",

    fecha: "2026-11-14",
    hora: "3:00 p. m.",
    lugar: "El Zagúan Café",

    imagen: "img/fotobordado-memoria-1.png",

    imagen: "img/fotobordado-memoria-1.png",
    imagenVertical: true,
    enlaceInfo: "https://sites.google.com/view/bettilustra/experiencias/taller-de-fotobordado",

    cupos: "Consultar disponibilidad",
    precio: "$65.000 COP",
    reserva: "50% del aporte",
    materiales: "Todos los materiales incluidos",

    kit: [
      "1 fotografía impresa",
      "2 hojas de soporte patronaje",
      "2 agujas #3",
      "1 tijeras pulidoras",
      "4 madejas",
      "1 enhebrador",
      "Cartilla digital de obsequio"
    ],

    incluyeCafe: true,
    descuento: "Cupón de descuento para estudiantes CESDE"
  }
];


/* ============================================
   03. FUNCIONES AUXILIARES
============================================ */

// Convierte una fecha en fecha local.
function crearFechaLocal(valor) {

  if (
    typeof valor !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(valor)
  ) {
    return new Date(NaN);
  }

  const [anio, mes, dia] = valor.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  // Evita fechas inexistentes, como 2027-02-30.
  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getDate() !== dia
  ) {
    return new Date(NaN);
  }

  return fecha;
}


// Obtiene el día de un evento.
function obtenerDia(fecha) {

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit"
  }).format(fecha);

}


// Obtiene el mes abreviado.
function obtenerMes(fecha) {

  return new Intl.DateTimeFormat("es-CO", {
    month: "short"
  })
    .format(fecha)
    .replace(".", "");

}


// Crea un elemento HTML de forma segura.
function crearElemento(etiqueta, clase = "", texto = "") {

  const elemento = document.createElement(etiqueta);

  if (clase) {
    elemento.className = clase;
  }

  if (texto !== "") {
    elemento.textContent = texto;
  }

  return elemento;

}


// Detecta talleres con cupos agotados.
function tieneCuposLlenos(cupos = "") {

  return /llenos|sold out|agotado|sin cupos/i.test(cupos);

}


/* ============================================
   04. AGENDA DE PRÓXIMOS TALLERES
============================================ */

function mostrarEventos() {

  const contenedor =
    document.getElementById("lista-eventos");

  // No todas las páginas tienen una agenda.
  if (!contenedor) return;

  contenedor.replaceChildren();

  // Fecha actual, sin horas.
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Filtra fechas válidas y futuras.
  const proximos = eventos
    .filter((evento) => {

      const fecha = crearFechaLocal(evento.fecha);

      return (
        !Number.isNaN(fecha.getTime()) &&
        fecha >= hoy
      );

    })
    .sort((a, b) => {
      return crearFechaLocal(a.fecha) -
             crearFechaLocal(b.fecha);
    });


  /* ========================================
     04.1. CUANDO NO HAY EVENTOS
  ======================================== */

  if (proximos.length === 0) {

    const vacio = crearElemento(
      "div",
      "sin-eventos"
    );

    const titulo = crearElemento(
      "h3",
      "",
      "Próximamente nuevas fechas 🧵"
    );

    const descripcion = crearElemento(
      "p",
      "",
      "Estamos preparando nuevas experiencias creativas. Escríbenos para conocer las próximas fechas."
    );

    const boton = crearElemento(
      "a",
      "boton",
      "Consultar por WhatsApp ↗"
    );

    boton.href = crearEnlaceWhatsApp(
      "Hola, me gustaría conocer las próximas fechas de los talleres de La Rueca."
    );

    boton.target = "_blank";
    boton.rel = "noopener noreferrer";

    vacio.append(titulo, descripcion, boton);
    contenedor.append(vacio);

    return;
  }


  /* ========================================
     04.2. LÍMITE DE EVENTOS POR PÁGINA
  ======================================== */

  // Inicio utiliza data-max-eventos="3".
  // Talleres muestra todos los próximos eventos.

  const limite = Number.parseInt(
    contenedor.dataset.maxEventos || "0",
    10
  );

  const eventosVisibles = limite > 0
    ? proximos.slice(0, limite)
    : proximos;


  /* ========================================
     04.3. CREAR TARJETAS DE EVENTOS
  ======================================== */

  eventosVisibles.forEach((evento) => {

    const fecha = crearFechaLocal(evento.fecha);

    const cupos = evento.cupos ||
      "Consultar disponibilidad";

    const cuposLlenos = tieneCuposLlenos(cupos);

    // Contenedor principal.
    const tarjeta = crearElemento(
      "article",
      "evento"
    );

    // Fecha del taller.
    const cajaFecha = crearElemento(
      "div",
      "evento-fecha"
    );

    cajaFecha.append(
      crearElemento(
        "span",
        "evento-dia",
        obtenerDia(fecha)
      ),
      crearElemento(
        "span",
        "evento-mes",
        obtenerMes(fecha)
      )
    );

    // Fotografía.
    const imagen = crearElemento(
      "img",
      "evento-imagen"
    );

    imagen.src = evento.imagen || "img/galeria-1.png";

    // Fotografía vertical: mostrarla sin recortar.
    if (evento.imagenVertical) {
  imagen.classList.add("evento-imagen-vertical");
    }

    imagen.alt = evento.nombre || "Taller de La Rueca";
    imagen.loading = "lazy";

    // Información del taller.
    const detalles = crearElemento(
      "div",
      "evento-detalles"
    );

    detalles.append(
      crearElemento(
        "span",
        "evento-etiqueta",
        cupos
      ),
      crearElemento(
        "h3",
        "",
        evento.nombre || "Experiencia La Rueca"
      ),
      crearElemento(
        "p",
        "",
        `🕐 ${evento.hora || "Horario por confirmar"}`
      ),
      crearElemento(
        "p",
        "",
        `📍 ${evento.lugar || "Lugar por confirmar"}`
      )
    );

    // Botón de inscripción.
    let boton;

    if (cuposLlenos) {

      boton = crearElemento(
        "button",
        "boton evento-boton",
        "Cupos llenos"
      );

      boton.type = "button";
      boton.disabled = true;
      boton.style.opacity = "0.55";

    } else {

      boton = crearElemento(
        "a",
        "boton evento-boton",
        "Consultar cupo ↗"
      );

      const mensaje =
        `Hola, quiero información sobre el taller ${evento.nombre} del ${evento.fecha}.`;

      boton.href = crearEnlaceWhatsApp(mensaje);
      boton.target = "_blank";
      boton.rel = "noopener noreferrer";

    }


// ============================================
// INFORMACIÓN ADICIONAL DEL TALLER
// ============================================

if (evento.descripcion) {
  detalles.append(
    crearElemento("p", "", evento.descripcion)
  );
}

if (evento.precio) {
  detalles.append(
    crearElemento("p", "", `Aporte: ${evento.precio}`)
  );
}

if (evento.kit || evento.reserva || evento.descuento) {

  const informacion = crearElemento(
    "details",
    "evento-informacion"
  );

  const enlace = crearElemento(
    "summary",
    "",
    "Ver más información del taller"
  );

  informacion.append(enlace);

  if (evento.kit?.length) {

    informacion.append(
      crearElemento("p", "", "Kit incluido:")
    );

    const lista = crearElemento("ul");

    evento.kit.forEach((material) => {
      lista.append(
        crearElemento("li", "", material)
      );
    });

    informacion.append(lista);
  }

  if (evento.reserva) {
    informacion.append(
      crearElemento(
        "p",
        "",
        `Reserva: ${evento.reserva}`
      )
    );
  }

  if (evento.incluyeCafe) {
    informacion.append(
      crearElemento(
        "p",
        "",
        "¡El cafecito lo invitamos nosotras!"
      )
    );
  }

  if (evento.descuento) {
    informacion.append(
      crearElemento("p", "", evento.descuento)
    );
  }

  detalles.append(informacion);
}


// ============================================
// ENLACE EXTERNO CON MÁS INFORMACIÓN
// ============================================

if (evento.enlaceInfo) {

  const enlaceInfo = crearElemento(
    "a",
    "evento-enlace-info",
    "Conoce todos los detalles ↗"
  );

  enlaceInfo.href = evento.enlaceInfo;
  enlaceInfo.target = "_blank";
  enlaceInfo.rel = "noopener noreferrer";

  detalles.append(enlaceInfo);

}

    tarjeta.append(
      cajaFecha,
      imagen,
      detalles,
      boton
    );

    contenedor.append(tarjeta);

  });

}


/* ============================================
   05. FORMULARIO DE CONTACTO
============================================ */

function configurarFormulario() {

  const formulario =
    document.getElementById("formulario-contacto");

  // El formulario solo existe en ciertas páginas.
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    // Verifica los campos requeridos del HTML.
    if (!formulario.reportValidity()) return;

    // Lee los campos del formulario.
    function obtenerValor(id) {

      const campo = formulario.querySelector(
        `[id="${id}"]`
      );

      return campo?.value.trim() || "";
    }

    const nombre = obtenerValor("nombre");
    const telefono = obtenerValor("telefono");
    const correo = obtenerValor("correo");
    const servicio = obtenerValor("servicio");
    const mensaje = obtenerValor("mensaje");

    // Prepara la consulta para WhatsApp.
    const texto = [
      "Hola, La Rueca. Me gustaría recibir información.",
      "",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo: ${correo || "No indicado"}`,
      `Interés: ${servicio}`,
      `Mensaje: ${mensaje || "Quisiera conocer más detalles."}`
    ].join("\n");

    // Abre WhatsApp, sin simular un envío web.
    const enlace = crearEnlaceWhatsApp(texto);

    window.open(
      enlace,
      "_blank",
      "noopener,noreferrer"
    );

  });

}


/* ============================================
   06. INICIALIZACIÓN
============================================ */

function iniciarLaRueca() {

  mostrarEventos();
  configurarFormulario();

}

// Ejecutar cuando el HTML esté disponible.
if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    iniciarLaRueca
  );

} else {

  iniciarLaRueca();

}
