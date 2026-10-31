window.SAV=(()=>{
const LAT=40.8786,LON=17.4161,TZ='Europe/Rome',R=Math.PI/180;
function tzOff(dateStr){const d=new Date(dateStr+'T12:00:00Z');const p=new Intl.DateTimeFormat('en-GB',{timeZone:TZ,hour:'2-digit',hourCycle:'h23'}).formatToParts(d);return (+p.find(x=>x.type==='hour').value-12)*60}
function utcMs(dateStr,min){const[y,m,d]=dateStr.split('-').map(Number);return Date.UTC(y,m-1,d,0,0)+(min-tzOff(dateStr))*6e4}
function eqToHor(ra,dec,d){const gmst=(18.697374558+24.06570982441908*d)%24,H=((gmst*15+LON)*R-ra),lat=LAT*R;const alt=Math.asin(Math.sin(lat)*Math.sin(dec)+Math.cos(lat)*Math.cos(dec)*Math.cos(H));let az=Math.atan2(-Math.sin(H),Math.tan(dec)*Math.cos(lat)-Math.sin(lat)*Math.cos(H));return{alt:alt/R,az:((az/R)+360)%360}}
function sun(ms){const d=ms/864e5+2440587.5-2451545,g=(357.529+.98560028*d)*R,q=280.459+.98564736*d,L=(q+1.915*Math.sin(g)+.02*Math.sin(2*g))*R,e=(23.439-3.6e-7*d)*R;const ra=Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L)),dec=Math.asin(Math.sin(e)*Math.sin(L));return Object.assign(eqToHor(ra,dec,d),{lon:L})}
function moon(ms){const d=ms/864e5+2440587.5-2451545,Lm=(218.316+13.176396*d)*R,M=(134.963+13.064993*d)*R,F=(93.272+13.22935*d)*R;const lon=Lm+6.289*R*Math.sin(M),lat=5.128*R*Math.sin(F),e=23.439*R;const ra=Math.atan2(Math.sin(lon)*Math.cos(e)-Math.tan(lat)*Math.sin(e),Math.cos(lon)),dec=Math.asin(Math.sin(lat)*Math.cos(e)+Math.cos(lat)*Math.sin(e)*Math.sin(lon));const s=sun(ms),el=((lon-s.lon)/R%360+360)%360;return Object.assign(eqToHor(ra,dec,d),{phase:el/360,lit:(1-Math.cos(el*R))/2})}
function riseSet(dateStr){let rise=null,set=null,prev=null;for(let m=0;m<=1440;m+=2){const a=sun(utcMs(dateStr,m)).alt+.833;if(prev!==null){if(prev<0&&a>=0)rise=m;if(prev>=0&&a<0)set=m}prev=a}return{rise,set}}
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:TZ}).format(new Date());
function nowMin(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:TZ,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());return +p.find(x=>x.type==='hour').value*60+ +p.find(x=>x.type==='minute').value}
const fmt=m=>{m=((Math.round(m)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
return{LAT,LON,utcMs,sun,moon,riseSet,today,nowMin,fmt}
})();
