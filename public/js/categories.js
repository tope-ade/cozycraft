
// Fetches product categories from the server and populates the category dropdown

export async function loadCategories() {
  try {
    const select = document.getElementById("category-select");
    
    // [THE FIX] If the dropdown isn't on this page, STOP immediately.
    if (!select) return; 

    const res = await fetch('/api/products/categories');
    const categories = await res.json();

    select.innerHTML = `<option value="">All Categories</option>`;

    categories.sort().forEach(cat => {
      const op = document.createElement("option");
      op.value = cat;
      op.textContent = cat;
      select.appendChild(op);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}