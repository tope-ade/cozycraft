//profile display
const token = localStorage.getItem('token');
if (token) {
  fetch('/api/user/profile', {
    headers: {'Authorization' : `Bearer ${token}`}
  })
  .then(res => res.json())
  .then(data => {
    if (data.user?.name) {
      document.getElementById('auth-section').textContent = `welcome, ${data.user.name}!`;
    }
  });
};


//load products dynamically from backend/db
const container = document.getElementById('products-container');
const loadingtext = document.getElementById('loading-text');

async function loadProducts() {
  try {
    //show loading message
    if (loadingtext) loadingtext.textContent = 'Loading Products...';
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


//newsletter subscription
const form = document.getElementById('subscribe-form');
const message = document.getElementById('subscribe-message');

if (form) {
  form.addEventListener ('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  //simulate success
  message.style.color = 'peru'
  message.textContent = 'Thanks for subscribing';
  form.reset();

  //clear message after 3 seconds
  setTimeout(() => message.textContent = '', 3000);
 });
}

//admin page
const adminPageForm = document.getElementById('product-form');
const adminMessage = document.getElementById('message');
const adminToken = document.getElementById('token');

if (adminPageForm) {
  //check if admin is logged in
  if (!token) {
    alert ('You must be logged in to add products');
    window.location.href = 'login.html'
  }

adminPageForm.addEventListener('submit', async (e) => {
e.preventDefault();

const product = {
  name : document.getElementById('name').value.trim(),
  category : document.getElementById('category').value.trim(),
  price : parseFloat(document.getElementById('price').value),
  description : document.getElementById('description').value.trim(),
  imageUrl : document.getElementById('image').value.trim(),
};

try {
  const res = await fetch('/api/products', {
   method : 'POST',
   headers : {'Content-Type' : 'application/json', 'Authorization' :`Bearer ${token}`}, 
   body : JSON.stringify(product),
  });

  const data = await res.json();
  if (res.ok) {
    adminMessage.style.color = 'peru';
    adminMessage.textContent = 'Product added successfully';
    adminPageForm.reset();
  } else {
    adminMessage.style.color = 'crimson';
    adminMessage.textContent = data.message || 'Failed to add product';
  }

} catch (err) {
  console.error(err);
   adminMessage.style.color = 'crimson';
   adminMessage.textContent = 'Server error. Please try again';
  }
});
}