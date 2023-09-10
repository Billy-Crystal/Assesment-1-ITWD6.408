function openNav() {
    document.getElementById("myNav").style.display =
        "block"; /*Show the curtain menu*/
}

function closeNav() {
    document.getElementById("myNav").style.display =
        "none"; /*Hide the curtain menu*/
}

// Get elements
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const searchModal = document.getElementById("searchModal");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Event listeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
searchButton.addEventListener("click", googleSearch);

// Functions
function openModal() {
    searchModal.style.display = "block";
}

function closeModal() {
    searchModal.style.display = "none";
}

function googleSearch() {
    const query = searchInput.value.trim();
    if (query !== "") {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
            query
        )}`;
        window.open(googleSearchUrl, "_blank");
        closeModal();
    }
}
