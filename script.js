document.addEventListener("DOMContentLoaded", () => {
  // SONS
  const clickSound = new Audio("assets/UI-click.mp3");
  clickSound.preload = "auto";
  const invokeSound = new Audio("assets/invoke.mp3");
  const typingSound = new Audio("assets/typing.mp3");
  typingSound.preload = "auto";
  typingSound.volume = 0.3;

  const playUISound = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  };

  // Fenêtres
  const openBtn = document.getElementById("openWindowBtn");
  const closeBtn = document.getElementById("closeWindowBtn");
  const statWindow = document.getElementById("statWindow");

  const tabs = document.querySelectorAll(".menu-tab");
  const contents = document.querySelectorAll(".tab-content");

  // Fenêtre de statut
  openBtn.addEventListener("click", () => {
    statWindow.classList.remove("hidden");
    statWindow.classList.add("active");
    playUISound();
    invokeSound.play().catch(() => {});

    tabs.forEach(t => t.classList.remove("active"));
    document.querySelector('[data-tab="profile"]')?.classList.add("active");

    contents.forEach(c => c.classList.add("hidden"));
    document.getElementById("tab-profile")?.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    statWindow.classList.add("hidden");
    statWindow.classList.remove("active");
    playUISound();
  });

  // Onglets
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      contents.forEach(c => {
        c.classList.toggle("hidden", c.id !== `tab-${target}`);
      });
      playUISound();
    });
  });

  // Détails
  document.querySelectorAll(".btn-detail").forEach(button => {
    button.addEventListener("click", () => {
      const currentBox = button.nextElementSibling;
      document.querySelectorAll(".details-box").forEach(box => {
        if (box !== currentBox) box.classList.add("hidden");
      });
      currentBox.classList.toggle("hidden");
      playUISound();
    });
  });

  // Inventaire
  const items = document.querySelectorAll(".inventory-item");
  const info = document.querySelector(".info");

  items.forEach(item => {
    item.addEventListener("mouseover", () => {
      info.textContent = item.getAttribute("data-desc");
      playUISound();
    });
    item.addEventListener("mouseout", () => {
      info.textContent = "Survole un objet pour voir sa description.";
    });
  });

  // Carrousels
  document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
    const inner = wrapper.querySelector(".carousel-inner");
    const btnLeft = wrapper.querySelector(".carousel-btn.left");
    const btnRight = wrapper.querySelector(".carousel-btn.right");

    btnLeft?.addEventListener("click", () => {
      inner.scrollBy({ left: -inner.clientWidth, behavior: "smooth" });
      playUISound();
    });

    btnRight?.addEventListener("click", () => {
      inner.scrollBy({ left: inner.clientWidth, behavior: "smooth" });
      playUISound();
    });
  });

  // Jauges de compétences
  document.querySelectorAll(".skill-bar-fill").forEach(bar => {
    const percent = bar.dataset.skill;
    bar.style.width = `${percent}%`;
  });

  // Modale des certificats (cert-modal)
  const certModal = document.getElementById("cert-modal");
  const certModalImg = document.getElementById("modal-img");
  const modalClose = certModal.querySelector(".modal-close");

  document.querySelectorAll(".certificate-thumb").forEach(img => {
    img.addEventListener("click", () => {
      certModalImg.src = img.src;
      certModal.classList.remove("hidden");
      playUISound();
    });
  });

  // Holo images => même modale
  document.querySelectorAll(".holo-image").forEach(img => {
    img.addEventListener("click", () => {
      certModalImg.src = img.src;
      certModal.classList.remove("hidden");
      playUISound();
    });
  });

  modalClose.addEventListener("click", () => {
    certModal.classList.add("hidden");
    certModalImg.src = "";
  });

  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      certModal.classList.add("hidden");
      certModalImg.src = "";
    }
  });

  // Modale du CV
  const cvPreview = document.getElementById("cvPreview");
  const cvModal = document.getElementById("cv-modal");
  const cvClose = cvModal.querySelector(".modal-close");

  cvPreview.addEventListener("click", (e) => {
    e.preventDefault();
    cvModal.classList.remove("hidden");
    playUISound();
  });

  cvClose.addEventListener("click", () => {
    cvModal.classList.add("hidden");
  });

  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) {
      cvModal.classList.add("hidden");
    }
  });

  // Intro avec effet dactylographie
  const typerBox = document.getElementById("auto-typer");
  const lines = [
    "Connexion au système en cours... ",
    "Authentification du Monarque des Ombres : VALIDÉE ",
    "Chargement des modules de profil, compétences et quêtes... ",
    "Bienvenue, voyageur. Tu pénètres dans le domaine de l’unique LMJK. ",
    "Ancien vagabond numérique, il trace aujourd’hui son destin dans les lignes de code. ",
    "Spécialités : arts de programmation mystiques (Python, HTML, CSS, JS, Go, SQL, etc...), invocation de design, et maîtrise du Figma sacré. ",
    "⚠️ Accès aux données restreint. Pour en savoir plus.. ",
    "Clique sur la fenêtre de statut. "
  ];

  let line = 0;
  let char = 0;
  const cursor = document.createElement("span");
  cursor.classList.add("cursor-blink");
  typerBox.appendChild(cursor);

  function typeNextChar() {
    if (line < lines.length) {
      if (char < lines[line].length) {
        cursor.insertAdjacentText("beforebegin", lines[line][char]);
        char++;
        typingSound.currentTime = 0;
        typingSound.play().catch(() => {});
        setTimeout(typeNextChar, 35);
      } else {
        typerBox.insertAdjacentHTML("beforeend", "<br/>");
        char = 0;
        line++;
        setTimeout(typeNextChar, 500);
        spawnGhost("assets/fantome1.png");
        setTimeout(() => spawnGhost("assets/fantome2.png"), 2000);
        setTimeout(() => spawnGhost("assets/fantome3.png"), 4000);
      }
    }
  }

  typeNextChar();
});

// Fantômes
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function spawnGhost(imageSrc, delay = 0) {
  const container = document.getElementById("ghost-container");

  const ghost = document.createElement("img");
  ghost.src = imageSrc;
  ghost.classList.add("ghost");

  const smoke = document.createElement("div");
  smoke.classList.add("smoke");

  let posX = Math.random() * window.innerWidth;
  let posY = Math.random() * window.innerHeight;

  ghost.style.left = `${posX}px`;
  ghost.style.top = `${posY}px`;
  smoke.style.left = `${posX - 100}px`;
  smoke.style.top = `${posY - 100}px`;

  container.appendChild(smoke);
  container.appendChild(ghost);

  setTimeout(() => {
    ghost.classList.add("show");

    const interval = setInterval(() => {
      posX += (cursorX - posX) * 0.02;
      posY += (cursorY - posY) * 0.02;
      ghost.style.left = `${posX}px`;
      ghost.style.top = `${posY}px`;
      smoke.style.left = `${posX - 100}px`;
      smoke.style.top = `${posY - 100}px`;
    }, 30);

    setTimeout(() => {
      ghost.classList.remove("show");
      clearInterval(interval);
      setTimeout(() => {
        ghost.remove();
        smoke.remove();
      }, 1500);
    }, 8000);
  }, delay);
}
