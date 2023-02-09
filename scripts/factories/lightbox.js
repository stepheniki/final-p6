// LIGHTBOX --------------------------------------------------------------------------
let mediaNumber = 0

// Ouvrir la lightbox-----------------------------------------------------------------
function openLightbox(e) {

    const lightboxContainer = document.querySelector('.lightbox-container')
    const mediaClone = e.target.cloneNode(true) // mediaClone est le média dans la lightbox // e.target est l'élément sur lequel on clique pour copier mediaclone
    const lightbox = document.querySelector('.lightbox') // emplacement de la lightbox
    const allMedias = document.querySelectorAll('.image-media') // 

    mediaNumber = [].indexOf.call(allMedias, e.target)

    lightboxContainer.innerHTML = ""
    lightboxContainer.appendChild(mediaClone) //rajoute a la suite
    lightbox.style.display = "block" // afficher la lightbox
    mediaClone.classList.remove('image-media')

    if (mediaClone.nodeName == 'VIDEO') {
        mediaClone.setAttribute('controls', '')
    }

    // Afficher titre des images dans la lightbox 
    titleLightbox = document.querySelector('.lightbox-title') //selection titre de l'image
    titleClone = e.target.getAttribute('mediatitle')
    titleLightbox.innerText = titleClone
}

// Fermer la lightbox------------------------------------------------------------------
function closeLightbox() {

    const lightbox = document.querySelector('.lightbox')
    lightbox.style.display = "none"
}

// Image précédente ---------------------------------------------------------------------
function prevMedia() {
    const allMedias = document.querySelectorAll('.image-media')    // mediaNumber est la position du média affiché dans la liste des médias

    mediaNumber -= 1; //position du média à -1
    if (mediaNumber < 0) { // si media est le premier...
        mediaNumber = allMedias.length - 1 //  ... retour au dernier média de la liste
    }

    const prevImage = allMedias[mediaNumber].cloneNode(true)
    const lightboxContainer = document.querySelector('.lightbox-container')
    lightboxContainer.innerHTML = ""
    prevImage.classList.remove('image-media')
    lightboxContainer.appendChild(prevImage)

    // Afficher les contrôles de la vidéo
    if (prevImage.nodeName == 'VIDEO') {
        prevImage.setAttribute('controls', '')
    }
    //  Afficher titre précédent dans la lightbox
    titleLightbox = document.querySelector('.lightbox-title') //selection titre de l'image
    titleClone = prevImage.getAttribute('mediatitle') // 
    titleLightbox.innerText = titleClone
}

// Image suivante ---------------------------------------------------------------------
function nextMedia() {
    const allMedias = document.querySelectorAll('.image-media') // recherche des images

    mediaNumber += 1; // position du média est +1
    if (mediaNumber == allMedias.length) { // si on arrive au dernier média de la liste ...
        mediaNumber = 0 // ... on revient au premier média
    }

    const nextImage = allMedias[mediaNumber].cloneNode(true)
    const lightboxContainer = document.querySelector('.lightbox-container')
    lightboxContainer.innerHTML = ""
    nextImage.classList.remove('image-media')
    lightboxContainer.appendChild(nextImage)

    // Afficher les contrôles de la vidéo
    if (nextImage.nodeName == 'VIDEO') {
        nextImage.setAttribute('controls', '')
    }

    //  Afficher titre suivant dans la lightbox
    titleLightbox = document.querySelector('.lightbox-title') //selection titre de l'image
    titleClone = nextImage.getAttribute('mediatitle') // 
    titleLightbox.innerText = titleClone
}




