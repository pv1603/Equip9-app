// Register form submission
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const mobile_number = document.getElementById('mobile_number').value;
  const password = document.getElementById('password').value;
  const created_by = document.getElementById('created_by').value;

  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile_number,
        password,
        created_by,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);  // Display success message
    } else {
      alert(data.message);  // Display error message
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred. Please try again.');
  }
});

// Login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mobile_number = document.getElementById('login-mobile_number').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile_number, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);  // Display greeting message
    } else {
      alert(data.message);  // Display error message
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    alert('An error occurred. Please try again.');
  }
});
