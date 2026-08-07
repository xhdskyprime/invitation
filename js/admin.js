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

// Admin Dashboard Logic
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
    avatarUrl: "inv.wekita.id/wp-content/uploads/2026/06/sm-PRIA-e1725510474400-1-3.jpg"
  },
  bride: {
    callName: "Firdha",
    fullName: "Firdha, S.Ked.",
    parents: "Putri Kedua dari Bpk. Keluarga & Ibu Keluarga",
    igHandle: "@firdha",
    igUrl: "https://instagram.com",
    avatarUrl: "inv.wekita.id/wp-content/uploads/2026/06/sm-WANITA-e1725510489585-1-3.jpg"
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
    "inv.wekita.id/wp-content/uploads/2026/06/p-1-1-3.jpg",
    "inv.wekita.id/wp-content/uploads/2026/06/p-2-1-3.jpg",
    "inv.wekita.id/wp-content/uploads/2026/06/sm-1-5-e1725510309587-1-3.jpg",
    "inv.wekita.id/wp-content/uploads/2026/06/sm-1-6-e1725510241295-1-3.jpg"
  ],
  gifts: [
    { bank: "BCA", number: "1234567890", name: "Lutfi" },
    { bank: "MANDIRI", number: "9876543210", name: "Firdha" }
  ],
  guestList: [
    { id: 1, name: "Bapak Ahmad & Keluarga", phone: "081234567890" },
    { id: 2, name: "Ibu Susi & Suami", phone: "089876543210" },
    { id: 3, name: "Budi Santoso", phone: "" }
  ],
  waTemplates: {
    active: "formal",
    formal: `Kepada Yth.\nBapak/Ibu/Saudara/i {NAMA_TAMU}\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n{NAMA_MEMPELAI}\n\nInfo selengkapnya mengenai acara dapat diakses melalui link undangan digital berikut:\n{LINK_UNDANGAN}\n\nMerupakan suatu kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`,
    islami: `Assalamu'alaikum Wr. Wb.\n\nKepada Yth. {NAMA_TAMU}\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran pernikahan kami:\n\n{NAMA_MEMPELAI}\n\nUntuk info tanggal, waktu, dan lokasi acara selengkapnya dapat dilihat melalui tautan undangan berikut:\n{LINK_UNDANGAN}\n\nJazakumullah Khairan Katsiran atas doa dan kehadirannya.\n\nWassalamu'alaikum Wr. Wb.`,
    santai: `Halo {NAMA_TAMU}!\n\nKabar bahagia untuk kita semua! Kami mengundang kamu untuk hadir dan merayakan momen pernikahan kami:\n\n{NAMA_MEMPELAI}\n\nKlik link di bawah ini untuk info lengkapnya ya:\n{LINK_UNDANGAN}\n\nSampai jumpa di hari bahagia kami! 😊`
  }
};

let currentData = JSON.parse(JSON.stringify(defaultData));

document.addEventListener("DOMContentLoaded", async () => {
  await loadStoredData();
  setupTabNavigation();
  populateFormFields();
  setupInputListeners();
  renderDynamicLists();
  setupHeaderActions();
  setupWaGeneratorLogic();
  renderRsvpTable();
  updateStats();

  if (window.lucide) {
    lucide.createIcons();
  }
});

async function loadStoredData() {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      const data = await res.json();
      currentData = Object.assign({}, JSON.parse(JSON.stringify(defaultData)), data);
    }
  } catch(e) {
    console.error("Failed to load config from server, falling back to default", e);
    currentData = JSON.parse(JSON.stringify(defaultData));
  }
}

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

  try {
    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData)
    });
  } catch(err) {
    console.error("Failed to sync config to server", err);
  }
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

// Populate Inputs with Current State
function populateFormFields() {
  const { general, groom, bride, events } = currentData;

  // General
  document.getElementById("inputCoupleNames").value = general.coupleNames || "";
  document.getElementById("inputEventDateFormatted").value = general.eventDateFormatted || "";
  document.getElementById("inputEventDateISO").value = general.eventDateISO || "";
  document.getElementById("inputBgMusicUrl").value = general.bgMusicUrl || "";
  document.getElementById("inputHeroImageUrl").value = general.heroImageUrl || "";
  document.getElementById("inputQuote").value = general.quote || "";
  updateImagePreview("heroImgThumb", general.heroImageUrl);

  // Groom
  document.getElementById("inputGroomCallName").value = groom.callName || "";
  document.getElementById("inputGroomFullName").value = groom.fullName || "";
  document.getElementById("inputGroomParents").value = groom.parents || "";
  document.getElementById("inputGroomIgHandle").value = groom.igHandle || "";
  document.getElementById("inputGroomIgUrl").value = groom.igUrl || "";
  document.getElementById("inputGroomAvatarUrl").value = groom.avatarUrl || "";
  updateImagePreview("groomImgThumb", groom.avatarUrl);

  // Bride
  document.getElementById("inputBrideCallName").value = bride.callName || "";
  document.getElementById("inputBrideFullName").value = bride.fullName || "";
  document.getElementById("inputBrideParents").value = bride.parents || "";
  document.getElementById("inputBrideIgHandle").value = bride.igHandle || "";
  document.getElementById("inputBrideIgUrl").value = bride.igUrl || "";
  document.getElementById("inputBrideAvatarUrl").value = bride.avatarUrl || "";
  updateImagePreview("brideImgThumb", bride.avatarUrl);

  // Events
  document.getElementById("inputAkadDate").value = events.akadDate || "";
  document.getElementById("inputAkadTime").value = events.akadTime || "";
  document.getElementById("inputAkadLocation").value = events.akadLocation || "";
  document.getElementById("inputAkadMapUrl").value = events.akadMapUrl || "";

  document.getElementById("inputResepsiDate").value = events.resepsiDate || "";
  document.getElementById("inputResepsiTime").value = events.resepsiTime || "";
  document.getElementById("inputResepsiLocation").value = events.resepsiLocation || "";
  document.getElementById("inputResepsiMapUrl").value = events.resepsiMapUrl || "";
}

function updateImagePreview(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (url && (url.startsWith('http') || url.startsWith('inv.') || url.endsWith('.jpg') || url.endsWith('.png'))) {
    el.src = url;
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
        currentData[keys[0]][keys[1]] = el.value;
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

  // Bride
  bindInput("inputBrideCallName", "bride.callName");
  bindInput("inputBrideFullName", "bride.fullName");
  bindInput("inputBrideParents", "bride.parents");
  bindInput("inputBrideIgHandle", "bride.igHandle");
  bindInput("inputBrideIgUrl", "bride.igUrl");
  bindInput("inputBrideAvatarUrl", "bride.avatarUrl", "brideImgThumb");

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
function renderGalleryList() {
  const container = document.getElementById("galleryList");
  if (!container) return;
  container.innerHTML = "";

  (currentData.gallery || []).forEach((url, index) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <button class="btn-remove-item" onclick="removeGallery(${index})">Hapus</button>
      <div class="form-group">
        <label class="form-label">URL / Path Foto Galeri #${index + 1}</label>
        <input type="text" class="form-input" value="${escapeHtml(url)}" oninput="updateGallery(${index}, this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

window.updateGallery = function(index, value) {
  currentData.gallery[index] = value;
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
    currentData.gallery.push("inv.wekita.id/wp-content/uploads/2026/06/p-1-1-3.jpg");
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
  const btnExport = document.getElementById("btnExportJson");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "wekita_invitation_config.json");
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
}

// --- WHATSAPP BROADCAST & GUEST MANAGER LOGIC ---
function setupWaGeneratorLogic() {
  if (!currentData.waTemplates) {
    currentData.waTemplates = JSON.parse(JSON.stringify(defaultData.waTemplates));
  }
  if (!currentData.guestList) {
    currentData.guestList = JSON.parse(JSON.stringify(defaultData.guestList));
  }

  const inputTpl = document.getElementById("inputWaTemplate");
  if (inputTpl) {
    const activeTpl = currentData.waTemplates.active || "formal";
    inputTpl.value = currentData.waTemplates[activeTpl] || defaultData.waTemplates.formal;

    inputTpl.addEventListener("input", () => {
      const activeKey = currentData.waTemplates.active || "formal";
      currentData.waTemplates[activeKey] = inputTpl.value;
      saveDataAndSync();
      renderGuestTable();
    });
  }

  // Single Guest Add
  const btnSingle = document.getElementById("btnAddSingleGuest");
  if (btnSingle) {
    btnSingle.addEventListener("click", () => {
      const nameInput = document.getElementById("inputGuestName");
      const phoneInput = document.getElementById("inputGuestPhone");
      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";

      if (!name) {
        alert("Silakan masukkan nama tamu!");
        return;
      }

      currentData.guestList.push({
        id: Date.now(),
        name: name,
        phone: phone
      });

      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";

      saveDataAndSync();
      renderGuestTable();
      showToast(`Tamu "${name}" berhasil ditambahkan!`);
    });
  }

  // Batch Multi Guest Add
  const btnBatch = document.getElementById("btnAddBatchGuests");
  if (btnBatch) {
    btnBatch.addEventListener("click", () => {
      const batchInput = document.getElementById("inputBatchGuests");
      if (!batchInput) return;
      const rawText = batchInput.value.trim();
      if (!rawText) {
        alert("Silakan masukkan daftar nama tamu!");
        return;
      }

      const lines = rawText.split("\n");
      let countAdded = 0;

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
          currentData.guestList.push({
            id: Date.now() + Math.random(),
            name: name,
            phone: phone
          });
          countAdded++;
        }
      });

      batchInput.value = "";
      saveDataAndSync();
      renderGuestTable();
      showToast(`${countAdded} tamu berhasil diimpor!`);
    });
  }

  // Clear all guests
  const btnClearAll = document.getElementById("btnClearAllGuests");
  if (btnClearAll) {
    btnClearAll.addEventListener("click", () => {
      if (confirm("Hapus semua daftar tamu?")) {
        currentData.guestList = [];
        saveDataAndSync();
        renderGuestTable();
        showToast("Daftar tamu dikosongkan.");
      }
    });
  }

  renderGuestTable();
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
  return `${basePath}/invitation.html`;
}

function renderGuestTable() {
  const tbody = document.getElementById("guestTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const guests = currentData.guestList || [];

  if (guests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--admin-text-muted); padding: 20px;">Belum ada tamu undangan. Silakan tambah tamu di atas.</td></tr>`;
    updateStats();
    return;
  }

  const baseUrl = getInvitationBaseUrl();
  const activeTplKey = (currentData.waTemplates && currentData.waTemplates.active) || "formal";
  const rawTplText = (currentData.waTemplates && currentData.waTemplates[activeTplKey]) || defaultData.waTemplates.formal;

  guests.forEach((guest, index) => {
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

    // WhatsApp Deep Link
    const waUrl = formattedPhone 
      ? `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(compiledMsg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(compiledMsg)}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(guest.name)}</strong></td>
      <td>${guest.phone ? escapeHtml(guest.phone) : '<span style="color:var(--admin-text-muted); font-size:0.75rem;">(Tanpa HP)</span>'}</td>
      <td><a href="${guestLink}" target="_blank" style="color:var(--admin-accent); font-size:0.78rem; text-decoration:none;">${escapeHtml(guestLink.substring(0, 45))}...</a></td>
      <td style="text-align: right;">
        <a href="${waUrl}" target="_blank" class="btn-action-sm btn-wa-send" title="Kirim Pesan WhatsApp">
          <i data-lucide="send" style="width:13px;"></i> Kirim WA
        </a>
        <button class="btn-action-sm btn-copy-link" onclick="copyGuestLink('${escapeHtml(guestLink)}')" title="Salin Link">
          <i data-lucide="copy" style="width:13px;"></i> Salin Link
        </button>
        <button class="btn-action-sm btn-delete-guest" onclick="deleteGuest(${index})" title="Hapus">
          <i data-lucide="trash-2" style="width:13px;"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateStats();
  if (window.lucide) lucide.createIcons();
}

window.copyGuestLink = function(link) {
  navigator.clipboard.writeText(link).then(() => {
    showToast("Link undangan berhasil disalin!");
  });
};

window.deleteGuest = function(index) {
  currentData.guestList.splice(index, 1);
  saveDataAndSync();
  renderGuestTable();
  showToast("Tamu dihapus dari daftar.");
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
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--admin-text-muted);">Belum ada ucapan dari tamu.</td></tr>';
    return;
  }

  wishes.forEach((w, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(w.name)}</strong></td>
      <td>${escapeHtml(w.text)}</td>
      <td style="color: var(--admin-text-muted); font-size: 0.75rem;">${escapeHtml(w.date)}</td>
    `;
    tbody.appendChild(tr);
  });
}

const btnClearWishes = document.getElementById("btnClearWishes");
if (btnClearWishes) {
  btnClearWishes.addEventListener("click", async () => {
    if (confirm("Hapus semua daftar ucapan tamu?")) {
      try {
        await fetch("/api/wishes", { method: "DELETE" });
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
