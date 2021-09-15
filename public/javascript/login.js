async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email);
    console.log(password);
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        document.getElementById('email-login').classList.add("border-red-300");
        document.getElementById('password-login').classList.add("border-red-300");
        document.getElementById("wronginput").style.visibility = "visible";
      }
    }
  }
  
  
  
  function updateValue() {
    document.getElementById('email-login').classList.remove("border-red-300");
        document.getElementById('password-login').classList.remove("border-red-300");
        document.getElementById("wronginput").style.visibility = "hidden";
  }
  
  const input = document.querySelector('input');
  
  input.addEventListener('input', updateValue);
  
  document.getElementById("wronginput").style.visibility = "hidden";
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  
  