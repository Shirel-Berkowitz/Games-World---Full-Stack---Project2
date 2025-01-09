function checkData() {
  let flag = validateFildes();
  if (flag == true) {
    let userLoggedIn = {
      loggedIn: true,
      username: document.getElementById("username").value,
    };
    localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
    return true;
  } else {
    alert("wrong username or password");
    return false;
  }
}

function validateFildes() {
  enteredUsername = document.getElementById("username").value;
  enteredPassword = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem(enteredUsername));

  if (user != undefined) {
    password = user["password"];
    if (enteredPassword == password) {
      return true;
    }
  }
  return false;
}
