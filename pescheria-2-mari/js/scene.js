window.SCENE=(()=>{
const H=520,VIEW_AZ=82,FOV=112;
const hex=h=>{const n=parseInt(h.slice(1),16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]};
const P=(top,hor,seaT,seaD,sil,belt,beltA,stars,ink)=>({top:hex(top),hor:hex(hor),seaT:hex(seaT),seaD:hex(seaD),sil:hex(sil),belt:hex(belt),beltA,stars,ink});
const night=P('#040b13','#0f2234','#0e1f2e','#03090f','#020609','#000000',0,1,1),blue=P('#0f1f33','#33476a','#1d2d44','#070f19','#060b12','#5a4b6e',.2,.5,1);
const AM=[[-18,night],[-10,blue],[-4,P('#1f3352','#c98d86','#5b5468','#141d2c','#11131c','#b98a9a',.35,.15,1)],[0,P('#3f5f88','#f2b88e','#c09a92','#34445e','#231f29','#f3a98e',.3,0,1)],[5,P('#7fa6c8','#f7d9b4','#b9b3ae','#4a6a82','#2e3036','#f3a98e',0,0,0)],[14,P('#95bcd8','#eef0ea','#a9c1c8','#3f6b80','#363d41','#000000',0,0,0)],[30,P('#8db8d6','#eef1ec','#9bbac4','#33627a','#383f43','#000000',0,0,0)]];
const PM=[[30,AM[6][1]],[14,P('#a3bfd2','#f3e2c6','#a8b9b8','#3f6676','#3a3935','#000000',0,0,0)],[5,P('#8aa2bf','#f4cfa6','#b8a9a0','#445e75','#302e30','#f0a4a0',.1,0,0)],[0,P('#3b4a72','#eaa68f','#9c8399','#2e3a58','#1d1923','#f0a4a0',.55,0,1)],[-4,P('#222f4d','#a27a8e','#4e4a63','#121a29','#0f111a','#b07b93',.4,.2,1)],[-10,blue],[-18,night]];
const lerp=(a,b,t)=>a+(b-a)*t,mix3=(a,b,t)=>a.map((v,i)=>lerp(v,b[i],t));
function palette(alt,pm){const K=pm?PM.slice().reverse():AM;const a=Math.max(-18,Math.min(30,alt));let i=0;while(i<K.length-2&&a>K[i+1][0])i++;const[a0,p0]=K[i],[a1,p1]=K[i+1],t=Math.min(1,Math.max(0,(a-a0)/(a1-a0||1)));const o={};for(const k in p0)o[k]=Array.isArray(p0[k])?mix3(p0[k],p1[k],t):lerp(p0[k],p1[k],t);return o}

const VS='void main(){gl_Position=vec4(position.xy,0.,1.);}';
const FS=`precision highp float;
uniform vec2 uRes;uniform float uTime,uHz,uStars,uBeltA,uSunR;uniform vec3 uTop,uHor,uSeaT,uSeaD,uSunC,uBelt,uSun;uniform vec4 uMoon;uniform float uMoonR;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){vec2 uv=gl_FragCoord.xy/uRes;float asp=uRes.x/uRes.y;vec2 p=vec2(uv.x*asp,uv.y);vec3 col;
vec2 sp=vec2(uSun.x*asp,uSun.y),mp=vec2(uMoon.x*asp,uMoon.y);
if(uv.y>uHz){float h=(uv.y-uHz)/(1.-uHz);col=mix(uHor,uTop,pow(h,.5));
col=mix(col,uBelt,exp(-pow((h-.14)/.09,2.))*uBeltA);
float cl=noise(vec2(p.x*2.2+uTime*.01,h*9.))*noise(vec2(p.x*5.+uTime*.02,h*22.));col=mix(col,uHor,cl*.18*smoothstep(.05,.5,h)*(1.-uStars*.7));
float d=distance(p,sp);col+=uSunC*(exp(-d*7.)*.45+exp(-d*1.8)*.2)*uSun.z;col=mix(col,uSunC*1.08,smoothstep(uSunR,uSunR-.003,d)*uSun.z);
float dm=distance(p,mp);vec2 q=(p-mp)/uMoonR;float inD=smoothstep(uMoonR,uMoonR-.003,dm);float term=q.x*sign(uMoon.w)-(1.-2.*abs(uMoon.w))*sqrt(max(0.,1.-q.y*q.y));float lit=smoothstep(-.06,.06,term);
col+=vec3(.85,.86,.9)*exp(-dm*9.)*.18*uMoon.z;col=mix(col,mix(col*1.15+vec3(.05),vec3(.93,.92,.86),lit),inD*uMoon.z);
vec2 g=floor(p*190.);float r=hash(g);float st=step(.9965,r)*(.55+.45*sin(uTime*1.7+r*80.));col+=vec3(st)*uStars*smoothstep(.02,.3,h)*(1.-inD);
}else{float yy=uHz-uv.y,dp=yy/uHz;col=mix(uSeaT,uSeaD,pow(dp,.65));col=mix(col,uHor,exp(-yy*55.)*.55);
float z=1./(yy+.015);float w=noise(vec2(uv.x*asp*14.*(.25+dp*2.),z*.9+uTime*.35))*.7+noise(vec2(uv.x*asp*40.*(.2+dp),z*2.4-uTime*.5))*.3;col*=.93+.12*w;
col=mix(col,uTop,(1.-w)*.06*(1.-dp));
float ws=.0006+yy*yy*.9;float sx=uv.x*asp-sp.x;float path=exp(-sx*sx/ws)*uSun.z*smoothstep(uHz-.06,uHz+.08,uSun.y);
float spk=step(.78,noise(vec2(uv.x*asp*260.,z*14.+uTime*3.)));col+=uSunC*path*(.18+spk*.85);
float mx=uv.x*asp-mp.x;float mpath=exp(-mx*mx/(ws*.6))*uMoon.z;col+=vec3(.8,.82,.9)*mpath*(.05+spk*.35)*(.3+abs(uMoon.w));}
col*=1.-.22*pow(distance(uv,vec2(.5,.6)),2.2);col+=(hash(uv*uRes+fract(uTime))-.5)*.022;gl_FragColor=vec4(col,1.);}`;

let renderer,scene,cam,mat,U,ok=false,svg,refs={},vb={vx:0,vy:0,s:1,W:1,H:1},running=true,reduce=false;
function init(canvas,svgEl,rm){reduce=rm;svg=svgEl;buildSvg();try{renderer=new THREE.WebGLRenderer({canvas,antialias:false,powerPreference:'low-power'});ok=!!renderer.getContext()}catch(e){ok=false}
 if(ok){renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1:1.5));scene=new THREE.Scene();cam=new THREE.Camera();
  U={uRes:{value:new THREE.Vector2()},uTime:{value:0},uHz:{value:.42},uStars:{value:0},uBeltA:{value:0},uSunR:{value:.05},uMoonR:{value:.03},uTop:{value:new THREE.Color()},uHor:{value:new THREE.Color()},uSeaT:{value:new THREE.Color()},uSeaD:{value:new THREE.Color()},uSunC:{value:new THREE.Color()},uBelt:{value:new THREE.Color()},uSun:{value:new THREE.Vector3()},uMoon:{value:new THREE.Vector4()}};
  mat=new THREE.ShaderMaterial({vertexShader:VS,fragmentShader:FS,uniforms:U,depthTest:false});scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat));
  document.addEventListener('visibilitychange',()=>{running=!document.hidden})}
 resize();addEventListener('resize',resize);return ok}
function resize(){const W=innerWidth,Ht=innerHeight,s=Math.max(W/1600,Ht/900),vw=W/s,vh=Ht/s,focus=W<760?470:720,off=W<761&&Ht>W?Math.max(0,214-132*s)/s:0;vb={vx:Math.max(0,Math.min(1600-vw,focus-vw/2)),vy:900-vh+off,s,W,H:Ht};svg.setAttribute('viewBox',`${vb.vx} ${vb.vy} ${vw} ${vh}`);if(ok){renderer.setSize(W,Ht,false);U.uRes.value.set(W*renderer.getPixelRatio(),Ht*renderer.getPixelRatio());U.uSunR.value=Math.min(.065,.045*Math.max(1,W/Ht)*.8+.012);U.uMoonR.value=U.uSunR.value*.62}}
const toScreen=(x,y)=>[(x-vb.vx)*vb.s,(y-vb.vy)*vb.s];
const hz=()=>1-toScreen(0,H)[1]/vb.H;
function skyUV(az,alt){const x=.5+((az-VIEW_AZ+540)%360-180)/FOV,h=hz();return[x,h+Math.max(-.2,alt)/48*(1-h)]}

const NS='http://www.w3.org/2000/svg',el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e};
function palm(g,x,base,top,lean){const c=x+lean,tx=x+lean*1.6;el('path',{d:`M${x} ${base} Q${c} ${(base+top)/2} ${tx} ${top}`,fill:'none',stroke:'currentColor','stroke-width':9,'stroke-linecap':'round'},g);for(let i=0;i<11;i++){const a=-Math.PI+i/10*Math.PI*1.05-.05,len=70+((i*37)%30),ex=tx+Math.cos(a)*len,ey=top+Math.sin(a)*len*.55+18,mx=tx+Math.cos(a)*len*.5,my=top+Math.sin(a)*len*.55-14;el('path',{d:`M${tx} ${top} Q${mx} ${my} ${ex} ${ey}`,fill:'none',stroke:'currentColor','stroke-width':5,'stroke-linecap':'round'},g)}}
function boat(g,i){const b=el('g',{class:'boat'},g);el('path',{d:'M-62 0 L58 0 L48 16 L-50 16 Z'},b);el('rect',{x:-18,y:-20,width:34,height:20},b);el('rect',{x:-12,y:-15,width:8,height:7,class:'bwin'},b);el('rect',{x:2,y:-15,width:8,height:7,class:'bwin'},b);el('line',{x1:-38,y1:0,x2:-38,y2:-52,stroke:'currentColor','stroke-width':3},b);el('line',{x1:-38,y1:-48,x2:30,y2:-6,stroke:'currentColor','stroke-width':1.2},b);el('circle',{cx:-38,cy:-54,r:3,class:'blamp'},b);return b}
function buildSvg(){svg.innerHTML='';
 const defs=el('defs',{});const lg=el('linearGradient',{id:'gl',x1:0,y1:0,x2:0,y2:1},defs);el('stop',{offset:0,'stop-color':'#ffd79a'},lg);el('stop',{offset:1,'stop-color':'#e8973f'},lg);const f=el('filter',{id:'bl',x:'-50%',y:'-50%',width:'200%',height:'200%'},defs);el('feGaussianBlur',{stdDeviation:6},f);
 const far=el('g',{class:'far'});el('path',{d:`M-10 ${H} L-10 ${H-9} C60 ${H-12} 160 ${H-7} 260 ${H-5} L420 ${H-2} L420 ${H} Z`},far);el('path',{d:`M1250 ${H} L1300 ${H-3} C1400 ${H-6} 1500 ${H-10} 1610 ${H-8} L1610 ${H} Z`},far);
 const sil=el('g',{class:'sil'});refs.sil=sil;
 const molo=el('g',{},sil);el('path',{d:`M460 572 L1260 556 L1262 566 L462 584 Z`},molo);for(let x=470;x<1250;x+=26)el('path',{d:`M${x} ${582-(x-460)*.015} q8 -9 16 -1 q6 -7 12 1 Z`},molo);el('rect',{x:1250,y:520,width:9,height:40},molo);refs.fan=el('circle',{cx:1254.5,cy:516,r:4,class:'fanale'},molo);
 refs.boats=[0,1,2].map(i=>boat(sil,i));
 const tower=el('g',{},sil);el('rect',{x:30,y:500,width:80,height:300},tower);el('path',{d:'M26 500 L70 448 L114 500 Z'},tower);el('rect',{x:24,y:496,width:92,height:8},tower);refs.bell=el('path',{d:'M52 560 v-26 a18 18 0 0 1 36 0 v26 Z',class:'bellwin'},tower);
 refs.palms=el('g',{class:'palms'},sil);palm(refs.palms,655,770,528,18);palm(refs.palms,770,770,566,-14);palm(refs.palms,1490,770,590,-10);
 const pav=el('g',{},sil);el('rect',{x:120,y:618,width:520,height:16},pav);el('rect',{x:140,y:634,width:480,height:136,class:'glassbg'},pav);refs.glass=el('g',{class:'glass'},pav);for(let x=146;x<612;x+=47.4)el('rect',{x,y:640,width:41,height:124,fill:'url(#gl)'},refs.glass);for(let x=140;x<=620;x+=47.4)el('rect',{x:x-2,y:634,width:5,height:136},pav);el('rect',{x:140,y:692,width:480,height:3},pav);refs.sign=el('text',{x:380,y:630,'text-anchor':'middle',class:'sign'},pav);refs.sign.textContent='P E S C H E R I A';
 refs.lights=el('g',{class:'lights'},sil);for(let i=0;i<=14;i++){const t=i/14,x=640+t*(770-640),y=572+Math.sin(t*Math.PI)*34+t*-8;el('circle',{cx:x,cy:y,r:2.6},refs.lights)}
 const quay=el('g',{},sil);el('rect',{x:-10,y:768,width:1620,height:420},quay);el('rect',{x:-10,y:766,width:1620,height:3,class:'edge'},quay);
 refs.glow=el('g',{class:'glowl',filter:'url(#bl)'});el('rect',{x:146,y:640,width:470,height:124,fill:'#ffc77a'},refs.glow);el('ellipse',{cx:380,cy:778,rx:260,ry:10,fill:'#ffc77a'},refs.glow);}
const ss=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
function boatsAt(m){const dock=[[640,612],[790,604],[935,598]];return dock.map(([dx,dy],i)=>{let x=dx;const out=240+i*15,back=375+i*28,arr=back+70;if(m>out&&m<out+60)x=dx+ss((m-out)/60)*900;else if(m>=out+60&&m<back)x=2000;else if(m>=back&&m<arr)x=dx+(1-ss((m-back)/70))*900;return[x,dy]})}
let last=null;
function update(st){const s=st.sun,m=st.moon,pm=st.min>780,pal=palette(s.alt,pm),dark=Math.max(0,Math.min(1,(4-s.alt)/10));last={pal,dark};
 const silC=pal.sil.map(v=>Math.round(v*255));svg.style.color=`rgb(${silC})`;svg.style.setProperty('--sil',`rgb(${silC})`);
 const open=st.min>=1000&&st.min<1440,gl=dark*(open?1:st.min<300?0:.25);refs.glass.style.opacity=.1+gl*.9;refs.glow.style.opacity=gl*.55;refs.lights.style.opacity=gl;refs.bell.style.opacity=dark*.6;refs.fan.style.opacity=.3+dark*.7;
 boatsAt(st.min).forEach(([x,y],i)=>{refs.boats[i].setAttribute('transform',`translate(${x} ${y+Math.sin(st.anim*.9+i)*1.6}) rotate(${Math.sin(st.anim*.7+i*2)*.8})`);refs.boats[i].querySelectorAll('.bwin,.blamp').forEach(w=>w.style.opacity=dark)});
 if(!ok)return pal;
 const h=hz();U.uHz.value=h;U.uTime.value=reduce?0:st.anim;U.uStars.value=pal.stars;U.uBeltA.value=pal.beltA;U.uTop.value.setRGB(...pal.top);U.uHor.value.setRGB(...pal.hor);U.uSeaT.value.setRGB(...pal.seaT);U.uSeaD.value.setRGB(...pal.seaD);U.uBelt.value.setRGB(...pal.belt);
 const[sx,sy]=skyUV(s.az,s.alt),sc=Math.max(0,Math.min(1,s.alt/25));U.uSun.value.set(sx,sy,s.alt>-2?1:0);U.uSunC.value.setRGB(lerp(1,1,sc),lerp(.55,.95,sc),lerp(.3,.84,sc));
 const[mx,my]=skyUV(m.az,m.alt);U.uMoon.value.set(mx,my,m.alt>-1?Math.min(1,dark*1.4):0,(m.phase<.5?1:-1)*Math.max(.04,m.lit));
 if(running)renderer.render(scene,cam);return pal}
return{init,update,toScreen,hz,get ok(){return ok},get last(){return last}};
})();
