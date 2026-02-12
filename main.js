/* Config */
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

/* Navigation Bar */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const navbarHeightRem = 6;
    const navbarHeight = navbarHeightRem * rootFontSize;

    const targetRect = target.getBoundingClientRect();
    const targetY = targetRect.top + window.pageYOffset - navbarHeight;

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 1000;
    let startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  });
});


window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  window.scrollY > 50 ?
  navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)' :
  navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)' ;
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

/* Home */
const typedSpan = document.querySelector('.typed');
const cursor = document.querySelector('.cursor');

const initialText = 'Hello,';
const finalText = "I'm a Full-Stack<br>Roblox Developer";
let index = 0;

function type(text, callback) {
  if (index < text.length) {
    if (text[index] === '<') {
      const tagEnd = text.indexOf('>', index);
      typedSpan.innerHTML += text.slice(index, tagEnd + 1);
      index = tagEnd + 1;
    } else {
      typedSpan.innerHTML += text[index];
      index++;
    }
    setTimeout(() => type(text, callback), 100);
  } else {
    setTimeout(callback, 700);
  }
}

function erase(callback) {
  const html = typedSpan.innerHTML;
  if (html.length > 0) {
    typedSpan.innerHTML = html.slice(0, -1);
    setTimeout(() => erase(callback), 100);
  } else {
    callback();
  }
}

type(initialText, () => {
  erase(() => {
    index = 0;
    type(finalText, () => {
      cursor.classList.add('blink');
    });
  });
});

/* Contact Button */
const button = document.querySelector('.cta-button');

if (!isMobile()) {
    const startGradient = [89, 198, 255];
    const endGradient = [0, 102, 255];
    let animationFrame;
    let progress = 0;
    let direction = 1;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function animateGradient() {
        const r = Math.round(lerp(startGradient[0], endGradient[0], progress));
        const g = Math.round(lerp(startGradient[1], endGradient[1], progress));
        const b = Math.round(lerp(startGradient[2], endGradient[2], progress));
        button.style.background = `linear-gradient(45deg, rgb(${r},${g},${b}), #0066ff)`;
    }

    function step() {
        progress += direction * 0.02;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;
        animateGradient();
        if ((direction === 1 && progress < 1) || (direction === -1 && progress > 0)) {
            animationFrame = requestAnimationFrame(step);
        }
    }

    button.addEventListener('mouseenter', () => {
        direction = 1;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(step);
    });

    button.addEventListener('mouseleave', () => {
        direction = -1;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(step);
    });
}

/* Skill and Project Cards */
if (isMobile()) {
  const hoverElements = document.querySelectorAll('.skill-card, .project-card');

  hoverElements.forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.add('hover');
    });

    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('hover'), 400);
    });
  });
}

/* Fade Animation */
const fadeSections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.1 }
);

fadeSections.forEach(section => observer.observe(section));

/* Info Accordion */
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

function setAccordionItemState(item, shouldOpen) {
  const trigger = item.querySelector('.accordion-trigger');
  const content = item.querySelector('.accordion-content');
  const icon = item.querySelector('.accordion-icon');

  if (!trigger || !content || !icon) return;

  item.classList.toggle('is-open', shouldOpen);
  trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  icon.textContent = shouldOpen ? '−' : '+';
  content.style.opacity = shouldOpen ? '1' : '0';
  content.style.maxHeight = shouldOpen ? `${content.scrollHeight}px` : '0px';
}

accordionTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const card = trigger.closest('.info-card');
    if (!item || !card) return;

    const isOpening = !item.classList.contains('is-open');

    card.querySelectorAll('.accordion-item').forEach(sibling => {
      setAccordionItemState(sibling, false);
    });

    setAccordionItemState(item, isOpening);
  });
});

document.querySelectorAll('.info-card .accordion-item').forEach(item => {
  const shouldOpen = item.classList.contains('is-open');
  setAccordionItemState(item, shouldOpen);
});

/* Skill Details Toggle */
const skillToggles = document.querySelectorAll('.skill-toggle');

function setSkillDetailState(card, shouldOpen) {
  const toggle = card.querySelector('.skill-toggle');
  const extra = card.querySelector('.skill-extra');

  if (!toggle || !extra) return;

  card.classList.toggle('is-open', shouldOpen);
  toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  toggle.textContent = shouldOpen ? 'Hide details' : 'Show details';
  extra.style.opacity = shouldOpen ? '1' : '0';
  extra.style.maxHeight = shouldOpen ? `${extra.scrollHeight}px` : '0px';
}

skillToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.skill-card');
    if (!card) return;

    const shouldOpen = !card.classList.contains('is-open');
    setSkillDetailState(card, shouldOpen);
  });
});

document.querySelectorAll('.skill-card').forEach(card => {
  setSkillDetailState(card, false);
});

/* Contact Interactions */
const contactCopyButtons = document.querySelectorAll('.contact-copy');

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  tempInput.remove();
}

contactCopyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    if (!value) return;

    const initialLabel = button.textContent;

    try {
      await copyToClipboard(value);
      button.textContent = 'Copied!';
      button.classList.add('copied');
    } catch {
      button.textContent = 'Failed';
    }

    setTimeout(() => {
      button.textContent = initialLabel;
      button.classList.remove('copied');
    }, 1300);
  });
});

const inquiryItemToggles = document.querySelectorAll('.inquiry-item-toggle');

function setInquiryItemState(item, shouldOpen) {
  const toggle = item.querySelector('.inquiry-item-toggle');
  const content = item.querySelector('.inquiry-item-content');

  if (!toggle || !content) return;

  item.classList.toggle('is-open', shouldOpen);
  toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  content.style.maxHeight = shouldOpen ? `${content.scrollHeight}px` : '0px';
}

inquiryItemToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item = toggle.closest('.inquiry-item');
    if (!item) return;

    const shouldOpen = !item.classList.contains('is-open');
    setInquiryItemState(item, shouldOpen);
  });
});

document.querySelectorAll('.inquiry-item').forEach(item => {
  setInquiryItemState(item, false);
});