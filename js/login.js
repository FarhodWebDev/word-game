const logForm = document.getElementById("login-form");

const result = document.getElementById("result");

logForm.addEventListener("submit", (e) => {
 e.preventDefault();
 let pass = document.getElementById("pass").value;
 let username = document.getElementById("username").value;

 let result = document.getElementById("result");

 let user = localStorage.getItem(username);
 let data = JSON.parse(user);
 console.log(data);

 if (user == null) {
  result.innerHTML = "Wrong username";
  result.style.color = "red";
 } else if (username == data.username && pass == data.pass) {
  result.innerHTML = "logged in";
  result.style.color = " green";
  localStorage.setItem("isLogged", "logged");
  window.location.pathname = "/";
 } else {
  result.innerHTML = "wrong password";
  result.style.color = "red";
 }
});
