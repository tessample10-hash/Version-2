// Fade-in IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fade only once
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
});
