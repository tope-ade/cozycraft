
// profile loading logic 
export function loadUserProfile() {
  const token = localStorage.getItem('token');
  if (!token) return;

  fetch('/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    if (data.user?.name) {
      const auth = document.getElementById("auth-section");
      auth.innerHTML = `
        <span>welcome, ${data.user.name}!</span>
        <button id="logout-btn">Logout</button>
      `;

      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      });
    }
  });
}