// ===== Theme toggle (day / night) =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('site-theme', theme);
}

(function initTheme(){
  const saved = localStorage.getItem('site-theme');
  if(saved){
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Back to top =====
const backToTop = document.getElementById('backToTop');
if(backToTop){
  backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.section, .hero-card, .hero-copy');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.08});

revealEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  io.observe(el);
});

// Make hero visible immediately (avoid blank first paint on slow observers)
window.addEventListener('load', () => {
  document.querySelector('.hero-card').style.opacity = 1;
  document.querySelector('.hero-card').style.transform = 'translateY(0)';
  document.querySelector('.hero-copy').style.opacity = 1;
  document.querySelector('.hero-copy').style.transform = 'translateY(0)';
});
