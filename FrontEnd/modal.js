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

                // Remove the parent figure element of the clicked trash icon
                const figure = trash.closest("figure");
                if (figure) {
                    figure.remove();
                    alert("Work deleted successfully!"); // Show success alert
                    console.log("Delete worked, element removed.");
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

/* Image preview */

const imgPreview = document.querySelector(".photoForm img");
const inputFile = document.querySelector(".photoForm input");
const labelFile = document.querySelector(".photoForm label");
const iconFile = document.querySelector(".photoForm .fa-image");
const pFile = document.querySelector(".photoForm p");

inputFile.addEventListener("change", ()=>{
    const file = inputFile.files[0]
    if (file) {
        const reader = new FileReader(); // Create a new filereader
        reader.onload = function (e){ // Set the callback function onload
            imgPreview.src = e.target.result // Set data URL as image src
            imgPreview.style.display= "flex";
            labelFile.style.display = "none";
            iconFile.style.display = "none";
            pFile.style.display = "none";
        }
        reader.readAsDataURL(file); // Start reading the file
    }
});


 /* Function to get categories from the API */
 async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            throw new Error("Error while retrieving categories");
        }
        const categories = await response.json();
        populateCategoryDropdown(categories);
    } catch (error) {
        console.error("Error:", error);
    }
}

/* Create a list of categories in the input select */
function populateCategoryDropdown(categories) {
    const categorySelect = document.getElementById("category");

    // Add an empty default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "";
    categorySelect.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

getCategories();

/* Execute POST request to add a new work */

import { displayWorks } from "./index.js"; //Import displayWorks function

const form = document.querySelector(".modalForm");
const title = document.querySelector(".modalForm #title");
const category = document.querySelector(".modalForm #category");
const submitButton = document.querySelector(".modalSubmit input[type='submit']");


// Function to check if the form is valid
function checkFormValidity() {
    const file = inputFile.files[0]; // Get the first file selected by the user
    const isFileValid = file && file.size <= 4 * 1024 * 1024; // File is present and <= 4MB
    const isTitleValid = title.value.trim() !== ""; // Check whether title after the removal of white spaces is not empty
    const isCategoryValid = category.value !== ""; // Category is selected

    if (isFileValid && isTitleValid && isCategoryValid) {
        submitButton.disabled = false; // Enable the submit button
    } else {
        submitButton.disabled = true; // Keep the submit button disabled
    }
}

// Function to add "touched" class to elements
function addTouchedClass(event) {
    event.target.classList.add("touched");
}

// Add event listeners to add the "touched" class when inputs are touched
title.addEventListener("blur", addTouchedClass);
category.addEventListener("blur", addTouchedClass);

// Add event listeners to check form validity on input changes
inputFile.addEventListener("change", checkFormValidity);
title.addEventListener("input", checkFormValidity);
category.addEventListener("change", checkFormValidity);


// Get the token from localStorage
const token = localStorage.getItem("token"); 

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const file = document.querySelector(".modalForm #file").files[0]; // Get the first file selected by the user
        if (file && file.size > 4 * 1024 * 1024) { // Check if the file is larger than 4MB
            alert("The file size exceeds the 4MB limit.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", category.value);
        formData.append("image", file);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}` // Add the authentication token
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read the response text
            alert(`Error: ${response.status} - ${errorText}`);
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        alert("Work added successfully!"); // Show success alert

        // Clear input fields
        form.reset();
        imgPreview.style.display = "none";
        labelFile.style.display = "block";
        iconFile.style.display = "block";
        pFile.style.display = "block";

        // Display the updated works
        await displayWorks();
        await displayModalGallery();

        // Back to the first part of the modal
        const backBtn = document.querySelector(".fa-arrow-left");
        backBtn.click();

        
    } catch (error) {
        alert("Error adding work.");
        console.error("Error adding work:", error);
    }
});