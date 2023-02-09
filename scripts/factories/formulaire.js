// FORMULAIRE

// Récupérer nom du photographe pour formulaire
async function formData(photographers, id) {
    const photographer = photographers.find(element => element.id == id)
    formFactory(photographer)
}

function formFactory(data) {
    const { name, portrait, tagline, city, country, price, id } = data
    const formSection = document.getElementById('title-photographer')
    formSection.innerHTML = `
     <h1>${name}</h1>
    `
}







