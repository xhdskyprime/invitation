// Indonesian Banks & E-Wallets Master List
const INDONESIA_BANKS = [
  { code: "BCA", name: "Bank BCA", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" },
  { code: "MANDIRI", name: "Bank Mandiri", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" },
  { code: "BNI", name: "Bank BNI", logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/BNI_logo.svg" },
  { code: "BRI", name: "Bank BRI", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg" },
  { code: "BSI", name: "Bank Syariah Indonesia (BSI)", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bank_Syariah_Indonesia.svg" },
  { code: "PERMATA", name: "Bank Permata", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Permata_Bank.svg" },
  { code: "CIMB", name: "Bank CIMB Niaga", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/CIMB_Niaga_logo.svg" },
  { code: "DANAMON", name: "Bank Danamon", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Bank_Danamon_logo.svg" },
  { code: "JAGO", name: "Bank Jago", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_Bank_Jago.svg" },
  { code: "SEABANK", name: "SeaBank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/SeaBank.svg/512px-SeaBank.svg.png" },
  { code: "GOPAY", name: "GoPay", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" },
  { code: "OVO", name: "OVO", logo: "https://upload.wikimedia.org/wikipedia/commons/eb/e8/OVO_Logo.svg" },
  { code: "DANA", name: "DANA", logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_DANA.svg" },
  { code: "SHOPEEPAY", name: "ShopeePay", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/ShopeePay_logo.svg" },
  { code: "LAINNYA", name: "Bank / E-Wallet Lain", logo: "" }
];

function getBankInfo(bankInput) {
  if (!bankInput) return INDONESIA_BANKS[0];
  const clean = bankInput.trim().toUpperCase();
  const found = INDONESIA_BANKS.find(b => 
    b.code === clean || 
    b.name.toUpperCase().includes(clean) || 
    clean.includes(b.code)
  );
  if (found) return found;
  return { code: "CUSTOM", name: bankInput, logo: "" };
}

// Default Fallback Data matching assets/spesial-01
const defaultData = {
  general: {
    coupleNames: "Lutfi & Firdha",
    eventDateISO: "2026-08-26T08:00:00",
    eventDateFormatted: "Rabu, 26 Agustus 2026",
    quote: '"Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari meksasamu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang." (Ar-Rum: 21)',
    bgMusicUrl: "kusumo_wijoyo.m4a",
    heroImageUrl: "https://i.ibb.co.com/HLzkB2z4/149-E3-E4-F-6-AD7-4-F41-8335-27-F48688-EBEF.jpg"
  },
  groom: {
    callName: "Lutfi",
    fullName: "Lutfi, S.T.",
    parents: "Putra Pertama dari Bpk. Keluarga & Ibu Keluarga",
    igHandle: "@lutfi",
    igUrl: "https://instagram.com",
    avatarUrl: "assets/wp-content/uploads/2026/06/sm-PRIA-e1725510474400-1-3.jpg",
    zoom: 1.0
  },
  bride: {
    callName: "Firdha",
    fullName: "Firdha, S.Ked.",
    parents: "Putri Kedua dari Bpk. Keluarga & Ibu Keluarga",
    igHandle: "@firdha",
    igUrl: "https://instagram.com",
    avatarUrl: "assets/wp-content/uploads/2026/06/sm-WANITA-e1725510489585-1-3.jpg",
    zoom: 1.0
  },
  events: {
    akadDate: "Rabu, 26 Agustus 2026",
    akadTime: "Pukul 08.00 - 10.00 WIB",
    akadLocation: "Grand Ballroom Hotel Mulia, Senayan, Jakarta Pusat",
    akadMapUrl: "https://maps.google.com",
    resepsiDate: "Rabu, 26 Agustus 2026",
    resepsiTime: "Pukul 11.00 - 14.00 WIB",
    resepsiLocation: "Grand Ballroom Hotel Mulia, Senayan, Jakarta Pusat",
    resepsiMapUrl: "https://maps.google.com"
  },
  stories: [
    { date: "15 Mei 2021", title: "Awal Pertemuan", desc: "Pertama kali berkenalan saat kegiatan kampus bersama." },
    { date: "26 Desember 2024", title: "Lamaran & Fitrah", desc: "Momen membahagiakan saat keluarga besar saling bertemu dan mengikat janji suci." },
    { date: "26 Agustus 2026", title: "Hari Pernikahan", desc: "Hari suci di mana kami mengikrarkan janji suci seumur hidup." }
  ],
  gallery: [
    "assets/wp-content/uploads/2026/06/p-1-1-3.jpg",
    "assets/wp-content/uploads/2026/06/p-2-1-3.jpg",
    "assets/wp-content/uploads/2026/06/sm-1-5-e1725510309587-1-3.jpg",
    "assets/wp-content/uploads/2026/06/sm-1-6-e1725510241295-1-3.jpg"
  ],
  gifts: [
    { bank: "BCA", number: "1234567890", name: "Lutfi" },
    { bank: "MANDIRI", number: "9876543210", name: "Firdha" }
  ]
};

let currentData = defaultData;
let currentGalleryUrls = [];
let currentLightboxIndex = 0;

function setupGalleryLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox) return;

  closeBtn?.addEventListener("click", closeLightbox);
  prevBtn?.addEventListener("click", () => navigateLightbox(-1));
  nextBtn?.addEventListener("click", () => navigateLightbox(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("galleryLightbox");
  const imgEl = document.getElementById("lightboxImg");
  const counterEl = document.getElementById("lightboxCounter");

  if (!lightbox || !imgEl || currentGalleryUrls.length === 0) return;

  currentLightboxIndex = index;
  imgEl.src = currentGalleryUrls[currentLightboxIndex];
  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} / ${currentGalleryUrls.length}`;
  }
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
  }
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  if (currentGalleryUrls.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + direction + currentGalleryUrls.length) % currentGalleryUrls.length;
  
  const imgEl = document.getElementById("lightboxImg");
  const counterEl = document.getElementById("lightboxCounter");

  if (imgEl) {
    imgEl.style.opacity = "0.4";
    setTimeout(() => {
      imgEl.src = currentGalleryUrls[currentLightboxIndex];
      imgEl.style.opacity = "1";
    }, 150);
  }
  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} / ${currentGalleryUrls.length}`;
  }
}

// Safe DOM Helper Functions
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "";
}

function safeSetHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html || "";
}

function safeSetAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value || "#");
}

function getStoryIcon(idx, title) {
  const t = (title || "").toLowerCase();
  if (t.includes("awal") || t.includes("pertemuan") || t.includes("kenal")) return "sparkles";
  if (t.includes("rumah") || t.includes("cinta") || t.includes("asmaraloka")) return "heart";
  if (t.includes("tahun") || t.includes("proses") || t.includes("perjalanan")) return "hourglass";
  if (t.includes("janji") || t.includes("suci") || t.includes("lamaran") || t.includes("nikah")) return "heart-handshake";
  
  const defaultIcons = ["heart", "sparkles", "home", "hourglass", "heart-handshake", "gift", "star"];
  return defaultIcons[idx % defaultIcons.length];
}

function formatStoryDesc(descText) {
  if (!descText) return '';
  const paragraphs = String(descText).trim().split(/\n\s*\n/);
  
  return paragraphs.map(p => {
    let clean = escapeHtml(p.trim());
    clean = clean.replace(/&quot;([^&]+)&quot;/g, '<span class="story-highlight-quote">“$1”</span>');
    clean = clean.replace(/"([^"]+)"/g, '<span class="story-highlight-quote">“$1”</span>');
    clean = clean.replace(/\n/g, '<br>');
    
    if (clean.includes('story-highlight-quote')) {
      return clean;
    }
    return `<p>${clean}</p>`;
  }).join('');
}

// Use the pre-existing promise from the inline head script, or initiate fetch as fallback
const configPromise = window.configPromise || fetch("/api/config")
  .then(res => res.ok ? res.json() : defaultData)
  .catch(e => {
    console.error("Error loading config from server", e);
    return defaultData;
  });

document.addEventListener("DOMContentLoaded", async () => {
  setupCoverOverlay();
  
  try {
    currentData = window.initialConfigData || (await configPromise) || defaultData;
  } catch (e) {
    currentData = defaultData;
  }
  
  parseGuestName();
  setupGalleryLightbox();
  renderContent();
  setupAudioPlayer();
  setupCountdown();
  setupRSVPForm();
  setupVoiceRecorder();
  renderWishes();
  setupScrollReveal();

  if (window.lucide) {
    try {
      lucide.createIcons();
    } catch (e) {
      console.error("Lucide DOMContentLoaded error:", e);
    }
  }

  window.addEventListener("load", () => {
    if (window.lucide) {
      try {
        lucide.createIcons();
      } catch (e) {
        console.error("Lucide load error:", e);
      }
    }
  });

  // Live message sync from Admin Dashboard
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "UPDATE_INVITATION_DATA") {
      currentData = event.data.payload;
      renderContent();
      setupCountdown();
      renderWishes();
      setupScrollReveal();
      if (window.lucide) lucide.createIcons();
    }
  });
});

function parseGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guest = urlParams.get("to");
  if (guest) {
    const guestName = decodeURIComponent(guest);
    safeSetText("guestNameDisplay", guestName);
    
    // Auto-fill and hide name input in RSVP Form
    const nameInput = document.getElementById("rsvpNameInput");
    const nameGroup = document.getElementById("rsvpNameGroup");
    const welcomeBox = document.getElementById("rsvpGuestWelcome");
    const welcomeText = document.getElementById("rsvpGuestNameText");
    
    if (nameInput && nameGroup && welcomeBox && welcomeText) {
      nameInput.value = guestName;
      nameGroup.style.display = "none";
      welcomeText.textContent = guestName;
      welcomeBox.style.display = "block";
    }
  }
}

function renderContent() {
  const { general, groom, bride, events, stories, gallery, gifts } = currentData;

  // General & Cover
  safeSetText("coverCoupleNames", general.coupleNames || defaultData.general.coupleNames);
  safeSetText("coverEventDate", general.eventDateFormatted || defaultData.general.eventDateFormatted);
  safeSetText("heroCoupleNames", general.coupleNames || defaultData.general.coupleNames);
  safeSetText("heroEventDate", general.eventDateFormatted || defaultData.general.eventDateFormatted);

  if (general.heroImageUrl) {
    const heroBgElements = document.querySelectorAll('.cover-hero-bg, .hero-section');
    heroBgElements.forEach(el => {
      el.style.backgroundImage = `url('${general.heroImageUrl}')`;
    });
  }
  safeSetText("footerCoupleNames", general.coupleNames || defaultData.general.coupleNames);
  if (general.quote) {
    safeSetHtml("quoteText", general.quote.replace(/\n/g, '<br>'));
  }

  // Groom
  safeSetText("groomCallName", groom.callName || defaultData.groom.callName);
  safeSetText("groomFullName", groom.fullName || defaultData.groom.fullName);
  safeSetText("groomParents", groom.parents || defaultData.groom.parents);
  safeSetText("groomIgHandle", groom.igHandle || defaultData.groom.igHandle);
  safeSetAttr("groomIg", "href", groom.igUrl || "#");
  if (groom.avatarUrl) {
    const cleanGroomUrl = groom.avatarUrl.replace("inv.wekita.id", "assets");
    safeSetAttr("groomAvatar", "src", cleanGroomUrl);
  }
  const groomAvatarEl = document.getElementById("groomAvatar");
  if (groomAvatarEl) {
    const x = groom.offsetX || 0;
    const y = groom.offsetY || 0;
    const zoom = groom.zoom || 1.0;
    groomAvatarEl.style.transform = `translate(${x}%, ${y}%) scale(${zoom})`;
  }

  // Bride
  safeSetText("brideCallName", bride.callName || defaultData.bride.callName);
  safeSetText("brideFullName", bride.fullName || defaultData.bride.fullName);
  safeSetText("brideParents", bride.parents || defaultData.bride.parents);
  safeSetText("brideIgHandle", bride.igHandle || defaultData.bride.igHandle);
  safeSetAttr("brideIg", "href", bride.igUrl || "#");
  if (bride.avatarUrl) {
    const cleanBrideUrl = bride.avatarUrl.replace("inv.wekita.id", "assets");
    safeSetAttr("brideAvatar", "src", cleanBrideUrl);
  }
  const brideAvatarEl = document.getElementById("brideAvatar");
  if (brideAvatarEl) {
    const x = bride.offsetX || 0;
    const y = bride.offsetY || 0;
    const zoom = bride.zoom || 1.0;
    brideAvatarEl.style.transform = `translate(${x}%, ${y}%) scale(${zoom})`;
  }

  // Events
  safeSetText("akadDate", events.akadDate || defaultData.events.akadDate);
  safeSetText("akadTime", events.akadTime || defaultData.events.akadTime);
  if (events.akadLocation) {
    safeSetHtml("akadLocation", events.akadLocation.replace(/\n/g, '<br>'));
  }
  safeSetAttr("akadMapUrl", "href", events.akadMapUrl || "#");

  safeSetText("resepsiDate", events.resepsiDate || defaultData.events.resepsiDate);
  safeSetText("resepsiTime", events.resepsiTime || defaultData.events.resepsiTime);
  if (events.resepsiLocation) {
    safeSetHtml("resepsiLocation", events.resepsiLocation.replace(/\n/g, '<br>'));
  }
  safeSetAttr("resepsiMapUrl", "href", events.resepsiMapUrl || "#");

  // Stories
  const timelineEl = document.getElementById("timelineContainer");
  if (timelineEl) {
    timelineEl.innerHTML = "";
    if (stories && stories.length > 0) {
      stories.forEach((story, idx) => {
        const item = document.createElement("div");
        item.className = `timeline-item ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}`;
        
        const iconName = getStoryIcon(idx, story.title);
        
        const dateHtml = (story.date && story.date.trim() !== "") ? 
          `<div class="timeline-date-badge"><i data-lucide="calendar"></i> ${escapeHtml(story.date)}</div>` : 
          `<div class="timeline-chapter-badge"><i data-lucide="bookmark"></i> Momen #${idx + 1}</div>`;

        const descHtml = formatStoryDesc(story.desc);

        item.innerHTML = `
          <div class="timeline-node" title="Momen ${idx + 1}">
            <i data-lucide="${iconName}"></i>
          </div>
          <div class="timeline-card">
            <div class="timeline-card-header">
              ${dateHtml}
              <h3 class="timeline-title">${escapeHtml(story.title)}</h3>
            </div>
            <div class="timeline-divider"></div>
            <div class="timeline-desc">${descHtml}</div>
          </div>
        `;
        timelineEl.appendChild(item);
      });
    }
  }

  // Gallery
  const galleryEl = document.getElementById("galleryContainer");
  if (galleryEl) {
    galleryEl.innerHTML = "";
    currentGalleryUrls = [];

    if (gallery && gallery.length > 0) {
      const total = gallery.length;
      gallery.forEach((img, idx) => {
        const isObj = typeof img === 'object' && img !== null;
        const url = isObj ? img.url : img;
        const cleanImgUrl = url.replace("inv.wekita.id", "assets");
        const zoom = isObj ? (img.zoom || 1.0) : 1.0;
        const x = isObj ? (img.offsetX || 0) : 0;
        const y = isObj ? (img.offsetY || 0) : 0;

        currentGalleryUrls.push(cleanImgUrl);

        let layoutClass = "";
        if (idx === 0) {
          layoutClass = "featured";
        } else if (idx === total - 1 && (total - 1) % 2 !== 0) {
          layoutClass = "full-width";
        }

        const card = document.createElement("div");
        card.className = `gallery-card ${layoutClass}`;
        card.innerHTML = `
          <div class="gallery-card-inner">
            <img src="${escapeHtml(cleanImgUrl)}" alt="Galeri Momen ${idx + 1}" loading="lazy"
                 style="transform: translate(${x}%, ${y}%) scale(${zoom}); transform-origin: center center;">
            <div class="gallery-overlay">
              <div class="gallery-badge"><i data-lucide="camera"></i> Momen #${idx + 1}</div>
              <div class="gallery-zoom-icon"><i data-lucide="maximize-2"></i></div>
            </div>
          </div>
        `;

        card.addEventListener("click", () => openLightbox(idx));
        galleryEl.appendChild(card);
      });
    }
  }

  // Gifts with Logo Badge
  const giftsEl = document.getElementById("giftContainer");
  if (giftsEl) {
    giftsEl.innerHTML = "";
    if (gifts && gifts.length > 0) {
      gifts.forEach(gift => {
        const bankInfo = getBankInfo(gift.bank);
        const card = document.createElement("div");
        card.className = "gift-card";
        card.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; gap:6px; margin-bottom:8px;">
            ${bankInfo.logo ? `<img src="${bankInfo.logo}" alt="${escapeHtml(bankInfo.name)}" style="height:32px; max-width:130px; object-fit:contain; margin-bottom:4px;">` : ''}
            <div class="bank-name">${escapeHtml(bankInfo.name || gift.bank)}</div>
          </div>
          <div class="acc-num">${escapeHtml(gift.number)}</div>
          <div class="acc-owner">Atas Nama: <span>${escapeHtml(gift.name)}</span></div>
          <button class="btn-copy-acc" onclick="copyToClipboard('${escapeHtml(gift.number)}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Salin No. Rekening
          </button>
        `;
        giftsEl.appendChild(card);
      });
    }
  }

  if (window.lucide) {
    try {
      lucide.createIcons();
    } catch (e) {}
  }
}

// Scroll Reveal IntersectionObserver
function setupScrollReveal() {
  const reveals = document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left, .reveal-right");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("reveal-active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

// Audio Control
let isPlaying = false;
let wasMusicPlayingBeforeRecording = false;
function setupAudioPlayer() {
  const bgMusic = document.getElementById("bgMusic");
  const audioToggle = document.getElementById("audioToggle");
  if (!bgMusic || !audioToggle) return;

  if (currentData.general && currentData.general.bgMusicUrl) {
    bgMusic.src = currentData.general.bgMusicUrl;
  }

  audioToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      audioToggle.classList.remove("spinning");
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        audioToggle.classList.add("spinning");
        isPlaying = true;
      }).catch(err => console.log("Autoplay prevented:", err));
    }
  });
}

// Cover Overlay - Opening Trigger
function setupCoverOverlay() {
  const btnOpen = document.getElementById("btnOpenInvitation");
  const overlay = document.getElementById("coverOverlay");
  const bgMusic = document.getElementById("bgMusic");
  const audioToggle = document.getElementById("audioToggle");

  if (!btnOpen || !overlay) {
    return;
  }

  btnOpen.addEventListener("click", (e) => {
    e.preventDefault();
    
    const wrapper = document.querySelector(".invitation-wrapper");
    if (wrapper) {
      wrapper.style.display = "block";
    }

    overlay.classList.add("opened");
    
    setTimeout(() => {
      setupScrollReveal();
    }, 300);

    if (bgMusic) {
      bgMusic.play().then(() => {
        if (audioToggle) audioToggle.classList.add("spinning");
        isPlaying = true;
      }).catch(err => console.log("Audio play allowed on click:", err));
    }
  });
}

// Countdown Timer
let timerInterval = null;
function setupCountdown() {
  if (timerInterval) clearInterval(timerInterval);

  const targetDateStr = currentData.general ? currentData.general.eventDateISO : "2026-08-26T08:00:00";
  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const daysEl = document.getElementById("timerDays");
    const hoursEl = document.getElementById("timerHours");
    const minutesEl = document.getElementById("timerMinutes");
    const secondsEl = document.getElementById("timerSeconds");
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  timerInterval = setInterval(update, 1000);
}

// RSVP Form
let activeWishType = "text";

function setupRSVPForm() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  const btnToggleText = document.getElementById("btnToggleText");
  const btnToggleVoice = document.getElementById("btnToggleVoice");
  const textWishGroup = document.getElementById("textWishGroup");
  const voiceWishGroup = document.getElementById("voiceWishGroup");

  if (btnToggleText && btnToggleVoice && textWishGroup && voiceWishGroup) {
    btnToggleText.addEventListener("click", () => {
      activeWishType = "text";
      btnToggleText.classList.add("active");
      btnToggleVoice.classList.remove("active");
      textWishGroup.style.display = "block";
      voiceWishGroup.style.display = "none";
    });

    btnToggleVoice.addEventListener("click", () => {
      activeWishType = "voice";
      btnToggleVoice.classList.add("active");
      btnToggleText.classList.remove("active");
      textWishGroup.style.display = "none";
      voiceWishGroup.style.display = "block";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("rsvpNameInput") ? document.getElementById("rsvpNameInput").value.trim() : "";
    const status = document.getElementById("rsvpStatusInput") ? document.getElementById("rsvpStatusInput").value : "Hadir";
    const count = document.getElementById("rsvpCountInput") ? document.getElementById("rsvpCountInput").value : "1";
    
    let text = "";
    let finalAudio = null;

    if (activeWishType === "text") {
      text = document.getElementById("rsvpTextInput") ? document.getElementById("rsvpTextInput").value.trim() : "";
      if (!text) {
        alert("Silakan tulis ucapan & doa restu Anda!");
        return;
      }
    } else {
      text = "Kirim doa restu via Ucapan Suara (Voice Note)";
      finalAudio = base64Audio;
      if (!finalAudio) {
        alert("Silakan rekam suara Anda terlebih dahulu!");
        return;
      }
    }

    if (!name) {
      alert("Silakan masukkan nama Anda!");
      return;
    }

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status, count, text, audio: finalAudio })
      });
      if (res.ok) {
        form.reset();
        base64Audio = null;
        const recordBtn = document.getElementById("btnRecordVoice");
        const previewContainer = document.getElementById("voicePreviewContainer");
        const audioPlayer = document.getElementById("voiceAudioPlayer");
        if (recordBtn) recordBtn.style.display = "inline-flex";
        if (previewContainer) previewContainer.style.display = "none";
        if (audioPlayer) audioPlayer.src = "";

        // Resume bgMusic if it was playing before
        const bgMusic = document.getElementById("bgMusic");
        const audioToggle = document.getElementById("audioToggle");
        if (wasMusicPlayingBeforeRecording && bgMusic) {
          bgMusic.play().then(() => {
            if (audioToggle) audioToggle.classList.add("spinning");
            isPlaying = true;
          }).catch(err => console.log("Resume audio error:", err));
        }

        showToast("Ucapan & konfirmasi Anda berhasil terkirim!");
        await renderWishes();
      }
    } catch(err) {
      console.error("Failed to submit RSVP", err);
      showToast("Gagal mengirim ucapan. Silakan coba lagi.");
    }
  });
}

async function renderWishes() {
  const listEl = document.getElementById("ucapanList");
  if (!listEl) return;
  listEl.innerHTML = "";

  let wishes = [];
  try {
    const res = await fetch("/api/wishes");
    if (res.ok) {
      wishes = await res.json();
    }
  } catch(e) {
    console.error("Failed to load wishes from server", e);
  }

  if (wishes.length === 0) {
    listEl.innerHTML = '<div style="text-align:center; color: var(--text-muted); font-size:12px; padding: 10px;">Belum ada ucapan.</div>';
    return;
  }

  wishes.forEach(item => {
    const div = document.createElement("div");
    div.className = "wish-card";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <strong style="color:var(--primary-navy); font-size:13px;">${escapeHtml(item.name)}</strong>
      </div>
      <div style="font-size:12px; color:var(--text-body);">${escapeHtml(item.text)}</div>
      ${item.audio ? `
        <div style="margin-top: 8px;">
          <audio src="${item.audio}" controls style="max-width: 100%; height: 32px;"></audio>
        </div>
      ` : ''}
      <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">${escapeHtml(item.date)}</div>
    `;
    listEl.appendChild(div);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Nomor rekening berhasil disalin!");
  }).catch(() => {
    showToast("Gagal menyalin. Silakan salin manual.");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toastMsg");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Voice Recorder Controller
let mediaRecorder = null;
let audioChunks = [];
let base64Audio = null;
let recordingInterval = null;
let recordingSeconds = 0;

function getSupportedMimeType() {
  const types = [
    'audio/webm;codecs=opus',
    'audio/mp4',
    'audio/webm',
    'audio/aac',
    'audio/ogg'
  ];
  for (const type of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return ''; // Browser default
}

function setupVoiceRecorder() {
  const recordBtn = document.getElementById("btnRecordVoice");
  const stopBtn = document.getElementById("btnStopRecord");
  const deleteBtn = document.getElementById("btnDeleteVoice");
  const statusContainer = document.getElementById("voiceRecordingStatus");
  const previewContainer = document.getElementById("voicePreviewContainer");
  const audioPlayer = document.getElementById("voiceAudioPlayer");
  const timerDisplay = document.getElementById("recordingTimer");

  if (!recordBtn || !stopBtn || !deleteBtn) return;

  recordBtn.addEventListener("click", async () => {
    audioChunks = [];
    recordingSeconds = 0;
    timerDisplay.textContent = "00:00";

    // Pause bgMusic while recording to avoid recording bleed
    const bgMusic = document.getElementById("bgMusic");
    const audioToggle = document.getElementById("audioToggle");
    if (bgMusic && !bgMusic.paused) {
      wasMusicPlayingBeforeRecording = true;
      bgMusic.pause();
      if (audioToggle) audioToggle.classList.remove("spinning");
      isPlaying = false;
    } else {
      wasMusicPlayingBeforeRecording = false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : {};
      mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const fallbackMime = isIOS ? 'audio/mp4' : 'audio/webm';
        const mimeTypeUsed = mediaRecorder.mimeType || fallbackMime;
        const audioBlob = new Blob(audioChunks, { type: mimeTypeUsed });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          base64Audio = reader.result;
          audioPlayer.src = base64Audio;
          previewContainer.style.display = "flex";
          statusContainer.style.display = "none";
          recordBtn.style.display = "none";
        };
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      // UI update
      recordBtn.style.display = "none";
      statusContainer.style.display = "flex";
      previewContainer.style.display = "none";

      // Timer
      recordingInterval = setInterval(() => {
        recordingSeconds++;
        const mins = String(Math.floor(recordingSeconds / 60)).padStart(2, '0');
        const secs = String(recordingSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
        
        // Auto-stop after 30 seconds
        if (recordingSeconds >= 30) {
          stopBtn.click();
        }
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Tidak dapat mengakses mikrofon. Pastikan Anda mengizinkan akses mikrofon di browser Anda.");
    }
  });

  stopBtn.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (recordingInterval) {
      clearInterval(recordingInterval);
    }
  });

  deleteBtn.addEventListener("click", () => {
    base64Audio = null;
    audioPlayer.src = "";
    previewContainer.style.display = "none";
    recordBtn.style.display = "inline-flex";

    // Resume bgMusic if it was playing before
    const bgMusic = document.getElementById("bgMusic");
    const audioToggle = document.getElementById("audioToggle");
    if (wasMusicPlayingBeforeRecording && bgMusic) {
      bgMusic.play().then(() => {
        if (audioToggle) audioToggle.classList.add("spinning");
        isPlaying = true;
      }).catch(err => console.log("Resume audio error:", err));
    }
  });
}
