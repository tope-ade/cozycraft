
// this file is the main entry point for the web application's JavaScript functionality
import { loadUserProfile } from "./auth.js";
import { loadProducts } from "./products.js";
import { loadCategories } from "./categories.js";
import { initSearch } from "./search.js";

window.addEventListener("DOMContentLoaded", () => {
  loadUserProfile();
  loadProducts();
  loadCategories();
  initSearch();
});