(function(){
  'use strict';

  const WHATSAPP='50760903814';
  const EMAIL='info@logipluspty.com';

  function setBackgrounds(){
    document.querySelectorAll('[data-background]').forEach(el=>{
      const url=el.getAttribute('data-background');
      if(url){ el.style.backgroundImage=`url(${url})`; }
    });
  }

  function preloader(){
    const pre=document.getElementById('trucker__preloader');
    const removePreloader=()=>{
      if(!pre) return;
      setTimeout(()=>{
        pre.style.opacity='0';
        pre.style.pointerEvents='none';
        setTimeout(()=>pre.remove(),350);
      },350);
    };
    if(document.readyState==='complete') removePreloader();
    else window.addEventListener('load',removePreloader,{once:true});
  }

  function wowInit(){ if(window.WOW){ new WOW().init(); } }

  function navToggle(){
    const btn=document.querySelector('.lp-menu-toggle');
    const nav=document.querySelector('.lp-nav');
    if(!btn || !nav) return;
    btn.addEventListener('click',()=>{
      const open=nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('click',e=>{
      if(!nav.classList.contains('is-open')) return;
      if(nav.contains(e.target) || btn.contains(e.target)) return;
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    });
  }

  function stickyHeader(){
    const shell=document.querySelector('.lp-nav-shell');
    const onScroll=()=>{ if(shell) shell.classList.toggle('is-scrolled',window.scrollY>20); };
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
  }

  function heroSlider(){
    if(!window.Swiper) return;
    new Swiper('.logiplus-hero-slider',{
      loop:true,
      effect:'fade',
      speed:900,
      autoplay:{delay:6500,disableOnInteraction:false},
      navigation:{nextEl:'.lp-hero-next',prevEl:'.lp-hero-prev'},
      a11y:{enabled:true}
    });
  }

  function parallax(){
    if(window.jarallax){ jarallax(document.querySelectorAll('.jarallax'),{speed:0.35}); }
  }

  function year(){
    const y=document.getElementById('currentYear');
    if(y) y.textContent=new Date().getFullYear();
  }

  function scrollTop(){
    const scrollPath=document.querySelector('.scroll-up');
    if(!scrollPath) return;
    const path=scrollPath.querySelector('path');
    if(!path || typeof path.getTotalLength!=='function') return;
    const pathLength=path.getTotalLength();
    path.style.transition=path.style.WebkitTransition='none';
    path.style.strokeDasharray=pathLength+' '+pathLength;
    path.style.strokeDashoffset=pathLength;
    path.getBoundingClientRect();
    path.style.transition=path.style.WebkitTransition='stroke-dashoffset 10ms linear';
    const update=()=>{
      const scroll=window.scrollY;
      const height=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      path.style.strokeDashoffset=pathLength-(scroll*pathLength/height);
      scrollPath.classList.toggle('active',scroll>120);
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    scrollPath.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  function openWhatsApp(message){
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(message),'_blank','noopener');
  }

  function setSuccess(inputs){
    inputs.forEach(i=>i.classList.add('form-success'));
    setTimeout(()=>inputs.forEach(i=>i.classList.remove('form-success')),1500);
  }

  function serialize(form){
    const fd=new FormData(form);
    const out=[];
    fd.forEach((value,key)=>{
      if(value instanceof File){
        if(value.name) out.push(key+': '+value.name+' (adjuntar manualmente en WhatsApp)');
        return;
      }
      const clean=String(value).trim();
      if(clean) out.push(key+': '+clean);
    });
    return out.join('\n');
  }

  function showConfirmation(form){
    const box=form.parentElement ? form.parentElement.querySelector('.lp-form-confirmation') : null;
    if(!box) return;
    box.classList.add('is-visible');
    setTimeout(()=>box.classList.remove('is-visible'),8000);
  }

  function bindForms(){
    const tracking=document.getElementById('trackingForm');
    if(tracking){
      tracking.addEventListener('submit',e=>{
        e.preventDefault();
        const hp=tracking.querySelector('.lp-hp input');
        if(hp && hp.value.trim()) return;
        const input=document.getElementById('trackingNumber');
        const code=input ? input.value.trim() : '';
        if(!code) return;
        setSuccess([input]);
        openWhatsApp('Hola LogiPlus, quiero consultar el estado de este paquete.\n\nTracking: '+code+'\n\nQuedo atento(a) a la información disponible del envío.');
      });
    }

    [
      ['insuranceForm','Hola LogiPlus, quiero cotizar un seguro de carga.'],
      ['lockerForm','Hola LogiPlus, quiero abrir mi casillero en Miami.'],
      ['contactForm','Hola LogiPlus, quiero solicitar asesoría logística.']
    ].forEach(([id,intro])=>{
      const form=document.getElementById(id);
      if(!form) return;
      form.addEventListener('submit',e=>{
        e.preventDefault();
        const hp=form.querySelector('.lp-hp input');
        if(hp && hp.value.trim()) return;
        if(!form.checkValidity()){
          form.reportValidity();
          return;
        }
        const inputs=[...form.querySelectorAll('input,select,textarea')];
        setSuccess(inputs);
        showConfirmation(form);
        const body=serialize(form);
        const msg=intro+'\n\n'+body+'\n\nCorreo de referencia: '+EMAIL;
        openWhatsApp(msg);
      });
    });
  }

  function bindServiceSelectors(){
    const select=document.getElementById('serviceInterest');
    document.querySelectorAll('.lp-service-select[data-service]').forEach(link=>{
      link.addEventListener('click',()=>{
        if(!select) return;
        const service=link.getAttribute('data-service');
        const option=[...select.options].find(opt=>opt.text.trim()===service);
        if(option) select.value=option.value || option.text;
      });
    });
  }

  function faqAccordion(){
    const details=[...document.querySelectorAll('.lp-faq-items details')];
    details.forEach(item=>item.addEventListener('toggle',()=>{
      if(!item.open) return;
      details.forEach(other=>{ if(other!==item) other.open=false; });
    }));
  }

  setBackgrounds();
  preloader();
  wowInit();
  navToggle();
  stickyHeader();
  heroSlider();
  parallax();
  year();
  scrollTop();
  bindForms();
  bindServiceSelectors();
  faqAccordion();
})();
