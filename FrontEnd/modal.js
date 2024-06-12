/* Modal page */

let modal = null;

const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal","true");
    modal = target;
    const close = document.querySelector(".xClose");
    close.addEventListener("click", closeModal);
};

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault();
    const bg = document.querySelector("html");
    bg.style.background = "white";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal = null;
};

document.querySelectorAll(".openModal1").forEach(a => {
    a.addEventListener("click", openModal)
})


/* Function to add works to the Modal gallery */

import { getWorks } from "./index.js";
async function displayModalGallery () {
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML= ""; // Clear the Modal gallery
    const modalWorks = await getWorks();

    modalWorks.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        /* Create trash icon */
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = work.id;
        img.src = work.imageUrl;  // Set the image source
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        modalGallery.appendChild(figure);
      });
}

displayModalGallery();