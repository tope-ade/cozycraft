
const token = localStorage.getItem('token');
  if (token) {
    fetch('api/user/profile', {
      headers: {'Authorization' : `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      if (data.user?.name) {
        document.getElementById('auth-section').textContent = `welcome, ${data.user.name}!`;
      }
    });
  };

  const container = document.getElementById('products-container');
  const loadingtext = document.getElementById('loading-text');

  async function loadProducts() {
    try {
      //show loading message
      loadingtext.textContent = 'Loading Products...';
      //products data from backend
      const response = await fetch('/api/products');
      const products = await response.json();
      //clear old contents
      container.innerHTML = '';
      loadingtext.textContent = '';
      //check if there are any products
      if (!products.length) {
        container.innerHTML = '<p>No products found.</p>';
        return;
      }
      //loop through and display each product
      products.forEach((p) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
        <img src='${p.imageUrl || '/images/default.jpg'}' alt='${p.name}'>
        <p><strong>${p.name}</strong></p>
        <p>₦${p.price.toLocaleString()}</p>
        `
        container.appendChild(productCard);
      });
    } catch (err) {
      console.error('Error loading products:', err);
      loadingtext.textContent = 'Error loading products. Please try again later';
    }
  };

  //load products when page loads
  window.addEventListener('DOMContentLoaded', loadProducts);
