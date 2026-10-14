const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let lang='en',gems=0;
const secs=[['home','Home','الرئيسية'],['about','About','عنّي'],['education','Education','التعليم'],['skills','Skills','المهارات'],['experience','Experience','الخبرات'],['projects','Projects','المشاريع'],['certs','Certificates','الشهادات'],['contact','Contact','تواصل']];
const roles=[['Game Developer','مطورة ألعاب'],['Unity & C# Developer','مطورة Unity و C#'],['IT Student','طالبة تكنولوجيا معلومات']];let ri=0,ci=0,del=false;
function type(){const t=roles[ri][lang=='ar'?1:0];ci+=del?-1:1;$('#role').textContent=t.slice(0,ci);let d=del?40:90;if(!del&&ci>=t.length){del=true;d=1400}else if(del&&ci<=0){del=false;ri=(ri+1)%roles.length}setTimeout(type,d)}type();
function render(){$('#pill').innerHTML=secs.map(s=>`<a href="#${s[0]}">${s[lang=='ar'?2:1]}</a>`).join('');
$$('[data-ar]').forEach(e=>{e._e??=e.innerHTML;e.innerHTML=lang=='ar'?e.dataset.ar:e._e});
document.documentElement.dir=lang=='ar'?'rtl':'ltr';$('#lg').textContent=lang=='ar'?'EN':'العربية'}
$('#lg').onclick=()=>{lang=lang=='ar'?'en':'ar';render()};
$('#th').onclick=()=>{const r=document.documentElement;const l=r.dataset.theme=='dark';r.dataset.theme=l?'light':'dark';$('#th').textContent=l?'🌙':'☀️'};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}
function addGem(){}
const GS=['dmd','🎮','dmd','👾','⭐','dmd','🕹️','🍎','dmd','👾','⭐','🎮','dmd','🍇','dmd','🕹️','⭐','dmd'];
GS.forEach((g,i)=>{const d=document.createElement('div');const s=22+Math.random()*30;d.className='gs'+(g=='dmd'?' dmd':'');
if(g=='dmd'){d.style.width=d.style.height=s+'px'}else{d.textContent=g;d.style.fontSize=s+'px'}
d.style.left=(i*5.7+Math.random()*4)%96+'vw';d.style.top=(6+Math.random()*86)+'vh';d.style.animationDelay='-'+Math.random()*7+'s';d.style.animationDuration=(5+Math.random()*5)+'s';document.body.appendChild(d)});

$$('.fl').forEach(f=>f.onclick=e=>{const k=e.target.dataset.k;if(!k)return;f.querySelectorAll('button').forEach(b=>b.classList.remove('on'));e.target.classList.add('on');
f.nextElementSibling.querySelectorAll('[data-k]').forEach(c=>c.classList.toggle('hid',k!='all'&&c.dataset.k!=k))});
$$('.crt img').forEach(i=>i.onclick=()=>{$('#lbi').src=i.src;$('#lb').classList.add('on')});$('#lb').onclick=()=>$('#lb').classList.remove('on');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%')}}),{threshold:.12});$$('.rv').forEach(e=>io.observe(e));
/* Fruit Drops mini game */
const cv=$('#cv'),x=cv.getContext('2d'),W=340,H=440;let it=[],bx=W/2,sc=0,best=0,lives=3,run=false,fr=0;
const F=['🍎','🍊','🍉','🍇','🍓','🍌'];
function hud(){$('#sc').textContent='🍎 '+sc;$('#hs').textContent='🏆 '+best;$('#lv').textContent='❤️'.repeat(Math.max(lives,0))}
function start(){it=[];sc=0;lives=3;run=true;fr=0;hud();loop()}
function mv(cx){const r=cv.getBoundingClientRect();bx=Math.max(35,Math.min(W-35,(cx-r.left)/r.width*W))}
cv.onmousemove=e=>mv(e.clientX);cv.ontouchmove=e=>{mv(e.touches[0].clientX)};
addEventListener('keydown',e=>{if(e.key=='ArrowLeft')bx=Math.max(35,bx-26);if(e.key=='ArrowRight')bx=Math.min(W-35,bx+26)});
cv.onclick=()=>{if(!run)start()};
function loop(){if(!run)return;fr++;x.clearRect(0,0,W,H);
if(fr%Math.max(18,50-sc)==0){const r=Math.random();it.push({x:20+Math.random()*(W-40),y:-20,v:2+Math.random()*1.5+sc/25,t:r<.12?'💎':r<.26?'💣':F[Math.random()*F.length|0]})}
x.font='30px serif';x.textAlign='center';
for(const o of it){o.y+=o.v;x.fillText(o.t,o.x,o.y);
if(o.y>H-52&&o.y<H-10&&Math.abs(o.x-bx)<42){o.d=1;if(o.t=='💣'){lives--;toast('💥 Ouch!')}else if(o.t=='💎'){sc+=5;addGem()}else sc++;hud()}else if(o.y>H+20)o.d=1}
it=it.filter(o=>!o.d);x.font='44px serif';x.fillText('🧺',bx,H-12);
if(lives<=0){run=false;best=Math.max(best,sc);hud();x.fillStyle='#000a';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.font='bold 26px Poppins';x.fillText('Game Over · '+sc,W/2,H/2-6);x.font='16px Poppins';x.fillText('Tap to play again',W/2,H/2+26);return}
requestAnimationFrame(loop)}
x.fillStyle='#fff';x.font='bold 22px Poppins';x.textAlign='center';x.fillText('🍎 Fruit Drops 💎',W/2,H/2-8);x.font='15px Poppins';x.fillText('Tap to start',W/2,H/2+22);
$('#up').onclick=()=>scrollTo({top:0,behavior:'smooth'});addEventListener('scroll',()=>$('#up').classList.toggle('on',scrollY>400));
render();