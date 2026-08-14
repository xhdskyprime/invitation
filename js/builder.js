// builder.js - Logic for the Cover Visual Builder

let selectedElementId = null;
let dragState = null; // { startX, startY, origX, origY, type: 'move'|'resize' }

function initBuilder() {
  document.getElementById("btnAddText").addEventListener("click", () => addElement("text"));
  document.getElementById("btnAddImage").addEventListener("click", () => addElement("image"));
  document.getElementById("btnSaveBuilder").addEventListener("click", () => {
    saveDataAndSync();
    alert("Desain berhasil disimpan!");
  });
  
  document.getElementById("btnDeleteElement").addEventListener("click", () => {
    if (!selectedElementId) return;
    currentData.coverElements = currentData.coverElements.filter(e => e.id !== selectedElementId);
    selectedElementId = null;
    renderBuilderCanvas();
    updatePropertiesPanel();
    saveDataAndSync();
  });

  // Attach property listeners
  const props = ["propContent", "propImageUrl", "propFontSize", "propColor", "propFontFamily"];
  props.forEach(prop => {
    const el = document.getElementById(prop);
    if (el) {
      el.addEventListener("input", (e) => {
        if (!selectedElementId) return;
        const elemData = currentData.coverElements.find(el => el.id === selectedElementId);
        if (!elemData) return;

        if (prop === "propContent") elemData.content = e.target.value;
        if (prop === "propImageUrl") elemData.url = e.target.value;
        if (prop === "propFontSize") elemData.fontSize = parseInt(e.target.value) || 16;
        if (prop === "propColor") elemData.color = e.target.value;
        if (prop === "propFontFamily") elemData.fontFamily = e.target.value;
        
        renderBuilderCanvas(); // re-render live
      });
      el.addEventListener("change", () => saveDataAndSync());
    }
  });

  renderBuilderCanvas();
}

function addElement(type) {
  if (!currentData.coverElements) currentData.coverElements = [];
  
  const newEl = {
    id: "elem_" + Date.now(),
    type: type,
    x: 10,
    y: 10,
    zIndex: 10,
    rotation: 0
  };

  if (type === "text") {
    newEl.content = "Teks Baru";
    newEl.fontSize = 24;
    newEl.fontFamily = "var(--font-title)";
    newEl.color = "#113468";
  } else {
    newEl.url = "/assets/wp-content/uploads/2026/06/BAHAN-TEMA-1-1-2.webp";
    newEl.width = 150;
    newEl.height = 150;
  }

  currentData.coverElements.push(newEl);
  selectedElementId = newEl.id;
  renderBuilderCanvas();
  updatePropertiesPanel();
  saveDataAndSync();
}

function renderBuilderCanvas() {
  const canvas = document.getElementById("builderCanvas");
  if (!canvas) return;
  canvas.innerHTML = "";
  
  // Apply bg if needed
  if (currentData.general && currentData.general.heroImageUrl) {
    canvas.style.backgroundImage = `url('${currentData.general.heroImageUrl}')`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
  }

  const elements = currentData.coverElements || [];
  
  elements.forEach(el => {
    const div = document.createElement("div");
    div.className = "canvas-el";
    if (el.id === selectedElementId) div.classList.add("selected");
    
    div.style.left = el.x + "%";
    div.style.top = el.y + "%";
    div.style.zIndex = el.zIndex;
    
    // Add content
    if (el.type === "text") {
      const span = document.createElement("span");
      span.className = "canvas-el-text";
      span.textContent = el.content;
      span.style.fontSize = el.fontSize + "px";
      span.style.fontFamily = el.fontFamily;
      span.style.color = el.color;
      div.appendChild(span);
    } else if (el.type === "image") {
      const img = document.createElement("img");
      img.src = el.url;
      div.style.width = el.width + "px";
      div.style.height = el.height + "px";
      div.appendChild(img);
    }

    // Resize handle (only for images usually, but we'll add it)
    if (el.type === "image") {
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      div.appendChild(resizeHandle);
      
      resizeHandle.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        startDrag(e, el.id, 'resize');
      });
    }

    // Drag handle
    div.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      selectedElementId = el.id;
      updatePropertiesPanel();
      renderBuilderCanvas(); // update selected visual
      startDrag(e, el.id, 'move');
    });

    canvas.appendChild(div);
  });
  
  // Deselect on canvas click
  canvas.addEventListener("mousedown", (e) => {
    if (e.target === canvas) {
      selectedElementId = null;
      updatePropertiesPanel();
      renderBuilderCanvas();
    }
  });
}

function updatePropertiesPanel() {
  const emptyPanel = document.getElementById("noElementSelected");
  const editorPanel = document.getElementById("elementEditor");
  
  if (!selectedElementId) {
    emptyPanel.style.display = "block";
    editorPanel.style.display = "none";
    return;
  }

  emptyPanel.style.display = "none";
  editorPanel.style.display = "flex";

  const el = currentData.coverElements.find(e => e.id === selectedElementId);
  if (!el) return;

  // Show/hide based on type
  document.getElementById("propContent").parentElement.style.display = el.type === "text" ? "block" : "none";
  document.getElementById("propFontSize").parentElement.style.display = el.type === "text" ? "block" : "none";
  document.getElementById("propColor").parentElement.style.display = el.type === "text" ? "block" : "none";
  document.getElementById("propFontFamily").parentElement.style.display = el.type === "text" ? "block" : "none";
  
  document.getElementById("propImageUrl").parentElement.style.display = el.type === "image" ? "block" : "none";

  // Populate values
  if (el.type === "text") {
    document.getElementById("propContent").value = el.content || "";
    document.getElementById("propFontSize").value = el.fontSize || 16;
    document.getElementById("propColor").value = el.color || "#000000";
    document.getElementById("propFontFamily").value = el.fontFamily || "var(--font-body)";
  } else {
    document.getElementById("propImageUrl").value = el.url || "";
  }
}

// Global Mouse Events for Dragging
document.addEventListener("mousemove", (e) => {
  if (!dragState) return;
  
  const canvas = document.getElementById("builderCanvas");
  const rect = canvas.getBoundingClientRect();
  const scale = 0.7; // matches CSS transform scale

  const elData = currentData.coverElements.find(el => el.id === dragState.id);
  if (!elData) return;

  const dx = (e.clientX - dragState.startX) / scale;
  const dy = (e.clientY - dragState.startY) / scale;

  if (dragState.type === 'move') {
    // Convert to percentages
    const percentX = (dx / (rect.width / scale)) * 100;
    const percentY = (dy / (rect.height / scale)) * 100;
    
    elData.x = dragState.origX + percentX;
    elData.y = dragState.origY + percentY;
  } else if (dragState.type === 'resize' && elData.type === 'image') {
    elData.width = Math.max(20, dragState.origWidth + dx);
    elData.height = Math.max(20, dragState.origHeight + dy);
  }

  renderBuilderCanvas();
});

document.addEventListener("mouseup", () => {
  if (dragState) {
    dragState = null;
    saveDataAndSync(); // Save after dragging finishes
  }
});

function startDrag(e, id, type) {
  const elData = currentData.coverElements.find(el => el.id === id);
  if (!elData) return;
  
  dragState = {
    id,
    type,
    startX: e.clientX,
    startY: e.clientY,
    origX: elData.x,
    origY: elData.y,
    origWidth: elData.width || 0,
    origHeight: elData.height || 0
  };
}

// Add init hook to the main admin.js loading sequence
// Need to ensure builder.js is loaded in admin.html
document.addEventListener("DOMContentLoaded", () => {
  // Wait a small tick so currentData is loaded by admin.js
  setTimeout(initBuilder, 500);
});
