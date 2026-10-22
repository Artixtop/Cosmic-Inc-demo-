
const T=[
{id:'t1',n:'Запас топлива',d:'+3 с к сессии',x:-170,y:0,c:{ore:8},req:[],fx:{time:3}},
{id:'t2',n:'Топливный бак',d:'+3 с',x:-340,y:0,c:{ore:30},req:['t1'],fx:{time:3}},
{id:'t3',n:'Кристальные ячейки',d:'+4 с',x:-510,y:0,c:{ore:60,cry:15},req:['t2'],fx:{time:4}},
{id:'t4',n:'Реактор',d:'+5 с',x:-680,y:0,c:{ore:150,cry:60},req:['t3'],fx:{time:5}},
{id:'t5',n:'Рекуперация',d:'+0.3 с за каждый сбитый астероид',x:-510,y:-115,c:{ore:80,cry:25},req:['t3'],fx:{tk:.3}},
{id:'t6',n:'Квантовые часы',d:'+8 с к сессии',x:-850,y:0,c:{ore:300,cry:80,core:4},req:['t4'],fx:{time:8}},
{id:'d1',n:'Крепкий палец',d:'Урон +1',x:170,y:0,c:{ore:12},req:[],fx:{dmg:1}},
{id:'d2',n:'Ударник',d:'Урон +1',x:340,y:0,c:{ore:60},req:['d1'],fx:{dmg:1}},
{id:'d3',n:'Плазменный бур',d:'Урон +2',x:510,y:0,c:{ore:100,cry:20},req:['d2'],fx:{dmg:2}},
{id:'d4',n:'Меткий глаз',d:'Шанс крита 15% (урон ×3)',x:340,y:-115,c:{ore:120},req:['d2'],fx:{crit:.15}},
{id:'d5',n:'Резонанс',d:'Шанс крита +20%',x:510,y:-115,c:{ore:200,cry:35},req:['d4'],fx:{crit:.2}},
{id:'d6',n:'Антиматерия',d:'Урон +3',x:680,y:0,c:{ore:300,cry:50,core:5},req:['d3'],fx:{dmg:3}},
{id:'i1',n:'Сортировка руды',d:'Руда ×1.5',x:0,y:-115,c:{ore:20},req:[],fx:{ore:1.5}},
{id:'i2',n:'Кристальные жилы',d:'Появляются крупные астероиды с кристаллами',x:0,y:-235,c:{ore:50},req:['i1'],fx:{big:1}},
{id:'i3',n:'Огранка',d:'Кристаллы ×2',x:0,y:-355,c:{ore:100,cry:15},req:['i2'],fx:{cry:2}},
{id:'m3',n:'Ядра астероидов',d:'Появляются тяжёлые астероиды с ядрами',x:0,y:-480,c:{ore:250,cry:40},req:['i3'],fx:{core:1}},
{id:'m4',n:'Ядерная огранка',d:'Ядра ×2',x:0,y:-600,c:{ore:400,cry:60,core:3},req:['m3'],fx:{corem:2}},
{id:'k1',n:'Комбо',d:'Сбивай подряд: награда +10% за серию, до ×2',x:170,y:-115,c:{ore:40},req:['i1'],fx:{combo:1}},
{id:'k2',n:'Азарт',d:'Бонус комбо +5% за серию',x:170,y:-235,c:{ore:90,cry:20},req:['k1'],fx:{cp:.05}},
{id:'g1',n:'Золотая жила',d:'Иногда летят золотые астероиды: быстрые, но дорогие',x:-170,y:-235,c:{ore:100,cry:20},req:['i2'],fx:{gold:1}},
{id:'g2',n:'Золотая лихорадка',d:'Золотые астероиды чаще',x:-170,y:-355,c:{ore:200,cry:40},req:['g1'],fx:{gold:1}},
{id:'s1',n:'Радар',d:'Астероидов на 30% больше',x:0,y:115,c:{ore:15},req:[],fx:{spawn:1.3}},
{id:'s2',n:'Притяжение',d:'Ещё на 30% больше',x:0,y:235,c:{ore:60,cry:10},req:['s1','i2'],fx:{spawn:1.3}},
{id:'w1',n:'Ударная волна',d:'Клик задевает соседние астероиды',x:170,y:115,c:{ore:80},req:['d1'],fx:{splash:1}},
{id:'w2',n:'Большая волна',d:'Радиус волны больше',x:170,y:235,c:{ore:120,cry:25},req:['w1'],fx:{splash:1}},
{id:'c1',n:'Цепная реакция',d:'Взрыв бьёт соседний астероид',x:340,y:135,c:{ore:150,cry:30},req:['d2','s1'],fx:{chain:1}}];
const AT={ore:{r:26,hp:3,v:55,o:2,c:0,k:0},big:{r:40,hp:8,v:38,o:5,c:1,k:0},gold:{r:20,hp:2,v:150,o:25,c:0,k:0},core:{r:56,hp:20,v:26,o:8,c:2,k:1}};
const COL={ore:'#8f857a',big:'#6fc5dc',gold:'#ffd54a',core:'#ff7a45'};
const KEY='asteroid-colony-v2',$=id=>document.getElementById(id),NM={ore:'руды',cry:'кристаллов',core:'ядер'};
const fresh=()=>({ore:0,cry:0,core:0,tech:{}});let S=fresh();
try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&x.tech)S=Object.assign(S,x)}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
function st(){const o={time:15,dmg:1,ore:1,cry:1,spawn:1,big:0,chain:0,crit:0,tk:0,combo:0,cp:.1,splash:0,gold:0,core:0,corem:1};
 T.forEach(t=>{if(S.tech[t.id])for(const k in t.fx){if(['ore','cry','spawn','corem'].includes(k))o[k]*=t.fx[k];else o[k]+=t.fx[k]}});return o}
const fmt=n=>n<1000?''+Math.floor(n):(n/1000).toFixed(1)+'K';
const cstr=c=>Object.entries(c).map(([k,v])=>v+' '+NM[k]).join(' + ');
const can=c=>Object.entries(c).every(([k,v])=>S[k]>=v);
// ---- sound
let AC=null,mute=false;try{mute=localStorage.getItem('ac-mute')=='1'}catch(e){}
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state=='suspended')AC.resume();return AC}
function tone(f,d,type='sine',v=.15,f2=0,delay=0){if(mute)return;const c=ac();if(!c)return;const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
 o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(c.destination);o.start(t);o.stop(t+d)}
function noise(d,v=.2,f0=2000,f1=200){if(mute)return;const c=ac();if(!c)return;const n=c.sampleRate*d|0,b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);
 for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime;
 s.buffer=b;fl.type='lowpass';fl.frequency.setValueAtTime(f0,t);fl.frequency.exponentialRampToValueAtTime(f1,t+d);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(fl).connect(g).connect(c.destination);s.start(t)}
const SFX={
 hit:(c=0)=>tone(260+c*25+Math.random()*40,.06,'square',.05,140),
 crit:()=>tone(700,.12,'sawtooth',.07,1400),
 kill:ty=>{const b=ty=='core'?1:ty=='big'?.7:.4;noise(.18+b*.25,.22,2500,120);tone(120,.2+b*.2,'sine',.25,45);
  if(ty=='gold'){tone(1200,.15,'sine',.1);tone(1600,.2,'sine',.1,0,.08);tone(2000,.25,'sine',.08,0,.16)}},
 buy:()=>{tone(520,.12,'triangle',.12);tone(780,.18,'triangle',.12,0,.09)},
 start:()=>tone(300,.25,'triangle',.12,700),
 end:()=>{tone(520,.2,'triangle',.12);tone(390,.2,'triangle',.12,0,.15);tone(260,.35,'triangle',.12,0,.3)}};
const snds=[...document.querySelectorAll('.snd')],ico=()=>snds.forEach(b=>b.textContent=mute?'🔇':'🔊');
snds.forEach(b=>b.onclick=()=>{mute=!mute;try{localStorage.setItem('ac-mute',mute?'1':'0')}catch(e){}ico();SFX.buy()});ico();
// ---- tree
const vp=$('vp'),world=$('world'),NS='http://www.w3.org/2000/svg';let tx=0,ty=0,drag=null,moved=false,L=[],seen=new Set(),init=false;
const pos=id=>id=='root'?{x:0,y:0}:T.find(t=>t.id==id);
const rt=document.createElement('div');rt.className='node root bought';rt.textContent='Станция';rt.style.transform='translate(-50%,-50%)';world.appendChild(rt);
T.forEach(t=>{
 (t.req.length?t.req:['root']).forEach(p=>{const a=pos(p),l=document.createElementNS(NS,'line');
  l.setAttribute('x1',a.x);l.setAttribute('y1',a.y);l.setAttribute('x2',t.x);l.setAttribute('y2',t.y);l.setAttribute('stroke-width',3);
  $('lines').appendChild(l);L.push([l,t.id,p])});
 const b=document.createElement('button');b.className='node hide';b.id='k-'+t.id;
 b.style.cssText=`--c:var(${t.c.core?'--core':t.c.cry?'--cry':'--ore'});transform:translate(calc(${t.x}px - 50%),calc(${t.y}px - 50%))`;
 b.innerHTML=`<b>${t.n}</b><span>${t.d}</span><em>${cstr(t.c)}</em>`;
 b.onclick=()=>{if(moved){moved=false;return}
  if(!S.tech[t.id]&&t.req.every(r=>S.tech[r])&&can(t.c)){for(const k in t.c)S[k]-=t.c[k];S.tech[t.id]=1;save();render();SFX.buy()}};
 world.appendChild(b)});
function place(){world.style.transform=`translate(${tx}px,${ty}px)`}
function center(){tx=vp.clientWidth/2;ty=vp.clientHeight/2;place()}
$('ctr').onclick=center;
vp.addEventListener('wheel',e=>{e.preventDefault();tx-=e.deltaX;ty-=e.deltaY;place()},{passive:false});
vp.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,tx,ty,id:e.pointerId};moved=false});
vp.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
 if(!moved&&Math.hypot(dx,dy)>6){moved=true;try{vp.setPointerCapture(drag.id)}catch(_){}}
 if(moved){tx=drag.tx+dx;ty=drag.ty+dy;place()}});
['pointerup','pointercancel'].forEach(n=>vp.addEventListener(n,()=>{drag=null}));
function render(){const s=st();
 $('o').textContent=fmt(S.ore);$('c').textContent=fmt(S.cry);$('k').textContent=fmt(S.core);
 $('rc').classList.toggle('hide',!(s.big||S.cry>0));$('rk').classList.toggle('hide',!(s.core||S.core>0));
 $('info').textContent=`Сессия ${s.time} с · урон ${s.dmg}`+(s.crit?` · крит ${Math.round(s.crit*100)}%`:'');
 T.forEach(t=>{const e=$('k-'+t.id),all=t.req.every(r=>S.tech[r]),vis=!t.req.length||t.req.some(r=>S.tech[r]),b=!!S.tech[t.id];
  e.classList.toggle('hide',!vis);
  if(vis&&!seen.has(t.id)){seen.add(t.id);if(init)e.classList.add('new')}
  e.classList.toggle('bought',b);e.classList.toggle('locked',!all&&!b);
  e.classList.toggle('ready',all&&!b&&can(t.c));if(vis&&!b)e.lastChild.innerHTML=Object.entries(t.c).map(([k,v])=>`<s class="${S[k]>=v?'ok':'no'}">${v} ${NM[k]}</s>`).join(' + ');e.classList.toggle('poor',all&&!b&&!can(t.c))});
 L.forEach(([l,id,p])=>{l.style.display=p=='root'||S.tech[p]?'':'none';l.setAttribute('stroke',S.tech[id]?'var(--ink)':'var(--line)')});init=true}
let armed=false;
$('rst').onclick=()=>{if(!armed){armed=true;$('rst').textContent='Нажми ещё раз, чтобы стереть всё';return}
 armed=false;$('rst').textContent='Сбросить прогресс';S=fresh();save();render()};
// ---- session
const F=$('field');let A=[],run=null;
function show(g){$('hub').classList.toggle('hide',g);$('game').classList.toggle('hide',!g)}
$('go').onclick=()=>{show(true);const s=st();run={sc:Math.max(1,Math.min(1.7,F.clientWidth/650)),t:s.time,t0:s.time,ore:0,cry:0,core:0,sp:0,cb:0,ct:9,s,last:performance.now()};
 $('cbc').classList.toggle('hide',!s.combo);SFX.start();A.forEach(a=>a.el.remove());A=[];$('over').classList.add('hide');requestAnimationFrame(loop)};
$('back').onclick=()=>{show(false);render();center()};
$('stop').onclick=()=>{if(run)finish()};
addEventListener('keydown',e=>{if(e.key=='Escape'&&run)finish()});
const mv=a=>a.el.style.transform=`translate(${a.x-a.r}px,${a.y-a.r}px)`;
function mk(){const s=run.s,g=.05*s.gold,c=s.core?.12:0,b=s.big?.3:0,q=Math.random();
 const ty=q<g?'gold':q<g+c?'core':q<g+c+b?'big':'ore',p=AT[ty],r=p.r*run.sc,W=F.clientWidth,H=F.clientHeight,d=Math.random()<.5?-1:1,sp=p.v*run.sc*(.7+Math.random()*.6);
 const el=document.createElement('div');el.className='ast '+ty;el.style.width=el.style.height=2*r+'px';
 el.innerHTML='<div class="rk"></div><i class="hp"><u></u></i>';
 const k=el.firstChild,rb=()=>40+Math.random()*20;
 k.style.borderRadius=`${rb()}% ${rb()}% ${rb()}% ${rb()}% / ${rb()}% ${rb()}% ${rb()}% ${rb()}%`;
 k.style.animationDuration=6+Math.random()*10+'s';if(Math.random()<.5)k.style.animationDirection='reverse';
 const a={el,bar:el.lastChild.firstChild,ty,p,x:d<0?-r:W+r,y:r+Math.random()*(H-2*r),vx:-d*sp,vy:(Math.random()-.5)*(ty=='gold'?120:30),r,hp:p.hp,max:p.hp};
 el.addEventListener('pointerdown',e=>{e.preventDefault();run&&click(a)});F.appendChild(el);A.push(a);mv(a)}
function pop(a,t,col,dy=0){const p=document.createElement('div');p.className='pop';p.textContent=t;p.style.cssText=`left:${a.x}px;top:${a.y+dy}px;color:${col}`;F.appendChild(p);setTimeout(()=>p.remove(),800)}
function burst(a){const n={ore:8,big:12,gold:14,core:18}[a.ty];
 for(let i=0;i<n;i++){const f=document.createElement('i'),g=Math.random()*6.28,d=a.r*(1+Math.random()*1.4),z=3+Math.random()*5;f.className='frag';
  f.style.cssText=`left:${a.x}px;top:${a.y}px;width:${z}px;height:${z}px;--dx:${Math.cos(g)*d}px;--dy:${Math.sin(g)*d}px;background:${COL[a.ty]}`;F.appendChild(f);setTimeout(()=>f.remove(),550)}
 const rg=document.createElement('i');rg.className='ring';rg.style.cssText=`left:${a.x}px;top:${a.y}px;width:${a.r*2}px;height:${a.r*2}px;border-color:${COL[a.ty]}`;F.appendChild(rg);setTimeout(()=>rg.remove(),450);
 if(a.ty=='core'||a.ty=='big'){F.classList.remove('shake');void F.offsetWidth;F.classList.add('shake')}}
function click(a){const s=run.s,cr=Math.random()<s.crit,x=a.x,y=a.y;if(cr)pop(a,'КРИТ!','#ff7a59',-24);cr?SFX.crit():SFX.hit(run.cb);
 hit(a,s.dmg*(cr?3:1));
 if(s.splash){const R=(40+35*s.splash)*run.sc;A.slice().forEach(b=>{if(b!==a&&!b.dead&&Math.hypot(b.x-x,b.y-y)<R+b.r)hit(b,Math.max(1,s.dmg>>1))})}}
function hit(a,d){if(!run||a.dead)return;a.hp-=d;a.bar.style.width=Math.max(0,a.hp/a.max*100)+'%';a.el.classList.add('hit','hurt');setTimeout(()=>a.el.classList.remove('hit'),80);if(a.hp<=0)kill(a)}
function kill(a){a.dead=true;a.el.remove();A=A.filter(b=>b!==a);const s=run.s,p=a.p;
 if(s.combo){run.cb=run.ct<2?Math.min(10,run.cb+1):1;run.ct=0}
 const m=1+(s.combo?run.cb*s.cp:0),o=Math.max(1,Math.round(p.o*s.ore*m)),c=p.c?Math.max(1,Math.round(p.c*s.cry*m)):0,k=p.k?Math.max(1,Math.round(p.k*s.corem*m)):0;
 run.ore+=o;run.cry+=c;run.core+=k;run.t+=s.tk;SFX.kill(a.ty);
 pop(a,'+'+o+' ●','#e3b34f');if(c)pop(a,'+'+c+' ◆','#57c7dd',18);if(k)pop(a,'+'+k+' ✦','#ff8a65',36);burst(a);
 if(s.chain&&A.length){const n=A.reduce((m,b)=>Math.hypot(b.x-a.x,b.y-a.y)<Math.hypot(m.x-a.x,m.y-a.y)?b:m);hit(n,1)}}
function loop(now){if(!run)return;const dt=Math.min((now-run.last)/1000,.1);run.last=now;run.t-=dt;run.ct+=dt;if(run.ct>=2)run.cb=0;
 run.sp-=dt;if(run.sp<=0){mk();run.sp=.9/run.s.spawn/run.sc*(.7+Math.random()*.6)}
 const W=F.clientWidth,H=F.clientHeight;
 A.forEach(a=>{a.x+=a.vx*dt;a.y+=a.vy*dt;if(a.y<a.r||a.y>H-a.r)a.vy*=-1;mv(a)});
 A=A.filter(a=>{const gone=a.x<-a.r-20||a.x>W+a.r+20;if(gone)a.el.remove();return!gone});
 $('tm').textContent=Math.max(run.t,0).toFixed(1)+' с';$('tb').firstChild.style.width=Math.min(100,Math.max(0,run.t)/run.t0*100)+'%';
 $('cb').textContent=run.cb?'×'+(1+run.cb*run.s.cp).toFixed(2):'—';
 $('gain').textContent=`${run.ore} ●`+(run.cry?` · ${run.cry} ◆`:'')+(run.core?` · ${run.core} ✦`:'');
 if(run.t<=0)return finish();requestAnimationFrame(loop)}
function finish(){const r=run;run=null;SFX.end();A.forEach(a=>a.el.remove());A=[];S.ore+=r.ore;S.cry+=r.cry;S.core+=r.core;save();
 $('res').textContent=`Руда +${r.ore}`+(r.s.big?` · Кристаллы +${r.cry}`:'')+(r.s.core?` · Ядра +${r.core}`:'');$('over').classList.remove('hide')}
render();requestAnimationFrame(center);addEventListener('resize',()=>{if(!$('hub').classList.contains('hide'))center()});