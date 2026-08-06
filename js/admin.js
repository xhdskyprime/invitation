// Admin Dashboard Logic
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
  ]
};

let currentData = JSON.parse(JSON.stringify(defaultData));

document.addEventListener("DOMContentLoaded", async () => {
  await loadStoredData();
  setupTabNavigation();
  populateFormFields();
  setupInputListeners();
  renderDynamicLists();
  setupHeaderActions();
  setupLinkGenerator();
  renderRsvpTable();

  if (window.lucide) {
    lucide.createIcons();
  }
});

async function loadStoredData() {
  const saved = localStorage.getItem("wekita_invitation_data");
  if (saved) {
    try {
      currentData = JSON.parse(saved);
      return;
    } catch(e) {
      console.error(e);
    }
  }

  try {
    const res = await fetch("data/config.json");
    if (res.ok) {
      currentData = await res.json();
    }
  } catch(e) {
    currentData = JSON.parse(JSON.stringify(defaultData));
  }
}

function saveDataAndSync() {
  localStorage.setItem("wekita_invitation_data", JSON.stringify(currentData));
  
  // Post message to iframe for instant live preview update
  const iframe = document.getElementById("previewIframe");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({
      type: "UPDATE_INVITATION_DATA",
      payload: currentData
    }, "*");
  }
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
      document.getElementById(tabId).classList.add("active");
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
  document.getElementById("inputQuote").value = general.quote || "";

  // Groom
  document.getElementById("inputGroomCallName").value = groom.callName || "";
  document.getElementById("inputGroomFullName").value = groom.fullName || "";
  document.getElementById("inputGroomParents").value = groom.parents || "";
  document.getElementById("inputGroomIgHandle").value = groom.igHandle || "";
  document.getElementById("inputGroomIgUrl").value = groom.igUrl || "";
  document.getElementById("inputGroomAvatarUrl").value = groom.avatarUrl || "";

  // Bride
  document.getElementById("inputBrideCallName").value = bride.callName || "";
  document.getElementById("inputBrideFullName").value = bride.fullName || "";
  document.getElementById("inputBrideParents").value = bride.parents || "";
  document.getElementById("inputBrideIgHandle").value = bride.igHandle || "";
  document.getElementById("inputBrideIgUrl").value = bride.igUrl || "";
  document.getElementById("inputBrideAvatarUrl").value = bride.avatarUrl || "";

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

// Bind Inputs
function setupInputListeners() {
  const bindInput = (id, path) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const keys = path.split(".");
      if (keys.length === 2) {
        currentData[keys[0]][keys[1]] = el.value;
      }
      saveDataAndSync();
    });
  };

  // General
  bindInput("inputCoupleNames", "general.coupleNames");
  bindInput("inputEventDateFormatted", "general.eventDateFormatted");
  bindInput("inputEventDateISO", "general.eventDateISO");
  bindInput("inputBgMusicUrl", "general.bgMusicUrl");
  bindInput("inputQuote", "general.quote");

  // Groom
  bindInput("inputGroomCallName", "groom.callName");
  bindInput("inputGroomFullName", "groom.fullName");
  bindInput("inputGroomParents", "groom.parents");
  bindInput("inputGroomIgHandle", "groom.igHandle");
  bindInput("inputGroomIgUrl", "groom.igUrl");
  bindInput("inputGroomAvatarUrl", "groom.avatarUrl");

  // Bride
  bindInput("inputBrideCallName", "bride.callName");
  bindInput("inputBrideFullName", "bride.fullName");
  bindInput("inputBrideParents", "bride.parents");
  bindInput("inputBrideIgHandle", "bride.igHandle");
  bindInput("inputBrideIgUrl", "bride.igUrl");
  bindInput("inputBrideAvatarUrl", "bride.avatarUrl");

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
  container.innerHTML = "";

  currentData.stories.forEach((story, index) => {
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

document.getElementById("btnAddStory").addEventListener("click", () => {
  currentData.stories.push({ date: "Tanggal Momen", title: "Judul Momen", desc: "Deskripsi singkat..." });
  renderStoriesList();
  saveDataAndSync();
});

// Gallery List
function renderGalleryList() {
  const container = document.getElementById("galleryList");
  container.innerHTML = "";

  currentData.gallery.forEach((url, index) => {
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

document.getElementById("btnAddGallery").addEventListener("click", () => {
  currentData.gallery.push("inv.wekita.id/wp-content/uploads/2026/06/p-1-1-3.jpg");
  renderGalleryList();
  saveDataAndSync();
});

// Gifts List
function renderGiftsList() {
  const container = document.getElementById("giftsList");
  container.innerHTML = "";

  currentData.gifts.forEach((gift, index) => {
    const div = document.createElement("div");
    div.className = "dynamic-item";
    div.innerHTML = `
      <button class="btn-remove-item" onclick="removeGift(${index})">Hapus</button>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Nama Bank / E-Wallet</label>
          <input type="text" class="form-input" value="${escapeHtml(gift.bank)}" oninput="updateGift(${index}, 'bank', this.value)">
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
  saveDataAndSync();
};

window.removeGift = function(index) {
  currentData.gifts.splice(index, 1);
  renderGiftsList();
  saveDataAndSync();
};

document.getElementById("btnAddGift").addEventListener("click", () => {
  currentData.gifts.push({ bank: "BCA", number: "1234567890", name: "Nama Pemilik" });
  renderGiftsList();
  saveDataAndSync();
});

// Header Actions (Export, Import, Reset)
function setupHeaderActions() {
  // Export JSON
  document.getElementById("btnExportJson").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "wekita_invitation_config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import JSON
  document.getElementById("btnImportJson").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        currentData = imported;
        saveDataAndSync();
        populateFormFields();
        renderDynamicLists();
        alert("Konfigurasi JSON berhasil diimport!");
      } catch (err) {
        alert("Gagal membaca file JSON. Pastikan format valid!");
      }
    };
    reader.readAsText(file);
  });

  // Reset Default
  document.getElementById("btnResetDefault").addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?")) {
      currentData = JSON.parse(JSON.stringify(defaultData));
      saveDataAndSync();
      populateFormFields();
      renderDynamicLists();
      alert("Data berhasil di-reset!");
    }
  });
}

// Guest Link Generator
function setupLinkGenerator() {
  const inputName = document.getElementById("inputGuestName");
  const inputTemplate = document.getElementById("inputWaTemplate");
  const btnGen = document.getElementById("btnGenerateLink");
  const outputBox = document.getElementById("linkGenOutput");
  const outputUrl = document.getElementById("outputUrl");
  const outputWaText = document.getElementById("outputWaText");
  const btnCopy = document.getElementById("btnCopyWaText");
  const btnOpenWa = document.getElementById("btnOpenWaDirect");

  inputTemplate.value = `Kepada Yth.
Bapak/Ibu/Saudara/i {NAMA_TAMU}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

{NAMA_MAMPELAI}

Info selengkapnya mengenai acara dapat diakses melalui link undangan digital berikut:
{LINK_UNDANGAN}

Merupakan suatu kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Terima kasih.`;

  btnGen.addEventListener("click", () => {
    const guestName = inputName.value.trim() || "Tamu Undangan";
    const encodedGuest = encodeURIComponent(guestName);
    
    // Construct full URL
    const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + "/invitation.html";
    const finalUrl = `${baseUrl}?to=${encodedGuest}`;

    let waText = inputTemplate.value;
    waText = waText.replace(/{NAMA_TAMU}/g, guestName);
    waText = waText.replace(/{NAMA_MAMPELAI}/g, currentData.general.coupleNames || "Lutfi & Firdha");
    waText = waText.replace(/{LINK_UNDANGAN}/g, finalUrl);

    outputUrl.textContent = finalUrl;
    outputWaText.textContent = waText;
    outputBox.style.display = "block";

    btnOpenWa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
  });

  btnCopy.addEventListener("click", () => {
    const textToCopy = outputWaText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Teks pesan WhatsApp berhasil disalin!");
    });
  });
}

// Render Admin RSVP Table
function renderRsvpTable() {
  const tbody = document.getElementById("adminRsvpTableBody");
  tbody.innerHTML = "";

  let wishes = [];
  const saved = localStorage.getItem("wekita_invitation_wishes");
  if (saved) {
    try { wishes = JSON.parse(saved); } catch(e) {}
  } else {
    wishes = [
      { id: 1, name: "Budi & Keluarga", status: "Hadir", count: 2, text: "Selamat untuk Lutfi & Firdha! Semoga sakinah mawaddah warahmah.", date: "10/08/2026 14:30" }
    ];
  }

  if (wishes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: var(--admin-text-muted);">Belum ada ucapan / RSVP dari tamu.</td></tr>';
    return;
  }

  wishes.forEach((w, index) => {
    const isHadir = w.status === "Hadir";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(w.name)}</strong></td>
      <td><span class="badge ${isHadir ? 'badge-success' : 'badge-danger'}">${escapeHtml(w.status)}</span></td>
      <td>${w.count || 1} Orgs</td>
      <td>${escapeHtml(w.text)}</td>
      <td style="color: var(--admin-text-muted); font-size: 0.75rem;">${escapeHtml(w.date)}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btnClearWishes").addEventListener("click", () => {
  if (confirm("Hapus semua daftar ucapan tamu?")) {
    localStorage.removeItem("wekita_invitation_wishes");
    renderRsvpTable();
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
