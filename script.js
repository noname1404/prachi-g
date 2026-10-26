const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');
envelope.addEventListener('click', () => {
  const open = envelope.getAttribute('aria-expanded') === 'true';
  envelope.setAttribute('aria-expanded', String(!open));
  envelope.closest('.envelope-stage').classList.toggle('opened', !open);
  letter.classList.toggle('revealed', !open);
  envelope.querySelector('.seal').textContent = open ? 'Open Me' : 'With love ♡';
});

const rain = document.querySelector('.heart-rain');
const hearts = ['♥', '♡', '❤', '♥', '♡'];
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

function updateCounter() {
  const start = new Date('2026-03-15T00:00:00');
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months--;
  const anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);
  const remainder = Math.max(0, now - anchor);
  document.querySelector('#months').textContent = months;
  document.querySelector('#days').textContent = Math.floor(remainder / 86400000);
  document.querySelector('#minutes').textContent = Math.floor(remainder / 60000) % 60;
}
updateCounter(); setInterval(updateCounter, 60000);
