const canvas = document.getElementById("editor");
const ctx = canvas.getContext("2d");
const output = document.getElementById("output");

let path = [];
let draggingIndex = -1;

function snapToGrid(value) {
  return Math.round(value / 25) * 25;
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = snapToGrid(e.clientX - rect.left);
  const y = snapToGrid(e.clientY - rect.top);

  if (e.button === 2) { // right click to delete
    for (let i = 0; i < path.length; i++) {
      if (Math.hypot(path[i].x - x, path[i].y - y) < 10) {
        path.splice(i, 1);
        draw();
        updateOutput();
        return;
      }
    }
  } else {
    for (let i = 0; i < path.length; i++) {
      if (Math.hypot(path[i].x - x, path[i].y - y) < 10) {
        draggingIndex = i;
        return;
      }
    }

    path.push({ x, y });
    draw();
    updateOutput();
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (draggingIndex >= 0) {
    const rect = canvas.getBoundingClientRect();
    const x = snapToGrid(e.clientX - rect.left);
    const y = snapToGrid(e.clientY - rect.top);
    path[draggingIndex] = { x, y };
    draw();
    updateOutput();
  }
});

canvas.addEventListener("mouseup", () => {
  draggingIndex = -1;
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // prevent right click menu
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid
  ctx.strokeStyle = "#ddd";
  for (let x = 0; x < canvas.width; x += 25) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 25) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Path
  if (path.length > 1) {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Points
  for (let i = 0; i < path.length; i++) {
    ctx.beginPath();
    ctx.arc(path[i].x, path[i].y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(i, path[i].x + 8, path[i].y - 8);
  }
}

function saveToLocal() {
  const name = document.getElementById("mapName").value.trim();
  if (!name) {
    alert("Merci de donner un nom à la carte avant de l’enregistrer.");
    return;
  }

  const savedMaps = JSON.parse(localStorage.getItem("customMaps") || "{}");

  if (savedMaps[name]) {
    const overwrite = confirm(`Une carte nommée "${name}" existe déjà. Écraser ?`);
    if (!overwrite) return;
  }

  savedMaps[name] = path;
  localStorage.setItem("customMaps", JSON.stringify(savedMaps));

  alert(`Carte "${name}" enregistrée avec succès !`);
}

function updateOutput() {
  const name = document.getElementById("mapName").value || "newMap";
  const formatted = path.map(p => `  { x: ${p.x}, y: ${p.y} }`).join(",\n");
  output.value = `${name}: [\n${formatted}\n]`;
}

function copyPath() {
  output.select();
  document.execCommand("copy");
  alert("Chemin copié !");
}

function clearPath() {
  path = [];
  draw();
  updateOutput();
}
