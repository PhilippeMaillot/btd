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
    { x: 0, y: 375 },
    { x: 100, y: 375 },
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
    { x: 1300, y: 400 }
  ],
  test: [
    { x: 175, y: 0 },
    { x: 175, y: 675 },
    { x: 475, y: 675 },
    { x: 325, y: 525 },
    { x: 25, y: 525 },
    { x: 25, y: 375 },
    { x: 325, y: 375 },
    { x: 325, y: 225 },
    { x: 475, y: 225 },
    { x: 625, y: 375 },
    { x: 625, y: 225 },
    { x: 475, y: 375 },
    { x: 475, y: 525 },
    { x: 850, y: 525 },
    { x: 850, y: 225 },
    { x: 1100, y: 225 },
    { x: 1100, y: 525 },
    { x: 975, y: 675 },
    { x: 725, y: 675 },
    { x: 725, y: -20 }
  ]
};

export function getSelectedPath() {
  const selected = localStorage.getItem("selectedMap") || "default";
  return allPaths[selected] || allPaths["default"];
}
