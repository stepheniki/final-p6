
// ---------------------------------------------------------------------------------
// PAGE PHOTOGRAPHE - JS

// Récupère les datas des photographes
async function init() {
  const { photographers, media } = await getPhotographers()
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')

  // Afficher données
  displayLikes(media, id) // likes et média
  displayData(photographers, id) // photographes
  formData(photographers, id) // formulaire

  // Afficher la lightbox ------------------------------------------------------------
  // Au clic sur une image
  document.querySelectorAll('.image-media').forEach(image => {
    image.addEventListener('click', e => {
      openLightbox(e)
    })

    // En pressant la touche "Entrée"
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        openLightbox(e)
      }
    })

    // Faire focus sur la lightbox en pressant la touche "Tab"
    image.addEventListener('keyup', e => {
      if (e.key === 'Tab') {
        document.querySelector('.lightbox-close').focus()
      }
    })
  })

  // Fermer la lightbox au clic sur la croix ------------------------------------------------
  document.querySelector('.lightbox-close').addEventListener('click', e => {
    closeLightbox(e)
  })

  // Image suivante au clic sur la flèche droite ----------------------------------------
  document.querySelector('.lightbox-next').addEventListener('click', mediaNumber => {
    nextMedia(mediaNumber)

  })

  // Image précédente au clic sur la flèche gauche --------------------------------------
  document.querySelector('.lightbox-prev').addEventListener('click', mediaNumber => {
    prevMedia(mediaNumber)

  })

  // Fonctions de la lightbox + formulaire au clavier ----------------------------------
  document.onkeydown = function (e) {
    if (e.key === 'ArrowRight') { // image suivante avec flêche droite
      nextMedia(mediaNumber)
    } else if (e.key === 'ArrowLeft') { // image précédente avec flêche gauche
      prevMedia(mediaNumber)
    } else if (e.key === 'Escape') { // fermer lightbox + formulaire avec touche Echap
      closeLightbox()
      closeModal()
    }
  }

  // Fermer module de contact -------------------------------------------------------------
  // En cliquant sur la croix
  document.querySelector('.close-modal').addEventListener('click', e => {
    closeModal()
  })
  // au clavier avec "Entrée" quand navigation avec "Tab" sur la croix
  document.getElementById('contact_modal').addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      closeModal()
    }
  })

  // ajouter un like sur image -------------------------------------------------------------------
  // Au clic sur le coeur
  document.querySelectorAll('.icon').forEach(coeur => {
    coeur.addEventListener('click', e => {
      addlikeGlobal(e)
      addLike(e)
    })

    // En pressant la touche Entrée
    coeur.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        addlikeGlobal(e)
        addLike(e)
      }
    })
  })

  // Fonctionnalité de tri ---------------------------------------------------------------------------
  document.getElementById('filtres').addEventListener('change', e => {
    filter()
  })
}

// ----------------------------------------------------------------------------------------------
// PHOTOGRAPHES

// Récupérer id du photographe
async function displayData(photographers, id) {
  const photographer = photographers.find(element => element.id == id)
  photographerFactory(photographer)

  // récupérer le prix de chaque photographe pour ajouter dans l'encart en bas à droite des likes
  document.querySelector('.price').innerText = photographer.price
};

// Récuperer données du fichier .json
async function getPhotographers() {
  const response = await fetch('./data/photographers.json')
  return await response.json()
};

// Importer les données des photographes (data) :
function photographerFactory(data) {
  const { name, portrait, tagline, city, country } = data
  const photographersSection = document.querySelector('.photograph-header')
  const picture = `assets/photographers/${portrait}`
  const tag = `${tagline}`

  // Ajout du html dans la section "photograph-header"
  photographersSection.innerHTML = `
       <div>
       <h2>${name}</h2>
       <p class="photographer-city">${city}, ${country}</p>
       <p class="photographer-description">${tag}</p>
       </div>
          <div>
            <button aria-label="contact-form-button" class="contact_button" onclick="displayModal()">Contactez-moi</button>
          </div>
        <div>
       <img alt="profil-picture" src="${picture}" />
       </div> 
  `
}

init()
