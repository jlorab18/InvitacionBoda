// Splash screen → envelope → music (YouTube IFrame Player API)
let musicMuted = false;
let ytReady = false;
let ytPlayer = null;
let pendingPlay = false;

// Called automatically by YouTube IFrame API when ready
function onYouTubeIframeAPIReady(){
  ytPlayer = new YT.Player('ytPlayer', {
    height:'1', width:'1',
    videoId:'cNGjD0VG4R8',
    playerVars:{
      autoplay:0,
      loop:1,
      playlist:'cNGjD0VG4R8',
      controls:0,
      playsinline:1
    },
    events:{
      onReady:function(){ ytReady = true; if(pendingPlay) ytPlayer.playVideo(); }
    }
  });
}

function openInvitation(){
  // Start music immediately from user gesture (works on iOS)
  if(ytReady && ytPlayer){
    ytPlayer.playVideo();
  } else {
    pendingPlay = true;
  }
  document.getElementById('musicToggle').classList.add('visible');
  // Fade out splash after a brief moment so music starts first
  setTimeout(function(){
    document.getElementById('splashScreen').classList.add('closed');
  }, 300);
}

function toggleMusic(){
  if(!ytPlayer) return;
  musicMuted = !musicMuted;
  if(musicMuted){ ytPlayer.mute(); } else { ytPlayer.unMute(); }
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