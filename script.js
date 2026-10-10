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
   MOBILE NAVIGATION
================================ */

function initMobileNav() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburgerBtn || !navLinks) return;

    // Open/close menu when clicking the button
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        hamburgerBtn.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking any link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar") && !e.target.closest(".nav-links")) {
            navLinks.classList.remove("active");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        }
    });
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
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("veloraCart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to your bag.`);
}

/* ================================
   REMOVE FROM CART
================================ */

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("veloraCart", JSON.stringify(cart));
    updateCartCount();
}

/* ================================
   INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initMobileNav();
});