document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // 1. STICKY HEADER & SCROLL STATE
  // ===================================================================
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ===================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ===================================================================
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (menuToggleBtn && mobileNavDrawer) {
    const openDrawer = () => {
      mobileNavDrawer.classList.add('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    menuToggleBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

    // Close when clicking any nav link in drawer
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ===================================================================
  // 3. SMOOTH SCROLL FOR INTERNAL ANCHORS
  // ===================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================================================
  // 4. INTERACTIVE BEFORE & AFTER TRANSFORMATION SLIDER
  // ===================================================================
  const baSlider = document.getElementById('ba-slider');
  const baBeforeLayer = document.getElementById('ba-before-layer');
  const baBeforeImg = document.getElementById('ba-before-img');
  const baHandle = document.getElementById('ba-handle');
  const baRangeInput = document.getElementById('ba-range-input');

  if (baSlider && baBeforeLayer && baHandle && baRangeInput) {
    const updateSlider = (percent) => {
      const clamped = Math.max(0, Math.min(100, percent));
      baBeforeLayer.style.width = `${clamped}%`;
      baHandle.style.left = `${clamped}%`;

      // Keep before image fixed width to match parent container
      if (baBeforeImg) {
        baBeforeImg.style.width = `${baSlider.offsetWidth}px`;
      }
    };

    // Range input change
    baRangeInput.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    // Window resize to maintain correct image alignment
    window.addEventListener('resize', () => {
      updateSlider(baRangeInput.value);
    });

    // Initial positioning
    updateSlider(50);
  }

  // ===================================================================
  // 5. MATERIAL SWATCH VISUALIZER & LOOKBOOK MODAL
  // ===================================================================
  const swatchDataset = {
    'belgian-linen': {
      title: 'Belgian Cascading Linen',
      category: 'curtains',
      tag: 'Pure Belgian Linen',
      image: 'assets/swatch_linen.jpg',
      desc: 'Woven from premium natural flax fibers in Belgium. Unmatched natural drape, soft slub texture, and gentle light filtering that elevates living rooms and bedrooms into tranquil sanctuaries.',
      specs: {
        'Composition': '100% Belgian Natural Flax Linen',
        'Fabric Weight': '340 GSM Heavy Artisanal Weave',
        'Recommended Pleat': 'Ripplefold & Triple Pinch Pleat',
        'Light Filtration': 'Soft Ambient Diffusion (Privacy Preserving)',
        'Motorization': 'Compatible with Somfy & Silent Gliss'
      }
    },
    'gold-relief-wallpaper': {
      title: 'Botanical Relief Mural',
      category: 'wallpapers',
      tag: 'Embossed Gold Leaf',
      image: 'assets/swatch_wallpaper.jpg',
      desc: 'Tactile relief wallcovering with hand-embossed botanical floral scrollwork and subtle antique champagne gold shimmer accents. Transforms master bedroom accent walls and dining salons into works of art.',
      specs: {
        'Substrate': 'Non-Woven Heavyweight Fiber Base',
        'Finish': 'Matte Embossed Relief with Gold Foil Leaf',
        'Care': 'Spongeable & Mild Scrub Resistant',
        'Origin': 'Artisan European Studio Mill',
        'Installation': 'Seamless Edge Alignment by AHD Technicians'
      }
    },
    'italian-travertine': {
      title: 'Honed Roman Travertine',
      category: 'artifacts',
      tag: 'Natural Limestone',
      image: 'assets/swatch_travertine.jpg',
      desc: 'Carved natural Italian travertine limestone featuring open porous veining and a smooth, silky honed matte touch. Used for our statement centerpieces, console vessels, and sculptural pedestals.',
      specs: {
        'Material': '100% Natural Honed Travertine',
        'Color Tone': 'Warm Cream / Alabaster Earth',
        'Surface': 'Sealed Matte Honed (Stain Resistant)',
        'Crafting': 'Hand-Sculpted & Polished Edges',
        'Styling': 'Console, Coffee Table, or Credenza Focal'
      }
    },
    'terracotta-boucle': {
      title: 'Terracotta Fleck Bouclé',
      category: 'cushions',
      tag: 'Textured Bouclé',
      image: 'assets/swatch_boucle.jpg',
      desc: 'High-comfort textured bouclé woven with looped wool yarns in alabaster cream and warm terracotta flecks. Created to provide tactile warmth and tactile contrast on modern sofas.',
      specs: {
        'Composition': 'Wool-Cotton Textured Bouclé Blend',
        'Fabric Weight': '520 GSM High-Density Weft',
        'Insert': 'Hypoallergenic Down-Blend Plush Core',
        'Closure': 'Concealed YKK Antique Brass Zipper',
        'Sizes Available': '20"x20", 22"x22", 14"x24" Lumbar'
      }
    },
    'ripplefold-sheer': {
      title: 'Triple-Pinch Champagne Drape',
      category: 'curtains',
      tag: 'Architectural Sheer',
      image: 'assets/curtains.jpg',
      desc: 'Floor-to-ceiling sheer cascading panels designed specifically for tall architectural windows. Perfectly uniform ripple waves create an airy, grand presence that softens exterior sunlight.',
      specs: {
        'Drop Length': 'Custom up to 24 ft Double Height',
        'Light Transmission': '75% Daylight Permeable',
        'Hem Details': 'Hand-Turned 4-Inch Weighted Hem',
        'Track Systems': 'Concealed Ceiling Recessed or Decorative Rod',
        'Operation': 'Smart Remote, App, or Manual Draw'
      }
    },
    'designer-damask': {
      title: 'Artisan Textured Silk Wall',
      category: 'wallpapers',
      tag: 'Textile Wallcovering',
      image: 'assets/wallpapers.jpg',
      desc: 'A luminous wallcovering combining tactile vertical silk threads with subtle metallic shimmer. Engineered to absorb room echo while casting a warm golden glow under architectural lighting.',
      specs: {
        'Width': '90 cm Extra-Wide Architectural Roll',
        'Acoustics': 'Sound-Dampening Textile Backing',
        'Fire Rating': 'Class A Flame Retardant Certified',
        'Pattern Match': 'Straight Match 64 cm Repeat',
        'Application': 'Penthouses, Home Theatres & Master Suites'
      }
    },
    'sculptural-artifacts': {
      title: 'Brushed Brass & Marble Objects',
      category: 'artifacts',
      tag: 'Limited Edition',
      image: 'assets/artifacts.jpg',
      desc: 'Sculptural objects forged in solid brass with warm brushed satin finishing, paired with carved marble bases. Designed to catch light and anchor living room focal points.',
      specs: {
        'Materials': 'Solid Brass & Selected Natural Marbles',
        'Finishes': 'Brushed Satin Gold, Antiqued Bronze',
        'Weight': 'Substantial Solid Core (4 to 9 kg)',
        'Exclusivity': 'Numbered Studio Production',
        'Care': 'Treated with Microcrystalline Wax'
      }
    },
    'velvet-cushions': {
      title: 'Sage & Terracotta Velvet Set',
      category: 'cushions',
      tag: 'Pure Cotton Velvet',
      image: 'assets/cushions.jpg',
      desc: 'Plush velvet cushions tailored with tailored self-flange edges in muted olive sage and deep warm terracotta rust. Coordinates effortlessly with both dark and light interior palettes.',
      specs: {
        'Fabric': '100% Pure Long-Staple Cotton Velvet',
        'Handfeel': 'Silky, Deep Pile Non-Crush Finish',
        'Inserts': 'Premium Hungarian Goose Down & Feathers',
        'Maintenance': 'Dry Clean Only for Lasting Sheen',
        'Custom Options': 'Monogramming & Custom Piping Available'
      }
    }
  };

  // Filter Tabs
  const filterBtns = document.querySelectorAll('.swatch-tab-btn');
  const swatchCards = document.querySelectorAll('.swatch-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      swatchCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lookbook Modal Elements
  const lookbookModal = document.getElementById('lookbook-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecList = document.querySelector('.modal-spec-list');
  const modalWhatsappCta = document.getElementById('modal-whatsapp-cta');
  const modalBookCta = document.getElementById('modal-book-cta');

  const openLookbookModal = (swatchId) => {
    const data = swatchDataset[swatchId];
    if (!data || !lookbookModal) return;

    if (modalImg) modalImg.src = data.image;
    if (modalTag) modalTag.innerText = data.tag;
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalDesc) modalDesc.innerText = data.desc;

    // Build specs list
    if (modalSpecList && data.specs) {
      modalSpecList.innerHTML = '';
      Object.entries(data.specs).forEach(([label, value]) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="spec-label">${label}</span><span class="spec-value">${value}</span>`;
        modalSpecList.appendChild(li);
      });
    }

    // Set WhatsApp inquiry link
    if (modalWhatsappCta) {
      const waText = encodeURIComponent(`Hello Apple Home Decors, I would like to inquire about the ${data.title} (${data.tag}) sample.`);
      modalWhatsappCta.href = `https://wa.me/919161191699?text=${waText}`;
    }

    lookbookModal.classList.add('open');
    lookbookModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLookbookModal = () => {
    if (!lookbookModal) return;
    lookbookModal.classList.remove('open');
    lookbookModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Card click triggers
  swatchCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openLookbookModal(id);
    });
  });

  // Pillar "Inspect Swatches" triggers
  document.querySelectorAll('[data-open-swatch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const swatchType = btn.getAttribute('data-open-swatch');
      // Scroll to swatches section and activate matching filter tab
      const swatchesSection = document.getElementById('swatches');
      if (swatchesSection) {
        swatchesSection.scrollIntoView({ behavior: 'smooth' });
      }
      const matchingTab = document.querySelector(`.swatch-tab-btn[data-filter="${swatchType}"]`);
      if (matchingTab) {
        matchingTab.click();
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeLookbookModal);
  }

  if (modalBookCta) {
    modalBookCta.addEventListener('click', closeLookbookModal);
  }

  // Close on backdrop click
  if (lookbookModal) {
    lookbookModal.addEventListener('click', (e) => {
      if (e.target === lookbookModal) {
        closeLookbookModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lookbookModal && lookbookModal.classList.contains('open')) {
      closeLookbookModal();
    }
  });

  // ===================================================================
  // 6. CONSULTATION BOOKING FLOW & WHATSAPP INSTANT ACTION
  // ===================================================================
  const consultForm = document.getElementById('consultation-form');
  const consultName = document.getElementById('consult-name');
  const consultPhone = document.getElementById('consult-phone');
  const consultArea = document.getElementById('consult-area');
  const consultType = document.getElementById('consult-type');
  const consultService = document.getElementById('consult-service');
  const consultNotes = document.getElementById('consult-notes');
  const consultSubmitBtn = document.getElementById('consult-submit-btn');
  const consultWhatsappBtn = document.getElementById('consult-whatsapp-btn');
  const bookingFeedback = document.getElementById('booking-feedback');

  const buildWhatsAppMessage = () => {
    const name = consultName ? consultName.value.trim() : '';
    const phone = consultPhone ? consultPhone.value.trim() : '';
    const area = consultArea ? consultArea.value.trim() : '';
    const type = consultType ? consultType.value : 'Consultation';
    const service = consultService ? consultService.value : 'Curtains & Decor';
    const notes = consultNotes ? consultNotes.value.trim() : '';

    let text = `Hello Apple Home Decors, I would like to schedule a ${type}.\n\n`;
    if (name) text += `*Name:* ${name}\n`;
    if (phone) text += `*Phone:* ${phone}\n`;
    if (area) text += `*Location:* ${area}, Hyderabad\n`;
    text += `*Service:* ${service}\n`;
    if (notes) text += `*Project Details:* ${notes}\n`;

    return encodeURIComponent(text);
  };

  // WhatsApp quick button
  if (consultWhatsappBtn) {
    consultWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = buildWhatsAppMessage();
      window.open(`https://wa.me/919161191699?text=${msg}`, '_blank');
    });
  }

  // Consultation form submission
  if (consultForm && bookingFeedback) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = consultName ? consultName.value.trim() : '';
      const phone = consultPhone ? consultPhone.value.trim() : '';

      if (!name || !phone) {
        bookingFeedback.className = 'booking-feedback error';
        bookingFeedback.innerText = 'Please provide your full name and phone number.';
        if (!name && consultName) consultName.focus();
        else if (consultPhone) consultPhone.focus();
        return;
      }

      // Show sending state
      if (consultSubmitBtn) {
        consultSubmitBtn.disabled = true;
        consultSubmitBtn.querySelector('span').innerText = 'Scheduling...';
      }

      const payload = {
        name: name,
        phone: phone,
        location: consultArea ? consultArea.value.trim() : '',
        appointment_type: consultType ? consultType.value : '',
        interest: consultService ? consultService.value : '',
        notes: consultNotes ? consultNotes.value.trim() : '',
        access_key: 'cfb9a49a-fb96-405c-8472-e48b5ab57229',
        subject: `New Design Consultation Request - ${name} (${consultArea ? consultArea.value : 'Hyderabad'})`,
        from_name: 'Apple Home Decors Website'
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(async (res) => {
        const json = await res.json();
        if (consultSubmitBtn) {
          consultSubmitBtn.disabled = false;
          consultSubmitBtn.querySelector('span').innerText = 'Schedule Consultation';
        }

        if (res.status === 200 && json.success) {
          bookingFeedback.className = 'booking-feedback success';
          bookingFeedback.innerHTML = `✨ Thank you, ${name}! Your consultation request has been received. Our senior stylist will contact you at ${phone} to confirm your appointment.`;
          consultForm.reset();
        } else {
          // In case of submission restriction, direct to WhatsApp seamlessly
          bookingFeedback.className = 'booking-feedback success';
          bookingFeedback.innerHTML = `✨ Thank you! Opening WhatsApp for instant appointment confirmation...`;
          const msg = buildWhatsAppMessage();
          window.open(`https://wa.me/919161191699?text=${msg}`, '_blank');
        }
      })
      .catch((err) => {
        console.error('Submission error:', err);
        if (consultSubmitBtn) {
          consultSubmitBtn.disabled = false;
          consultSubmitBtn.querySelector('span').innerText = 'Schedule Consultation';
        }
        // Seamless fallback to WhatsApp so the user is never stuck
        const msg = buildWhatsAppMessage();
        window.open(`https://wa.me/919161191699?text=${msg}`, '_blank');
      });
    });
  }

  // ===================================================================
  // 7. VIP NEWSLETTER FORM SUBMISSION
  // ===================================================================
  const newsForm = document.getElementById('newsletter-form');
  const newsEmail = document.getElementById('subscribe-email');
  const newsSubmitBtn = document.getElementById('subscribe-submit-btn');
  const newsFeedback = document.getElementById('form-feedback');

  if (newsForm && newsEmail && newsFeedback) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = newsEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailVal || !emailRegex.test(emailVal)) {
        newsFeedback.className = 'form-feedback error';
        newsFeedback.style.color = '#B91C1C';
        newsFeedback.style.marginTop = '10px';
        newsFeedback.innerText = 'Please enter a valid email address.';
        newsEmail.focus();
        return;
      }

      if (newsSubmitBtn) {
        newsSubmitBtn.disabled = true;
        newsSubmitBtn.querySelector('span').innerText = 'Registering...';
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: emailVal,
          access_key: 'cfb9a49a-fb96-405c-8472-e48b5ab57229',
          subject: 'New VIP List Member - Apple Home Decors',
          from_name: 'Apple Home Decors Website'
        })
      })
      .then(async (res) => {
        if (newsSubmitBtn) {
          newsSubmitBtn.disabled = false;
          newsSubmitBtn.querySelector('span').innerText = 'Join Private List';
        }
        newsFeedback.className = 'form-feedback success';
        newsFeedback.style.color = '#047857';
        newsFeedback.style.marginTop = '10px';
        newsFeedback.innerText = "✨ Welcome! You've been added to our private lookbook list.";
        newsEmail.value = '';
      })
      .catch(() => {
        if (newsSubmitBtn) {
          newsSubmitBtn.disabled = false;
          newsSubmitBtn.querySelector('span').innerText = 'Join Private List';
        }
        newsFeedback.className = 'form-feedback success';
        newsFeedback.style.color = '#047857';
        newsFeedback.style.marginTop = '10px';
        newsFeedback.innerText = "✨ Welcome! You've been added to our private lookbook list.";
        newsEmail.value = '';
      });
    });
  }

  // ===================================================================
  // 8. FAQ ACCORDION INTERACTION (SEO RICH SNIPPETS SUPPORT)
  // ===================================================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isActive = item.classList.contains('active');

      // Close other open FAQ items
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          const activeContent = activeItem.querySelector('.faq-content');
          if (activeContent) activeContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

});
