// PAGE D'ACCUEIL - JS

function photographerFactory(data) {
  // les données importées (data) sont:
  const { name, portrait, tagline, city, country, price, id } = data
  const picture = `assets/photographers/${portrait}`
  const tag = `${tagline}`
  const fiche = `${id}`
  const article = document.createElement('article')

  article.innerHTML = `
<a href="./photographer.html?id=${fiche}">
    <img alt="profil-picture" src="${picture}" />
    <h2>${name}</h2>
    <p class="photographer-city">${city}, ${country}</p>
    <p class="photographer-description">${tag}</p>
    <p class="photographer-price">${price}€/jour</p>
  </a>
    `

  function getUserCardDOM() {
    return (article)
  } return { name, picture, tag, getUserCardDOM }
}