function addData() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  email = document.getElementById("email").value;

  let user = {
    username: username,
    password: password,
    email: email,
    score: 0,
  };

  let userLoggedIn = {
    loggedIn: true,
    username: (enteredUsername = document.getElementById("username").value),
  };

  localStorage.setItem(username, JSON.stringify(user));
  localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
  window.location.replace("homePage.html");
  return false;
}
