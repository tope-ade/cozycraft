
//handle search functionality
import { renderProducts } from "./products.js";

export async function searchProducts() {
  const query = document.getElementById("search-input").value.trim();
  const category = document.getElementById("category-select").value;

  let url = `/api/products?`;
  if (query) url += `search=${encodeURIComponent(query)}&`;
  if (category) url += `category=${encodeURIComponent(category)}`;

  try {
    const res = await fetch(url);
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error("Search failed:", err);
  }
}

export function initSearch() {
  const btn = document.getElementById("search-btn");
  const input = document.getElementById("search-input");

  btn.addEventListener("click", searchProducts);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchProducts();
  });
}