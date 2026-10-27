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

function addCalendarMonths(date, count) {
  // Clamp to the last valid day instead of allowing Date.setMonth rollover.
  const result = new Date(date);
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + count);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

function updateCounter() {
  // Start: 27 August 2026, 4:21 PM, in the visitor's local time.
  const start = new Date(2026, 7, 27, 16, 21, 0);
  const now = new Date();

  const monthsEl = document.querySelector('#months');
  const daysEl = document.querySelector('#days');
  const hoursEl = document.querySelector('#hours');
  const minutesEl = document.querySelector('#minutes');
  if (!monthsEl || !daysEl || !hoursEl || !minutesEl) return;

  if (now < start) {
    monthsEl.textContent = '0';
    daysEl.textContent = '0';
    hoursEl.textContent = '0';
    minutesEl.textContent = '0';
    return;
  }

  let months = (now.getFullYear() - start.getFullYear()) * 12
    + now.getMonth() - start.getMonth();
  let anchor = addCalendarMonths(start, months);

  if (anchor > now) {
    months -= 1;
    anchor = addCalendarMonths(start, months);
  }

  // Calculate the remaining time after full calendar months.
  let remainingMs = now - anchor;
  const days = Math.floor(remainingMs / 86400000);
  remainingMs -= days * 86400000;
  const hours = Math.floor(remainingMs / 3600000);
  remainingMs -= hours * 3600000;
  const minutes = Math.floor(remainingMs / 60000);

  monthsEl.textContent = months;
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
}

updateCounter();
setInterval(updateCounter, 1000);
