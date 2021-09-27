async function signupFormHandler(event) {
    event.preventDefault();
    document.getElementById("wronginput").style.visibility = "hidden";
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    if (username==="") {
         document.getElementById("wronginput").style.visibility = "visible";
         document.getElementById("wronginput").textContent = "Input username";
        } else 
      if (email===""){
        document.getElementById("wronginput").style.visibility = "visible";
        document.getElementById("wronginput").textContent = "Input email";
      }else{
        if (password.length<4){
          document.getElementById("wronginput").style.visibility = "visible";
        document.getElementById("wronginput").textContent = "Short password";
        }else{
    
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        document.getElementById("wronginput").style.visibility = "visible";
        document.getElementById("wronginput").textContent = "This email already exists";
      }
    }
  }
}
  
  document.getElementById("wronginput").style.visibility = "hidden";
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);