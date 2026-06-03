(function(){
  const WHATSAPP='50760903814';
  const EMAIL='dulce@logipluspty.com';

  function setBackgrounds(){
    document.querySelectorAll('[data-background]').forEach(el=>{
      const url=el.getAttribute('data-background');
      if(url){ el.style.backgroundImage=`url(${url})`; }
    });
  }

  function preloader(){
    const pre=document.getElementById('trucker__preloader');
    window.addEventListener('load',()=>{
      setTimeout(()=>{
        if(pre){ pre.style.opacity='0'; pre.style.pointerEvents='none'; setTimeout(()=>pre.remove(),350); }
      },500);
    });
  }

  function wowInit(){ if(window.WOW){ new WOW().init(); } }

  function navToggle(){
    const btn=document.querySelector('.lp-menu-toggle');
    const nav=document.querySelector('.lp-nav');
    if(!btn || !nav) return;
    btn.addEventListener('click',()=>{
      const open=nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');}));
  }

  function stickyHeader(){
    const shell=document.querySelector('.lp-nav-shell');
    const onScroll=()=>{ if(shell) shell.classList.toggle('is-scrolled', window.scrollY>20); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  function heroSlider(){
    if(!window.Swiper) return;
    new Swiper('.logiplus-hero-slider',{
      loop:true,
      effect:'fade',
      speed:1000,
      autoplay:{delay:5500, disableOnInteraction:false},
      navigation:{nextEl:'.lp-hero-next', prevEl:'.lp-hero-prev'}
    });
  }

  function parallax(){
    if(window.jarallax){
      jarallax(document.querySelectorAll('.jarallax'), {speed:0.35});
    }
  }

  function odometers(){
    const items=document.querySelectorAll('.odometer');
    if(!items.length) return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target;
          const target=el.getAttribute('data-count') || '0';
          setTimeout(()=>{ el.innerHTML=target; }, 180);
          observer.unobserve(el);
        }
      });
    }, {threshold:.5});
    items.forEach(el=>observer.observe(el));
  }

  function year(){ const y=document.getElementById('currentYear'); if(y) y.textContent=new Date().getFullYear(); }

  function scrollTop(){
    const scrollPath=document.querySelector('.scroll-up');
    if(!scrollPath) return;
    const path=scrollPath.querySelector('path');
    const pathLength=path.getTotalLength();
    path.style.transition=path.style.WebkitTransition='none';
    path.style.strokeDasharray=pathLength+' '+pathLength;
    path.style.strokeDashoffset=pathLength;
    path.getBoundingClientRect();
    path.style.transition=path.style.WebkitTransition='stroke-dashoffset 10ms linear';
    const update=()=>{
      const scroll=window.scrollY;
      const height=document.documentElement.scrollHeight-window.innerHeight;
      const progress=pathLength-(scroll*pathLength/height);
      path.style.strokeDashoffset=progress;
      scrollPath.classList.toggle('active', scroll>120);
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
    scrollPath.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
  }

  function openWhatsApp(message){
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }
  function setSuccess(inputs){ inputs.forEach(i=>i.classList.add('form-success')); setTimeout(()=>inputs.forEach(i=>i.classList.remove('form-success')),1500); }
  function serialize(form){
    const fd=new FormData(form), out=[];
    fd.forEach((value,key)=>{ if(String(value).trim()) out.push(key + ': ' + String(value).trim()); });
    return out.join('\n');
  }
  function bindForms(){
    const tracking=document.getElementById('trackingForm');
    if(tracking){
      tracking.addEventListener('submit',e=>{
        e.preventDefault();
        const input=document.getElementById('trackingNumber');
        const code=input.value.trim(); if(!code) return;
        setSuccess([input]);
        openWhatsApp('Hola LogiPlus, quiero rastrear este paquete.\n\nTracking: ' + code + '\n\nQuedo atento(a) al estado de mi paquete.');
      });
    }
    [['insuranceForm','Hola LogiPlus, quiero cotizar un seguro de carga.'],['lockerForm','Hola LogiPlus, quiero abrir mi casillero en Miami.'],['contactForm','Hola LogiPlus, quiero solicitar asesoría logística.']].forEach(([id,intro])=>{
      const form=document.getElementById(id);
      if(!form) return;
      form.addEventListener('submit',e=>{
        e.preventDefault();
        const inputs=[...form.querySelectorAll('input, select, textarea')];
        setSuccess(inputs);
        const msg = intro + '\n\n' + serialize(form) + '\n\nCorreo de referencia: ' + EMAIL;
        openWhatsApp(msg);
      });
    });
  }

  setBackgrounds(); preloader(); wowInit(); navToggle(); stickyHeader(); heroSlider(); parallax(); odometers(); year(); scrollTop(); bindForms();
})();
