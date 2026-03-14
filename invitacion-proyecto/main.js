// Splash screen → envelope → music
let musicMuted = false;

function openInvitation(){
  const splash = document.getElementById('splashScreen');
  splash.classList.add('closed');
  // Start music via YouTube API
  const player = document.getElementById('ytPlayer');
  player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  // Show mute button
  document.getElementById('musicToggle').classList.add('visible');
}

function toggleMusic(){
  musicMuted = !musicMuted;
  const player = document.getElementById('ytPlayer');
  const cmd = musicMuted ? 'mute' : 'unMute';
  player.contentWindow.postMessage('{"event":"command","func":"'+cmd+'","args":""}', '*');
  document.getElementById('iconSoundOn').style.display = musicMuted ? 'none' : 'block';
  document.getElementById('iconSoundOff').style.display = musicMuted ? 'block' : 'none';
}

// Envelope open animation
let envelopeOpened = false;
function openEnvelope(){
  if(envelopeOpened) return;
  envelopeOpened = true;
  const overlay = document.getElementById('envelopeOverlay');
  overlay.classList.add('opened');
  setTimeout(()=>{
    overlay.classList.add('fade-out');
    document.body.style.overflow = '';
  }, 800);
}
// Block scroll while envelope/splash is visible
document.body.style.overflow = 'hidden';

const wedding = new Date('2026-06-20T18:00:00');
function tick(){
  const diff = wedding - new Date();
  if(diff <= 0){['dd','hh','mm','ss'].forEach(id=>document.getElementById(id).textContent='00');return}
  document.getElementById('dd').textContent = String(Math.floor(diff/86400000)).padStart(3,'0');
  document.getElementById('hh').textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
  document.getElementById('mm').textContent = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  document.getElementById('ss').textContent = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
}
tick(); setInterval(tick,1000);

function toggleAcc(header){
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.acc-arrow');
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)} });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Staggered scroll reveal for timeline items
const tlObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('tl-in');
      tlObs.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.tl-reveal').forEach((el,i)=>{
  el.style.transitionDelay = (i * 0.15) + 's';
  tlObs.observe(el);
});