/* Variables */
const gallery = document.querySelector(".gallery");

/* Function that returns the list of works */
async function getWorks() {
  const response = await fetch ("http://localhost:5678/api/works");
  return await response.json();
}

getWorks();

/* Show works in the DOM */
async function displayWorks() {
  const arrayWorks = await getWorks()
  arrayWorks.forEach(work => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

displayWorks();