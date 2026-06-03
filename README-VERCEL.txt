LOGIPLUS PTY - Landing basada en plantilla Trucker

Base usada:
- Se trabajó sobre la carpeta Trucker del template HTML proporcionado.
- Se conservaron los assets, CSS, JS, fonts e imágenes del template.
- Se reemplazó el index.html por una landing de una sola página siguiendo el Word.
- Se agregó CSS personalizado en assets/css/logiplus-custom.css.
- Se agregó JS personalizado en assets/js/logiplus-custom.js.
- Se agregó el logo real en assets/images/logo/logiplus-logo.png.

Datos configurados:
- WhatsApp: +507 6090-3814
- Email: dulce@logipluspty.com

Para subir a Vercel:
1. Sube todo el contenido de esta carpeta a GitHub.
2. En Vercel, importa el repo.
3. Framework Preset: Other.
4. Build Command: dejar vacío.
5. Output Directory: .
6. Deploy.

Notas técnicas:
- Es una landing HTML/CSS/JS estática.
- El tracking y formularios funcionan enviando la solicitud a WhatsApp con la información llenada.
- Si el cliente luego tiene un sistema real de tracking, cambia la función del formulario #trackingForm en assets/js/logiplus-custom.js.
- Para conectar formularios a un correo real sin backend, se puede integrar FormSubmit, Formspree o una función serverless.
