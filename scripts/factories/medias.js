/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */

// MÉDIAS affichés dans la gallerie --------------------------------------------------------
let mediaFiltered

function mediaFactory(mediaData) {
  const { title, image, video, likes } = mediaData
  const portfolioSection = document.createElement('div')
  const mediaImage = `assets/medias/${image}`
  const mediaVideo = `assets/medias/${video}`

  if (image) {
    portfolioSection.innerHTML += `
       <div class="card"><img tabindex="0" class="image-media"  mediatitle="${title}" alt="${title}" src="${mediaImage}" />
     <p class="titrelike">
    <span class="align">${title}</span>
      <span class="align like">
      <span class="likeclass">${likes}</span>
      <i title="like-icon" tabindex="0" class="icon fa-solid fa-heart"></i>
      </span>
      </p>
      </div>
         `
  } else {
    portfolioSection.innerHTML += `
    <div class="card">
    <video  class="image-media" mediatitle="${title}" aria-label="${title}" controls ><source src="${mediaVideo}"></source> </video>
     <p class="titrelike">
    <span class="align">${title}</span>
      <span class="align like">
      <span class="likeclass">${likes}</span>
      <i title="like-icon" tabindex="0" class="icon fa-solid fa-heart"></i>
      </span>
      </p>
      </div>
         `
  }
  return portfolioSection
};

// Affichage des likes -------------------------------------------------------------------------
function displayLikes(medias, id) {
  const totalLikes = document.querySelector('.likes') // affichage des likes dans l'encart
  mediaFiltered = medias.filter(element => element.photographerId == id) // affichage des médias du photographe
  const portfolioSection = document.querySelector('.portfolio-section')

  mediaFiltered.forEach((likes) => { // affichage des médias du photographe
    const totalLikes = mediaFactory(likes) // récupérer les likes
    portfolioSection.appendChild(totalLikes) // ajout du total des likes dans le compteur
  })

  let likeCounter = 0
  mediaFiltered.forEach(media => {
    likeCounter += media.likes
  })
  totalLikes.innerText = likeCounter // ajout du nombre total de likes
};

// ajouter un like sur image-----------------------------------------------------------------------------
function addLike(e) {
  // Récupérer l'event pour savoir sur quel coeur on a cliqué (e.target). + sélectionner le parent du coeur
  const compteur = e.target.closest('span').querySelector('.likeclass')

  // Récupérer le nombre actuel (e.target.closest('span').innerText) + Convertir ça en nombre (parseInt(e.target.closest('span').innerText))
  let ajoutLike = parseInt(e.target.closest('span').innerText)

  if (!e.target.classList.contains('.coeur-clicked')) { // inverse
    ajoutLike += 1 // Remplacer par le compteur +1
    e.target.classList.add('.coeur-clicked')
  } else {
    ajoutLike -= 1
    e.target.classList.remove('.coeur-clicked')
  }
  compteur.innerText = ajoutLike // Sélectionner le compteur sans le coeur
}

// ajouter les likes au compteur global ----------------------------------------------------------------
function addlikeGlobal(e) {
  const totalLikes = document.querySelector('.likes') // endroit ou s'affichent les likes dans l'encart
  let ajoutLike = parseInt(totalLikes.innerText) // Récupérer le compteur global + Convertir en nombre

  if (!e.target.classList.contains('.coeur-clicked')) { // inverse
    ajoutLike += 1 // Remplacer par le compteur +1
  } else {
    ajoutLike -= 1
  }
  totalLikes.innerText = ajoutLike // Sélectionner le compteur global et afficher le total des coeurs
}

// trier les images----------------------------------------------------------------------------------------
function filter() {
  const valueTitle = document.getElementById('filtres').value // récupérer valeur des options du filtre

  // Tri par nombre de "like", du plus populaire au moins populaire
  if (valueTitle === 'popularity') {
    mediaFiltered.sort((a, b) => b.likes - a.likes)
  }

  // Tri par date de la plus récente à la plus ancienne
  if (valueTitle === 'date') {
    mediaFiltered.sort((a, b) => {
      const dateA = Date.parse(a.date)
      const dateB = Date.parse(b.date)
      return dateB - dateA
    })
  }

  // Tri par ordre alphabétique
  if (valueTitle === 'title') {
    mediaFiltered.sort((a, b) => {
      const titleA = a.title.toUpperCase() // ignorer la syntaxe
      const titleB = b.title.toUpperCase() // ignorer la syntaxe

      if (titleA < titleB) { return -1 }
      if (titleA > titleB) { return 1 }

      return 0 // les noms doivent être identiques
    })
  }
  const portfolioSection = document.querySelector('.portfolio-section') // emplacement de la galerie des médias
  portfolioSection.innerHTML = ''

  mediaFiltered.forEach((media) => { // affichage des médias du photographe
    const mediaHtml = mediaFactory(media) // affichage dans la galerie
    portfolioSection.appendChild(mediaHtml) // affichage des médias réorganisés dans la galerie
  })
  // Rajout des evenements car la section a été vidée apès le tri
  // Ajouter un like sur image
  // ... Au clic sur le coeur
  document.querySelectorAll('.icon').forEach(coeur => {
    coeur.addEventListener('click', e => {
      addlikeGlobal(e)
      addLike(e)
    })
    // ... En pressant la touche Entrée
    coeur.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        addlikeGlobal(e)
        addLike(e)
      }
    })
  })

  // Afficher la lightbox
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

}
// ---------------------------------------------------------------------------------------------------------------
