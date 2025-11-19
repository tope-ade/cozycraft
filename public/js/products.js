
// loadProducts fetches product data from the server and renders them on the page
export async function loadProducts() {
  const loading = document.getElementById("loading-text");
  loading.textContent = "Loading products...";

  try {
    const res = await fetch('/api/products');
    const products = await res.json();
    loading.textContent = "";
    renderProducts(products);
  } catch (err) {
    loading.textContent = "Error loading products.";
    console.error(err);
  }
}

export function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.imageUrl || '/images/default.jpg'}" alt="${p.name}">
      <p><strong>${p.name}</strong></p>
      <p>₦${p.price.toLocaleString()}</p>
      <button 
      class="add-to-cart-btn" 
      data-id="${p._id}"
      data-name="${p.name}"
      data-price="${p.price}">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}