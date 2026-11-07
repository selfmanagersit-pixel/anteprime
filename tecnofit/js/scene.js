(()=>{
const pin=document.querySelector('.st-pin'),story=document.getElementById('story');
if(!pin||!window.THREE||!window.gsap)return;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let gl;try{const c=document.createElement('canvas');gl=c.getContext('webgl')||c.getContext('experimental-webgl')}catch(e){}
if(!gl||RM){document.documentElement.classList.add('no3d');return}
document.documentElement.classList.add('has3d');
gsap.registerPlugin(ScrollTrigger);
const mob=()=>innerWidth<901;
const BG=0x121416,RED=0xd3241c;
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,mob()?1.5:2));
renderer.shadowMap.enabled=!mob();renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.setClearColor(BG,1);
renderer.domElement.className='st-canvas';renderer.domElement.setAttribute('aria-hidden','true');
pin.prepend(renderer.domElement);
const scene=new THREE.Scene();scene.fog=new THREE.Fog(BG,12,30);
const cam=new THREE.PerspectiveCamera(42,1,.1,100);
scene.add(new THREE.HemisphereLight(0xdfe3e8,0x111214,.7));
const key=new THREE.DirectionalLight(0xffffff,1.35);key.position.set(5,9,4);key.castShadow=true;
key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:1,far:25});key.shadow.bias=-.0005;scene.add(key);
const redL=new THREE.PointLight(RED,1.4,14);redL.position.set(-3.5,2.2,-3);scene.add(redL);
const fill=new THREE.PointLight(0xffffff,0,16);fill.position.set(0,3.4,0);scene.add(fill);

const ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshBasicMaterial({color:BG}));ground.rotation.x=-Math.PI/2;scene.add(ground);
const shad=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.45}));shad.rotation.x=-Math.PI/2;shad.position.y=.0015;shad.receiveShadow=true;scene.add(shad);
const grid=new THREE.GridHelper(6,6,RED,RED);grid.position.y=.002;grid.material.transparent=true;grid.material.opacity=.55;scene.add(grid);
const grid2=new THREE.GridHelper(30,30,0x24282c,0x24282c);grid2.position.y=.001;scene.add(grid2);

const tc=document.createElement('canvas');tc.width=tc.height=256;const x=tc.getContext('2d');
x.fillStyle='#121315';x.fillRect(0,0,256,256);
for(let i=0;i<2600;i++){const v=26+Math.random()*34|0;x.fillStyle=Math.random()<.06?'#5a5f66':`rgb(${v},${v},${v+4})`;x.fillRect(Math.random()*256,Math.random()*256,1.4,1.4)}
const ttex=new THREE.CanvasTexture(tc);
const tileM=new THREE.MeshStandardMaterial({map:ttex,roughness:.95,metalness:0});
const tileG=new THREE.BoxGeometry(.985,.04,.985);
const pal=new THREE.Vector3(4.5,0,2.2);
const palM=new THREE.Mesh(new THREE.BoxGeometry(1.15,.14,1.15),new THREE.MeshStandardMaterial({color:0x6b5236,roughness:.9}));
palM.position.set(pal.x,.07,pal.z);palM.castShadow=palM.receiveShadow=true;scene.add(palM);
const tiles=[];const N=36;
for(let i=0;i<N;i++){const r=Math.floor(i/6),c=r%2?5-i%6:i%6;
  const m=new THREE.Mesh(tileG,tileM);m.castShadow=m.receiveShadow=true;
  m.userData.a=new THREE.Vector3(pal.x,.16+(N-1-i)*.041,pal.z);m.userData.b=new THREE.Vector3(c-2.5,.02,r-2.5);
  m.position.copy(m.userData.a);scene.add(m);tiles.push(m)}

const dark=new THREE.MeshStandardMaterial({color:0x22262b,metalness:.55,roughness:.42});
const chrome=new THREE.MeshStandardMaterial({color:0xc4c8cc,metalness:1,roughness:.22});
const red=new THREE.MeshStandardMaterial({color:RED,metalness:.3,roughness:.45,emissive:0x000000});
const rubber=new THREE.MeshStandardMaterial({color:0x0f1012,roughness:.8});
const rack=new THREE.Group();rack.position.set(.5,.04,-.6);scene.add(rack);
const parts=[];
const add=(g,m,p,r=[0,0,0],grp=rack)=>{const o=new THREE.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;o.userData.p=new THREE.Vector3(...p);o.userData.r=new THREE.Euler(...r);
  o.userData.d=new THREE.Vector3((Math.random()-.5)*1.2,2.6+Math.random()*1.2,(Math.random()-.5)*1.2);o.userData.s=(Math.random()-.5)*2.4;o.visible=false;grp.add(o);parts.push(o);return o};
const B=(w,h,d)=>new THREE.BoxGeometry(w,h,d),C=(r,h,s=16)=>new THREE.CylinderGeometry(r,r,h,s);
add(B(1.4,.08,.08),dark,[0,.04,.56]);add(B(1.4,.08,.08),dark,[0,.04,-.56]);add(B(.08,.08,1.2),dark,[-.66,.04,0]);add(B(.08,.08,1.2),dark,[.66,.04,0]);
[[-.62,.52],[.62,.52],[-.62,-.52],[.62,-.52]].forEach(([a,b])=>add(B(.075,2.2,.075),dark,[a,1.14,b]));
add(B(1.32,.075,.075),dark,[0,2.21,.52]);add(B(1.32,.075,.075),dark,[0,2.21,-.52]);add(B(.075,.075,1.12),dark,[-.62,2.21,0]);add(B(.075,.075,1.12),dark,[.62,2.21,0]);
add(B(.52,.06,.012),red,[0,2.21,.565]);
add(C(.012,1.75),chrome,[-.13,1.0,-.45]);add(C(.012,1.75),chrome,[.13,1.0,-.45]);
for(let k=0;k<12;k++)add(B(.34,.046,.2),k%4==3?red:dark,[0,.14+k*.05,-.45]);
const pL=add(C(.075,.045,24),red,[-.46,2.1,.52],[Math.PI/2,0,0]);add(C(.075,.045,24),red,[.46,2.1,.52],[Math.PI/2,0,0]);add(C(.075,.045,24),red,[0,2.1,-.45],[Math.PI/2,0,0]);
add(C(.006,1.05,6),rubber,[-.46,1.55,.52]);add(C(.006,1.05,6),rubber,[.46,1.55,.52]);
add(B(.16,.03,.03),red,[-.46,1.02,.52]);add(B(.16,.03,.03),red,[.46,1.02,.52]);
add(C(.02,1.42),chrome,[0,2.34,.62],[0,0,Math.PI/2]);
add(B(.08,.06,.12),red,[-.62,1.35,.6]);add(B(.08,.06,.12),red,[.62,1.35,.6]);
add(C(.015,2.0),chrome,[0,1.4,.66],[0,0,Math.PI/2]);
add(C(.22,.045,32),rubber,[-.84,1.4,.66],[0,0,Math.PI/2]);add(C(.22,.045,32),rubber,[.84,1.4,.66],[0,0,Math.PI/2]);
add(C(.17,.04,32),red,[-.89,1.4,.66],[0,0,Math.PI/2]);add(C(.17,.04,32),red,[.89,1.4,.66],[0,0,Math.PI/2]);
const NP=parts.length;
const bolts=[],boltG=C(.022,.035,6);
[[-.62,.52],[.62,.52],[-.62,-.52],[.62,-.52]].forEach(([a,b])=>[.12,1.14,2.1].forEach(h=>{[[0,0,.042*Math.sign(b)],[.042*Math.sign(a),0,0]].forEach(([dx,dy,dz])=>{
  const o=new THREE.Mesh(boltG,chrome);o.position.set(a+dx,h,b+dz);o.userData.n=new THREE.Vector3(dx,0,dz).normalize();o.userData.p=o.position.clone();
  if(dz)o.rotation.x=Math.PI/2;else o.rotation.z=Math.PI/2;o.userData.r0=o.rotation.clone();o.visible=false;rack.add(o);bolts.push(o)})}));
const NB=bolts.length;
const ring=new THREE.Mesh(new THREE.TorusGeometry(.16,.008,8,48),new THREE.MeshBasicMaterial({color:RED,transparent:true,opacity:0}));
ring.position.set(-.46+rack.position.x,2.1+rack.position.y,.52+rack.position.z+.04);scene.add(ring);

const extras=[];
const grp=(px,pz,ry=0)=>{const g=new THREE.Group();g.position.set(px,.04,pz);g.rotation.y=ry;const m=(geo,mat,p,r)=>{const o=new THREE.Mesh(geo,mat);o.position.set(...p);if(r)o.rotation.set(...r);o.castShadow=o.receiveShadow=true;g.add(o);return o};return [g,m]};
const fin=g=>{g.scale.set(1,.001,1);g.visible=false;scene.add(g);extras.push(g)};
const scrM=new THREE.MeshBasicMaterial({color:RED});
const tread=(px,pz)=>{const [g,m]=grp(px,pz);
  m(B(.8,.16,1.9),dark,[0,.08,0]);m(B(.6,.02,1.75),rubber,[0,.17,0]);m(B(.06,1.1,.06),dark,[-.35,.6,-.8],[.25,0,0]);m(B(.06,1.1,.06),dark,[.35,.6,-.8],[.25,0,0]);
  m(B(.8,.04,.3),dark,[0,1.12,-.6]);m(B(.84,.34,.09),dark,[0,1.25,-.72],[-.5,0,0]);m(B(.5,.22,.012),scrM,[0,1.27,-.67],[-.5,0,0]);fin(g)};
[-2.35,-1.45,-.55].forEach(x=>tread(x,1.85));
const bike=(px,pz)=>{const [g,m]=grp(px,pz);
  m(B(.46,.05,.08),dark,[0,.03,-.42]);m(B(.46,.05,.08),dark,[0,.03,.42]);m(B(.07,.07,.92),dark,[0,.08,0]);
  m(C(.2,.06,28),red,[0,.36,-.36],[0,0,Math.PI/2]);m(C(.05,.08,12),dark,[0,.36,-.36],[0,0,Math.PI/2]);
  m(B(.06,.82,.06),dark,[0,.5,.2],[.245,0,0]);m(B(.06,.91,.06),dark,[0,.55,-.27],[-.165,0,0]);
  m(B(.07,.05,.5),dark,[0,.42,-.05],[-.35,0,0]);
  m(B(.2,.07,.3),rubber,[0,.93,.33]);m(B(.08,.04,.16),dark,[0,.88,.3]);
  m(B(.46,.035,.04),chrome,[0,1.01,-.37]);m(B(.035,.035,.18),chrome,[-.21,1.01,-.29]);m(B(.035,.035,.18),chrome,[.21,1.01,-.29]);
  m(B(.16,.03,.03),rubber,[-.17,.34,-.36]);m(B(.16,.03,.03),rubber,[.17,.34,-.36]);fin(g)};
bike(.75,2.15);bike(1.45,2.15);
(()=>{const [g,m]=grp(.5,.62);m(B(.3,.09,1.1),red,[0,.46,0]);m(B(.06,.42,.06),dark,[0,.21,-.42]);m(B(.06,.42,.06),dark,[0,.21,.42]);m(B(.48,.05,.08),dark,[0,.03,-.42]);m(B(.48,.05,.08),dark,[0,.03,.42]);fin(g)})();
(()=>{const [g,m]=grp(2.55,-.9);m(B(.5,.06,2.4),dark,[0,.42,0]);m(B(.5,.06,2.4),dark,[-.06,.82,0]);[-1.1,1.1].forEach(z=>{m(B(.06,.9,.06),dark,[.18,.45,z]);m(B(.06,.9,.06),dark,[-.18,.45,z])});
  for(let i=0;i<6;i++){const z=-1+i*.4,r=.05+i*.008;[[.08,.5],[-.1,.9]].forEach(([dx,y])=>{m(C(.012,.26),chrome,[dx,y,z],[0,0,Math.PI/2]);m(C(r,.05,16),i%2?red:rubber,[dx-.13,y,z],[0,0,Math.PI/2]);m(C(r,.05,16),i%2?red:rubber,[dx+.13,y,z],[0,0,Math.PI/2])})}
  fin(g)})();
const wallM=new THREE.MeshStandardMaterial({color:0x1b1e21,roughness:.85});
const wall=new THREE.Mesh(B(6.2,2.8,.12),wallM);wall.position.set(0,1.4,-3.08);wall.receiveShadow=true;scene.add(wall);
const stripe=new THREE.Mesh(B(6.2,.12,.02),scrM);stripe.position.set(0,1.05,-3.01);scene.add(stripe);
const mir=new THREE.Mesh(B(3.2,1.7,.02),new THREE.MeshStandardMaterial({color:0x3a4148,metalness:.2,roughness:.25}));mir.position.set(.9,1.55,-3);scene.add(mir);
const col=new THREE.Mesh(B(.38,2.8,.38),new THREE.MeshStandardMaterial({color:0x2a2e33,roughness:.6}));col.position.set(-2.85,1.4,-2.85);col.castShadow=true;scene.add(col);


const K=[[[8,6.8,9],[-.6,.4,.4]],[[1.2,9.6,6.6],[-.4,0,0]],[[4.6,3.1,5.2],[.5,1.15,-.5]],[[1.25,2.45,2.05],[.04,2.02,-.08]],[[-6.4,4.4,7.2],[0,.9,-.2]]];
const KM=[[[8.5,7.5,10],[.4,.4,.8]],[[1.2,11,7.5],[-.2,0,0]],[[5.2,3.6,6.2],[.5,1.2,-.5]],[[1.5,2.5,2.5],[.04,2.0,-.08]],[[-6.8,4.8,8.2],[0,.9,-.2]]];
const P={cam:0,tiles:0,build:0,bolts:0,fault:0,clock:0,fix:0,final:0,orbit:0};
const v1=new THREE.Vector3(),v2=new THREE.Vector3(),tg=new THREE.Vector3();
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,cl=t=>Math.max(0,Math.min(1,t));
let W=0,H=0;
const size=()=>{W=pin.clientWidth;H=pin.clientHeight;renderer.setSize(W,H,false);cam.aspect=W/H;cam.fov=mob()?52:40;
  if(mob())cam.setViewOffset(W,H,0,H*.2,W,H);else cam.setViewOffset(W,H,-W*.17,0,W,H);cam.updateProjectionMatrix()};
size();addEventListener('resize',size);
const $=id=>document.getElementById(id),mT=$('m-tiles'),mB=$('m-bolts'),mC=$('m-clock');
let clock0=0;
const update=time=>{
  const KK=mob()?KM:K,i=Math.min(3,Math.floor(P.cam)),f=ease(P.cam-i);
  v1.fromArray(KK[i][0]).lerp(v2.fromArray(KK[i+1][0]),f);tg.fromArray(KK[i][1]).lerp(v2.fromArray(KK[i+1][1]),f);
  if(P.orbit>0){const a=P.orbit*.9,r=Math.hypot(v1.x,v1.z),a0=Math.atan2(v1.z,v1.x);v1.x=Math.cos(a0+a)*r;v1.z=Math.sin(a0+a)*r}
  v1.y+=Math.sin(time*.4)*.04;cam.position.copy(v1);cam.lookAt(tg);
  tiles.forEach((m,k)=>{const t=cl(P.tiles-k);const e=ease(t);m.position.lerpVectors(m.userData.a,m.userData.b,e);m.position.y+=Math.sin(Math.PI*t)*1.3;m.rotation.x=Math.sin(Math.PI*t)*.9;m.rotation.z=(1-e)*0+Math.sin(Math.PI*t)*.3});
  grid.material.opacity=.55*(1-cl(P.tiles/36));
  const pv=1-cl((P.tiles-35.2)*1.5);palM.visible=pv>.01;palM.scale.set(pv,pv,pv);
  parts.forEach((o,k)=>{const t=cl(P.build-k),e=1-Math.pow(1-t,3);o.visible=t>0;o.position.copy(o.userData.p).addScaledVector(o.userData.d,1-e);
    o.rotation.set(o.userData.r.x+o.userData.s*(1-e),o.userData.r.y+o.userData.s*(1-e),o.userData.r.z)});
  bolts.forEach((o,k)=>{const t=cl(P.bolts-k),e=1-Math.pow(1-t,2);o.visible=t>0;o.position.copy(o.userData.p).addScaledVector(o.userData.n,(1-e)*.35);
    const sp=e*Math.PI*6;o.rotation.copy(o.userData.r0);if(o.userData.n.z)o.rotateY(sp);else o.rotateY(sp)});
  const flt=P.fault*(1-P.fix);red.emissive.setRGB(0,0,0);
  pL.material=flt>0?pLm:red;pLm.emissive.setRGB(.9*flt*(.55+.45*Math.sin(time*7)),0,0);
  ring.material.opacity=flt*.9;const rs=1+((time*.9)%1)*1.6*flt;ring.scale.setScalar(rs);ring.lookAt(cam.position);
  const fe=ease(P.final);extras.forEach((g,k)=>{const t=cl(fe*1.6-k*.15);g.visible=t>0;g.scale.y=Math.max(.001,1-Math.pow(1-t,3))});
  fill.intensity=fe*1.1;redL.intensity=1.4+fe*.8;
  if(mT)mT.textContent=Math.round(cl(P.tiles/36)*36);if(mB)mB.textContent=Math.round(cl(P.bolts/NB)*NB);
  if(mC){const m=Math.round((1-P.clock)*48*4)*15,h=Math.floor(m/60);mC.textContent=String(h).padStart(2,'0')+':'+String(m%60).padStart(2,'0')}
};
const pLm=red.clone();
const chs=[...pin.querySelectorAll('.ch')],rail=[...pin.querySelectorAll('.rail li')],bar=pin.querySelector('.st-bar i');
let cur=0;const setCh=n=>{if(n===cur)return;cur=n;chs.forEach((c,k)=>c.classList.toggle('on',k===n));rail.forEach((c,k)=>c.classList.toggle('on',k===n))};
const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:story,start:'top top',end:()=>'+='+innerHeight*(mob()?6:7),pin:pin,scrub:1,anticipatePin:1,invalidateOnRefresh:true,
  onUpdate:s=>{const t=tl.time();setCh(t<.85?0:t<2.95?1:t<6.05?2:t<8.05?3:4);if(bar)bar.style.transform=`scaleX(${s.progress})`}}});
tl.to(P,{cam:1,duration:1,ease:'power1.inOut'},0).to(P,{tiles:36,duration:2.1},.85).to(P,{cam:2,duration:1,ease:'power1.inOut'},2.8)
  .to(P,{build:NP,duration:2.3},3.05).to(P,{bolts:NB,duration:.75},5.25).to(P,{cam:3,duration:.8,ease:'power1.inOut'},6.0)
  .to(P,{fault:1,duration:.3},6.35).to(P,{clock:1,duration:1.2},6.55).to(P,{fix:1,duration:.3},7.6)
  .to(P,{cam:4,duration:1,ease:'power1.inOut'},8.0).to(P,{final:1,duration:1.3},8.2).to(P,{orbit:1,duration:1.6},8.4);
let vis=true;new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(pin);
const t0=performance.now();
const loop=()=>{requestAnimationFrame(loop);if(!vis||document.hidden)return;const t=(performance.now()-t0)/1000;update(t);renderer.render(scene,cam)};
loop();
})();
