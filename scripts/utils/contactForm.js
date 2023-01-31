function displayModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "block"
}

function closeModal() {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
}

const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const eMail = document.getElementById('email')
const textInput = document.getElementById('message')

// Afficher le contenu des champs dans les logs de la console
document.querySelector('.contact_button').addEventListener('click', e => {
    e.preventDefault()
    console.log("Champ du prénom renseigné: " + firstName.value)
    console.log("Champ du nom renseigné: " + lastName.value)
    console.log("Champ de l'e-mail renseigné: " + eMail.value)
    console.log("Champ du message renseigné: " + textInput.value)
})