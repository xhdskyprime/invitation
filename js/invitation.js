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

function sanitizeImageUrl(url) {
  if (!url) return '';
  let clean = url.trim();
  if (clean.includes('inv.wekita.id')) {
    clean = clean.replace(/https?:\/\/inv\.wekita\.id\/?/, '/assets/');
  }
  if (!clean.startsWith('http://') && !clean.startsWith('https://') && !clean.startsWith('data:')) {
    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }
  }
  
  // Strip WordPress auto-generated thumbnail sizes to load the HD original (e.g. -150x150.jpg -> .jpg)
  clean = clean.replace(/-\d+x\d+(?=\.[a-zA-Z0-9]+$)/, '');
  
  return clean;
}

// Default Fallback Data matching assets/spesial-01
const defaultData = {
  general: {
    coupleNames: "",
    eventDateISO: "",
    eventDateFormatted: "",
    quote: "",
    bgMusicUrl: "",
    heroImageUrl: ""
  },
  groom: {
    callName: "",
    fullName: "",
    parents: "",
    igHandle: "",
    igUrl: "",
    avatarUrl: "",
    zoom: 1.0
  },
  bride: {
    callName: "",
    fullName: "",
    parents: "",
    igHandle: "",
    igUrl: "",
    avatarUrl: "",
    zoom: 1.0
  },
  events: {
    akadDate: "",
    akadTime: "",
    akadLocation: "",
    akadMapUrl: "",
    resepsiDate: "",
    resepsiTime: "",
    resepsiLocation: "",
    resepsiMapUrl: ""
  },
  stories: [],
  gallery: [],
  gifts: []
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
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !imgEl || currentGalleryUrls.length === 0) return;

  currentLightboxIndex = index;
  imgEl.src = currentGalleryUrls[currentLightboxIndex];
  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} / ${currentGalleryUrls.length}`;
    counterEl.style.display = "";
  }
  if (prevBtn) prevBtn.style.display = "";
  if (nextBtn) nextBtn.style.display = "";

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openSingleImageLightbox(url) {
  const lightbox = document.getElementById("galleryLightbox");
  const imgEl = document.getElementById("lightboxImg");
  const counterEl = document.getElementById("lightboxCounter");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !imgEl || !url) return;

  imgEl.src = url;
  
  if (counterEl) counterEl.style.display = "none";
  if (prevBtn) prevBtn.style.display = "none";
  if (nextBtn) nextBtn.style.display = "none";
  
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
const configPromise = window.configPromise || fetch("/api/config?t=" + Date.now())
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
      const dataToRender = event.data.payload || {};
      
      // Apply Theme First
      renderContent(dataToRender);
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

function parseAndSetCalendarBlock(prefix, dateStr) {
  if (!dateStr) return;
  const dayEl = document.getElementById(prefix + "DayName");
  const numEl = document.getElementById(prefix + "DateNum");
  const monthYearEl = document.getElementById(prefix + "MonthYear");
  
  const parts = dateStr.split(',');
  if (parts.length >= 2) {
    if (dayEl) dayEl.textContent = parts[0].trim().toUpperCase();
    const dateParts = parts[1].trim().split(' ');
    if (dateParts.length >= 3) {
      if (numEl) numEl.textContent = dateParts[0];
      if (monthYearEl) monthYearEl.textContent = `${dateParts[1]} ${dateParts[2]}`.toUpperCase();
    } else {
      if (numEl) numEl.textContent = parts[1].trim();
    }
  } else {
    if (dayEl) dayEl.textContent = dateStr.toUpperCase();
  }
}

function renderContent(data = currentData) {
  const { general, groom, bride, events, stories, gallery, gifts, coverElements } = data;

  // Dynamic Cover Canvas
  const coverCanvas = document.getElementById("dynamicCoverCanvas");
  if (coverCanvas) {
    coverCanvas.innerHTML = "";
    if (coverElements && coverElements.length > 0) {
      coverElements.forEach(el => {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = el.x + "%";
        div.style.top = el.y + "%";
        div.style.zIndex = el.zIndex;
        div.style.transform = `rotate(${el.rotation || 0}deg)`;
        
        if (el.type === "text") {
          const span = document.createElement("span");
          span.textContent = el.content;
          span.style.fontSize = el.fontSize + "px";
          span.style.fontFamily = el.fontFamily;
          span.style.color = el.color;
          span.style.whiteSpace = "nowrap";
          div.appendChild(span);
        } else if (el.type === "image") {
          const img = document.createElement("img");
          img.src = el.url;
          div.style.width = el.width + "px";
          div.style.height = el.height + "px";
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "contain";
          div.appendChild(img);
        }
        coverCanvas.appendChild(div);
      });
    }
  }

  // General & Cover
  safeSetText("coverCoupleNames", general.coupleNames);
  safeSetText("coverEventDate", general.eventDateFormatted);
  safeSetText("heroCoupleNames", general.coupleNames);
  safeSetText("heroEventDate", general.eventDateFormatted);
  safeSetText("countdownEventDate", general.eventDateFormatted);

  if (general.heroImageUrl) {
    const cleanHeroUrl = sanitizeImageUrl(general.heroImageUrl);
    const heroBgElements = document.querySelectorAll('.cover-hero-bg, .hero-section');
    heroBgElements.forEach(el => {
      el.style.backgroundImage = `url('${cleanHeroUrl}')`;
    });
  }
  safeSetText("footerCoupleNames", general.coupleNames);
  if (general.quote) {
    safeSetHtml("quoteText", general.quote.replace(/\n/g, '<br>'));
  }

  // Groom
  safeSetText("groomCallName", groom.callName);
  safeSetText("groomFullName", groom.fullName);
  safeSetText("groomParents", groom.parents);
  safeSetText("groomIgHandle", groom.igHandle);
  safeSetAttr("groomIg", "href", groom.igUrl || "#");
  if (groom.avatarUrl) {
    const cleanGroomUrl = sanitizeImageUrl(groom.avatarUrl);
    safeSetAttr("groomAvatar", "src", cleanGroomUrl);
    const groomAvatarEl = document.getElementById("groomAvatar");
    if (groomAvatarEl) {
      groomAvatarEl.style.cursor = "pointer";
      groomAvatarEl.onclick = () => openSingleImageLightbox(cleanGroomUrl);
      
      const x = groom.offsetX || 0;
      const y = groom.offsetY || 0;
      const zoom = groom.zoom || 1.0;
    groomAvatarEl.style.width = `calc(100% * ${zoom})`;
    groomAvatarEl.style.height = `calc(100% * ${zoom})`;
    groomAvatarEl.style.maxWidth = "none";
    groomAvatarEl.style.maxHeight = "none";
    groomAvatarEl.style.transform = `translate(${x / zoom}%, ${y / zoom}%)`;
  }

  // Bride
  safeSetText("brideCallName", bride.callName);
  safeSetText("brideFullName", bride.fullName);
  safeSetText("brideParents", bride.parents);
  safeSetText("brideIgHandle", bride.igHandle);
  safeSetAttr("brideIg", "href", bride.igUrl || "#");
  if (bride.avatarUrl) {
    const cleanBrideUrl = sanitizeImageUrl(bride.avatarUrl);
    safeSetAttr("brideAvatar", "src", cleanBrideUrl);
    const brideAvatarEl = document.getElementById("brideAvatar");
    if (brideAvatarEl) {
      brideAvatarEl.style.cursor = "pointer";
      brideAvatarEl.onclick = () => openSingleImageLightbox(cleanBrideUrl);
      
      const x = bride.offsetX || 0;
      const y = bride.offsetY || 0;
      const zoom = bride.zoom || 1.0;
    brideAvatarEl.style.width = `calc(100% * ${zoom})`;
    brideAvatarEl.style.height = `calc(100% * ${zoom})`;
    brideAvatarEl.style.maxWidth = "none";
    brideAvatarEl.style.maxHeight = "none";
    brideAvatarEl.style.transform = `translate(${x / zoom}%, ${y / zoom}%)`;
  }

  // Events
  safeSetText("akadDate", events.akadDate);
  safeSetText("akadTime", events.akadTime);
  if (events.akadLocation) {
    safeSetHtml("akadLocation", events.akadLocation.replace(/\n/g, '<br>'));
  }
  safeSetAttr("akadMapUrl", "href", events.akadMapUrl || "#");

  safeSetText("resepsiDate", events.resepsiDate);
  safeSetText("resepsiTime", events.resepsiTime);
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
        const cleanImgUrl = sanitizeImageUrl(url);
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
                 style="--pan-x: ${x}%; --pan-y: ${y}%; --pan-zoom: ${zoom};">
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

  const calendarBtn = document.getElementById("btnAddToCalendar");
  if (calendarBtn && currentData.general) {
    const couple = currentData.general.coupleNames || "Lutfi & Firdha";
    const eventIso = currentData.general.eventDateISO || "2026-08-26T08:00:00";
    const cleanIso = eventIso.replace(/[-:]/g, "").split(".")[0];
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pernikahan ' + couple)}&dates=${cleanIso}/${cleanIso}&details=${encodeURIComponent('Pernikahan ' + couple)}&location=${encodeURIComponent(currentData.events?.akadLocation || 'Jakarta')}`;
    calendarBtn.href = googleCalUrl;
  }

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
        body: JSON.stringify({ name, status: "Hadir", count: "1", text, audio: finalAudio })
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

        showToast("Ucapan & doa restu Anda berhasil terkirim!");
        await renderWishes();
      }
    } catch(err) {
      console.error("Failed to submit wish", err);
      showToast("Gagal mengirim ucapan. Silakan coba lagi.");
    }
  });
}

async function renderWishes() {
  const listEl = document.getElementById("ucapanList");
  const headerWrapper = document.getElementById("wishesHeaderWrapper");
  const countText = document.getElementById("wishesCountText");

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

  if (headerWrapper && countText) {
    if (wishes.length > 0) {
      headerWrapper.style.display = "block";
      countText.textContent = `${wishes.length} Doa & Ucapan Restu`;
    } else {
      headerWrapper.style.display = "none";
    }
  }

  if (wishes.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); font-size:13px; padding: 24px 10px; background: rgba(255,255,255,0.7); border-radius: 16px; border: 1px dashed rgba(218,171,127,0.5);">
        <i data-lucide="message-square-dashed" style="width:24px; height:24px; margin-bottom:6px; color:var(--accent-gold);"></i>
        <div>Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</div>
      </div>`;
    if (window.lucide) {
      try { lucide.createIcons(); } catch(e) {}
    }
    return;
  }

  wishes.forEach(item => {
    const initial = (item.name || "T").trim().charAt(0).toUpperCase();

    let displayDate = item.date || '';
    if (item.id && typeof item.id === 'number' && item.id > 1600000000000) {
      try {
        displayDate = new Date(item.id).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' });
      } catch(e) {}
    }

    const card = document.createElement("div");
    card.className = "wish-card";
    card.innerHTML = `
      <div class="wish-card-header">
        <div class="wish-card-user">
          <div class="wish-avatar">${initial}</div>
          <div class="wish-user-name">${escapeHtml(item.name)}</div>
        </div>
      </div>
      <div class="wish-body">${escapeHtml(item.text)}</div>
      ${item.audio ? `
        <div class="wish-audio-wrapper">
          <button type="button" class="wa-play-btn" onclick="toggleWaAudio(this)" title="Putar Pesan Suara">
            <i data-lucide="play" class="wa-icon-play"></i>
            <i data-lucide="pause" class="wa-icon-pause" style="display:none;"></i>
          </button>
          <div class="wa-voice-info">
            <div class="wa-voice-waveform">
              <span class="wa-voice-bar" style="height:7px;"></span>
              <span class="wa-voice-bar" style="height:14px;"></span>
              <span class="wa-voice-bar" style="height:9px;"></span>
              <span class="wa-voice-bar" style="height:16px;"></span>
              <span class="wa-voice-bar" style="height:11px;"></span>
              <span class="wa-voice-bar" style="height:18px;"></span>
              <span class="wa-voice-bar" style="height:13px;"></span>
              <span class="wa-voice-bar" style="height:8px;"></span>
              <span class="wa-voice-bar" style="height:15px;"></span>
              <span class="wa-voice-bar" style="height:10px;"></span>
              <span class="wa-voice-bar" style="height:16px;"></span>
              <span class="wa-voice-bar" style="height:9px;"></span>
            </div>
            <div class="wa-voice-meta">
              <span class="wa-mic-badge"><i data-lucide="mic"></i> Voice Note</span>
            </div>
          </div>
          <audio src="${item.audio}" preload="auto" playsinline webkit-playsinline style="display:none;" onended="resetWaAudio(this)"></audio>
        </div>
      ` : ''}
      <div class="wish-date">
        <i data-lucide="clock"></i> ${escapeHtml(displayDate)}
      </div>
    `;
    listEl.appendChild(card);
  });

  if (window.lucide) {
    try { lucide.createIcons(); } catch(e) {}
  }
}

window.toggleWaAudio = function(btn) {
  const wrapper = btn.closest('.wish-audio-wrapper');
  if (!wrapper) return;
  const audio = wrapper.querySelector('audio');
  const playIcon = wrapper.querySelector('.wa-icon-play');
  const pauseIcon = wrapper.querySelector('.wa-icon-pause');
  
  if (!audio) return;
  
  // Pause bgMusic if currently playing
  const bgMusic = document.getElementById("bgMusic");
  const audioToggle = document.getElementById("audioToggle");
  if (bgMusic && !bgMusic.paused) {
    bgMusic.pause();
    if (audioToggle) audioToggle.classList.remove("spinning");
    isPlaying = false;
  }

  // Pause any other playing voice notes
  document.querySelectorAll('.wish-audio-wrapper audio').forEach(a => {
    if (a !== audio && !a.paused) {
      a.pause();
      const pWrapper = a.closest('.wish-audio-wrapper');
      if (pWrapper) {
        const pPlay = pWrapper.querySelector('.wa-icon-play');
        const pPause = pWrapper.querySelector('.wa-icon-pause');
        if (pPlay) pPlay.style.display = 'block';
        if (pPause) pPause.style.display = 'none';
        pWrapper.classList.remove('playing');
      }
    }
  });

  if (audio.paused) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS && audio.src && audio.src.startsWith('data:audio/webm')) {
      alert("Format ucapan suara ini (WebM) tidak didukung untuk diputar di iPhone. Voice note yang direkam dari iPhone atau Chrome versi baru akan mendukung pemutaran di semua HP.");
      return;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        wrapper.classList.add('playing');
      }).catch(err => {
        console.error('WA Audio play error:', err);
        showToast("Gagal memutar suara.");
      });
    }
  } else {
    audio.pause();
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    wrapper.classList.remove('playing');
  }
};

window.resetWaAudio = function(audio) {
  const wrapper = audio.closest('.wish-audio-wrapper');
  if (!wrapper) return;
  const playIcon = wrapper.querySelector('.wa-icon-play');
  const pauseIcon = wrapper.querySelector('.wa-icon-pause');
  if (playIcon) playIcon.style.display = 'block';
  if (pauseIcon) pauseIcon.style.display = 'none';
  wrapper.classList.remove('playing');
};

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
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const types = isIOS ? [
    'audio/mp4',
    'audio/aac',
    'audio/webm;codecs=opus',
    'audio/webm'
  ] : [
    'audio/mp4',
    'audio/aac',
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg'
  ];
  for (const type of types) {
    try {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    } catch (e) {}
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
      
      // Fallback mechanism for MediaRecorder options on iOS Safari
      try {
        const options = mimeType ? { mimeType } : {};
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (optionsErr) {
        console.warn("MediaRecorder with options failed, trying default MediaRecorder:", optionsErr);
        try {
          mediaRecorder = new MediaRecorder(stream);
        } catch (defaultErr) {
          console.error("MediaRecorder instantiation completely failed:", defaultErr);
          alert("Browser Anda tidak mendukung perekaman suara.");
          return;
        }
      }
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const fallbackMime = isIOS ? 'audio/mp4' : 'audio/webm';
        const mimeTypeUsed = mediaRecorder.mimeType || mimeType || fallbackMime;
        const audioBlob = new Blob(audioChunks, { type: mimeTypeUsed });

        if (audioBlob.size === 0) {
          alert("Hasil rekaman suara kosong. Silakan coba rekam lagi.");
          statusContainer.style.display = "none";
          recordBtn.style.display = "inline-flex";
          previewContainer.style.display = "none";
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          base64Audio = reader.result;
          audioPlayer.src = base64Audio;
          audioPlayer.load();
          previewContainer.style.display = "flex";
          statusContainer.style.display = "none";
          recordBtn.style.display = "none";
        };
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      // Pass timeslice (500ms) so iOS Safari triggers ondataavailable periodically
      mediaRecorder.start(500);

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
    overlay.classList.add("opened");
    
    const wrapper = document.querySelector(".invitation-wrapper");
    if (wrapper) wrapper.style.display = "block";
    
    // Trigger scroll reveal for hero elements immediately on open
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
