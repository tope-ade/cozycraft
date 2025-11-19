
window.addEventListener('DOMContentLoaded', () => {
//newsletter subscription
const form = document.getElementById('subscribe-form');
const message = document.getElementById('subscribe-message');

if (form) {
  form.addEventListener ('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  //send to backend api
  try {
    const res = await fetch('/api/subscribe', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email})
    });
   
    const data = await res.json();

    if (res.ok) {
      //simulate success
      message.style.color = 'peru'
      message.textContent = 'Thanks for subscribing';
      form.reset();
    } else {
      message.style.color = 'crimson'
      message.textContent = data.message || 'Subscription failed'
    }

  } catch (err) {
    console.error('Subscription error', err);
    message.style.color = 'crimson'
    message.textContent = 'Server error, Please try again later.';
  }

  //clear message after 3 seconds
  setTimeout(() => message.textContent = '', 3000);
  });
}
});
