const openBtn = document.getElementById('openWindowBtn');
const closeBtn = document.getElementById('closeWindowBtn');
const statWindow = document.getElementById('statWindow');

// 🎵 Prépare le son HUD
const openSound = new Audio('hud-open.mp3'); // mets ce fichier dans le dossier

// Animation d’ouverture
openBtn.addEventListener('click', () => {
  statWindow.classList.remove('hidden');
  void statWindow.offsetWidth; // Hack pour forcer le reflow
  statWindow.classList.add('active');
  openSound.play();

  // Lancer les barres animées
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const value = bar.getAttribute('data-skill');
    bar.style.width = value + '%';
  });
});

// Animation de fermeture
closeBtn.addEventListener('click', () => {
  statWindow.classList.remove('active');
  setTimeout(() => {
    statWindow.classList.add('hidden');
  }, 400); // attend la fin de l'animation
});
