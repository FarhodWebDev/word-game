const form = document.getElementById("register-form");

form.addEventListener("submit", (e) => {
 e.preventDefault();

 let email = document.getElementById("email").value;
 let username = document.getElementById("username").value;
 let pass = document.getElementById("pass").value;

 let user = {
  email: email,
  username: username,
  pass: pass,
 };

 let json = JSON.stringify(user);

 localStorage.setItem(username, json);

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const isValid = emailRegex.test(email);

 if (isValid) {
  localStorage.setItem("isLogged", "logged");
  window.location.pathname = "/";
 }
});
