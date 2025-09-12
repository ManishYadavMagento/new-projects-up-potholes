// Signup form
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message || result.error);
});

// Upload form
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch('/api/potholes', {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  alert(result.message || result.error);
});
