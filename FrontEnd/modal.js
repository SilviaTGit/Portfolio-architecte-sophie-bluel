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
    modal.querySelector(".deleteModalBtn").addEventListener("click", closeModal);
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
    modal.querySelector(".deleteModalBtn").addEventListener("click", closeModal);
    modal = null;
};

document.querySelectorAll(".openModal1").forEach(a => {
    a.addEventListener("click", openModal)
})
