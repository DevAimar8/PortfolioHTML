// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Scroll-based animation using IntersectionObserver ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .proyecto, .habilidad').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// === Inject animation CSS dynamically ===
const style = document.createElement('style');
style.innerHTML = `
  .hidden { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// === Scroll to top button ===
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Language toggle ===
const langToggle = document.createElement('button');
langToggle.textContent = "EN";
langToggle.className = 'btn';
langToggle.style.position = 'fixed';
langToggle.style.top = '20px';
langToggle.style.right = '20px';
langToggle.style.zIndex = '1000';
document.body.appendChild(langToggle);

// Diccionario de traducción
const translations = {
  es: {
    headerText: "Desarrollador de aplicaciones multiplataforma especializado en Big Data e Inteligencia Artificial.",
    sobreMi: "Sobre Mí",
    trayectoria: "Mi Trayectoria",
    contacto: "Contacto",
    proyectos: "Proyectos Destacados",
    habilidades: "Tecnologías y Habilidades"
  },
  en: {
    headerText: "Cross-platform application developer specialized in Big Data and Artificial Intelligence.",
    sobreMi: "About Me",
    trayectoria: "My Journey",
    contacto: "Contact",
    proyectos: "Featured Projects",
    habilidades: "Technologies & Skills"
  }
};

let currentLang = 'es';
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';

  const t = translations[currentLang];
  document.querySelector('header p').textContent = t.headerText;
  document.querySelector('#sobre-mi h2').textContent = t.sobreMi;
  document.querySelector('#trayectoria h2').textContent = t.trayectoria;
  document.querySelector('#contacto h2').textContent = t.contacto;
  document.querySelector('#proyectos h2').textContent = t.proyectos;
  document.querySelector('#habilidades h2').textContent = t.habilidades;
});

// === Highlight active section in menu ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === Custom floating message for "Disponible" button ===
const availableBtn = document.querySelector('.available');
if (availableBtn) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>✅ ¡Estoy disponible!</strong><br>¿Tienes un proyecto interesante? Escríbeme.`;
  Object.assign(msg.style, {
    position: 'fixed',
    bottom: '90px',
    right: '30px',
    background: '#00ff88',
    color: '#000',
    padding: '15px 20px',
    borderRadius: '12px',
    fontWeight: 'bold',
    boxShadow: '0 0 15px rgba(0,255,136,0.5)',
    display: 'none',
    zIndex: 999
  });
  document.body.appendChild(msg);

  availableBtn.addEventListener('click', () => {
    msg.style.display = 'block';
    setTimeout(() => {
      msg.style.display = 'none';
    }, 4000);
  });
}
