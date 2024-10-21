// Chargement des icônes depuis le fichier JSON
async function loadIcons() {
    try {
      const response = await fetch('icons.json');
      const icons = await response.json();
      displayIcons(icons);
    } catch (error) {
      console.error('Erreur lors du chargement des icônes :', error);
    }
  }
  
  // Affichage des icônes sur la page
  function displayIcons(icons) {
    const gallery = document.getElementById('icon-gallery');
    gallery.innerHTML = icons
      .map(
        icon => `
        <div class="icon-card">
          <img src="${icon.image}" alt="${icon.name} Icon" />
          <h3>${icon.name}</h3>
          <a href="${icon.download}" target="_blank" class="download-btn">Download</a>
        </div>
      `
      )
      .join('');
  }
  
  // Appeler la fonction au chargement de la page
  window.addEventListener('DOMContentLoaded', loadIcons);