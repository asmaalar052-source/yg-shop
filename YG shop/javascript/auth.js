import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBaznXY94UTydvugwIUEggnWk32_ttjYI4",
    authDomain: "yg-shop-88d9c.firebaseapp.com",
    projectId: "yg-shop-88d9c",
    storageBucket: "yg-shop-88d9c.firebasestorage.app",
    messagingSenderId: "520247921424",
    appId: "1:520247921424:web:15f9fd3ae67679c38db395"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const titre = localStorage.getItem('titre');
    const prix = localStorage.getItem('prix');
    const couleur = localStorage.getItem('couleur');

    if (titre) document.getElementById('display_titre').innerText = titre;
    if (prix) document.getElementById('display_prix').innerText = prix ;
    document.getElementById('display_couleur').innerText = couleur || "Non sélectionnée";

    const btn = document.getElementById('btn-confirmer');
    if (btn) btn.addEventListener('click', confirmerCommande);
});

async function confirmerCommande() {
    const nom = document.getElementById('client_nom').value;
    const tel = document.getElementById('client_tel').value;
    const wilaya = document.getElementById('wilaya').value;
    const daira = document.getElementById('daira').value;
    const titre = localStorage.getItem('titre');
    const prix = localStorage.getItem('prix');
    const couleur = localStorage.getItem('couleur');

    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const telRegex = /^(05|06|07)[0-9]{8}$/;

    let isValid = true;

    if (!nameRegex.test(nom)) {
        document.getElementById('nameError').innerText = "Nom invalide (lettres seulement, min 3).";
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = "";
    }

    if (!telRegex.test(tel)) {
        document.getElementById('telError').innerText = "Format : 05/06/07XXXXXXXX";
        isValid = false;
    } else {
        document.getElementById('telError').innerText = "";
    }

    if (!wilaya || !daira) {
        alert("Veuillez remplir la wilaya et la daïra.");
        isValid = false;
    }

    if (isValid) {
        // Afficher le message succès IMMÉDIATEMENT
        document.getElementById('succes-nom').innerText = nom;
        document.getElementById('succes-titre').innerText = titre;
        document.getElementById('succes-couleur').innerText = couleur || "Non sélectionnée";
        document.getElementById('succes-prix').innerText = prix + " DA";
        document.getElementById('succes-tel').innerText = tel;

        document.getElementById('formulaire').style.display = 'none';
        document.getElementById('message-succes').style.display = 'block';

        localStorage.removeItem('titre');
        localStorage.removeItem('prix');
        localStorage.removeItem('couleur');

        // Sauvegarder dans Firebase en arrière plan
        try {
            await addDoc(collection(db, "commandes"), {
                nom: nom,
                telephone: tel,
                wilaya: wilaya,
                daira: daira,
                produit: titre,
                prix: prix,
                couleur: couleur || "Non sélectionnée",
                date: new Date().toLocaleString("fr-DZ")
            });
            console.log("Commande sauvegardée ✅");
        } catch (error) {
            console.error("Erreur Firebase:", error);
        }
    }
}