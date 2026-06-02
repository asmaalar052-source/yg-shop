// boutique.js

// ─── AFFICHER LES PRODUITS ───────────────────────────────────────────────────
function afficherProduits(categorie) {
  const container = document.getElementById('produits-container');
  if (!container) return;

  const filtres = categorie === 'tous'
    ? produits
    : produits.filter(p => p.categorie === categorie);

  container.innerHTML = filtres.map(produit => {
    const dots = produit.couleurs.map((c, i) => `
      <span class="dot ${c.classe} ${i === 0 ? 'active' : ''}"
            onclick="changerCouleurCarte(${produit.id}, '${c.photo}', this)">
      </span>
    `).join('');

    return `
      <div class="carte-produit">
        <div class="carte-img-wrapper">
          <img id="img-${produit.id}" src="${produit.photo}" alt="${produit.titre}">
        </div>
        <div class="carte-infos">
          <h3>${produit.titre}</h3>
          <div class="color-dots">${dots}</div>
          <p class="carte-prix">${produit.prix} DA</p>
          <button class="btn-commander" onclick="commander(${produit.id})">Commander</button>
        </div>
      </div>
    `;
  }).join('');
}

// ─── CHANGER COULEUR SUR UNE CARTE ───────────────────────────────────────────
function changerCouleurCarte(id, photo, dotEl) {
  document.getElementById('img-' + id).src = photo;
  dotEl.closest('.color-dots').querySelectorAll('.dot')
       .forEach(d => d.classList.remove('active'));
  dotEl.classList.add('active');
}

// ─── FILTRER PAR CATÉGORIE ────────────────────────────────────────────────────
function filtrerCategorie(categorie, btn) {
  document.querySelectorAll('.btn-categorie')
          .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  afficherProduits(categorie);
}

// ─── COMMANDER ────────────────────────────────────────────────────────────────
function commander(id) {
  const produit = produits.find(p => p.id === id);
  const imgSrc  = document.getElementById('img-' + id).src;
  localStorage.setItem('photo', imgSrc);
  localStorage.setItem('titre', produit.titre);
  localStorage.setItem('prix',  produit.prix);
  window.location.href = 'commande.html';
}

// ─── DÉCONNEXION ──────────────────────────────────────────────────────────────
function deconnecter() {
  localStorage.removeItem('connecte');
  window.location.href = '../index.html';
}

// ─── AFFICHER UTILISATEUR CONNECTÉ DANS LA NAV ───────────────────────────────
function majNav() {
  const connecte = JSON.parse(localStorage.getItem('connecte'));
  const nav = document.querySelector('nav ul');
  if (!nav) return;

  if (connecte) {
    nav.innerHTML = `
      <li><a href="../index.html">Accueil</a></li>
      <li><a href="produit.html">Boutique</a></li>
      <li><span style="color:#d4af37; font-size:0.75rem; letter-spacing:2px; text-transform:uppercase;">
            👤 ${connecte.nom}
          </span></li>
      <li><a href="#" onclick="deconnecter()" style="color:#d4af37;">Déconnexion</a></li>
    `;
  }
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function genererFooter() {
  const footer = document.getElementById('mon-footer-automatique');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <span>YG SHOP</span>
          <p>Votre boutique de bijoux et accessoires de luxe</p>
        </div>
        <div class="footer-links">
          <h4>Suivez-nous</h4>
          <a href="https://www.instagram.com/yg.shooop/?hl=fr" target="_blank">Instagram</a>
          <a href="https://www.facebook.com/share/1DiUaJHUPC/" target="_blank">Facebook</a>
          <a href="mailto:irnateny@gmail.com">irnateny@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 YG SHOP — Tous droits réservés</p>
      </div>
    </footer>
  `;
}

// ─── LANCEMENT ────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  genererFooter();
  majNav();
  afficherProduits('tous');
});