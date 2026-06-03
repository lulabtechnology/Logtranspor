// LogiPlus Panamá landing — configuración rápida
// IMPORTANTE: reemplazar estos datos por los oficiales del cliente antes de publicar.
const LOGIPLUS = {
  whatsapp: '50760000000',
  email: 'cotizaciones@logipluspanama.com',
  companyName: 'LogiPlus Panamá'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

window.addEventListener('load', () => {
  setTimeout(() => $('#preloader')?.classList.add('loaded'), 450);
});

$('#year').textContent = new Date().getFullYear();

const header = $('#site-header');
const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 10);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const menuToggle = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.classList.toggle('active', !open);
  mobileMenu.hidden = open;
  document.body.classList.toggle('menu-open', !open);
});

$$('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

function encodeMessage(message) {
  return encodeURIComponent(message.trim());
}

function openWhatsApp(message) {
  const url = `https://wa.me/${LOGIPLUS.whatsapp}?text=${encodeMessage(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function showToast(text) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('active');
  clearTimeout(window.__logiplusToast);
  window.__logiplusToast = setTimeout(() => toast.classList.remove('active'), 3900);
}

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function setResponse(form, key) {
  const response = form.querySelector(`[data-response="${key}"]`);
  if (!response) return;
  response.classList.add('active');
  setTimeout(() => response.classList.remove('active'), 7000);
}

$('#tracking-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const tracking = $('#tracking-number').value.trim();
  if (!tracking) return;
  $('#tracking-result').hidden = false;
  showToast('Solicitud de tracking preparada. Abriremos WhatsApp para confirmar el estado.');
  openWhatsApp(`Hola ${LOGIPLUS.companyName}, quiero rastrear este paquete:\n\nTracking: ${tracking}\n\nQuedo atento(a) al estado del paquete.`);
});

$('#insurance-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = getFormData(form);
  setResponse(form, 'insurance');
  showToast('Tu solicitud fue recibida. Te enviamos la cotización en breve.');
  openWhatsApp(`Hola ${LOGIPLUS.companyName}, quiero cotizar un seguro de carga.\n\nNombre: ${data.nombre}\nEmpresa: ${data.empresa || 'No indica'}\nTeléfono: ${data.telefono}\nEmail: ${data.email}\nValor de mercancía: ${data.valor}\nTipo de mercancía: ${data.mercancia}\nOrigen: ${data.origen}\nDestino: ${data.destino}\nTransporte: ${data.transporte}\n\nQuedo atento(a) a la cotización.`);
});

$('#locker-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = getFormData(form);
  setResponse(form, 'locker');
  showToast('Recibirás tu dirección en Miami e instrucciones.');
  openWhatsApp(`Hola ${LOGIPLUS.companyName}, quiero abrir mi casillero en Miami.\n\nNombre: ${data.nombre}\nCédula: ${data.cedula}\nTeléfono: ${data.telefono}\nEmail: ${data.email}\nDirección de entrega: ${data.direccion}\nFecha de nacimiento: ${data.nacimiento}\n\nQuedo atento(a) a las instrucciones.`);
});

$('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = getFormData(form);
  setResponse(form, 'contact');
  showToast('Solicitud lista. Abriremos WhatsApp para enviarla.');
  openWhatsApp(`Hola ${LOGIPLUS.companyName}, solicito asesoría.\n\nNombre: ${data.nombre}\nTeléfono: ${data.telefono}\nEmail: ${data.email}\nServicio de interés: ${data.servicio}\nMensaje: ${data.mensaje}`);
});

$('#whatsapp-float')?.setAttribute('href', `https://wa.me/${LOGIPLUS.whatsapp}?text=${encodeMessage('Hola LogiPlus Panamá, quiero solicitar asesoría logística.')}`);
