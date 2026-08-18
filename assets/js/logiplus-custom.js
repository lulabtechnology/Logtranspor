(function(){
  const WHATSAPP='50760903814';
  const EMAIL='info@logipluspty.com';
  const MIN_FORM_TIME=900;
  const SUBMIT_COOLDOWN=8000;

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
        if(pre){
          pre.style.opacity='0';
          pre.style.pointerEvents='none';
          setTimeout(()=>pre.remove(),350);
        }
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
      btn.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded','false');
      }
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
      speed:1000,
      autoplay:{delay:5500,disableOnInteraction:false},
      navigation:{nextEl:'.lp-hero-next',prevEl:'.lp-hero-prev'}
    });
  }

  function parallax(){
    if(window.jarallax){
      jarallax(document.querySelectorAll('.jarallax'),{speed:0.35});
    }
  }

  function odometers(){
    const items=document.querySelectorAll('.odometer');
    if(!items.length || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target;
          const target=el.getAttribute('data-count') || '0';
          setTimeout(()=>{ el.innerHTML=target; },180);
          observer.unobserve(el);
        }
      });
    },{threshold:.5});
    items.forEach(el=>observer.observe(el));
  }

  function year(){
    const y=document.getElementById('currentYear');
    if(y) y.textContent=new Date().getFullYear();
  }

  function scrollTop(){
    const scrollPath=document.querySelector('.scroll-up');
    if(!scrollPath) return;
    const path=scrollPath.querySelector('path');
    if(path && typeof path.getTotalLength==='function'){
      const pathLength=path.getTotalLength();
      path.style.transition=path.style.WebkitTransition='none';
      path.style.strokeDasharray=pathLength+' '+pathLength;
      path.style.strokeDashoffset=pathLength;
      path.getBoundingClientRect();
      path.style.transition=path.style.WebkitTransition='stroke-dashoffset 10ms linear';
      const update=()=>{
        const scroll=window.scrollY;
        const height=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
        const progress=pathLength-(scroll*pathLength/height);
        path.style.strokeDashoffset=progress;
        scrollPath.classList.toggle('active',scroll>120);
      };
      update();
      window.addEventListener('scroll',update,{passive:true});
    }
    const goTop=()=>window.scrollTo({top:0,behavior:'smooth'});
    scrollPath.addEventListener('click',goTop);
    scrollPath.addEventListener('keydown',event=>{
      if(event.key==='Enter' || event.key===' '){ event.preventDefault(); goTop(); }
    });
  }

  function openWhatsApp(message){
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(message),'_blank','noopener');
  }

  function status(form,message,type='info'){
    const el=form.querySelector('[data-form-status]');
    if(!el) return;
    el.textContent=message;
    el.classList.remove('is-success','is-error','is-info');
    el.classList.add('is-'+type);
  }

  function setSuccess(inputs){
    inputs.filter(i=>!i.classList.contains('lp-honeypot')).forEach(i=>i.classList.add('form-success'));
    setTimeout(()=>inputs.forEach(i=>i.classList.remove('form-success')),1500);
  }

  function serialize(form){
    const fd=new FormData(form);
    const out=[];
    fd.forEach((value,key)=>{
      if(key==='website') return;
      if(value instanceof File){
        if(value.name){ out.push(key+': '+value.name+' (adjuntar manualmente en WhatsApp)'); }
        return;
      }
      const clean=String(value).trim();
      if(clean) out.push(key+': '+clean);
    });
    return out.join('\n');
  }

  function isSpam(form){
    const honeypot=form.querySelector('.lp-honeypot');
    if(honeypot && honeypot.value.trim()) return true;
    const started=Number(form.dataset.startedAt || Date.now());
    return Date.now()-started<MIN_FORM_TIME;
  }

  function isCoolingDown(form){
    const last=Number(form.dataset.lastSubmitAt || 0);
    if(last && Date.now()-last<SUBMIT_COOLDOWN) return true;
    form.dataset.lastSubmitAt=String(Date.now());
    return false;
  }

  function prepareForms(){
    document.querySelectorAll('.lp-protected-form').forEach(form=>{
      form.dataset.startedAt=String(Date.now());
    });
  }

  function bindTracking(){
    const form=document.getElementById('trackingForm');
    if(!form) return;
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(isSpam(form)){ status(form,'No pudimos procesar la solicitud. Intenta nuevamente.','error'); return; }
      if(isCoolingDown(form)){ status(form,'La consulta ya fue preparada. Revisa la ventana de WhatsApp.','info'); return; }
      const input=document.getElementById('trackingNumber');
      const code=input ? input.value.trim() : '';
      if(!code) return;
      setSuccess([input]);
      status(form,'Abrimos WhatsApp con tu número de tracking para que nuestro equipo consulte el estado del paquete.','success');
      openWhatsApp('Hola LogiPlus, quiero consultar el estado de este paquete.\n\nTracking: '+code+'\n\nQuedo atento(a) al seguimiento de mi envío.');
    });
  }

  function bindLeadForm(id,intro,successMessage){
    const form=document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(isSpam(form)){ status(form,'No pudimos procesar la solicitud. Intenta nuevamente.','error'); return; }
      if(isCoolingDown(form)){ status(form,'La solicitud ya fue preparada. Revisa la ventana de WhatsApp.','info'); return; }
      const inputs=[...form.querySelectorAll('input, select, textarea')];
      setSuccess(inputs);
      const details=serialize(form);
      const msg=intro+'\n\n'+details+'\n\nCorreo de referencia: '+EMAIL;
      status(form,successMessage,'success');
      openWhatsApp(msg);
    });
  }

  function bindForms(){
    prepareForms();
    bindTracking();
    bindLeadForm('insuranceForm','Hola LogiPlus, quiero solicitar una cotización de seguro de carga.','Abrimos WhatsApp con tu solicitud preparada. Envíala para que nuestro equipo pueda revisarla y continuar con la cotización.');
    bindLeadForm('lockerForm','Hola LogiPlus, quiero solicitar mi casillero en Miami.','Abrimos WhatsApp con tu solicitud preparada. Envíala para continuar con la asignación de tu código de cliente e instrucciones.');
    bindLeadForm('contactForm','Hola LogiPlus, quiero conversar sobre una operación logística.','Abrimos WhatsApp con tu solicitud preparada. Envíala para que nuestro equipo pueda orientarte.');
  }

  setBackgrounds();
  preloader();
  wowInit();
  navToggle();
  stickyHeader();
  heroSlider();
  parallax();
  odometers();
  year();
  scrollTop();
  bindForms();
})();
