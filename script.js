const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {nav.classList.remove('open');menuButton.setAttribute('aria-expanded', 'false');}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});
const progress=document.querySelector('.reading-progress');
const chapters=[...document.querySelectorAll('.chapter, #resources')];
const links=[...nav.querySelectorAll('a')];
let scheduled=false;
function updateReading(){
  const total=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${total>0?Math.min(100,Math.max(0,window.scrollY/total*100)):0}%`;
  let current='';
  for(const chapter of chapters){if(chapter.getBoundingClientRect().top<=window.innerHeight*.35)current=chapter.id;}
  for(const link of links){const active=link.hash===`#${current}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
  scheduled=false;
}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateReading);}},{passive:true});
window.addEventListener('resize',updateReading);updateReading();
const dialog=document.querySelector('.photo-dialog');
const dialogImage=dialog.querySelector('img');
let previousOverflow='';
for(const button of document.querySelectorAll('.photo-open'))button.addEventListener('click',()=>{
  dialogImage.src=button.dataset.image;dialogImage.alt=button.dataset.caption;
  document.querySelector('#photo-caption').textContent=button.dataset.caption;
  previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();
});
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;});

const qrDialog=document.querySelector('.qr-dialog');
for(const button of document.querySelectorAll('.qr-toggle'))button.addEventListener('click',()=>{
 document.querySelector('#qr-title').textContent=button.dataset.title;
 const img=qrDialog.querySelector('img');img.src=button.dataset.qr;img.alt=button.dataset.title+' 접속 QR 코드';
 previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';qrDialog.showModal();
});
qrDialog.querySelector('.dialog-close').addEventListener('click',()=>qrDialog.close());
qrDialog.addEventListener('click',event=>{const r=qrDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)qrDialog.close();});
qrDialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;});
