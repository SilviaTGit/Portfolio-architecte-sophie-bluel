/* Global variables for login */
const email = document.querySelector("form #email")
const password = document.querySelector("form #password")
const form = document.querySelector("form")
const errorMessage = document.querySelector("#login p")


/* Add event listener for form submission */
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await authentification();
});

/* Asynchronous function to handle user authentication */
async function authentification() {
    try {
        /* Make a POST request to the login API endpoint */
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value, // Get email value from the input field
                password: password.value, // Get password value from the input field
            }),
        });

        /* Check if the response is not ok (status 200-299) */
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if response is not ok
        }

        const data = await response.json(); // Convert the response data to JSON
        localStorage.setItem("token", data.token); // Save the authentication token in localStorage
        window.location.href = "index.html"; // Redirect the user to the main page

    } catch (error) {
        console.log('There has been a problem with your fetch operation:', error); // Log any errors that occurred during the fetch operation

        /* Display an error message to the user */
        errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe.";
        errorMessage.classList.add("errorMessage"); // Add the error message class
    }
}