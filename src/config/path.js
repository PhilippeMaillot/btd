//Toutes les maps commencent en x 0 et finissent en x 800
// Les coordonnées sont en pixels
// Chaque point représente un segment de chemin que les bloons suivront
// Les points sont des objets avec des propriétés x et y
// Les chemins sont utilisés pour générer les vagues de bloons
// Le chemin sélectionné est stocké dans le localStorage pour persister entre les sessions
// Si aucun chemin n'est sélectionné, le chemin par défaut est utilisé
export const allPaths = {
  default: [
    { x: 0, y: 260 },
    { x: 100, y: 260 },
    { x: 100, y: 180 },
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 400 },
    { x: 420, y: 400 },
    { x: 420, y: 60 },
    { x: 700, y: 60 },
    { x: 700, y: 250 },
    { x: 500, y: 250 },
    { x: 500, y: 150 },
    { x: 600, y: 150 },
    { x: 600, y: 400 },
    { x: 800, y: 400 }
  ],
  forest: [
    { x: 0, y: 320 },
    { x: 150, y: 320 },
    { x: 150, y: 180 },
    { x: 300, y: 180 },
    { x: 300, y: 360 },
    { x: 450, y: 360 },
    { x: 450, y: 120 },
    { x: 600, y: 120 },
    { x: 600, y: 300 },
    { x: 750, y: 300 },
    { x: 750, y: 180 },
    { x: 800, y: 180 }
  ],
  spiral: [
    { x: 0, y: 100 },
    { x: 700, y: 100 },
    { x: 700, y: 400 },
    { x: 100, y: 400 },
    { x: 100, y: 200 },
    { x: 600, y: 200 },
    { x: 600, y: 325 },
    { x: 200, y: 325 },
    { x: 200, y: 260 },
    { x: 800, y: 260 }
  ],

  zigzag: [
    { x: -1, y: 300 },
    { x: 0, y: 300 },
    { x: 100, y: 200 },
    { x: 200, y: 300 },
    { x: 300, y: 200 },
    { x: 400, y: 300 },
    { x: 500, y: 200 },
    { x: 600, y: 300 },
    { x: 700, y: 200 },
    { x: 800, y: 300 },
    { x: 801, y: 300 }
  ],
  aqua: [
    { x: 0, y: 250 },
    { x: 100, y: 250 },
    { x: 100, y: 150 },
    { x: 200, y: 150 },
    { x: 200, y: 350 },
    { x: 300, y: 350 },
    { x: 300, y: 50 },
    { x: 400, y: 50 },
    { x: 400, y: 300 },
    { x: 500, y: 300 },
    { x: 500, y: 100 },
    { x: 600, y: 100 },
    { x: 600, y: 400 },
    { x: 800, y: 400 }
  ],
};

export function getSelectedPath() {
  const selected = localStorage.getItem("selectedMap") || "default";
  return allPaths[selected] || allPaths["default"];
}
