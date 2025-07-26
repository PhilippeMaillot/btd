//Toutes les maps commencent en x 0 et finissent en x 1300
// Les coordonnées sont en pixels
// Chaque point représente un segment de chemin que les bloons suivront
// Les points sont des objets avec des propriétés x et y
// Les chemins sont utilisés pour générer les vagues de bloons
// Le chemin sélectionné est stocké dans le localStorage pour persister entre les sessions
// Si aucun chemin n'est sélectionné, le chemin par défaut est utilisé
// le canva fait 1300px de large et 750px de haut donc doivent être compris entre 0 et 1300 pour x et 0 et 750 pour y
// Les chemins sont utilisés pour dessiner le chemin des bloons et pour les faire suivre ce chemin
export const allPaths = {
  default: [
    { x: 0, y: 250 },
    { x: 600, y: 250 },
    { x: 600, y: 75 },
    { x: 425, y: 75 },
    { x: 425, y: 550 },
    { x: 225, y: 550 },
    { x: 225, y: 375 },
    { x: 800, y: 375 },
    { x: 800, y: 175 },
    { x: 1000, y: 175 },
    { x: 1000, y: 500 },
    { x: 525, y: 500 },
    { x: 525, y: 750 }
  ],
  maison: [
    { x: 325, y: 750 },
    { x: 325, y: 450 },
    { x: 175, y: 450 },
    { x: 575, y: 175 },
    { x: 975, y: 450 },
    { x: 825, y: 450 },
    { x: 825, y: 750 },
    { x: 725, y: 750 },
    { x: 725, y: 600 },
    { x: 625, y: 600 },
    { x: 625, y: 750 },
    { x: 325, y: 750 },
    { x: 325, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 550 },
    { x: 550, y: 550 },
    { x: 550, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 475 },
    { x: 550, y: 475 },
    { x: 550, y: 550 },
    { x: 475, y: 550 },
    { x: 475, y: 400 },
    { x: 325, y: 400 },
    { x: 325, y: 450 },
    { x: 175, y: 450 },
    { x: 575, y: 175 },
    { x: 650, y: 225 },
    { x: 650, y: 300 },
    { x: 750, y: 300 },
    { x: 750, y: 125 },
    { x: 675, y: 125 },
    { x: 675, y: 225 },
    { x: 650, y: 225 },
    { x: 650, y: 300 },
    { x: 700, y: 300 },
    { x: 700, y: 0 }
  ]
};

export function getSelectedPath() {
  const selected = localStorage.getItem("selectedMap") || "default";
  const isCustom = localStorage.getItem("selectedMapIsCustom") === "true";

  if (isCustom) {
    const customMaps = JSON.parse(localStorage.getItem("customMaps") || "{}");
    return customMaps[selected] || allPaths["default"];
  }

  return allPaths[selected] || allPaths["default"];
}
