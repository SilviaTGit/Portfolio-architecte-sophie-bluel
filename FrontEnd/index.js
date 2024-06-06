/* Variables */
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

/* Function that returns the list of works */
async function getWorks() {
  const response = await fetch ("http://localhost:5678/api/works");
  return await response.json();
}

/* Function to add works to the gallery */
function addWorksToGallery(works) {
  gallery.innerHTML = '';  // Clear the gallery
  works.forEach(work => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;  // Set the image source
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

/* Function to display all works in the DOM */
async function displayWorks() {
  const arrayWorks = await getWorks();
  addWorksToGallery(arrayWorks);  // Add the works to the gallery
}

/* Function to filter and display works by category */
function filterWorksByCategory(categoryName) {
  getWorks().then(arrayWorks => {
    const filteredWorks = categoryName === "Tous"
      ? arrayWorks  // If the category is "Tous", show all works
      : arrayWorks.filter(work => work.category.name === categoryName);  // Filter works by category
    addWorksToGallery(filteredWorks);  // Add the filtered works to the gallery
  });
}

/* Function to create filter buttons in the DOM with event listeners */
async function displayCategories() {
  const arrayWorks = await getWorks();
  const categoriesMap = new Map();

  // Manually add the entry for the "Tous" category
  categoriesMap.set(0, "Tous");
  arrayWorks.forEach(work => {
    categoriesMap.set(work.category.id, work.category.name);  // Add categories to the map
  });

  // Convert the map to an array of objects and sort by id
  const sortedCategories = Array.from(categoriesMap)
    .map(([id, name]) => ({ id, name }))  // Create an array of { id, name } objects
    .sort((a, b) => a.id - b.id);  // Sort the objects by id

  // Create a button element
  sortedCategories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;  // Set the button id
    button.classList.add('filter-button');  // Add the 'filter-button' class to the button
    button.addEventListener('click', () => filterWorksByCategory(category.name));  // Add a click event listener
    filters.appendChild(button);  // Add the button to the filters
  });
}

displayCategories();  // Call the function to display the filter buttons
displayWorks();  // Call the function to initially display all works


/* Home EDIT MODE */
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");

  if (token) {
      // User is logged in
      loginLink.classList.add("hidden"); // Hide login link
      logoutLink.classList.remove("hidden"); // Show logout link
      filters.classList.add("hidden"); // Hide filters div
      displayEditMode();
  } else {
      // User is not logged in
      loginLink.classList.remove("hidden");
      logoutLink.classList.add("hidden");
  }

  /* Logout functionality */
  logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token"); // Remove the token from localStorage
      window.location.href = "index.html"; // Reload the page or redirect to index
  });
});

/* Display Edit mode functionality */
function displayEditMode() {
 const editModeBanner = document.createElement("section");

  editModeBanner.classList.add("editModeBanner");
  document.body.insertBefore(editModeBanner, document.body.firstChild);
  let icon = document.createElement("i"); // Create the icon
  icon.classList.add("fa-regular", "fa-pen-to-square");
  let text = document.createTextNode("Mode Edition"); // Create the text

  editModeBanner.appendChild(icon);
  editModeBanner.appendChild(text);

const projectsSection = document.querySelector("#portfolio h2");

  /* Add icon and text directly after "Mes Projets" */
  projectsSection.innerHTML += ' <span class="openModal1"><i class="fa-regular fa-pen-to-square"></i> modifier</span>';
};