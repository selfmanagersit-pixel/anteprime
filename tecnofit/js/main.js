(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const W=[[9,'pal','Palestra in allestimento','w'],[19,'home','Home gym con rack multifunzione',''],[15,'att','Chest press Diamond',''],[12,'pal','Sala attrezzi',''],[3,'pav','Pavimento in gomma posato','w'],[5,'att','Leg extension Diamond',''],[7,'pal','Sala pilates con reformer','w'],[13,'pal','Sala pesi',''],[14,'att','Macchina Diamond',''],[20,'home','Home gym montata in casa',''],[11,'pal','Palestra con soffitto in legno',''],[17,'pav','Pavimento in un capannone','w'],[1,'att','Tapis roulant','w'],[18,'att','Leg extension',''],[10,'pal','Palestra completata',''],[8,'att','Functional trainer',''],[6,'home','Tapis roulant in casa',''],[4,'pav','Sala con pavimento finito','w'],[2,'pav','Posa delle piastrelle in gomma','w'],[16,'pav','Capannone prima della posa','w']];
const g=$('#grid');
if(g){const L=+g.dataset.limit||W.length;g.innerHTML=W.slice(0,L).map(([n,c,a,s])=>`<figure class="tile ${s}" data-c="${c}" tabindex="0" role="button" aria-label="Ingrandisci: ${a}"><img src="assets/img/${n}.jpg" srcset="assets/img/m/${n}.jpg 800w, assets/img/${n}.jpg 1400w" sizes="(max-width: 900px) 50vw, 25vw" alt="${a}" loading="lazy"><span>${a}</span></figure>`).join('')}
$$('.chips button').forEach(b=>b.addEventListener('click',()=>{
  $$('.chips button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const f=b.dataset.f;$$('.tile').forEach(t=>t.classList.toggle('out',f!=='*'&&t.dataset.c!==f));
  window.ScrollTrigger&&ScrollTrigger.refresh();
}));
const lb=$('#lb');
if(lb&&g){const open=t=>{const i=$('img',t);$('img',lb).src=i.src;$('img',lb).alt=i.alt;$('p',lb).textContent=i.alt;lb.showModal()};
  g.addEventListener('click',e=>{const t=e.target.closest('.tile');t&&open(t)});
  g.addEventListener('keydown',e=>{const t=e.target.closest('.tile');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();open(t)}});
  $('.lb-x',lb).addEventListener('click',()=>lb.close());lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});}
const msg=$('#msg');
if(msg){const st={m:'Tapis roulant',p:'Non si accende'},city=$('#city'),send=$('#send');
  const draw=()=>{const t=`Ciao Antonio, ho bisogno di assistenza.\nMacchina: ${st.m}\nRichiesta: ${st.p}\nZona: ${city.value.trim()||'da indicare'}\nTi mando una foto qui sotto.`;msg.textContent=t;send.href='https://wa.me/393760809432?text='+encodeURIComponent(t)};
  $$('.opts').forEach(o=>o.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',o).forEach(x=>x.setAttribute('aria-pressed',x===b));st[o.dataset.k]=b.textContent;draw()}));
  city.addEventListener('input',draw);draw();}
const nav=$('.nav'),fab=$('.fab'),bur=$('.burger');let ly=0;
bur.addEventListener('click',()=>{const o=nav.classList.toggle('open');bur.setAttribute('aria-expanded',o);bur.setAttribute('aria-label',o?'Chiudi il menu':'Apri il menu');document.body.style.overflow=o?'hidden':''});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''}));
addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))bur.click()});
const R=document.documentElement;addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('solid',y>40);const hd=y>ly&&y>500&&!nav.classList.contains('open');nav.classList.toggle('hide',hd);R.style.setProperty('--navh',hd?'0px':nav.offsetHeight+'px');fab.classList.toggle('on',y>innerHeight*.7);ly=y},{passive:true});
$$('.card').forEach((c,i)=>c.style.setProperty('--i',i));
const items=$$('.svc-list li'),imgs=$$('.svc-frame [data-k]');
const setSvc=k=>{items.forEach(l=>l.classList.toggle('on',l.dataset.k==k));imgs.forEach(i=>i.classList.toggle('on',i.dataset.k==k))};
items.forEach(l=>l.addEventListener('mouseenter',()=>setSvc(l.dataset.k)));
const pk=$('.idx-peek');
if(pk&&matchMedia('(hover:hover) and (pointer:fine)').matches){const im=$('img',pk);let tx=0,ty=0,cx=0,cy=0,on=false;
  $$('.idx-list a').forEach(a=>{a.addEventListener('mouseenter',()=>{const n=a.dataset.img;pk.classList.toggle('spa',!n);if(n)im.src='assets/img/m/'+n+'.jpg';pk.classList.add('on');on=true});a.addEventListener('mouseleave',()=>{pk.classList.remove('on');on=false})});
  $('.idx').addEventListener('mousemove',e=>{const r=$('.idx').getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top});
  (function f(){cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;pk.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%) rotate(${(tx-cx)*.04}deg)`;requestAnimationFrame(f)})();}
$$('.acc-list li').forEach(li=>{const go=()=>{if(innerWidth<901)return;$$('.acc-list li').forEach(x=>x.classList.toggle('on',x===li))};li.addEventListener('mouseenter',go);li.querySelector('a').addEventListener('focus',go)});
const lit=()=>$$('.regs li').forEach(l=>l.classList.add('lit'));
if(!window.gsap){lit();return}
gsap.registerPlugin(ScrollTrigger);
const mm=gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const tl=gsap.timeline({defaults:{ease:'expo.out',duration:1.2}});
  tl.from('.ln>span',{yPercent:110,stagger:.09}).from('.hero-txt .lead,.row,.trust,.ph .lead',{y:24,autoAlpha:0,stagger:.08,duration:.9},'-=.8').from('.nav',{y:-30,autoAlpha:0,duration:.8,clearProps:'transform,opacity,visibility'},.2);
  $$('.hero-media,.ph-media').forEach(m=>tl.from(m,{clipPath:'polygon(0 100%,100% 100%,100% 100%,0 100%)',duration:1.4,ease:'expo.inOut'},.1));
  if($('.hero'))gsap.to('.hero-media video',{yPercent:8,scale:1.06,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  const c=$('.count');if(c){const o={v:0};c.textContent='0';ScrollTrigger.create({trigger:'.band',start:'top 80%',once:true,onEnter:()=>gsap.to(o,{v:48,duration:1.6,ease:'expo.out',onUpdate:()=>c.textContent=Math.round(o.v)})});gsap.from('.band-t',{x:40,autoAlpha:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:'.band',start:'top 70%'}})}
  $$('main h2').filter(h=>!h.closest('.story')).forEach(h=>gsap.from(h,{y:40,autoAlpha:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 88%'}}));
  ScrollTrigger.batch('.tile',{start:'top 92%',onEnter:b=>gsap.from(b,{clipPath:'polygon(0 0,100% 0,100% 0,0 0)',duration:1,ease:'expo.inOut',stagger:.06,clearProps:'clipPath'})});
  $$('.srow figure').forEach(f=>{gsap.from(f,{clipPath:'polygon(0 0,100% 0,100% 0,0 0)',duration:1.3,ease:'expo.inOut',scrollTrigger:{trigger:f,start:'top 80%'}});gsap.fromTo($('img',f),{yPercent:-6},{yPercent:0,ease:'none',scrollTrigger:{trigger:f,start:'top bottom',end:'bottom top',scrub:true}})});
  gsap.utils.toArray('.par-logos,.brands article,.contr li,.vals li,.contacts dl>div,.dia-ph img').forEach(el=>gsap.from(el,{y:40,autoAlpha:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
  $$('.card img').forEach(i=>gsap.fromTo(i,{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:i.parentNode,start:'top bottom',end:'top 20%',scrub:true}}));
  $$('.steps').forEach(s=>gsap.from($$('li',s),{y:24,autoAlpha:0,stagger:.08,duration:.8,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 85%'}}));
});
mm.add('(prefers-reduced-motion: reduce)',lit);
mm.add('(min-width: 901px)',()=>{
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)$$('.regs').forEach(r=>$$('li',r).forEach((li,i)=>ScrollTrigger.create({trigger:r,start:`top ${80-i*12}%`,onEnter:()=>li.classList.add('lit'),onLeaveBack:()=>li.classList.remove('lit')})));
  items.forEach(l=>ScrollTrigger.create({trigger:l,start:'top 55%',end:'bottom 55%',onToggle:s=>s.isActive&&setSvc(l.dataset.k)}));
  const tr=$('.track');if(tr){const d=()=>tr.scrollWidth-innerWidth;
    gsap.to(tr,{x:()=>-d(),ease:'none',scrollTrigger:{trigger:'.sect',start:'top top',end:()=>'+='+d(),pin:true,scrub:.8,invalidateOnRefresh:true}});
    $$('.panel img').forEach(i=>gsap.to(i,{xPercent:-6,ease:'none',scrollTrigger:{trigger:'.sect',start:'top top',end:()=>'+='+d(),scrub:true}}));}
});
mm.add('(max-width: 900px)',lit);
})();
