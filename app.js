document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. NEWSLETTER FORM VALIDATION & SIGNUP
  // ==========================================
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('subscribe-email');
  const submitBtn = document.getElementById('subscribe-submit-btn');
  const feedbackEl = document.getElementById('form-feedback');

  if (form && emailInput && feedbackEl && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailValue = emailInput.value.trim();
      feedbackEl.className = 'form-message'; // Reset classes
      feedbackEl.innerText = '';
      
      // Simple regex for basic email verification
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailValue) {
        feedbackEl.classList.add('error');
        feedbackEl.innerText = 'Please enter your email address.';
        triggerShake(form);
        return;
      }
      
      if (!emailRegex.test(emailValue)) {
        feedbackEl.classList.add('error');
        feedbackEl.innerText = 'Please enter a valid email address.';
        triggerShake(form);
        return;
      }
      
      // Simulate network request (visual premium feedback)
      setLoadingState(true);
      
      setTimeout(() => {
        setLoadingState(false);
        feedbackEl.classList.add('success');
        feedbackEl.innerText = "Thank you! You've been registered for exclusive previews.";
        
        // Clear input field
        emailInput.value = '';
        
        // Add a nice visual success pulse to form
        form.style.borderColor = '#10b981';
        setTimeout(() => {
          form.style.borderColor = '';
        }, 3000);
        
      }, 1500);
    });
  }

  // UI state management helper
  function setLoadingState(isLoading) {
    if (isLoading) {
      emailInput.disabled = true;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.querySelector('span').innerText = 'Sending...';
      submitBtn.querySelector('i').className = 'fa-solid fa-spinner fa-spin';
    } else {
      emailInput.disabled = false;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.querySelector('span').innerText = 'Notify Me';
      submitBtn.querySelector('i').className = 'fa-solid fa-arrow-right';
    }
  }

  // Subtle error animation: shakes the form container
  function triggerShake(element) {
    element.style.transform = 'translateX(-10px)';
    setTimeout(() => { element.style.transform = 'translateX(10px)'; }, 100);
    setTimeout(() => { element.style.transform = 'translateX(-6px)'; }, 200);
    setTimeout(() => { element.style.transform = 'translateX(6px)'; }, 300);
    setTimeout(() => { element.style.transform = 'translateX(0)'; }, 400);
  }

  // ==========================================
  // 3. OPTIONAL HOVER EFFECT FOR SERVICES CARDS
  // ==========================================
  const cards = document.querySelectorAll('.preview-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.preview-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.preview-icon i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
});
