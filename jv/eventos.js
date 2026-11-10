/* LA RUECA — Agenda de próximos talleres y formulario WhatsApp */
const whatsappLaRueca = "573006522403";
// Completar exclusivamente con talleres confirmados.
const eventos = [
  // { nombre: "Bordado para principiantes", fecha: "2027-02-20", hora: "10:00 a. m.", lugar: "Medellín", imagen: "img/hero-bordado.jpg", cupos: "Consultar disponibilidad" }
];
const contenedor = document.getElementById('lista-eventos');
const fechaLocal = valor => new Date(`${valor}T00:00:00`);
function el(tag,clase,texto){const e=document.createElement(tag);if(clase)e.className=clase;if(texto)e.textContent=texto;return e;}
function mostrarEventos(){
 if(!contenedor)return;contenedor.replaceChildren();
 const hoy=new Date();hoy.setHours(0,0,0,0);
 const proximos=eventos.filter(e=>e.fecha&&!Number.isNaN(fechaLocal(e.fecha).getTime())&&fechaLocal(e.fecha)>=hoy).sort((a,b)=>fechaLocal(a.fecha)-fechaLocal(b.fecha));
 if(!proximos.length){const vacio=el('div','sin-eventos');vacio.append(el('h3','','Próximamente nuevas fechas 🧵'),el('p','','Estamos preparando nuevas experiencias creativas. Escríbenos para conocer las próximas fechas.'));
 const boton=el('a','boton','Consultar por WhatsApp ↗');boton.href=`https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent('Hola, me gustaría conocer las próximas fechas de los talleres de La Rueca.')}`;boton.target='_blank';boton.rel='noopener noreferrer';vacio.append(boton);contenedor.append(vacio);return;}
 proximos.forEach(evento=>{const f=fechaLocal(evento.fecha),lleno=/llenos|sold out|agotado/i.test(evento.cupos||'');const tarjeta=el('article','evento'),fecha=el('div','evento-fecha');fecha.append(el('span','evento-dia',new Intl.DateTimeFormat('es-CO',{day:'2-digit'}).format(f)),el('span','evento-mes',new Intl.DateTimeFormat('es-CO',{month:'short'}).format(f).replace('.','')));
 const img=el('img','evento-imagen');img.src=evento.imagen;img.alt=evento.nombre;img.loading='lazy';const detalle=el('div','evento-detalles');detalle.append(el('span','evento-etiqueta',evento.cupos||'Consultar disponibilidad'),el('h3','',evento.nombre),el('p','',`🕐 ${evento.hora}`),el('p','',`📍 ${evento.lugar}`));
 const boton=el('a','boton evento-boton',lleno?'Cupos llenos':'Consultar cupo ↗');if(lleno){boton.setAttribute('aria-disabled','true');boton.removeAttribute('href');boton.style.opacity='.55';}else{boton.href=`https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(`Hola, quiero información sobre el taller ${evento.nombre} del ${evento.fecha}.`)}`;boton.target='_blank';boton.rel='noopener noreferrer';}tarjeta.append(fecha,img,detalle,boton);contenedor.append(tarjeta);});
}
mostrarEventos();
const formulario=document.getElementById('formulario-contacto');
if(formulario){formulario.addEventListener('submit',e=>{e.preventDefault();if(!formulario.reportValidity())return;const get=id=>document.getElementById(id)?.value.trim()||'';const texto=['Hola, La Rueca. Me gustaría recibir información.',`Nombre: ${get('nombre')}`,`Teléfono: ${get('telefono')}`,`Correo: ${get('correo')||'No indicado'}`,`Interés: ${get('servicio')}`,`Mensaje: ${get('mensaje')||'Quisiera conocer más detalles.'}`].join('\n');window.open(`https://wa.me/${whatsappLaRueca}?text=${encodeURIComponent(texto)}`,'_blank','noopener,noreferrer');});}
