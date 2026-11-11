(function(){
var C=window.CONFIG,$=function(s){return document.querySelector(s)};
var mobile=function(){return matchMedia('(max-width:760px)').matches};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function debounce(fn,ms){var t;return function(){clearTimeout(t);t=setTimeout(fn,ms)}}
// ---- loader controller: eased progress, minimum display time, graceful exit ----
var LD=(function(){
 var el=$('#loader'),fill=$('#lfill'),pct=$('#lpct'),real=0,shown=0,frozen=false,done=false,fin=false,t0=performance.now(),
  minMs=matchMedia('(prefers-reduced-motion: reduce)').matches?500:2600,last=t0;
 function leave(){if(done)return;done=true;
  Array.prototype.forEach.call(el.querySelectorAll('.ln span'),function(s,i){s.style.setProperty('--k',i)});
  el.classList.add('leave');setTimeout(function(){el.classList.add('done');document.body.classList.add('ready')},650);
  setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},1600)}
 function loop(now){if(done)return;var dt=Math.min(.1,(now-last)/1000);last=now;
  var cap=Math.min(100,(now-t0)/minMs*100),tg=Math.min(fin?100:Math.min(real,99),cap);
  shown+=(tg-shown)*(1-Math.exp(-dt/.18));if(tg-shown<.05)shown=tg;
  fill.style.width=shown.toFixed(1)+'%';if(!frozen)pct.textContent=Math.round(shown)+'%';
  if(fin&&shown>=99.9&&now-t0>=minMs){leave();return}
  requestAnimationFrame(loop)}
 requestAnimationFrame(loop);
 return{
  name:function(){var want=C.name.join(' '),box=$('#lname');
   if(box.textContent.replace(/\u00a0/g,' ')!==want){box.innerHTML=want.split('').map(function(ch,i){return'<span style="animation-delay:'+(i*50)+'ms">'+(ch===' '?'&nbsp;':esc(ch))+'</span>'}).join('')}
   $('#lrole').textContent=C.tag},
  set:function(p){real=Math.max(real,Math.min(100,p))},
  finish:function(){fin=true},
  msg:function(t){frozen=true;pct.textContent=t}}
})();

// ---- timing table (film seconds). from=to is a HOLD ----
var SEG=[{t:[0,3.6],h:1.6},{t:[3.6,3.6],h:1,id:'intro'},{t:[3.6,8],h:1.4},{t:[8,8],h:1,id:'about'},
 {t:[8,24.5],h:4.5},{t:[24.5,27],h:.8},{t:[27,27],h:1.6,id:'work'},{t:[27,36],h:2.5},{t:[36,36],h:1.2,id:'skills'},
 {t:[36,42.2],h:1.6},{t:[42.2,42.2],h:1.2,id:'resume'},{t:[42.2,46.1],h:1},{t:[46.1,46.1],h:1.4,id:'contact'}];
var WIN={intro:[2.6,7.4],about:[7.2,10.2],work:[24.6,31.8],skills:[31.8,39.5],resume:[40.3,45],contact:[44.2,99]};
var SHIFT=[[0,22],[8,22],[11,0],[22,0],[26,-14],[30,-14],[33,0],[38,0],[40.5,-18],[46.2,-18]];
// ---- build DOM ----
LD.name();$('.brand').textContent=C.name.join(' ');
var secs=$('#secs'),h='';
function split3D(t,offset){return '<span class="name-line" aria-label="'+t+'">'+Array.from(t).map(function(ch,i){return '<span class="char" aria-hidden="true" style="--i:'+(offset+i)+'">'+(ch===' '?'&nbsp;':ch)+'</span>'}).join('')+'</span>'}
h+='<section class="sec" id="s-intro"><div class="hi">Hi, I’m</div><h1 class="nm">'+split3D(C.name[0],0)+split3D(C.name[1],C.name[0].length+2)+'</h1><p class="role">'+esc(C.role)+'</p><p class="tg">'+esc(C.tag)+'</p><div class="stat">'+esc(C.status)+'</div></section>';
h+='<section class="sec" id="s-about"><div class="glass"><div class="eb">'+esc(C.aboutEyebrow)+'</div><h2>'+esc(C.aboutTitle)+'</h2><p class="mu">'+esc(C.about)+'</p><div class="stats">'+C.stats.map(function(s){return'<div><b>'+esc(s[0])+'</b><small>'+esc(s[1])+'</small></div>'}).join('')+'</div></div></section>';
h+='<section class="sec" id="s-work">'+C.projects.map(function(p){return'<article class="glass card it"><h3>'+esc(p.title)+'</h3><div class="t">'+esc(p.tech)+'</div><p>'+esc(p.text)+'</p>'+(p.link?'<a href="'+p.link+'" target="_blank" rel="noopener">View project</a>':'')+'</article>'}).join('')+'</section>';
h+='<section class="sec" id="s-skills"><div class="glass sk"><div class="eb">Core skills</div><div class="chips">'+C.coreSkills.map(function(x){return'<span class="chip it">'+esc(x)+'</span>'}).join('')+'</div><div class="eb">Software</div><div class="chips">'+C.software.map(function(x){return'<span class="chip it">'+esc(x)+'</span>'}).join('')+'</div></div></section>';
h+='<section class="sec" id="s-resume"><div class="paper it"><div class="eb">04 – Résumé</div><h2>Experience</h2>'+C.experience.map(function(e){return'<p><b>'+esc(e[0])+'</b><small>'+esc(e[1])+'</small></p>'}).join('')+'<h2>Education</h2>'+C.education.map(function(e){return'<p><b>'+esc(e[0])+'</b><small>'+esc(e[1])+'</small></p>'}).join('')+'<a class="btn" href="'+esc(C.resume)+'" download>Download résumé</a></div></section>';
h+='<section class="sec" id="s-contact"><div class="glass"><div class="eb">05 – Contact</div><h2>'+esc(C.contactTitle[0])+'<br><span style="color:var(--ac)">'+esc(C.contactTitle[1])+'</span></h2><a class="mail" href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a><p class="mu sm">'+esc(C.phone)+' · '+esc(C.place)+'</p><div class="lk">'+C.links.map(function(l){return'<a href="'+l[1]+'" target="_blank" rel="noopener">'+esc(l[0])+'</a>'}).join('')+'<button type="button" class="cp" data-copy="'+esc(C.email)+'">Copy email</button></div></div></section>';
secs.innerHTML=h;
var nav=$('#nav'),ids=[['Home',0],['About','about'],['Work','work'],['Skills','skills'],['Résumé','resume'],['Contact','contact']];
nav.innerHTML=ids.map(function(i){return'<button data-go="'+i[1]+'">'+i[0]+'</button>'}).join('');
var dotsEl=$('#dots');dotsEl.innerHTML=ids.map(function(i){return'<button data-go="'+i[1]+'" aria-label="'+i[0]+'"><span>'+i[0]+'</span></button>'}).join('');
var ITS={};['work','skills','resume'].forEach(function(id){ITS[id]=secs.querySelectorAll('#s-'+id+' .it')});
var PROG=$('#prog'),HINT=$('#hint'),SECEL={};Object.keys(WIN).forEach(function(id){SECEL[id]=$('#s-'+id)});
var MWS=document.querySelectorAll('.mw'),NAVB=document.querySelectorAll('#nav button,#dots button'),RMQ=matchMedia('(prefers-reduced-motion: reduce)');
// copy-email with toast feedback
var toast=$('#toast'),toastT;
function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){toast.classList.remove('on')},2200)}
document.addEventListener('click',function(e){var b=e.target.closest('[data-copy]');if(!b)return;var txt=b.getAttribute('data-copy');
 function ok(){say('Email copied to clipboard');b.textContent='Copied ✓';setTimeout(function(){b.textContent='Copy email'},2000)}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok).catch(function(){say(txt)})}
 else{var t=document.createElement('textarea');t.value=txt;t.style.position='fixed';t.style.opacity=0;document.body.appendChild(t);t.select();try{document.execCommand('copy');ok()}catch(x){say(txt)}t.remove()}});
// keyboard: J/K or [ ] jump between scenes (arrows and space keep native scrolling)
var order=[0,'about','work','skills','resume','contact'];
function curScene(){var y=scrollY,best=0,bd=1e9;order.forEach(function(id,i){var yy=0;if(id){for(var k=0;k<SEG.length;k++)if(SEG[k].id===id){yy=starts[k]+SEG[k].h*vh*.5;break}}var d=Math.abs(yy-y);if(d<bd){bd=d;best=i}});return best}
document.addEventListener('keydown',function(e){if(e.metaKey||e.ctrlKey||e.altKey||/INPUT|TEXTAREA/.test(e.target.tagName))return;
 var k=e.key.toLowerCase(),i=curScene();
 if(k==='j'||k===']')i=Math.min(order.length-1,i+1);else if(k==='k'||k==='[')i=Math.max(0,i-1);else return;
 e.preventDefault();goTo(order[i]===0?0:order[i])});
var hp=$('#hp');if(C.portfolio){hp.href=C.portfolio}else{hp.style.display='none'}
// ---- refined pointer interactions: soft cursor halo + subtle project-card tilt ----
var reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
var finePointer=matchMedia('(pointer: fine)').matches;
var aura=$('#cursorAura');
if(aura && finePointer && !reducedMotion){
 document.addEventListener('pointermove',function(e){
  aura.style.left=e.clientX+'px';aura.style.top=e.clientY+'px';aura.classList.add('active');
 },{passive:true});
 document.addEventListener('pointerleave',function(){aura.classList.remove('active')});
 document.addEventListener('pointerdown',function(){aura.classList.add('press')});
 document.addEventListener('pointerup',function(){aura.classList.remove('press')});
}
if(finePointer && !reducedMotion){
 document.addEventListener('pointermove',function(e){
  var card=e.target.closest('#s-work .card');if(!card)return;
  var r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  card._tiltX=(px-.5)*8;card._tiltY=(.5-py)*6;
  card.style.setProperty('--mx',(px*100)+'%');card.style.setProperty('--my',(py*100)+'%');
 },{passive:true});
 document.addEventListener('pointerout',function(e){
  var card=e.target.closest('#s-work .card');
  if(card&&(!e.relatedTarget||!card.contains(e.relatedTarget))){card._tiltX=0;card._tiltY=0;}
 });
}
// ---- scroll map ----
var v=$('#v'),starts=[],total=0,vh=innerHeight;
function layout(){vh=innerHeight;total=0;starts=SEG.map(function(s){var a=total;total+=s.h*vh;return a});$('#spacer').style.height=(total+vh)+'px'}
layout();addEventListener('resize',debounce(layout,120));
function target(){var y=scrollY,i=SEG.length-1;for(var k=0;k<SEG.length;k++){if(y<starts[k]+SEG[k].h*vh){i=k;break}}
 var s=SEG[i],p=Math.min(1,Math.max(0,(y-starts[i])/(s.h*vh)));return s.t[0]+(s.t[1]-s.t[0])*p}
function goTo(id){var y=0;if(id){for(var k=0;k<SEG.length;k++)if(SEG[k].id===id){y=starts[k]+SEG[k].h*vh*.5;break}}scrollTo({top:y,behavior:'smooth'})}
document.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(!b)return;e.preventDefault();var g=b.getAttribute('data-go');goTo(g==='0'?0:g)});
// ---- render loop ----
var cur=0,dur=46,frame=$('#frame'),rect=frame.firstElementChild,film=$('#film'),ready=false;
var lastFrameTime=performance.now(),lastVideoSeek=0,lastCadDraw=0;
var videoSeekInterval=1000/24; // Match the source film's 24 fps frame cadence.
function sm(x){x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)}
var SHIFTM=[[0,0],[32,0],[35,70],[36.5,92],[37.5,92],[38.6,0],[46.2,0]];
// Lightweight procedural 3D CAD layer: terrain mesh, point-cloud scan and wireframe solids.
var cad=$('#cadfx'),cx=cad.getContext('2d'),cadW=0,cadH=0,dpr=1;
function sizeCad(){dpr=Math.min(1.6,window.devicePixelRatio||1);cadW=innerWidth;cadH=innerHeight;cad.width=Math.round(cadW*dpr);cad.height=Math.round(cadH*dpr);cad.style.width=cadW+'px';cad.style.height=cadH+'px';cx.setTransform(dpr,0,0,dpr,0,0)}
sizeCad();addEventListener('resize',debounce(sizeCad,120));
function project3(x,y,z,ox,oy,scale,ry,rx){var x1=x*Math.cos(ry)+z*Math.sin(ry),z1=-x*Math.sin(ry)+z*Math.cos(ry),y1=y*Math.cos(rx)-z1*Math.sin(rx),z2=y*Math.sin(rx)+z1*Math.cos(rx),f=720/(720+z2*scale*.72);return{x:ox+x1*scale*f,y:oy+y1*scale*f,z:z2}}
function line3(a,b,ox,oy,scale,ry,rx,color,width,alpha){var p=project3(a[0],a[1],a[2],ox,oy,scale,ry,rx),q=project3(b[0],b[1],b[2],ox,oy,scale,ry,rx);cx.strokeStyle=color;cx.lineWidth=width;cx.globalAlpha=alpha;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}
function drawBox3D(ox,oy,scale,t,alpha){var s=1,pts=[[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]],edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];edges.forEach(function(e,i){line3(pts[e[0]],pts[e[1]],ox,oy,scale,t*.22,.42+Math.sin(t*.4)*.08,i<4?'rgba(107,205,220,.85)':'rgba(255,164,96,.8)',.9,alpha*.76)});pts.forEach(function(p){var q=project3(p[0],p[1],p[2],ox,oy,scale,t*.22,.42);cx.globalAlpha=alpha*.8;cx.fillStyle='#b5e5ea';cx.beginPath();cx.arc(q.x,q.y,1.8,0,Math.PI*2);cx.fill()})}
function drawTerrain(ox,oy,scale,t,alpha){var n=12,grid=[];for(var y=0;y<=n;y++){grid[y]=[];for(var x=0;x<=n;x++){var xx=(x/n-.5)*3.5,yy=(y/n-.5)*2.1,zz=(Math.sin(xx*2.1+t*.5)*.22+Math.cos(yy*2.8-t*.32)*.16+Math.sin((xx+yy)*1.7)*.1);grid[y][x]=[xx,yy,zz]}}
 for(var j=0;j<=n;j++)for(var i=0;i<n;i++){line3(grid[j][i],grid[j][i+1],ox,oy,scale,t*.10,.85,'rgba(115,208,220,.76)',.65,alpha*.58)}
 for(var i=0;i<=n;i++)for(var j=0;j<n;j++){line3(grid[j][i],grid[j+1][i],ox,oy,scale,t*.10,.85,'rgba(255,164,96,.62)',.55,alpha*.46)}
 // glowing LiDAR sample points over the surface
 for(var k=0;k<100;k++){var a=(k*37)%169,x=Math.floor(a%13),y=Math.floor(a/13),p=project3(grid[y][x][0],grid[y][x][1],grid[y][x][2],ox,oy,scale,t*.10,.85);cx.globalAlpha=alpha*(.22+((k%5)/9));cx.fillStyle=k%4===0?'#ffb27b':'#a8e3e9';cx.fillRect(p.x,p.y,1.5,1.5)}}
function drawScan(ox,oy,scale,t,alpha){for(var ring=0;ring<3;ring++){var prev=null;for(var i=0;i<=90;i++){var a=i/90*Math.PI*2+t*.22+ring*.28,r=1.08+ring*.18,z=Math.sin(a*3+t+ring)*.45,pt=[Math.cos(a)*r,Math.sin(a)*.55+Math.sin(a*2+t)*.08,z];var q=project3(pt[0],pt[1],pt[2],ox,oy,scale,t*.08,.48);if(prev){cx.globalAlpha=alpha*.42;cx.strokeStyle=ring===1?'rgba(255,165,98,.75)':'rgba(120,214,224,.7)';cx.lineWidth=.7;cx.beginPath();cx.moveTo(prev.x,prev.y);cx.lineTo(q.x,q.y);cx.stroke()}prev=q}
 }
 for(var k=0;k<180;k++){var a=k*2.399+t*.22,r=.28+(k%37)/42,pt=[Math.cos(a)*r,Math.sin(a)*r*.7,Math.sin(a*2+t)*.7],q=project3(pt[0],pt[1],pt[2],ox,oy,scale,t*.08,.48);cx.globalAlpha=alpha*(.3+(k%7)/10);cx.fillStyle=k%6===0?'#ffad72':'#b5e6ed';cx.fillRect(q.x,q.y,1.35,1.35)}}
function drawCAD(sec,t){if(!cx)return;cx.clearRect(0,0,cadW,cadH);var mobileView=mobile(),base=mobileView ? .54 : .8;
 // Keep elements toward screen edges, leaving the video and text readable.
 var left=mobileView?cadW*.18:cadW*.16,right=mobileView?cadW*.84:cadW*.84;
 var phase=sec<8?0:sec<16?1:sec<27?2:sec<36?3:sec<42?4:5;
 var alpha=.32+Math.sin(t*.7)*.05;
 if(phase===0){drawBox3D(right,cadH*.24,base*52,t,alpha*.85);drawScan(left,cadH*.72,base*44,t,alpha*.72)}
 else if(phase===1){drawTerrain(left,cadH*.73,base*54,t,alpha*.82);drawBox3D(right,cadH*.23,base*48,t,alpha*.7)}
 else if(phase===2){drawScan(right,cadH*.7,base*62,t,alpha*.9);drawTerrain(left,cadH*.27,base*42,t,alpha*.54)}
 else if(phase===3){drawTerrain(left,cadH*.68,base*61,t,alpha);drawBox3D(right,cadH*.25,base*52,t,alpha*.82)}
 else if(phase===4){drawBox3D(left,cadH*.34,base*60,t,alpha*.88);drawScan(right,cadH*.72,base*44,t,alpha*.7)}
 else{drawTerrain(right,cadH*.72,base*54,t,alpha*.75);drawScan(left,cadH*.3,base*48,t,alpha*.68)}
 cx.globalAlpha=1}
var hudS=$('#hudScene'),hudC=$('#hudCoord'),hudP=$('#hudPts'),SCN=['Intro','Mapping','LiDAR','Terrain','QA / QC','Connect'];
function drawHUD(sec,t){var ph=sec<8?0:sec<16?1:sec<27?2:sec<36?3:sec<42?4:5,pts=Math.floor(Math.min(1,sec/46)*1.7e9),j=RMQ.matches?0:Math.sin(t*.4)*.0008;
 hudS.textContent='0'+(ph+1)+' / 06 — '+SCN[ph];hudC.textContent=(12.9716+j).toFixed(4)+'° N · '+(77.5946+j*1.3).toFixed(4)+'° E';hudP.textContent='PTS '+pts.toLocaleString('en-US')}
function lerpKF(t,k){k=k||SHIFT;if(t<=k[0][0])return k[0][1];for(var i=1;i<k.length;i++)if(t<=k[i][0]){var a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*sm((t-a[0])/(b[0]-a[0]))}return k[k.length-1][1]}
function tick(now){
 now=now||performance.now();
 if(ready){
  // Frame-rate-independent damping keeps scroll-to-film motion consistent on 60/90/120 Hz displays.
  var dt=Math.min(.05,Math.max(.001,(now-lastFrameTime)/1000));
  lastFrameTime=now;
  var tg=Math.min(target(),dur-.04);
  var blend=1-Math.exp(-dt/.085);
  cur+=(tg-cur)*blend;
  // Seek at the source frame cadence instead of issuing redundant seeks every paint.
  if(Math.abs(cur-v.currentTime)>.035&&!v.seeking&&(now-lastVideoSeek)>=videoSeekInterval){
   try{v.currentTime=Math.max(0,Math.min(cur,dur-.04));lastVideoSeek=now;}catch(e){}
  }
  film.style.transform='translate3d(calc(-50% + '+(mobile()?lerpKF(cur,SHIFTM):lerpKF(cur))+'vw),-50%,0)';
  var mx=Math.max(1,total-vh*.2);PROG.style.width=Math.min(100,scrollY/(total)*100)+'%';
  HINT.style.opacity=scrollY>20?0:1;
  var on='';
  for(var id in WIN){var w=WIN[id],o=sm((cur-w[0])/.6)*sm((w[1]-cur)/.6),el=SECEL[id];
   el.style.opacity=o;el.style.visibility=o>.01?'visible':'hidden';el.classList.toggle('live',o>.5);if(o>.5)on=id;
   var its=ITS[id]||[];
   its.forEach(function(it,i){var p;
    if(id==='work'){p=sm((cur-w[0]-.3-i*.4)/.7);it.style.transform='translateX('+(-(1-p)*240)+'px) rotateY('+(-(1-p)*55+(it._tiltX||0))+'deg) rotateX('+(it._tiltY||0)+'deg) scale('+(.6+.4*p)+')';it.style.opacity=p}
    else if(id==='skills'){p=sm((cur-w[0]-.2-i*.14)/.5);it.style.transform='scale('+(.6+.4*p)+')';it.style.filter='blur('+((1-p)*8)+'px)';it.style.opacity=p}
    else if(id==='resume'){p=sm((cur-40.4)/1.1);it.style.transform='translateY('+(-(1-p)*130)+'%)';it.style.opacity=p}});}
  var d=sm((cur-43.9)/1.4);rect.style.strokeDashoffset=1-d;frame.style.opacity=d>0?1:0;
  if(now-lastCadDraw>=1000/30){drawCAD(cur,RMQ.matches?0:now*.001);drawHUD(cur,RMQ.matches?0:now*.001);lastCadDraw=now;}
  MWS.forEach(function(el){var a=+el.getAttribute('data-a'),b=+el.getAttribute('data-b'),o=sm((cur-a)/.7)*sm((b-cur)/.7);el.style.opacity=(o*.26).toFixed(3);el.style.transform='perspective(1000px) rotateY('+(el.classList.contains('mw-c')||el.classList.contains('mw-e')?18:-18)+'deg) rotateX('+(Math.sin(performance.now()*.00055)*2)+'deg) translate3d(0,'+(Math.sin(performance.now()*.0007)*7)+'px,30px)';});
  NAVB.forEach(function(b){b.classList.toggle('on',b.getAttribute('data-go')===on)});}
 requestAnimationFrame(tick)}
// ---- load film as blob with progress ----
var t0=Date.now();
function start(){ready=true;v.currentTime=0;tick();LD.finish()}
var sd=navigator.connection&&navigator.connection.saveData,src=(mobile()||sd)?'media/film_mobile.mp4':'media/film.mp4',fell=false;
function fallback(){if(fell)return;fell=true;v.src=src;v.addEventListener('loadeddata',function(){dur=v.duration||46;start()},{once:true});setTimeout(function(){if(!ready){dur=v.duration||46;start()}},15000)}
v.poster='media/poster.jpg';
fetch(src).then(function(r){if(!r.ok)throw 0;var L=+r.headers.get('content-length')||0,rd=r.body.getReader(),ch=[],got=0;
 return(function pump(){return rd.read().then(function(x){if(x.done)return new Blob(ch,{type:'video/mp4'});ch.push(x.value);got+=x.value.length;
  var p=L?Math.round(got/L*100):Math.min(99,Math.round(got/15e5));LD.set(p);return pump()})})()})
 .then(function(b){v.src=URL.createObjectURL(b);v.addEventListener('loadeddata',function(){dur=v.duration||46;LD.set(100);start()},{once:true})})
 .catch(fallback);
setTimeout(function(){if(!ready)fallback()},12000);
setTimeout(function(){if(!ready){LD.msg('Still loading. Check your connection, then refresh the page.')}},25000);
v.addEventListener('error',function(){LD.msg('The video could not be loaded. Serve the site folder with npx serve site or upload it to Netlify.')});
// iOS: unlock seeking on first touch
addEventListener('touchstart',function(){var p=v.play();if(p&&p.then)p.then(function(){v.pause()}).catch(function(){})},{once:true,passive:true});
})();
