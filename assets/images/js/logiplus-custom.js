(function(){
  const WHATSAPP = '50760903814';
  const EMAIL = 'dulce@logipluspty.com';
  const preloader = document.getElementById('trucker__preloader');

  window.addEventListener('load', function(){
    setTimeout(function(){
      if(preloader){
        preloader.style.opacity='0';
        preloader.style.pointerEvents='none';
        setTimeout(()=>preloader.remove(), 360);
      }
    }, 420);
    if (window.WOW) { new WOW({ mobile: true }).init(); }
  });

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive:true });

  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.hero-dots button'));
  let current = 0;
  function setSlide(index){
    if(!slides.length) return;
    slides[current].classList.remove('is-active');
    if(dots[current]) dots[current].classList.remove('active');
    current = index % slides.length;
    slides[current].classList.add('is-active');
    if(dots[current]) dots[current].classList.add('active');
  }
  if(slides.length > 1){
    dots.forEach((dot, i)=>dot.addEventListener('click',()=>setSlide(i)));
    setInterval(()=>setSlide(current + 1), 5200);
  }

  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
  function applyParallax(){
    if(!parallaxItems.length || window.matchMedia('(max-width: 820px)').matches) return;
    const vh = window.innerHeight || 1;
    parallaxItems.forEach(el=>{
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.08');
      const rect = el.getBoundingClientRect();
      if(rect.bottom < 0 || rect.top > vh) return;
      const offset = (rect.top - vh/2) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    });
  }
  window.addEventListener('scroll', applyParallax, { passive:true });
  window.addEventListener('resize', applyParallax, { passive:true });
  applyParallax();

  function openWhatsApp(message){
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }
  function dataFromForm(form){
    const data = new FormData(form);
    const lines = [];
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
      setTimeout(()=>trackingForm.classList.remove('form-success'), 1800);
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
