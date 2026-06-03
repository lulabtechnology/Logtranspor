(function(){
  const WHATSAPP = '50760903814';
  const EMAIL = 'dulce@logipluspty.com';
  const preloader = document.getElementById('trucker__preloader');
  window.addEventListener('load', function(){
    setTimeout(function(){ if(preloader){ preloader.style.opacity='0'; preloader.style.pointerEvents='none'; setTimeout(()=>preloader.remove(), 350); } }, 450);
    if (window.WOW) { new WOW().init(); }
  });
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  }
  function openWhatsApp(message){
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }
  function dataFromForm(form){
    const data = new FormData(form);
    let lines = [];
    data.forEach((value,key)=>{ if(String(value).trim()){ lines.push(key + ': ' + String(value).trim()); } });
    return lines.join('\n');
  }
  const trackingForm = document.getElementById('trackingForm');
  if(trackingForm){
    trackingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const code = document.getElementById('trackingNumber').value.trim();
      if(!code) return;
      openWhatsApp('Hola LogiPlus, quiero rastrear este paquete: ' + code);
      trackingForm.classList.add('form-success');
    });
  }
  const forms = [
    ['insuranceForm','Hola LogiPlus, quiero cotizar seguro de carga.'],
    ['lockerForm','Hola LogiPlus, quiero abrir mi casillero en Miami.'],
    ['contactForm','Hola LogiPlus, quiero solicitar asesoría logística.']
  ];
  forms.forEach(([id,intro])=>{
    const form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const body = dataFromForm(form);
      openWhatsApp(intro + (body ? '\n\n' + body : '') + '\n\nCorreo de contacto: ' + EMAIL);
      form.classList.add('form-success');
      setTimeout(()=>form.classList.remove('form-success'), 1800);
    });
  });
})();