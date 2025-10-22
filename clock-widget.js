function pad(n){ return String(n).padStart(2,'0'); }

function flip(card,newVal){
  const current = card.querySelector('.number');
  if(current.textContent === newVal) return;

  const flipEl = document.createElement('div');
  flipEl.textContent = newVal;
  flipEl.style.position = 'absolute';
  flipEl.style.top = '0';
  flipEl.style.left = '0';
  flipEl.style.width = '100%';
  flipEl.style.height = '100%';
  flipEl.style.display = 'flex';
  flipEl.style.justifyContent = 'center';
  flipEl.style.alignItems = 'center';
  flipEl.style.fontSize = '50px';
  flipEl.style.fontWeight = 'bold';
  flipEl.style.background = 'rgb(237, 176, 245)';
  flipEl.style.color = '#fff';
  flipEl.style.borderRadius = '10px';
  flipEl.style.backfaceVisibility = 'hidden';
  flipEl.style.transform = 'rotateX(90deg)';
  flipEl.style.zIndex = '2';
  card.appendChild(flipEl);

  flipEl.animate([
    { transform: 'rotateX(90deg)' },
    { transform: 'rotateX(0deg)' }
  ], { duration: 500, fill: 'forwards' });

  setTimeout(()=>{
    current.textContent = newVal;
    card.removeChild(flipEl);
  },500);
}

let lastH='', lastM='', lastS='';

function updateClock(){
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ampm = h>=12?'PM':'AM';
  h = h%12 || 12;

  const days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const day = days[now.getDay()];

  document.getElementById('ampm').textContent = ampm;
  document.getElementById('day').textContent = day;

  const hourStr = pad(h);
  const minStr = pad(m);
  const secStr = pad(s);

  if(hourStr!==lastH){ flip(document.getElementById('hours'),hourStr); lastH=hourStr; }
  if(minStr!==lastM){ flip(document.getElementById('minutes'),minStr); lastM=minStr; }
  if(secStr!==lastS){ flip(document.getElementById('seconds'),secStr); lastS=secStr; }
}

updateClock();
setInterval(updateClock,1000);