const galerie = document.querySelector(".gallery");
// Requête Fetch pour obtenir les données JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((data) => {
    for (const work of data) {
      // Création d'un élément figure pour l'œuvre
      const figureElement = document.createElement("figure");
      // Création d'un élément de paragraphe pour le titre de l'œuvre
      const titreElement = document.createElement("p");
      titreElement.textContent = work.title;
      // Création d'un élément d'image pour l'URL de l'image de l'œuvre
      const imageElement = document.createElement("img");
      imageElement.src = work.imageUrl;
      // Ajout de figure, titre et de l'image à la galerie
      galerie.appendChild(figureElement);
      galerie.appendChild(titreElement);
      galerie.appendChild(imageElement);
    }
  });