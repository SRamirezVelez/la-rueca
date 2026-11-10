# La Rueca 2.0 — 7 páginas (actualización segura)

Este paquete **conserva** Inicio, Nosotros, las tres tarjetas de beneficios con sus textos, las seis tarjetas de talleres, la agenda dinámica, la galería Swiper de 10 fotografías, el formulario de WhatsApp, el sello de aguja y el pie de página. Agrega **experiencia.html** y cambia el menú «Servicios» por «La experiencia Rueca» en todas las páginas.

## Cómo instalar

1. Trabaja en la rama de rediseño ya creada. En la terminal, verifica con `git branch --show-current`.
2. En VS Code abre tu carpeta `la-rueca`.
3. Descomprime el ZIP y copia **los 7 archivos HTML y las carpetas `css` y `js`** a la raíz de tu proyecto, aceptando reemplazar las versiones anteriores.
4. **No borres ni reemplaces tu carpeta `img`**: conserva tus fotos y nombres actuales.
5. **No reemplaces `jv/eventos.js` si ya agregaste talleres confirmados**. El ZIP incluye el archivo base como referencia, pero puedes conservar tu versión actual; es compatible.
6. Abre `index.html` con Live Server. Comprueba las siete opciones: Inicio (logo), Nosotros, La experiencia Rueca, Talleres, Productos, Galería y Contacto.
7. Comprueba en Inicio la sección «¿Por qué elegir La Rueca?» y el nuevo enlace a la página independiente.

## Advertencias
- **Hero**: el Inicio usa `img/hero-bordado.jpg`. Verifica si tu archivo se llama así o si termina en `.png`.
- **Nosotros**: utiliza `img/imagen-nosotros.png`.
- **Galería**: busca `img/galeria-1.png` hasta `img/galeria-10.png`.
- La agenda no inventa eventos: si `eventos` está vacío se verá «Próximamente nuevas fechas».
- Misión y visión son borradores hasta la aprobación de Diana.
- Los pedidos y el formulario abren WhatsApp; no realizan pagos ni envíos desde un servidor.
- Comprueba primero en Live Server antes de subir cambios a GitHub.

## Guardar los cambios
`git add .`
`git commit -m "Agregar pagina La experiencia Rueca y navegacion de siete paginas"`
`git push -u origin $(git branch --show-current)`

No hagas merge a `main` hasta comprobar la nueva versión.
