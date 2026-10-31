(()=>{
const D=window.P2M,S=window.SAV,$=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,body=document.body;
const QT=(new URLSearchParams(location.search).get('t')||'').match(/^(\d{1,2}):?(\d{2})$/);
let L='it',date=S.today(),now=S.nowMin(),tgt=QT?(+QT[1])*60+(+QT[2]):now,cur=tgt-600,anim=0,rs=S.riseSet(date),intro=!RM,opened=null,interacted=false;
const U=k=>D.ui[L][k],pk=v=>Array.isArray(v)?v[L==='it'?0:1]:v,tx=o=>o&&typeof o==='object'&&!Array.isArray(o)?o[L]:o;
const mod=m=>((m%1440)+1440)%1440;
const win=t=>t.from===0&&t.to>=1440?U('always'):S.fmt(t.from)+' – '+S.fmt(t.to%1440);

const gl=window.THREE?SCENE.init($('#sky'),$('#port'),RM):false;
if(!gl){body.classList.add('nogl');if(!window.THREE)SCENE.init($('#sky'),$('#port'),RM)}

const tagsEl=$('#tags');
D.tags.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='tag';b.dataset.id=t.id;b.style.setProperty('--len',(48+((t.x*7)%40))+'px');b.style.setProperty('--r',(((t.x*13)%7)-3)+'deg');b.innerHTML=`<i class="tag-dot"></i><i class="tag-str"></i><span class="tag-card"><span class="mono tag-k"></span><span class="tag-t"></span></span>`;b.addEventListener('click',()=>openSheet(t.id));tagsEl.appendChild(b)});
const tagEls=$$('.tag');

function voiceList(){return D.voice.map(v=>{let t=v.t;if(typeof t==='string'){const[k,o]=t.split(/(?=[+-])/);t=(k==='rise'?rs.rise:rs.set)+(+o)}return Object.assign({},v,{tm:t})}).sort((a,b)=>a.tm-b.tm)}
let VL=voiceList(),vIdx=-1;
function splitW(s){return s.split(' ').map(w=>`<span class="w"><span class="wi">${w}</span></span>`).join(' ')}
function setVoice(i,force){if(i===vIdx&&!force)return;vIdx=i;const v=VL[i],m=$('.v-main'),sb=$('.v-sub');const put=()=>{m.innerHTML=splitW(v[L]);sb.textContent=v['s'+L];if(window.gsap&&!RM){gsap.fromTo($$('.wi',m),{yPercent:110},{yPercent:0,duration:1.2,ease:'expo.out',stagger:.05});gsap.fromTo(sb,{opacity:0,y:10},{opacity:1,y:0,duration:1,delay:.25,ease:'expo.out'})}};if(window.gsap&&!RM&&m.innerHTML){gsap.to([$$('.wi',m),sb],{yPercent:-110,opacity:0,duration:.45,ease:'power2.in',onComplete:()=>{gsap.set(sb,{yPercent:0});put()}})}else put()}

const track=$('.day-track'),ticksEl=$('.day-ticks');
function buildTicks(){let h='';for(let i=0;i<=24;i++){const x=i/24*100;h+=`<i class="${i%3===0?'h3':''}" style="left:${x}%"></i>`;if(i%3===0&&i<24)h+=`<span style="left:${x}%">${String(i).padStart(2,'0')}</span>`}h+=`<b class="mk" style="left:${rs.rise/14.4}%">${U('rise')} ${S.fmt(rs.rise)}</b><b class="mk set" style="left:${rs.set/14.4}%">${U('set')} ${S.fmt(rs.set)}</b>`;if(date===S.today())h+=`<i class="now" style="left:${now/14.4}%"></i>`;ticksEl.innerHTML=h}
function status(m){const h=D.hours;if(m>=h.open&&m<h.kitchen)return U('open1');if(m>=h.kitchen&&m<h.close)return U('open2');return U('closed')}

const inWin=(t,m)=>t.to>1440?(m>=t.from||m<t.to-1440):(m>=t.from&&m<t.to);
let lastInk=-1;
let i0=null,iFrom=cur;const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function frame(ts){anim=ts/1000;if(intro){if(i0===null)i0=ts;const f=Math.min(1,(ts-i0)/3400);cur=iFrom+(tgt-iFrom)*eio(f);if(f>=1){intro=false;showHint()}}else{cur+=(tgt-cur)*(RM?1:.14);if(Math.abs(tgt-cur)<.05)cur=tgt}
 const m=mod(cur),ms=S.utcMs(date,m),sun=S.sun(ms),moon=S.moon(ms);
 const pal=SCENE.update({min:m,sun,moon,anim});
 if(pal){const ink=Math.round(pal.ink*20)/20;if(ink!==lastInk){lastInk=ink;const c=ink>.5?'#f3ece0':'#13283a',cm=ink>.5?'rgba(243,236,224,.72)':'rgba(19,40,58,.72)';document.documentElement.style.setProperty('--ui',c);document.documentElement.style.setProperty('--uim',cm)}$('meta[name=theme-color]').content='#'+pal.top.map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('')}
 $('.dc').textContent=S.fmt(m);$('.day-status').textContent=status(m);$('.day-cur').style.left=(m/1440*100)+'%';track.setAttribute('aria-valuenow',Math.round(m));track.setAttribute('aria-valuetext',S.fmt(m));
 const off=date!==S.today()||Math.abs(mod(cur)-now)>10&&Math.abs(mod(cur)-now)<1430;const nb=$('.day-now');if(nb.hidden===off)nb.hidden=!off;
 let vi=0;VL.forEach((v,i)=>{if(m>=v.tm)vi=i});if(m<VL[0].tm)vi=VL.length-1;setVoice(vi);
 tagEls.forEach((b,i)=>{const t=D.tags[i],[x,y]=SCENE.toScreen(t.x,t.y),vis=inWin(t,m)&&x>20&&x<innerWidth-20;b.classList.toggle('on',vis);if(vis){b.style.transform=`translate(${x}px,${y}px)`;const cw=(b._w||(b._w=$('.tag-card',b).offsetWidth))/2+12;b.style.setProperty('--dx',Math.max(0,cw-x)-Math.max(0,x+cw-innerWidth)+'px')}});
 if(!body.classList.contains('nogl'))0;else fallbackBg(sun.alt,m);
 requestAnimationFrame(frame)}
let fbLast='';function fallbackBg(alt,m){const k=alt<-6?'58':alt<4?(m<720?'hero-l':'57'):m<720?'22':'48';if(k===fbLast)return;fbLast=k;$('.fallback').style.backgroundImage=`url(img/${k}-1600.webp)`}

function nudge(d){tgt+=d;interacted=true;hideHint()}
addEventListener('wheel',e=>{if(opened)return;e.preventDefault();const d=e.deltaMode===1?e.deltaY*16:e.deltaY;nudge(Math.max(-60,Math.min(60,d*.12)))},{passive:false});
let ty=null;const stage=$('#stage');
stage.addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
stage.addEventListener('touchmove',e=>{if(ty===null)return;const y=e.touches[0].clientY;nudge((ty-y)*.55);ty=y},{passive:true});
stage.addEventListener('touchend',()=>ty=null);
let drag=false;const setFromX=x=>{const r=track.getBoundingClientRect(),f=Math.max(0,Math.min(.9999,(x-r.left)/r.width)),base=Math.floor(cur/1440)*1440;tgt=base+f*1440;interacted=true;hideHint()};
track.addEventListener('pointerdown',e=>{drag=true;track.setPointerCapture(e.pointerId);setFromX(e.clientX)});
track.addEventListener('pointermove',e=>{if(drag)setFromX(e.clientX)});
track.addEventListener('pointerup',()=>drag=false);
addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){closeSheet();return}if(opened)return;const k={ArrowRight:10,ArrowUp:10,ArrowLeft:-10,ArrowDown:-10,PageUp:60,PageDown:-60}[e.key];if(k){e.preventDefault();nudge(k)}if(e.key==='Home'){e.preventDefault();backNow()}});
function backNow(){if(date!==S.today()){date=S.today();rs=S.riseSet(date);VL=voiceList();buildTicks()}now=S.nowMin();const base=Math.round((cur-now)/1440)*1440;tgt=base+now}
$('.day-now').addEventListener('click',backNow);
setInterval(()=>{const n=S.nowMin(),follow=Math.abs(mod(tgt)-now)<2&&date===S.today();now=n;if(follow)tgt=Math.round((cur-now)/1440)*1440+now;$('.day-nowt').textContent=S.fmt(now);buildTicks()},30000);

const hint=$('.hint');function showHint(){if(!interacted)hint.classList.add('on');setTimeout(hideHint,7000)}function hideHint(){hint.classList.remove('on')}

const sheet=$('.sheet'),inner=$('.sheet-in');let lastFocus=null;
const pic=(k,alt,cls='')=>`<figure class="${cls}"><img src="img/${k}-800.webp" srcset="img/${k}-800.webp 800w, img/${k}-1600.webp 1600w" sizes="(max-width:760px) 100vw, 600px" alt="${alt}" loading="lazy"></figure>`;
const LAB=()=>`<div class="lab"><p class="mono sh-k" style="border:0;display:block;padding:0 0 10px">${L==='it'?'Cartellino · esempio':'Label · example'}</p>${D.label.map((r,i)=>{const v=r[2].split('|');return `<p><span class="mono">${r[L==='it'?0:1]}</span><b class="${i===0?'ln':i===1?'ls':'mono'}" style="font-weight:400">${v[L==='it'?0:(v[1]?1:0)]}</b></p>`}).join('')}</div>`;
const PAIRS=()=>`<div class="pairs">${D.pairs.map(([f,d,c])=>`<figure class="pr"><div class="e"><img src="img/f-${f}.webp" alt="" loading="lazy"></div><div class="d"><img src="img/${d}-800.webp" alt="${tx(c)}" loading="lazy"></div><figcaption>${tx(c)}</figcaption></figure>`).join('')}</div>`;
const MAP=()=>`<a class="mono sh-a" href="https://www.google.com/maps/search/?api=1&query=Pescheria+2+Mari+Piazza+Amati+1+Savelletri" target="_blank" rel="noopener">${U('map')} →</a>`;
const BOOK=()=>`<p class="bk-sun" id="bk-sun"></p><form class="bk" id="bk" novalidate><div class="row2"><label><span class="mono">${U('l1')}</span><input id="f-d" type="date" value="${date}" min="${S.today()}"></label><label><span class="mono">${U('l2')}</span><select id="f-n">${[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}"${n===2?' selected':''}>${n} ${L==='it'?(n===1?'persona':'persone'):(n===1?'guest':'guests')}</option>`).join('')}</select></label></div><label><span class="mono">${U('l3')}</span><select id="f-t"></select></label><label><span class="mono">${U('l4')}</span><input id="f-name" type="text" autocomplete="name"></label><button class="btn" type="submit"><span>${U('send')}</span><span aria-hidden="true">→</span></button></form><p class="sh-alt">${U('alt')} <a href="tel:+390804829161">080 482 9161</a></p>`;
const GAL=b=>`<div class="gal${b.i.length===3?' g3':''}">${b.i.map(([k,c],n)=>`<figure class="${n===0?'arch':''}"><img src="img/${k}-800.webp" srcset="img/${k}-800.webp 800w, img/${k}-1600.webp 1600w" sizes="(max-width:760px) 100vw, 600px" alt="${tx(c)}" loading="lazy"><figcaption class="mono">${tx(c)}</figcaption></figure>`).join('')}</div>`;
const SP=()=>`<div class="sp"><p class="mono sp-k">${U('spk')}</p><div class="chips" role="group">${D.cats.map(([c,l],n)=>`<button type="button" class="mono chip" data-cat="${c}" aria-pressed="${n===0}">${tx(l)} <b>${c==='all'?D.species.length:D.species.filter(x=>x.c===c).length}</b></button>`).join('')}</div><ul class="sp-g">${D.species.map((x,n)=>`<li class="sp-c" data-c="${x.c}" style="--rt:${((n*37)%5-2)*.6}deg"><div class="sp-e"><img src="img/f-${x.f}.webp" alt="" loading="lazy"></div><p class="sp-n">${pk(x.n)}</p><p class="sp-s">${x.s}</p><dl><dt class="mono">${U('zone')}</dt><dd class="mono">${pk(x.z)}</dd><dt class="mono">${U('meth')}</dt><dd>${pk(x.m)}</dd><dt class="mono">${U('use')}</dt><dd>${pk(x.u)}</dd></dl></li>`).join('')}</ul></div>`;
const MENU=()=>`<ul class="menu">${D.menu.map(m=>m.g?`<li class="mg"><p class="mono">${pk(m.g)}</p></li>`:`<li><p class="n">${pk(m.n)}</p><p class="p">${pk(m.p)}</p><p class="s"><i>${pk(m.s)}</i><span class="mono">${pk(m.o)}</span></p></li>`).join('')}</ul>`;
function blk(b){switch(b.t){
case'g':return GAL(b);case'sp':return SP();case'label':return LAB();case'pairs':return PAIRS();case'menu':return MENU();case'map':return MAP();case'book':return BOOK();
case'h':return `<div class="sh-sub"><p class="mono sh-k">${tx(b.k)}</p><h3>${tx(b.h)}</h3></div>`;
case'p':return `<p class="sh-p${b.c?' '+b.c:''}">${tx(b.x)}</p>`;
case'q':return `<blockquote class="sh-q">${tx(b.x)}</blockquote>`;
case'two':return `<div class="two">${b.r.map(([k,hh,p])=>`<div><p class="mono sh-k">${tx(k)}</p><h3>${tx(hh)}</h3><p>${tx(p)}</p></div>`).join('')}</div>`;
case'info':return `<dl class="info">${b.r.map(([k,v])=>`<dt class="mono">${tx(k)}</dt><dd>${tx(v)}</dd>`).join('')}</dl>`;
case'list':return `<dl class="lst">${b.r.map(([k,v])=>`<div><dt>${tx(k)}</dt><dd>${tx(v)}</dd></div>`).join('')}</dl>`}return''}
function sheetHTML(id){if(id==='indice')return `<p class="mono sh-k">${U('idx')}</p><h2 class="sh-h" id="sh-h">${U('index')}</h2><ul class="idx">${D.tags.map(t=>`<li><button type="button" data-open="${t.id}"><span class="t">${t[L]}</span><span class="mono">${win(t)}</span></button></li>`).join('')}</ul><div class="sh-info"><p>Piazza Amati 1 · 72015 Savelletri di Fasano (BR)</p><p><a href="tel:+390804829161">+39 080 482 9161</a> · <a href="https://www.instagram.com/pescheria2mari/" target="_blank" rel="noopener">@pescheria2mari</a></p><p>${U('hrs')} · <span class="mono">${U('idxn')}</span></p></div><p class="sh-f">${U('cred')}</p>`;
 const s=D.sheets[id];let h=`<p class="mono sh-k">${tx(s.k)}</p><h2 class="sh-h" id="sh-h">${tx(s.h)}</h2><p class="sh-p">${tx(s.p)}</p>`;
 h+=s.b.map(blk).join('');
 return h}
function bookInit(){const fd=$('#f-d'),ft=$('#f-t');if(!fd)return;const sl=()=>{const r=S.riseSet(fd.value||S.today()),s=r.set-30,sv=S.fmt(Math.round(s/15)*15);$('#bk-sun').textContent=`${U('sunline')} ${S.fmt(r.set)}.`;ft.innerHTML=`<option value="${sv}" data-sun="1">${U('sunset')} · ${sv}</option>`+['12:30','13:00','13:30','14:00','19:30','20:00','20:30','21:00','21:30','22:00'].filter(x=>x!==sv).map(x=>`<option>${x}</option>`).join('');return r};
 const go=()=>{const r=sl();date=fd.value||S.today();rs=S.riseSet(date);VL=voiceList();buildTicks();tgt=Math.floor(cur/1440)*1440+r.set+15};sl();fd.addEventListener('input',go);
 $('#bk').addEventListener('submit',e=>{e.preventDefault();const day=new Date((fd.value||S.today())+'T12:00:00').toLocaleDateString(L==='it'?'it-IT':'en-GB',{weekday:'long',day:'numeric',month:'long'}),n=$('#f-n').value,o=ft.selectedOptions[0],nm=$('#f-name').value.trim();const msg=L==='it'?`Buongiorno! Vorrei prenotare un tavolo per ${n} ${n==='1'?'persona':'persone'} ${day} alle ${o.value}${o.dataset.sun?' (al tramonto)':''}.${nm?' Nome: '+nm+'.':''} Grazie!`:`Hello! I'd like to book a table for ${n} on ${day} at ${o.value}${o.dataset.sun?' (sunset)':''}.${nm?' Name: '+nm+'.':''} Language: English. Thank you!`;window.open('https://wa.me/'+D.wa+'?text='+encodeURIComponent(msg),'_blank')})}
function openSheet(id){lastFocus=document.activeElement;opened=id;inner.innerHTML=sheetHTML(id);inner.scrollTop=0;body.classList.add('open');bookInit();if(id==='tavolo'&&!interacted){tgt=Math.floor(cur/1440)*1440+rs.set+15}setTimeout(()=>sheet.focus(),50);hideHint()}
function closeSheet(){opened=null;body.classList.remove('open');lastFocus&&lastFocus.focus&&lastFocus.focus()}
document.addEventListener('click',e=>{const ch=e.target.closest('.chip');if(ch){const c=ch.dataset.cat;$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===ch));$$('.sp-c').forEach(x=>x.hidden=!(c==='all'||x.dataset.c===c));return}const o=e.target.closest('[data-open]');if(o){e.preventDefault();openSheet(o.dataset.open);return}if(e.target.closest('[data-close]'))closeSheet()});
sheet.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=$$('button,a,input,select',sheet).filter(x=>!x.disabled&&x.offsetParent);if(!f.length)return;if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus()}});

function setLang(l){L=l;document.documentElement.lang=l;$$('[data-u]').forEach(e=>{const k=e.dataset.u;if(k==='langbtn'){e.textContent=l==='it'?'EN':'IT';e.setAttribute('aria-label',U('lang'))}else e.textContent=U(k)});$('.sheet-x').setAttribute('aria-label',U('close'));tagEls.forEach((b,i)=>{b._w=0;$('.tag-t',b).textContent=D.tags[i][l];$('.tag-k',b).textContent=win(D.tags[i])});buildTicks();setVoice(vIdx<0?0:vIdx,true);if(opened){const id=opened;inner.innerHTML=sheetHTML(id);bookInit()}}
$('[data-lang]').addEventListener('click',()=>setLang(L==='it'?'en':'it'));
$('.day-nowt').textContent=S.fmt(now);
setLang('it');
requestAnimationFrame(frame);
requestAnimationFrame(()=>setTimeout(()=>body.classList.remove('intro'),RM?0:900));
})();
