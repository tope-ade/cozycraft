
//cart management script

//utility functions to get and save cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

//update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    const el = document.getElementById("cart-count");
    if (el) el.textContent = totalQty;
}

// Run immediately on every page
document.addEventListener("DOMContentLoaded", updateCartCount);


//add to cart functionality
function addToCart(product) {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
}


// event delegation for add to cart buttons
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const btn = e.target;

            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
            };

            addToCart(product);
        }
    });
});


//cart page loading logic
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");

    // if these elements do not exist, skip (not on cart page)
    if (!cartItemsEl || !cartTotalEl) return;

    const cart = getCart();
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty</p>";
        cartTotalEl.textContent = "";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("div");
        row.classList.add("cart-row");

        row.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>₦${item.price.toLocaleString()}</p>
            <p>Qty: ${item.quantity}</p>
            <p>Total: ₦${itemTotal.toLocaleString()}</p>
        `;

        cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = `Total: ₦${total.toLocaleString()}`;
});


//clear cart button functionality
document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("Clear-cart");
    if (!clearBtn) return;

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        location.reload();
    });
});