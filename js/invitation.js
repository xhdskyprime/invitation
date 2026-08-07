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
    bgMusicUrl: "kusumo_wijoyo.m4a"
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

document.addEventListener("DOMContentLoaded", async () => {
  setupCoverOverlay();
  
  await loadData();
  parseGuestName();
  renderContent();
  setupAudioPlayer();
  setupCountdown();
  setupRSVPForm();
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

async function loadData() {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      currentData = await res.json();
    }
  } catch(e) {
    console.error("Error loading saved data from server", e);
    currentData = defaultData;
  }
}

function parseGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guest = urlParams.get("to");
  if (guest) {
    safeSetText("guestNameDisplay", decodeURIComponent(guest));
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
      stories.forEach(story => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-date">${escapeHtml(story.date)}</div>
          <div class="timeline-title">${escapeHtml(story.title)}</div>
          <div class="timeline-desc">${escapeHtml(story.desc)}</div>
        `;
        timelineEl.appendChild(item);
      });
    }
  }

  // Gallery
  const galleryEl = document.getElementById("galleryContainer");
  if (galleryEl) {
    galleryEl.innerHTML = "";
    if (gallery && gallery.length > 0) {
      gallery.forEach(img => {
        const isObj = typeof img === 'object' && img !== null;
        const url = isObj ? img.url : img;
        const cleanImgUrl = url.replace("inv.wekita.id", "assets");
        const zoom = isObj ? (img.zoom || 1.0) : 1.0;
        const x = isObj ? (img.offsetX || 0) : 0;
        const y = isObj ? (img.offsetY || 0) : 0;

        const div = document.createElement("div");
        div.className = "gallery-card";
        div.innerHTML = `
          <div style="width: 100%; height: 100%; overflow: hidden; position: relative;">
            <img src="${escapeHtml(cleanImgUrl)}" alt="Gallery Photo" 
                 style="width: 100%; height: 100%; object-fit: cover; transform: translate(${x}%, ${y}%) scale(${zoom}); transform-origin: center center; position: absolute; cursor: pointer; transition: transform 0.2s;" 
                 onclick="window.open('${escapeHtml(cleanImgUrl)}', '_blank')">
          </div>
        `;
        galleryEl.appendChild(div);
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
          <div class="acc-owner">a.n ${escapeHtml(gift.name)}</div>
          <button class="btn-copy-acc" onclick="copyToClipboard('${escapeHtml(gift.number)}')">
            Salin No. Rekening
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
function setupRSVPForm() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("rsvpNameInput") ? document.getElementById("rsvpNameInput").value.trim() : "";
    const status = document.getElementById("rsvpStatusInput") ? document.getElementById("rsvpStatusInput").value : "Hadir";
    const count = document.getElementById("rsvpCountInput") ? document.getElementById("rsvpCountInput").value : "1";
    const text = document.getElementById("rsvpTextInput") ? document.getElementById("rsvpTextInput").value.trim() : "";

    if (!name || !text) return;

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status, count, text })
      });
      if (res.ok) {
        form.reset();
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
