let allIcons = [];

// Charger les icônes depuis le fichier JSON
async function loadIcons() {
  try {
    const response = await fetch('icons.json');
    if (!response.ok) {
      throw new Error('Erreur de chargement des icônes');
    }
    const icons = await response.json();
    allIcons = icons;
    displayIcons(icons);
  } catch (error) {
    console.error('Erreur lors du chargement des icônes :', error);
  }
}

// Afficher les icônes dans la galerie
function displayIcons(icons) {
  const gallery = document.getElementById('icon-gallery');
  if (icons.length === 0) {
    gallery.innerHTML = '<p>Aucune icône trouvée.</p>';
    return;
  }
  gallery.innerHTML = icons
    .map(
      icon => `
      <div class="icon-card">
        <img src="${icon.image}" alt="${icon.name} Icon" />
        <h3>${icon.name}</h3>
        <a href="${icon.download}" target="_blank">Download</a>
      </div>
    `
    )
    .join('');
}

// Filtrer les icônes en fonction de la recherche
function filterIcons(query) {
  const filtered = allIcons.filter(icon =>
    icon.name.toLowerCase().includes(query.toLowerCase())
  );
  displayIcons(filtered);
}

// Écouter les entrées dans la barre de recherche
document.getElementById('search-input').addEventListener('input', (e) => {
  filterIcons(e.target.value);
});

// Gestion du mode sombre
const themeToggle = document.getElementById('theme-toggle');
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Charger les icônes au démarrage
window.addEventListener('DOMContentLoaded', loadIcons);