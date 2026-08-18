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
  { code: "BJB", name: "Bank BJB", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/41/Bank_BJB_logo.svg/500px-Bank_BJB_logo.svg.png" },
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

// Admin Dashboard Logic
const defaultData = {
  general: {
    coupleNames: "",
    eventDateISO: "",
    eventDateFormatted: "",
    quote: "",
    bgMusicUrl: "background_music.m4a",
    heroImageUrl: ""
  },
  groom: {
    callName: "",
    fullName: "",
    parents: "",
    igHandle: "",
    igUrl: "",
    avatarUrl: "",
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0
  },
  bride: {
    callName: "",
    fullName: "",
    parents: "",
    igHandle: "",
    igUrl: "",
    avatarUrl: "",
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0
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
  gifts: [],
  guestList: [],
  waTemplates: {
    active: "formal",
    formal: `Bismillahirrahmanirrahim. ✨\nKepada Yth. Bapak/Ibu/Saudara/i {NAMA_TAMU}\n\nTanpa mengurangi rasa hormat, melalui pesan ini perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:\n\n💍 Lutfi & Firdha\n\nUntuk detail informasi mengenai hari, waktu, dan lokasi acara, silakan kunjungi tautan undangan digital kami di bawah ini:\n👉 {LINK_UNDANGAN}\n\nMerupakan suatu kehormatan dan kebahagiaan yang luar biasa bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bersejarah kami.\n\nAtas perhatian dan doa restunya, kami ucapkan terima kasih. 🙏🏻\n\nHormat kami,\nLutfi & Firdha`,
    islami: `Assalamu'alaikum Wr. Wb. ✨\n\nKepada Yth. Bapak/Ibu/Saudara/i {NAMA_TAMU}\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran pernikahan kami:\n\n💍 Lutfi & Firdha\n\nUntuk info tanggal, waktu, dan lokasi acara selengkapnya dapat dilihat melalui tautan undangan berikut:\n👉 {LINK_UNDANGAN}\n\nJazakumullah Khairan Katsiran atas doa dan kehadirannya.\n\nWassalamu'alaikum Wr. Wb. 🙏🏻`,
    santai: `Halo {NAMA_TAMU}! ✨🕊️\n\nMomen yang kami tunggu-tunggu akhirnya tiba! Dengan penuh kebahagiaan, kami ingin mengundang kamu untuk turut serta merayakan hari pernikahan kami:\n\n🤍 Lutfi & Firdha 🤍\n\nSilakan klik tautan undangan digital di bawah ini untuk melihat detail acaranya ya:\n💌 {LINK_UNDANGAN}\n\nKehadiran dan doa restumu akan menjadi kado terindah untuk mengawali langkah baru kami. Sampai jumpa di hari bahagia nanti! 🥰\n\nSalam hangat,\nLutfi & Firdha`
  },
  theme: {
    colorPalette: "navy",
    fontFamily: "great-vibes",
    animationStyle: "fade-zoom",
    showQuote: true,
    showStory: true,
    showGallery: true,
    showGifts: true
  },
  coverElements: [
    {
      id: "elem_title",
      type: "text",
      content: "The Wedding Of",
      x: 50, // percentage based for responsive layout
      y: 15, // percentage based
      fontSize: 16, // px/vw based, let's keep it simple numbers
      fontFamily: "var(--font-title)",
      color: "var(--accent-gold)",
      zIndex: 10,
      rotation: 0
    },
    {
      id: "elem_names",
      type: "text",
      content: "Lutfi & Firdha",
      x: 50,
      y: 25,
      fontSize: 48,
      fontFamily: "var(--font-script)",
      color: "#ffffff",
      zIndex: 10,
      rotation: 0
    }
  ]
};

let currentData = JSON.parse(JSON.stringify(defaultData));

document.addEventListener("DOMContentLoaded", async () => {
  setupTabNavigation();
  setupInputListeners();
  setupHeaderActions();
  setupWaGeneratorLogic();
  setupPasswordOverlay(); // Setup password prompt listeners
  
  await loadStoredData(); // Fetch config from server (which checks auth)

  // Setup pan/drag event listeners for avatars
  setupAvatarPan("groomImgThumbContainer", "groomImgThumb", "inputGroomZoom", "groomZoomVal", "groom");
  setupAvatarPan("brideImgThumbContainer", "brideImgThumb", "inputBrideZoom", "brideZoomVal", "bride");

  if (window.lucide) {
    lucide.createIcons();
  }
});

async function loadStoredData() {
  try {
    const password = localStorage.getItem("admin_password") || "";
    // Verify password against verify endpoint
    const authRes = await fetch("/api/admin/verify", {
      headers: { "X-Admin-Password": password }
    });
    if (authRes.status === 401) {
      showPasswordOverlay();
      return;
    }
    
    // Config read with admin credentials to get full guestList
    const res = await fetch("/api/config", {
      headers: { "X-Admin-Password": password }
    });
    if (res.ok) {
      const data = await res.json();
      currentData = Object.assign({}, JSON.parse(JSON.stringify(defaultData)), data);
      
      // Upgrade WA Templates if they match old defaults
      if (currentData.waTemplates && currentData.waTemplates.formal && currentData.waTemplates.formal.includes("Kepada Yth.\\nBapak/Ibu/Saudara/i {NAMA_TAMU}\\n\\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda")) {
         currentData.waTemplates = JSON.parse(JSON.stringify(defaultData.waTemplates));
      }
      
      // DO NOT automatically hide password overlay here! Security fix!
      // The overlay will only hide after they enter the correct PIN in trySubmit().
      
      populateFormFields();
      refreshWaTemplateUI();
      renderDynamicLists();
      renderRsvpTable();
      renderGuestTable();
      updateStats();
    }
  } catch(e) {
    console.error("Failed to load config from server, falling back to default", e);
    currentData = JSON.parse(JSON.stringify(defaultData));
  }
}

let isSavingToServer = false;

window.addEventListener("beforeunload", (e) => {
  if (isSavingToServer) {
    e.preventDefault();
    e.returnValue = "Perubahan sedang disimpan ke server. Tetap tinggalkan halaman?";
    return e.returnValue;
  }
});

let syncTimeout = null;
async function saveDataAndSync() {
  // Post message to iframe for instant live preview update
  const iframe = document.getElementById("previewIframe");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: "UPDATE_INVITATION_DATA",
      payload: currentData
    }, "*");
  }

  updateStats();

  // Debounce API call for general settings/theme text
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(forceSaveToServer, 800);
}

async function forceSaveToServer() {
  const saveBtnText = document.getElementById("saveBtnText");
  const saveBtn = document.getElementById("btnManualSave");
  
  if (saveBtnText) saveBtnText.textContent = "Menyimpan...";
  if (saveBtn) saveBtn.style.opacity = "0.7";
  isSavingToServer = true;

  try {
    const password = localStorage.getItem("admin_password") || "";
    const res = await fetch("/api/config", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-Admin-Password": password
      },
      body: JSON.stringify(currentData)
    });
    
    if (res.status === 401) {
      alert("Sesi berakhir atau PIN salah. Silakan muat ulang halaman.");
      showPasswordOverlay();
    } else if (res.ok) {
      if (saveBtnText) saveBtnText.textContent = "Tersimpan ✅";
      setTimeout(() => {
        if (saveBtnText) saveBtnText.textContent = "Simpan Perubahan";
      }, 2000);
      return true;
    }
  } catch(err) {
    console.error("Failed to sync config to server", err);
    if (saveBtnText) saveBtnText.textContent = "Gagal Menyimpan ❌";
    showToast("Gagal menyimpan ke server. Periksa koneksi internet!");
  } finally {
    isSavingToServer = false;
    if (saveBtn) saveBtn.style.opacity = "1";
  }
  return false;
}

async function atomicGuestApi(payload) {
  isSavingToServer = true;
  const password = localStorage.getItem("admin_password") || "";
  try {
    const res = await fetch("/api/admin/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Password": password
      },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.guestList && Array.isArray(data.guestList)) {
        currentData.guestList = data.guestList;
        localStorage.setItem("local_guestList_backup", JSON.stringify(currentData.guestList));
        updateStats();
        return true;
      }
    } else if (res.status === 401) {
      alert("Sesi berakhir atau PIN salah. Silakan masukkan PIN kembali.");
      showPasswordOverlay();
      return false;
    }
  } catch(e) {
    console.error("Atomic guest API network error:", e);
    localStorage.setItem("local_guestList_backup", JSON.stringify(currentData.guestList));
    showToast("Koneksi bermasalah. Data dicadangkan di memori perangkat.");
  } finally {
    isSavingToServer = false;
  }
  return false;
}

function updateStats() {
  const guestCountEl = document.getElementById("statGuestCount");
  const guestBadgeEl = document.getElementById("guestCountBadge");
  const totalGuests = (currentData.guestList || []).length;

  if (guestCountEl) guestCountEl.textContent = totalGuests;
  if (guestBadgeEl) guestBadgeEl.textContent = totalGuests;
}

// Sidebar Navigation
function setupTabNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabContents = document.querySelectorAll(".tab-content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");

      navItems.forEach(nav => nav.classList.remove("active"));
      tabContents.forEach(tab => tab.classList.remove("active"));

      item.classList.add("active");
      const targetTab = document.getElementById(tabId);
      if (targetTab) targetTab.classList.add("active");

      if (window.lucide) lucide.createIcons();
    });
  });
}

function safeSetVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

// Populate Inputs with Current State
function populateFormFields() {
  const { groom, bride, events } = currentData;
  const g = currentData.general || {};
  safeSetVal("inputCoupleNames", g.coupleNames || "");
  safeSetVal("inputEventDateISO", g.eventDateISO || "");
  safeSetVal("inputEventDateFormatted", g.eventDateFormatted || "");
  safeSetVal("inputQuote", g.quote || "");
  safeSetVal("inputBgMusicUrl", g.bgMusicUrl || "");
  
  updateImagePreview("heroImgThumb", g.heroImageUrl);

  // Groom
  safeSetVal("inputGroomCallName", groom.callName || "");
  safeSetVal("inputGroomFullName", groom.fullName || "");
  safeSetVal("inputGroomParents", groom.parents || "");
  safeSetVal("inputGroomIgHandle", groom.igHandle || "");
  safeSetVal("inputGroomIgUrl", groom.igUrl || "");
  safeSetVal("inputGroomAvatarUrl", groom.avatarUrl || "");
  safeSetVal("inputGroomZoom", groom.zoom || 1.0);
  updateImagePreview("groomImgThumb", groom.avatarUrl);
  const groomThumb = document.getElementById("groomImgThumb");
  const groomZoomText = document.getElementById("groomZoomVal");
  if (groomThumb) {
    groomThumb.style.width = `calc(100% * ${groom.zoom || 1.0})`;
    groomThumb.style.height = `calc(100% * ${groom.zoom || 1.0})`;
    groomThumb.style.maxWidth = "none";
    groomThumb.style.maxHeight = "none";
    const x = groom.offsetX || 0;
    const y = groom.offsetY || 0;
    const z = groom.zoom || 1.0;
    groomThumb.style.transform = `translate(${x / z}%, ${y / z}%)`;
  }
  if (groomZoomText) groomZoomText.textContent = `${(groom.zoom || 1.0).toFixed(2)}x`;

  // Bride
  safeSetVal("inputBrideCallName", bride.callName || "");
  safeSetVal("inputBrideFullName", bride.fullName || "");
  safeSetVal("inputBrideParents", bride.parents || "");
  safeSetVal("inputBrideIgHandle", bride.igHandle || "");
  safeSetVal("inputBrideIgUrl", bride.igUrl || "");
  safeSetVal("inputBrideAvatarUrl", bride.avatarUrl || "");
  safeSetVal("inputBrideZoom", bride.zoom || 1.0);
  updateImagePreview("brideImgThumb", bride.avatarUrl);
  const brideThumb = document.getElementById("brideImgThumb");
  const brideZoomText = document.getElementById("brideZoomVal");
  if (brideThumb) {
    brideThumb.style.width = `calc(100% * ${bride.zoom || 1.0})`;
    brideThumb.style.height = `calc(100% * ${bride.zoom || 1.0})`;
    brideThumb.style.maxWidth = "none";
    brideThumb.style.maxHeight = "none";
    const x = bride.offsetX || 0;
    const y = bride.offsetY || 0;
    const z = bride.zoom || 1.0;
    brideThumb.style.transform = `translate(${x / z}%, ${y / z}%)`;
  }
  if (brideZoomText) brideZoomText.textContent = `${(bride.zoom || 1.0).toFixed(2)}x`;

  // Events
  safeSetVal("inputAkadDate", events.akadDate || "");
  safeSetVal("inputAkadTime", events.akadTime || "");
  safeSetVal("inputAkadLocation", events.akadLocation || "");
  safeSetVal("inputAkadMapUrl", events.akadMapUrl || "");

  safeSetVal("inputResepsiDate", events.resepsiDate || "");
  safeSetVal("inputResepsiTime", events.resepsiTime || "");
  safeSetVal("inputResepsiLocation", events.resepsiLocation || "");
  safeSetVal("inputResepsiMapUrl", events.resepsiMapUrl || "");
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
  
  // Strip ImageBB thumbnail/medium prefixes (e.g. .md.jpg, .th.jpg -> .jpg)
  clean = clean.replace(/\.(md|th)(?=\.[a-zA-Z0-9]+$)/, '');
  
  return clean;
}

function updateImagePreview(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const cleanUrl = sanitizeImageUrl(url);
  if (cleanUrl) {
    el.src = cleanUrl;
    el.style.display = 'block';
  } else {
    el.src = '';
    el.style.display = 'none';
  }
}

// Bind Inputs
function setupInputListeners() {
  const bindInput = (id, path, previewId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const keys = path.split(".");
      if (keys.length === 2) {
        let val = el.value;
        if (keys[1] === "zoom") {
          val = parseFloat(val) || 1.0;
          // Apply live zoom scale to thumb and label in real time
          const prefix = keys[0];
          const thumbId = prefix === "groom" ? "groomImgThumb" : "brideImgThumb";
          const labelId = prefix === "groom" ? "groomZoomVal" : "brideZoomVal";
          const thumbEl = document.getElementById(thumbId);
          const labelEl = document.getElementById(labelId);
          const x = currentData[prefix].offsetX || 0;
          const y = currentData[prefix].offsetY || 0;
          if (thumbEl) {
          thumbEl.style.width = `calc(100% * ${val})`;
          thumbEl.style.height = `calc(100% * ${val})`;
          thumbEl.style.maxWidth = "none";
          thumbEl.style.maxHeight = "none";
          thumbEl.style.transform = `translate(${x / val}%, ${y / val}%)`;
        }
          if (labelEl) labelEl.textContent = `${val.toFixed(2)}x`;
        }
        currentData[keys[0]][keys[1]] = val;
      }
      if (previewId) {
        updateImagePreview(previewId, el.value);
      }
      saveDataAndSync();
    });
  };

  // General
  bindInput("inputCoupleNames", "general.coupleNames");
  bindInput("inputEventDateFormatted", "general.eventDateFormatted");
  bindInput("inputEventDateISO", "general.eventDateISO");
  bindInput("inputBgMusicUrl", "general.bgMusicUrl");
  bindInput("inputHeroImageUrl", "general.heroImageUrl", "heroImgThumb");
  bindInput("inputQuote", "general.quote");


  // Groom
  bindInput("inputGroomCallName", "groom.callName");
  bindInput("inputGroomFullName", "groom.fullName");
  bindInput("inputGroomParents", "groom.parents");
  bindInput("inputGroomIgHandle", "groom.igHandle");
  bindInput("inputGroomIgUrl", "groom.igUrl");
  bindInput("inputGroomAvatarUrl", "groom.avatarUrl", "groomImgThumb");
  bindInput("inputGroomZoom", "groom.zoom");

  // Bride
  bindInput("inputBrideCallName", "bride.callName");
  bindInput("inputBrideFullName", "bride.fullName");
  bindInput("inputBrideParents", "bride.parents");
  bindInput("inputBrideIgHandle", "bride.igHandle");
  bindInput("inputBrideIgUrl", "bride.igUrl");
  bindInput("inputBrideAvatarUrl", "bride.avatarUrl", "brideImgThumb");
  bindInput("inputBrideZoom", "bride.zoom");

  // Events
  bindInput("inputAkadDate", "events.akadDate");
  bindInput("inputAkadTime", "events.akadTime");
  bindInput("inputAkadLocation", "events.akadLocation");
  bindInput("inputAkadMapUrl", "events.akadMapUrl");

  bindInput("inputResepsiDate", "events.resepsiDate");
  bindInput("inputResepsiTime", "events.resepsiTime");
  bindInput("inputResepsiLocation", "events.resepsiLocation");
  bindInput("inputResepsiMapUrl", "events.resepsiMapUrl");
}

// Dynamic Renderers
function renderDynamicLists() {
  renderStoriesList();
  renderGalleryList();
  renderGiftsList();
}

function renderStoriesList() {
  const container = document.getElementById("storiesList");
  if (!container) return;
  container.innerHTML = "";

  (currentData.stories || []).forEach((story, index) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <button class="btn-remove-item" onclick="removeStory(${index})">Hapus</button>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Tanggal / Momen</label>
          <input type="text" class="form-input" value="${escapeHtml(story.date)}" oninput="updateStory(${index}, 'date', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Judul Momen</label>
          <input type="text" class="form-input" value="${escapeHtml(story.title)}" oninput="updateStory(${index}, 'title', this.value)">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Keterangan / Cerita Singkat</label>
          <textarea class="form-textarea" rows="2" oninput="updateStory(${index}, 'desc', this.value)">${escapeHtml(story.desc)}</textarea>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.updateStory = function(index, field, value) {
  currentData.stories[index][field] = value;
  saveDataAndSync();
};

window.removeStory = function(index) {
  currentData.stories.splice(index, 1);
  renderStoriesList();
  saveDataAndSync();
};

const btnAddStory = document.getElementById("btnAddStory");
if (btnAddStory) {
  btnAddStory.addEventListener("click", () => {
    if (!currentData.stories) currentData.stories = [];
    currentData.stories.push({ date: "Tanggal Momen", title: "Judul Momen", desc: "Deskripsi singkat..." });
    renderStoriesList();
    saveDataAndSync();
  });
}

// Gallery List
// Gallery List
function renderGalleryList() {
  const container = document.getElementById("galleryList");
  if (!container) return;
  container.innerHTML = "";

  (currentData.gallery || []).forEach((img, index) => {
    const isObj = typeof img === 'object' && img !== null;
    const url = isObj ? img.url : img;
    const zoom = isObj ? (img.zoom || 1.0) : 1.0;
    const x = isObj ? (img.offsetX || 0) : 0;
    const y = isObj ? (img.offsetY || 0) : 0;

    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <button class="btn-remove-item" onclick="removeGallery(${index})">Hapus</button>
      <div class="form-grid" style="margin-top: 10px;">
        <div class="form-group" style="grid-column: span 2; margin-bottom: 0;">
          <label class="form-label">URL / Path Foto Galeri #${index + 1}</label>
          <input type="text" class="form-input" value="${escapeHtml(url)}" oninput="updateGalleryPath(${index}, this.value)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Zoom Foto Galeri #${index + 1}</label>
          <input type="range" min="1" max="3" step="0.05" value="${zoom}" class="form-input" style="height: 38px; padding: 0;" oninput="updateGalleryZoom(${index}, this.value)">
          <div class="help-text">Sesuaikan pembesaran foto galeri ini.</div>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Preview (Klik & Geser untuk Pasin Tengah)</label>
          <div class="img-preview-box" style="margin-top: 5px; border-radius: 8px; padding: 8px 12px;">
            <div id="galleryPreviewContainer-${index}" class="gallery-preview-container" style="width: 70px; height: 70px; border-radius: 8px; overflow: hidden; border: 1px solid var(--admin-border); background: #f1f5f9; cursor: grab; position: relative;">
              <img id="galleryPreviewThumb-${index}" class="img-preview-thumb-gallery" src="${escapeHtml(sanitizeImageUrl(url))}" alt="Gallery Preview" 
                   style="width: calc(100% * ${zoom}); height: calc(100% * ${zoom}); max-width: none; max-height: none; object-fit: cover; transform: translate(${x / zoom}%, ${y / zoom}%); transform-origin: center center; position: absolute;">
            </div>
            <div class="img-preview-info">
              Drag di dalam kotak preview<br>
              <span id="galleryZoomVal-${index}" style="font-weight:700; color:var(--admin-primary);">${zoom.toFixed(2)}x</span>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
    
    // Setup dragging/panning
    setTimeout(() => {
      makeGalleryPanable(index);
    }, 0);
  });
}

window.updateGalleryPath = function(index, value) {
  let img = currentData.gallery[index];
  if (typeof img !== 'object' || img === null) {
    img = { url: value, zoom: 1.0, offsetX: 0, offsetY: 0 };
  } else {
    img.url = value;
  }
  currentData.gallery[index] = img;
  
  const thumb = document.getElementById(`galleryPreviewThumb-${index}`);
  if (thumb) {
    thumb.src = sanitizeImageUrl(value);
  }
  saveDataAndSync();
};

window.updateGalleryZoom = function(index, value) {
  let img = currentData.gallery[index];
  const zoomVal = parseFloat(value) || 1.0;
  if (typeof img !== 'object' || img === null) {
    img = { url: "assets/wp-content/uploads/2026/06/p-1-1-3.jpg", zoom: zoomVal, offsetX: 0, offsetY: 0 };
  } else {
    img.zoom = zoomVal;
  }
  currentData.gallery[index] = img;

  const thumb = document.getElementById(`galleryPreviewThumb-${index}`);
  const label = document.getElementById(`galleryZoomVal-${index}`);
  if (thumb) {
    thumb.style.width = `calc(100% * ${zoomVal})`;
    thumb.style.height = `calc(100% * ${zoomVal})`;
    thumb.style.maxWidth = "none";
    thumb.style.maxHeight = "none";
    thumb.style.transform = `translate(${(img.offsetX || 0) / zoomVal}%, ${(img.offsetY || 0) / zoomVal}%)`;
  }
  if (label) {
    label.textContent = `${zoomVal.toFixed(2)}x`;
  }
  saveDataAndSync();
};

window.removeGallery = function(index) {
  currentData.gallery.splice(index, 1);
  renderGalleryList();
  saveDataAndSync();
};

const btnAddGallery = document.getElementById("btnAddGallery");
if (btnAddGallery) {
  btnAddGallery.addEventListener("click", () => {
    if (!currentData.gallery) currentData.gallery = [];
    currentData.gallery.push({
      url: "assets/wp-content/uploads/2026/06/p-1-1-3.jpg",
      zoom: 1.0,
      offsetX: 0,
      offsetY: 0
    });
    renderGalleryList();
    saveDataAndSync();
  });
}

// Gifts List with Indonesian Bank Selection & Logo Badges
function renderGiftsList() {
  const container = document.getElementById("giftsList");
  if (!container) return;
  container.innerHTML = "";

  (currentData.gifts || []).forEach((gift, index) => {
    const bankInfo = getBankInfo(gift.bank);
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <button class="btn-remove-item" onclick="removeGift(${index})">Hapus</button>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Pilih Bank / E-Wallet</label>
          <select class="form-select" onchange="updateGift(${index}, 'bank', this.value)">
            ${INDONESIA_BANKS.map(b => `<option value="${b.code}" ${bankInfo.code === b.code || (gift.bank && gift.bank.toUpperCase() === b.code) ? 'selected' : ''}>${b.name}</option>`).join('')}
          </select>
          ${bankInfo.logo ? `
            <div style="margin-top:10px; display:flex; align-items:center; gap:10px; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0;">
              <img src="${bankInfo.logo}" style="height:26px; max-width:90px; object-fit:contain;" alt="${bankInfo.name}">
              <span style="font-size:0.8rem; font-weight:700; color:var(--admin-text);">${bankInfo.name}</span>
            </div>
          ` : ''}
        </div>
        <div class="form-group">
          <label class="form-label">Nomor Rekening / HP</label>
          <input type="text" class="form-input" value="${escapeHtml(gift.number)}" oninput="updateGift(${index}, 'number', this.value)">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Atas Nama (a.n)</label>
          <input type="text" class="form-input" value="${escapeHtml(gift.name)}" oninput="updateGift(${index}, 'name', this.value)">
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.updateGift = function(index, field, value) {
  currentData.gifts[index][field] = value;
  if (field === 'bank') {
    renderGiftsList();
  }
  saveDataAndSync();
};

window.removeGift = function(index) {
  currentData.gifts.splice(index, 1);
  renderGiftsList();
  saveDataAndSync();
};

const btnAddGift = document.getElementById("btnAddGift");
if (btnAddGift) {
  btnAddGift.addEventListener("click", () => {
    if (!currentData.gifts) currentData.gifts = [];
    currentData.gifts.push({ bank: "BCA", number: "1234567890", name: "Nama Pemilik" });
    renderGiftsList();
    saveDataAndSync();
  });
}

// Header Actions (Export, Import, Reset)
function setupHeaderActions() {
  const btnManualSave = document.getElementById("btnManualSave");
  if (btnManualSave) {
    btnManualSave.addEventListener("click", () => {
      forceSaveToServer();
    });
  }

  const btnExport = document.getElementById("btnExportJson");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "invitation_config.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Konfigurasi berhasil diexport!");
    });
  }

  const btnImport = document.getElementById("btnImportJson");
  if (btnImport) {
    btnImport.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          currentData = Object.assign({}, JSON.parse(JSON.stringify(defaultData)), imported);
          saveDataAndSync();
          populateFormFields();
          renderDynamicLists();
          renderGuestTable();
          showToast("Konfigurasi JSON berhasil diimport!");
        } catch (err) {
          alert("Gagal membaca file JSON. Pastikan format valid!");
        }
      };
      reader.readAsText(file);
    });
  }

  const btnReset = document.getElementById("btnResetDefault");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?")) {
        currentData = JSON.parse(JSON.stringify(defaultData));
        saveDataAndSync();
        populateFormFields();
        renderDynamicLists();
        renderGuestTable();
        showToast("Data berhasil di-reset ke default!");
      }
    });
  }

  const btnLogout = document.getElementById("btnLogoutAdmin");
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      if (confirm("Apakah Anda yakin ingin keluar dari Admin Panel?")) {
        try {
          await fetch("/api/admin/logout", { method: "POST" });
        } catch(e) {}
        localStorage.removeItem("admin_password");
        window.location.reload();
      }
    });
  }
}

// --- WHATSAPP BROADCAST & GUEST MANAGER LOGIC ---
function updateWaTemplateUI() {
  const inputTpl = document.getElementById("inputWaTemplate");
  if (!inputTpl) return;
  const activeTpl = currentData.waTemplates.active || "formal";
  inputTpl.value = currentData.waTemplates[activeTpl] || defaultData.waTemplates.formal;
  
  document.querySelectorAll(".template-pill").forEach(p => p.classList.remove("active"));
  const activePill = document.getElementById(`btnTpl${activeTpl.charAt(0).toUpperCase() + activeTpl.slice(1)}`);
  if (activePill) activePill.classList.add("active");
}

function setupWaGeneratorLogic() {
  if (!currentData.waTemplates) {
    currentData.waTemplates = JSON.parse(JSON.stringify(defaultData.waTemplates));
  }
  if (!currentData.guestList) {
    currentData.guestList = JSON.parse(JSON.stringify(defaultData.guestList));
  }

  updateWaTemplateUI();

  // Single Guest Add (Atomic API - Zero Data Loss)
  const btnSingle = document.getElementById("btnAddSingleGuest");
  if (btnSingle) {
    btnSingle.addEventListener("click", async () => {
      const nameInput = document.getElementById("inputGuestName");
      const phoneInput = document.getElementById("inputGuestPhone");
      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";

      if (!name) {
        alert("Silakan masukkan nama tamu!");
        return;
      }

      btnSingle.disabled = true;
      btnSingle.textContent = "Menyimpan...";

      const newGuest = {
        id: Date.now(),
        name: name,
        phone: phone
      };

      currentData.guestList.unshift(newGuest);
      guestCurrentPage = 1;

      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";

      renderGuestTable();
      const saved = await atomicGuestApi({ action: 'add', guest: newGuest });
      btnSingle.disabled = false;
      btnSingle.innerHTML = `<i data-lucide="user-plus"></i> Tambah ke Daftar`;
      if (window.lucide) lucide.createIcons();

      if (saved) {
        showToast(`Tamu "${name}" tersimpan permanen di No. 1!`);
      }
    });
  }

  // Batch Multi Guest Add (Atomic API - Zero Data Loss)
  const btnBatch = document.getElementById("btnAddBatchGuests");
  if (btnBatch) {
    btnBatch.addEventListener("click", async () => {
      const batchInput = document.getElementById("inputBatchGuests");
      if (!batchInput) return;
      const rawText = batchInput.value.trim();
      if (!rawText) {
        alert("Silakan masukkan daftar nama tamu!");
        return;
      }

      const lines = rawText.split("\n");
      const newGuests = [];

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        let name = trimmed;
        let phone = "";

        if (trimmed.includes("|")) {
          const parts = trimmed.split("|");
          name = parts[0].trim();
          phone = parts[1].trim();
        }

        if (name) {
          newGuests.push({
            id: Date.now() + Math.random(),
            name: name,
            phone: phone
          });
        }
      });

      if (newGuests.length > 0) {
        btnBatch.disabled = true;
        btnBatch.textContent = "Menyimpan...";

        currentData.guestList = [...newGuests, ...currentData.guestList];
        guestCurrentPage = 1;
        batchInput.value = "";
        
        renderGuestTable();
        const saved = await atomicGuestApi({ action: 'batch_add', guests: newGuests });
        btnBatch.disabled = false;
        btnBatch.innerHTML = `<i data-lucide="users"></i> Impor Semua`;
        if (window.lucide) lucide.createIcons();

        if (saved) {
          showToast(`${newGuests.length} tamu berhasil disimpan permanen ke database!`);
        }
      }
    });
  }

  // Contact Picker: Single Contact (from Phone Book)
  const btnPickSingle = document.getElementById("btnPickContactSingle");
  if (btnPickSingle) {
    btnPickSingle.addEventListener("click", async () => {
      if ("contacts" in navigator && "ContactsManager" in window) {
        try {
          const contacts = await navigator.contacts.select(["name", "tel"], { multiple: false });
          if (contacts && contacts.length > 0) {
            const c = contacts[0];
            const name = (c.name && c.name[0]) || "";
            const rawTel = (c.tel && c.tel[0]) || "";
            const cleanPhone = rawTel.replace(/[^0-9+]/g, "");

            const nameInput = document.getElementById("inputGuestName");
            const phoneInput = document.getElementById("inputGuestPhone");
            if (nameInput) nameInput.value = name;
            if (phoneInput) phoneInput.value = cleanPhone;
            showToast(`Kontak "${name}" berhasil dimuat!`);
          }
        } catch (err) {
          console.log("Contact pick cancelled:", err);
        }
      } else {
        alert("Fitur Contact Picker didukung pada browser Google Chrome di HP Android via HTTPS. Untuk iPhone/Laptop, Anda bisa menggunakan tombol '📁 Impor File Kontak (.vcf / vCard)'.");
      }
    });
  }

  // Contact Picker: Batch Multi-Contacts (from Phone Book)
  const btnPickBatch = document.getElementById("btnPickContactBatch");
  if (btnPickBatch) {
    btnPickBatch.addEventListener("click", async () => {
      if ("contacts" in navigator && "ContactsManager" in window) {
        try {
          const contacts = await navigator.contacts.select(["name", "tel"], { multiple: true });
          if (contacts && contacts.length > 0) {
            const newGuests = contacts.map(c => {
              const name = (c.name && c.name[0]) || "Tamu";
              const rawTel = (c.tel && c.tel[0]) || "";
              return {
                id: Date.now() + Math.random(),
                name: name.trim(),
                phone: rawTel.replace(/[^0-9+]/g, "").trim()
              };
            }).filter(g => g.name);

            if (newGuests.length > 0) {
              btnPickBatch.disabled = true;
              btnPickBatch.textContent = "Menyimpan...";

              currentData.guestList = [...newGuests, ...currentData.guestList];
              guestCurrentPage = 1;
              renderGuestTable();

              const saved = await atomicGuestApi({ action: "batch_add", guests: newGuests });
              btnPickBatch.disabled = false;
              btnPickBatch.innerHTML = `<i data-lucide="users" style="width:16px; height:16px;"></i> 📱 Pilih Banyak Kontak dari HP`;
              if (window.lucide) lucide.createIcons();

              if (saved) {
                showToast(`${newGuests.length} kontak berhasil diimpor dari HP!`);
              }
            }
          }
        } catch (err) {
          console.log("Batch contact pick cancelled:", err);
        }
      } else {
        alert("Fitur Pilih Kontak HP didukung pada Google Chrome di HP Android. Untuk iPhone/Laptop, Anda bisa mengekspor kontak ke file .vcf dan klik '📁 Impor File Kontak (.vcf)'.");
      }
    });
  }

  // vCard (.vcf) File Importer
  const inputVcf = document.getElementById("inputVcfFile");
  if (inputVcf) {
    inputVcf.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async function(event) {
        const vcfText = event.target.result;
        const parsed = parseVCardText(vcfText);
        if (parsed.length === 0) {
          alert("Tidak ada kontak yang terbaca dari file vCard (.vcf) ini.");
          return;
        }

        if (confirm(`Ditemukan ${parsed.length} kontak dari file "${file.name}". Impor semua ke Buku Tamu?`)) {
          currentData.guestList = [...parsed, ...currentData.guestList];
          guestCurrentPage = 1;
          renderGuestTable();

          const saved = await atomicGuestApi({ action: "batch_add", guests: parsed });
          if (saved) {
            showToast(`${parsed.length} kontak berhasil diimpor dari file!`);
          }
        }
        inputVcf.value = "";
      };
      reader.readAsText(file);
    });
  }

  renderGuestTable();
}

function parseVCardText(vcfText) {
  const contacts = [];
  const cards = vcfText.split(/END:VCARD/i);
  for (const card of cards) {
    if (!card.trim()) continue;
    let name = '';
    let phone = '';

    const fnMatch = card.match(/^FN(?:;[^:]*)?:([^\r\n]+)/im);
    if (fnMatch && fnMatch[1]) {
      name = fnMatch[1].trim();
    } else {
      const nMatch = card.match(/^N(?:;[^:]*)?:([^;\r\n]*)(?:;([^;\r\n]*))?/im);
      if (nMatch) {
        const family = (nMatch[1] || '').trim();
        const given = (nMatch[2] || '').trim();
        name = (given ? `${given} ${family}` : family).trim();
      }
    }

    const telMatch = card.match(/^TEL(?:;[^:]*)?:([^\r\n]+)/im);
    if (telMatch && telMatch[1]) {
      phone = telMatch[1].trim().replace(/[^0-9+]/g, '');
    }

    if (name && name.toUpperCase() !== 'VCARD') {
      contacts.push({
        id: Date.now() + Math.random(),
        name: name,
        phone: phone
      });
    }
  }
  return contacts;
}

window.switchWaTemplate = function(type) {
  if (!currentData.waTemplates) currentData.waTemplates = JSON.parse(JSON.stringify(defaultData.waTemplates));
  currentData.waTemplates.active = type;

  document.querySelectorAll(".template-pill").forEach(p => p.classList.remove("active"));
  const activePill = document.getElementById(`btnTpl${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (activePill) activePill.classList.add("active");

  const inputTpl = document.getElementById("inputWaTemplate");
  if (inputTpl) {
    inputTpl.value = currentData.waTemplates[type] || defaultData.waTemplates[type];
  }

  saveDataAndSync();
  renderGuestTable();
};

function refreshWaTemplateUI() {
  const inputTpl = document.getElementById("inputWaTemplate");
  if (inputTpl) {
    const activeTpl = currentData.waTemplates.active || "formal";
    inputTpl.value = currentData.waTemplates[activeTpl] || defaultData.waTemplates.formal;
    
    document.querySelectorAll(".template-pill").forEach(p => p.classList.remove("active"));
    const activePill = document.getElementById(`btnTpl${activeTpl.charAt(0).toUpperCase() + activeTpl.slice(1)}`);
    if (activePill) activePill.classList.add("active");
  }
}

// Initial setup for the textarea listener (only bound once)
document.addEventListener("DOMContentLoaded", () => {
  const inputTpl = document.getElementById("inputWaTemplate");
  if (inputTpl) {
    inputTpl.addEventListener("input", () => {
      const activeKey = currentData.waTemplates.active || "formal";
      currentData.waTemplates[activeKey] = inputTpl.value;
      forceSaveToServer();
      renderGuestTable();
    });
  }
});

window.insertTag = function(tag) {
  const inputTpl = document.getElementById("inputWaTemplate");
  if (!inputTpl) return;

  const startPos = inputTpl.selectionStart;
  const endPos = inputTpl.selectionEnd;
  const oldText = inputTpl.value;

  inputTpl.value = oldText.substring(0, startPos) + tag + oldText.substring(endPos, oldText.length);
  inputTpl.focus();
  inputTpl.selectionStart = startPos + tag.length;
  inputTpl.selectionEnd = startPos + tag.length;

  const activeKey = (currentData.waTemplates && currentData.waTemplates.active) || "formal";
  currentData.waTemplates[activeKey] = inputTpl.value;
  saveDataAndSync();
  renderGuestTable();
};

function formatWaPhone(phone) {
  if (!phone) return "";
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned;
}

function getInvitationBaseUrl() {
  const currentUrl = window.location.href;
  const basePath = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
  return `${basePath}/index.html`;
}

let guestSearchQuery = "";
let guestCurrentPage = 1;
let guestPageSize = 10;

function renderGuestTable() {
  const container = document.getElementById("guestListContainer");
  if (!container) return;
  container.innerHTML = "";

  const allGuests = currentData.guestList || [];

  if (allGuests.length === 0) {
    container.innerHTML = `<div style="text-align:center; color: var(--admin-text-muted); padding: 40px 20px;">Belum ada tamu undangan. Silakan tambah tamu di atas.</div>`;
    updateStats();
    return;
  }

  // 1. Search Toolbar Element
  const toolbar = document.createElement("div");
  toolbar.className = "guest-toolbar";
  toolbar.innerHTML = `
    <div class="guest-search-wrap">
      <i data-lucide="search" class="guest-search-icon"></i>
      <input type="text" id="inputGuestSearch" class="guest-search-input" placeholder="Cari nama tamu atau no. HP..." value="${escapeHtml(guestSearchQuery)}">
    </div>
    <div class="guest-page-size-wrap">
      <span>Tampilkan:</span>
      <select id="selectGuestPageSize" class="guest-page-size">
        <option value="10" ${guestPageSize === 10 ? 'selected' : ''}>10</option>
        <option value="25" ${guestPageSize === 25 ? 'selected' : ''}>25</option>
        <option value="50" ${guestPageSize === 50 ? 'selected' : ''}>50</option>
        <option value="1000" ${guestPageSize === 1000 ? 'selected' : ''}>Semua</option>
      </select>
    </div>
  `;
  container.appendChild(toolbar);

  // Attach toolbar listeners
  const searchInput = toolbar.querySelector("#inputGuestSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      guestSearchQuery = e.target.value;
      guestCurrentPage = 1;
      renderGuestTable();
      const newSearch = document.getElementById("inputGuestSearch");
      if (newSearch) {
        newSearch.focus();
        newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
      }
    });
  }

  const pageSizeSelect = toolbar.querySelector("#selectGuestPageSize");
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
      guestPageSize = parseInt(e.target.value, 10) || 10;
      guestCurrentPage = 1;
      renderGuestTable();
    });
  }

  // 2. Filter Guests
  const q = guestSearchQuery.trim().toLowerCase();
  const filteredGuests = allGuests.map((guest, originalIdx) => ({ guest, originalIdx }))
    .filter(({ guest }) => {
      if (!q) return true;
      const nameMatch = (guest.name || "").toLowerCase().includes(q);
      const phoneMatch = (guest.phone || "").replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, ""));
      return nameMatch || phoneMatch;
    });

  if (filteredGuests.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.style.cssText = "text-align:center; color: var(--admin-text-muted); padding: 30px 20px;";
    emptyMsg.textContent = `Tidak ditemukan tamu dengan kata kunci "${guestSearchQuery}".`;
    container.appendChild(emptyMsg);
    updateStats();
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 3. Pagination Math
  const totalItems = filteredGuests.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / guestPageSize));
  if (guestCurrentPage > totalPages) guestCurrentPage = totalPages;
  if (guestCurrentPage < 1) guestCurrentPage = 1;

  const startIndex = (guestCurrentPage - 1) * guestPageSize;
  const endIndex = Math.min(startIndex + guestPageSize, totalItems);
  const pagedGuests = filteredGuests.slice(startIndex, endIndex);

  // 4. Render Guest Items
  const baseUrl = getInvitationBaseUrl();
  const activeTplKey = (currentData.waTemplates && currentData.waTemplates.active) || "formal";
  const rawTplText = (currentData.waTemplates && currentData.waTemplates[activeTplKey]) || defaultData.waTemplates.formal;

  const listWrap = document.createElement("div");
  listWrap.className = "guest-items-list";

  pagedGuests.forEach(({ guest, originalIdx }, pageIdx) => {
    const itemNumber = startIndex + pageIdx + 1;
    const encodedName = encodeURIComponent(guest.name);
    const guestLink = `${baseUrl}?to=${encodedName}`;
    const formattedPhone = formatWaPhone(guest.phone);

    // Compile Message
    let compiledMsg = rawTplText;
    compiledMsg = compiledMsg.replace(/{NAMA_TAMU}/g, guest.name);
    compiledMsg = compiledMsg.replace(/{NAMA_MEMPELAI}/g, currentData.general.coupleNames || "Lutfi & Firdha");
    compiledMsg = compiledMsg.replace(/{TANGGAL}/g, currentData.general.eventDateFormatted || "26 Agustus 2026");
    compiledMsg = compiledMsg.replace(/{LOKASI}/g, (currentData.events && currentData.events.akadLocation) || "Lokasi Acara");
    compiledMsg = compiledMsg.replace(/{LINK_UNDANGAN}/g, guestLink);

    const waUrl = formattedPhone 
      ? `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(compiledMsg)}`
      : `whatsapp://send?text=${encodeURIComponent(compiledMsg)}`;

    const item = document.createElement("div");
    item.className = "guest-list-item";
    item.innerHTML = `
      <div class="guest-info">
        <div class="guest-name">
          <span class="guest-number">#${itemNumber}</span> 
          <strong>${escapeHtml(guest.name)}</strong>
        </div>
        <div class="guest-details">
          <span class="guest-phone"><i data-lucide="phone" style="width:12px;"></i> ${guest.phone ? escapeHtml(guest.phone) : '(Tanpa HP)'}</span>
          <a href="${guestLink}" target="_blank" class="guest-link"><i data-lucide="link" style="width:12px;"></i> ${escapeHtml(guestLink.substring(0, 35))}...</a>
        </div>
      </div>
      <div class="guest-actions">
        <a href="${waUrl}" target="_blank" class="btn-action-sm btn-wa-send" title="Kirim WA">
          <i data-lucide="send" style="width:14px;"></i> Kirim
        </a>
        <button class="btn-action-sm btn-copy-link" onclick="copyGuestLink('${escapeHtml(guestLink)}')" title="Salin Link">
          <i data-lucide="copy" style="width:14px;"></i> Salin
        </button>
        <button class="btn-action-sm btn-delete-guest" onclick="deleteGuest(${originalIdx})" title="Hapus Tamu">
          <i data-lucide="trash-2" style="width:14px;"></i>
        </button>
      </div>
    `;
    listWrap.appendChild(item);
  });
  container.appendChild(listWrap);

  // 5. Pagination Bar
  if (totalPages > 1 || totalItems > 10) {
    const pagBar = document.createElement("div");
    pagBar.className = "pagination-bar";

    let pageBtnsHtml = '';
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages <= 7 || p === 1 || p === totalPages || (p >= guestCurrentPage - 1 && p <= guestCurrentPage + 1)) {
        pageBtnsHtml += `<button class="page-btn ${p === guestCurrentPage ? 'active' : ''}" onclick="goToGuestPage(${p})">${p}</button>`;
      } else if (p === guestCurrentPage - 2 || p === guestCurrentPage + 2) {
        pageBtnsHtml += `<span style="padding: 0 4px; color: var(--admin-text-muted);">...</span>`;
      }
    }

    pagBar.innerHTML = `
      <div class="pagination-info">
        Menampilkan <strong>${startIndex + 1} - ${endIndex}</strong> dari <strong>${totalItems}</strong> tamu
      </div>
      <div class="pagination-controls">
        <button class="page-btn" onclick="goToGuestPage(${guestCurrentPage - 1})" ${guestCurrentPage <= 1 ? 'disabled' : ''} title="Halaman Sebelumnya">
          <i data-lucide="chevron-left" style="width:14px; height:14px;"></i>
        </button>
        ${pageBtnsHtml}
        <button class="page-btn" onclick="goToGuestPage(${guestCurrentPage + 1})" ${guestCurrentPage >= totalPages ? 'disabled' : ''} title="Halaman Selanjutnya">
          <i data-lucide="chevron-right" style="width:14px; height:14px;"></i>
        </button>
      </div>
    `;
    container.appendChild(pagBar);
  }

  updateStats();
  if (window.lucide) lucide.createIcons();
}

window.goToGuestPage = function(page) {
  guestCurrentPage = page;
  renderGuestTable();
};

window.copyGuestLink = function(link) {
  navigator.clipboard.writeText(link).then(() => {
    showToast("Link undangan berhasil disalin!");
  });
};

window.deleteGuest = async function(index) {
  if (!confirm("Hapus tamu ini dari daftar?")) return;
  const guestToDelete = currentData.guestList[index];
  currentData.guestList.splice(index, 1);
  renderGuestTable();
  if (guestToDelete && guestToDelete.id) {
    await atomicGuestApi({ action: 'delete', id: guestToDelete.id });
  } else {
    await forceSaveToServer();
  }
  showToast("Tamu berhasil dihapus.");
};

// Render Admin RSVP Table
async function renderRsvpTable() {
  const tbody = document.getElementById("adminRsvpTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  let wishes = [];
  try {
    const res = await fetch("/api/wishes");
    if (res.ok) {
      wishes = await res.json();
    }
  } catch(e) {
    console.error("Failed to load wishes from server", e);
  }

  const wishesCountEl = document.getElementById("statWishesCount");
  if (wishesCountEl) wishesCountEl.textContent = wishes.length;

  if (wishes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--admin-text-muted);">Belum ada ucapan dari tamu.</td></tr>';
    return;
  }

  wishes.forEach((w, index) => {
    const safeAudio = sanitizeAudioSrc(w.audio);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(w.name)}</strong></td>
      <td>
        <div>${escapeHtml(w.text)}</div>
        ${safeAudio ? `
          <div style="margin-top: 6px;">
            <audio src="${safeAudio}" controls style="max-width: 260px; height: 32px;"></audio>
          </div>
        ` : ''}
      </td>
      <td style="color: var(--admin-text-muted); font-size: 0.75rem;">${escapeHtml(w.date)}</td>
      <td style="text-align: center;">
        <button class="btn-action-sm btn-delete-guest" onclick="deleteWish('${w.id}')" title="Hapus ucapan ini" style="color: var(--admin-danger);">
          <i data-lucide="trash-2" style="width:14px;"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (window.lucide) lucide.createIcons();
}

window.deleteWish = async function(id) {
  if (!confirm("Hapus ucapan ini?")) return;
  try {
    const password = localStorage.getItem("admin_password") || "";
    const res = await fetch(`/api/wishes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "X-Admin-Password": password }
    });
    if (res.ok) {
      showToast("Ucapan berhasil dihapus.");
      await renderRsvpTable();
    } else {
      alert("Gagal menghapus ucapan.");
    }
  } catch(e) {
    console.error("Failed to delete wish", e);
    alert("Terjadi kesalahan saat menghapus ucapan.");
  }
};

const btnClearWishes = document.getElementById("btnClearWishes");
if (btnClearWishes) {
  btnClearWishes.addEventListener("click", async () => {
    if (confirm("Hapus semua daftar ucapan tamu?")) {
      try {
        const password = localStorage.getItem("admin_password") || "";
        const res = await fetch("/api/wishes", { 
          method: "DELETE",
          headers: {
            "X-Admin-Password": password
          }
        });
        if (res.status === 401) {
          alert("Sesi berakhir atau password salah. Silakan muat ulang halaman.");
          showPasswordOverlay();
          return;
        }
        await renderRsvpTable();
        showToast("Semua ucapan tamu dihapus.");
      } catch(e) {
        console.error("Failed to clear wishes from server", e);
      }
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById("adminToast");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = msg;
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

function sanitizeAudioSrc(src) {
  if (!src || typeof src !== 'string') return '';
  const clean = src.trim();
  if (
    clean.startsWith('data:audio/') || 
    clean.startsWith('https://') || 
    clean.startsWith('/assets/') ||
    clean.startsWith('./')
  ) {
    return escapeHtml(clean);
  }
  return '';
}

// Interactive Image Pan/Drag Helper
function setupAvatarPan(containerId, imgId, zoomId, textId, pathPrefix) {
  const container = document.getElementById(containerId);
  const img = document.getElementById(imgId);
  if (!container || !img) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const startDrag = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    container.style.cursor = "grabbing";
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const pctX = (dx / containerWidth) * 100;
    const pctY = (dy / containerHeight) * 100;

    const dataObj = currentData[pathPrefix];
    let x = (dataObj.offsetX || 0) + pctX;
    let y = (dataObj.offsetY || 0) + pctY;
    let zoom = dataObj.zoom || 1.0;

    img.style.width = `calc(100% * ${zoom})`;
    img.style.height = `calc(100% * ${zoom})`;
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    img.style.transform = `translate(${x / zoom}%, ${y / zoom}%)`;

    startX = clientX;
    startY = clientY;

    dataObj.offsetX = x;
    dataObj.offsetY = y;
  };

  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      container.style.cursor = "grab";
      saveDataAndSync();
    }
  };

  container.addEventListener("mousedown", (e) => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    moveDrag(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", endDrag);

  // Touch support for mobiles
  container.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  });

  window.addEventListener("touchend", endDrag);
}

function makeGalleryPanable(index) {
  const container = document.getElementById(`galleryPreviewContainer-${index}`);
  const img = document.getElementById(`galleryPreviewThumb-${index}`);
  if (!container || !img) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const startDrag = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    container.style.cursor = "grabbing";
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const pctX = (dx / containerWidth) * 100;
    const pctY = (dy / containerHeight) * 100;

    let galleryItem = currentData.gallery[index];
    if (typeof galleryItem !== 'object' || galleryItem === null) {
      galleryItem = { url: img.src, zoom: 1.0, offsetX: 0, offsetY: 0 };
    }

    let x = (galleryItem.offsetX || 0) + pctX;
    let y = (galleryItem.offsetY || 0) + pctY;
    let zoom = galleryItem.zoom || 1.0;

    img.style.width = `calc(100% * ${zoom})`;
    img.style.height = `calc(100% * ${zoom})`;
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    img.style.transform = `translate(${x / zoom}%, ${y / zoom}%)`;

    startX = clientX;
    startY = clientY;

    galleryItem.offsetX = x;
    galleryItem.offsetY = y;
    currentData.gallery[index] = galleryItem;
  };

  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      container.style.cursor = "grab";
      saveDataAndSync();
    }
  };

  container.addEventListener("mousedown", (e) => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    moveDrag(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", endDrag);

  // Touch Support
  container.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  });

  window.addEventListener("touchend", endDrag);
}

// Password Lock Overlay Controller
function setupPasswordOverlay() {
  const overlay = document.getElementById("passwordOverlay");
  const input = document.getElementById("adminPasswordInput");
  const submitBtn = document.getElementById("btnSubmitPassword");
  const errorMsg = document.getElementById("passwordErrorMsg");

  if (!overlay || !input || !submitBtn) return;

  const trySubmit = async () => {
    const password = input.value.trim();
    if (!password) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "PIN tidak boleh kosong";
      return;
    }
    
    // Verify PIN against backend API and establish session
    submitBtn.textContent = "Memeriksa...";
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin_password", password);
        errorMsg.style.display = "none";
        hidePasswordOverlay();
        
        // SECURITY/DATA LOSS FIX: We must load the real data now that we have the PIN!
        await loadStoredData();
        
        // Refresh iframe preview to apply config
        const iframe = document.getElementById("previewIframe");
        if (iframe) iframe.src = iframe.src;
      } else {
        errorMsg.style.display = "block";
        errorMsg.textContent = data.error || "PIN salah!";
        input.value = "";
        input.focus();
      }
    } catch(e) {
      console.error(e);
      errorMsg.style.display = "block";
      errorMsg.textContent = "Gagal memverifikasi PIN";
    } finally {
      submitBtn.textContent = "Buka Akses";
    }
  };

  submitBtn.addEventListener("click", trySubmit);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") trySubmit();
  });
}

function showPasswordOverlay() {
  const overlay = document.getElementById("passwordOverlay");
  if (overlay) overlay.style.display = "flex";
}

function hidePasswordOverlay() {
  const overlay = document.getElementById("passwordOverlay");
  if (overlay) overlay.style.display = "none";
}
