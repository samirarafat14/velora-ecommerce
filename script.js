/* ================================
   VELORA GLOBAL SCRIPT
================================ */

let cart = JSON.parse(localStorage.getItem("veloraCart")) || [];


/* ================================
   SEARCH
================================ */

function toggleSearch() {
    const searchPanel = document.getElementById("search-panel");

    if (searchPanel) {
        searchPanel.classList.toggle("show");

        if (searchPanel.classList.contains("show")) {
            const input = document.getElementById("search-input");

            if (input) {
                input.focus();
            }
        }
    }
}


/* ================================
   CART COUNT
================================ */

function updateCartCount() {
    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    countElement.textContent = totalItems;
}


/* ================================
   ADD TO CART
================================ */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(`${product.name} added to your bag.`);
}


/* ================================
   REMOVE FROM CART
================================ */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


/* ================================
   INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

});