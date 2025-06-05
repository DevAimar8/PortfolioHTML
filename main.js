document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTop';
  scrollBtn.setAttribute('aria-label', 'Volver arriba');
  scrollBtn.textContent = '↑';
  Object.assign(scrollBtn.style, {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#5b21b6',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    display: 'none',
    zIndex: '999',
    transition: 'opacity 0.3s ease'
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.will-fade, section, .project-card').forEach(el => {
    el.classList.add('will-fade');
    observer.observe(el);
  });

  // Project card interactivity
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.03)';
      card.style.transition = 'transform 0.25s ease-in-out';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
    card.addEventListener('mousedown', () => {
      card.style.boxShadow = '0 6px 15px rgba(0,0,0,0.25)';
    });
    card.addEventListener('mouseup', () => {
      setTimeout(() => card.style.boxShadow = '', 150);
    });
  });

  // Theme toggle
  const themeToggle = document.createElement('button');
  themeToggle.id = 'themeToggle';
  themeToggle.setAttribute('aria-label', 'Cambiar tema');
  themeToggle.textContent = '🌓';
  Object.assign(themeToggle.style, {
    position: 'fixed',
    bottom: '1.5rem',
    left: '1.5rem',
    padding: '0.6rem',
    fontSize: '1.2rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#374151',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    zIndex: '999'
  });
  document.body.appendChild(themeToggle);

  const setTheme = mode => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  themeToggle.addEventListener('click', toggleTheme);

  // Load saved or system theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  // Listen for system theme change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed') || 0.5);
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  });

  // Typewriter animation fallback
  const h1 = document.querySelector('.hero h1');
  if (h1 && !h1.classList.contains('typed')) {
    const text = h1.textContent.trim();
    h1.textContent = '';
    h1.classList.add('typed');
    let i = 0;
    const typing = () => {
      if (i < text.length) {
        h1.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 75);
      }
    };
    typing();
  }

  // Initial load animation for body
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 1s ease-in-out';
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);
});
