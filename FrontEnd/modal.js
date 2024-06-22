/* Modal page */

let modal = null;

/* Function that open the Modal page */
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal","true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".xClose a").addEventListener("click", closeModal);
    /*const close = document.querySelector(".xClose");
    close.addEventListener("click", closeModal);*/
    modal.querySelector(".modalStop").addEventListener("click", stopPropagation);

};
/* Function that close the Modal page */
const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault();
    const bg = document.querySelector("html");
    bg.style.background = "white";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".xClose a").removeEventListener("click", closeModal)
    modal.querySelector(".modalStop").removeEventListener("click", stopPropagation)
    modal = null;
};

/* Function that allows you to close the modal page only by clicking on X or off the page */

const stopPropagation = function (e) {
    e.stopPropagation()
    }

document.querySelectorAll(".openModal1").forEach(a => {
    a.addEventListener("click", openModal)
})


/* Function to add works to the Modal gallery */

import { getWorks } from "./index.js"; //Import getWorks function
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
      deleteWorks();
}

displayModalGallery();


/* Function to delete works from the Modal gallery */

function deleteWorks() {
    // Select all elements with the class 'fa-trash-can' (trash icons)
    const trashAll = document.querySelectorAll(".fa-trash-can");

    // Iterate over each trash icon and add a click event listener
    trashAll.forEach(trash => {
        trash.addEventListener("click", async (e) => {
        // Prevent the default action of the click event
        e.preventDefault();
        // Stop the event from propagating upwards (prevents modal closure)
        e.stopPropagation();

            // Get the ID of the work to delete from the trash icon's ID
            const id = trash.id;
            // Retrieve the token from localStorage
            const token = localStorage.getItem("token"); 

            // Set up the request options, including the DELETE method and headers
            const init = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Add the authentication token
                },
            };

            try {
                // Send the DELETE request to the server
                const response = await fetch(`http://localhost:5678/api/works/${id}`, init);
                // Check if the response is not okay (status not in the range 200-299)
                if (!response.ok) {
                    console.log("Delete error!");
                    return;
                }

                // Parse the response data as JSON
                const data = await response.json();
                console.log("Delete worked, here the data:", data);
                // Remove the parent figure element of the clicked trash icon
                const figure = trash.closest("figure");
                if (figure) {
                    figure.remove();
                }

            } catch (error) {
                console.error("Error deleting work:", error); // Log any errors that occur during the fetch request
            }
        });
    });
}


/* Function to handle navigation between modal1 and modalUpload */

document.addEventListener("DOMContentLoaded", function() {
    const modal1 = document.querySelector(".modal1");
    const modalUpload = document.getElementById("modalUpload");
    const addModalBtn = document.querySelector(".addModalBtn");
    const backBtn = document.querySelector(".fa-arrow-left");

    addModalBtn.addEventListener("click", function() {
        modal1.classList.add("hidden"); // Hide the first part of modal
        modalUpload.classList.remove("hidden"); // Show the upload part of the modal
    });

    const backToModal1 = function() {
        modalUpload.classList.add("hidden"); // Hide the upload part of the modal
        modal1.classList.remove("hidden"); // Show the first part of the modal
    };

    backBtn.addEventListener("click", backToModal1);

    const closeModalAndBackToModal1 = function(e) {
        backToModal1();
        closeModal(e);
    };

    // Event listener to close modal when clicking on xClose to modal
    modalUpload.querySelector(".xClose a").addEventListener("click", closeModalAndBackToModal1);
});


const inputFile = document.getElementById("file");

inputFile.style.opacity = 0;
