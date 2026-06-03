# LogiPlus Panamá — Landing estática para Vercel

Sitio estático HTML/CSS/JS basado en los requerimientos del Word:

- Landing de una sola página.
- Header con anclas internas.
- Hero con CTAs.
- Módulo tracking visible.
- Mensaje de valor.
- Servicios clave.
- Sección fuerte de Seguro de Carga con formulario.
- Importaciones USA.
- Logística a la medida.
- Transporte internacional.
- China LCL.
- Casillero con formulario.
- Cómo trabajamos.
- Por qué elegirnos.
- Clientes / confianza.
- FAQ SEO.
- CTA final.
- Contacto.
- Footer SEO.
- Botón WhatsApp fijo.
- Responsive mobile.
- SEO básico.

## Cómo subir a Vercel

1. Subir esta carpeta completa a un repositorio de GitHub.
2. En Vercel: Add New Project → Import GitHub Repository.
3. Framework Preset: `Other`.
4. Build Command: dejar vacío.
5. Output Directory: `.`.
6. Deploy.

## Cambios antes de publicar

En `assets/js/app.js` cambiar:

```js
const LOGIPLUS = {
  whatsapp: '50760000000',
  email: 'cotizaciones@logipluspanama.com',
  companyName: 'LogiPlus Panamá'
};
```

También cambiar en `index.html` la sección de contacto:

- `+507 6000-0000`
- `cotizaciones@logipluspanama.com`

Esto quedó preparado porque el Word no traía teléfono ni correo real del cliente.

## Formularios

Los formularios son funcionales para sitio estático: preparan el mensaje y lo envían por WhatsApp.
Si el cliente quiere guardar solicitudes en base de datos, panel admin o tracking real conectado a sistema, eso ya requiere backend.
