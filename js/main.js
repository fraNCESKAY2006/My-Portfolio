// Simple 3D starfield effect for hero background
const canvas = document.getElementById('bg-stars');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w = window.innerWidth, h = 400;

  function resize() {
    canvas.width = w = window.innerWidth;
    canvas.height = h = 400;
  }
  window.addEventListener('resize', resize);
  resize();

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * w,
        o: 0.2 + Math.random() * 0.8
      });
    }
  }
  createStars(200);
  function drawStars() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
      let k = 130 / s.z;
      let px = s.x * k + w/2;
      let py = s.y * k + h/2;
      if (px < 0 || px >= w || py < 0 || py >= h) continue;
      let size = (1 - s.z / w) * 2.5;
      ctx.fillStyle = `rgba(180,175,255,${s.o})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI*2);
      ctx.fill();
    }
  }
  function animateStars() {
    for (let i = 0; i < stars.length; i++) {
      stars[i].z -= 2;
      if (stars[i].z <= 1) {
        stars[i].z = w;
      }
    }
    drawStars();
    requestAnimationFrame(animateStars);
  }
  animateStars();
}

// Scroll reveal animations for sections
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
  let trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const box = sec.getBoundingClientRect();
    if(box.top < trigger) {
      sec.classList.add("visible");
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// 3D-like effect for skill/project cards on hover
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `perspective(800px) rotateY(${x/16}deg) rotateX(${-y/16}deg) scale(1.06)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = "";
  });
});

// Contact form validation/feedback
const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      alert('Thank you! Your message has been sent. I will get back to you soon.');
      form.reset();
    } else {
      alert('Oops! There was a problem sending your message.');
    }
  });