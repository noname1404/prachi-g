const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');

if (envelope && letter) {
  envelope.addEventListener('click', () => {
    const open = envelope.getAttribute('aria-expanded') === 'true';
    envelope.setAttribute('aria-expanded', String(!open));
    letter.setAttribute('aria-hidden', String(open));
    envelope.closest('.envelope-stage').classList.toggle('opened', !open);
    letter.classList.toggle('revealed', !open);
    envelope.querySelector('.seal').textContent = open ? 'Open Me' : 'With love ♡';
  });
}

const rain = document.querySelector('.heart-rain');
const hearts = ['♥', '♡', '❤', '♥', '♡'];

if (rain) {
  for (let i = 0; i < 38; i++) {
    const heart = document.createElement('span');
    heart.textContent = hearts[i % hearts.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    heart.style.setProperty('--size', `${12 + Math.random() * 24}px`);
    heart.style.setProperty('--duration', `${7 + Math.random() * 10}s`);
    heart.style.setProperty('--delay', `${-Math.random() * 16}s`);
    rain.appendChild(heart);
  }
}

function updateCounter() {
  // Local device time: 27 August 2026, 4:21 PM.
  const start = new Date(2026, 7, 27, 16, 21, 0);
  const now = new Date();

  if (now < start) {
    document.querySelector('#months').textContent = '0';
    document.querySelector('#days').textContent = '0';
    document.querySelector('#minutes').textContent = '0';
    return;
  }

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() - start.getMonth();

  // Use a safe calendar-month calculation for the anniversary date.
  const anniversary = new Date(start);
  anniversary.setMonth(start.getMonth() + months);
  if (anniversary > now) months--;

  const anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);

  const elapsedFromAnchor = now - anchor;
  const days = Math.floor(elapsedFromAnchor / 86400000);
  const totalMinutes = Math.floor((now - start) / 60000);

  document.querySelector('#months').textContent = months;
  document.querySelector('#days').textContent = days;
  document.querySelector('#minutes').textContent = totalMinutes.toLocaleString();
}

updateCounter();
setInterval(updateCounter, 60000);
