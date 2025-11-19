
// adding event listener to handle product addition
 function initAdminPage() {
  const form = document.getElementById("product-form");
  const msg = document.getElementById("message");
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in.");
    window.location.href = "login.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById("name").value.trim(),
      category: document.getElementById("category").value.trim(),
      price: parseFloat(document.getElementById("price").value),
      description: document.getElementById("description").value.trim(),
      imageUrl: document.getElementById("image").value.trim(),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();
      msg.style.color = res.ok ? "green" : "red";
      msg.textContent = res.ok ? "Product added!" : data.message;

      if (res.ok) form.reset();
    } catch (err) {
      msg.style.color = "red";
      msg.textContent = "Server error";
      console.error(err);
    }
  });
}
document.addEventListener("DOMContentLoaded", initAdminPage);