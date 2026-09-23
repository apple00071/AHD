document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STICKY HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // ==========================================
  // 2. LAUNCH NEWSLETTER FORM & VALIDATION
  // ==========================================
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('subscribe-email');
  const submitBtn = document.getElementById('subscribe-submit-btn');
  const feedbackEl = document.getElementById('form-feedback');

  if (form && emailInput && feedbackEl && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailValue = emailInput.value.trim();
      feedbackEl.className = 'form-feedback';
      feedbackEl.innerText = '';

      // RFC-compliant email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue) {
        feedbackEl.classList.add('error');
        feedbackEl.innerText = 'Please enter your email address.';
        triggerShake(form);
        emailInput.focus();
        return;
      }

      if (!emailRegex.test(emailValue)) {
        feedbackEl.classList.add('error');
        feedbackEl.innerText = 'Please enter a valid email address.';
        triggerShake(form);
        emailInput.focus();
        return;
      }

      // Submit to Web3Forms API
      setLoadingState(true);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'cfb9a49a-fb96-405c-8472-e48b5ab57229',
          email: emailValue,
          subject: 'New Launch Subscriber - Apple Home Decors',
          from_name: 'Apple Home Decors Website'
        })
      })
      .then(async (response) => {
        const json = await response.json();
        setLoadingState(false);

        if (response.status === 200 && json.success) {
          feedbackEl.className = 'form-feedback success';
          feedbackEl.innerText = "✨ Thank you! You've been registered for launch updates.";
          emailInput.value = '';

          const inputGroup = form.querySelector('.input-group');
          if (inputGroup) {
            inputGroup.style.borderColor = '#059669';
            setTimeout(() => {
              inputGroup.style.borderColor = '';
            }, 4000);
          }
        } else {
          feedbackEl.className = 'form-feedback error';
          feedbackEl.innerText = json.message || 'Something went wrong. Please try again.';
          triggerShake(form);
        }
      })
      .catch(() => {
        setLoadingState(false);
        feedbackEl.className = 'form-feedback error';
        feedbackEl.innerText = 'Unable to connect. Please check your network and try again.';
        triggerShake(form);
      });
    });
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      emailInput.disabled = true;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
      submitBtn.querySelector('span').innerText = 'Subscribing...';
      const icon = submitBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-circle-notch fa-spin';
    } else {
      emailInput.disabled = false;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.querySelector('span').innerText = 'Notify Me';
      const icon = submitBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-arrow-right';
    }
  }

  function triggerShake(element) {
    const inputGroup = element.querySelector('.input-group') || element;
    inputGroup.style.transition = 'transform 0.08s ease';
    inputGroup.style.transform = 'translateX(-8px)';
    setTimeout(() => { inputGroup.style.transform = 'translateX(8px)'; }, 80);
    setTimeout(() => { inputGroup.style.transform = 'translateX(-5px)'; }, 160);
    setTimeout(() => { inputGroup.style.transform = 'translateX(5px)'; }, 240);
    setTimeout(() => { inputGroup.style.transform = 'translateX(0)'; }, 320);
  }

  // ==========================================
  // 3. SMOOTH SCROLLING FOR NAV ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
