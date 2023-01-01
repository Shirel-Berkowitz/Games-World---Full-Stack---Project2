// function addData(){
//     var username=document.getElementById('username').value;
//     var pass=document.getElementById('password').value;

//     localStorage.setItem('userName',username);
//     localStorage.setItem('userPwd',pass);
// }



function addData() {
    //add user here
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    email = document.getElementById('email').value;
   

    let user = {
        'username': username,
        'password': password,
        'email': email,
        'score': 0
    };

    localStorage.setItem(username, JSON.stringify(user));
    window.location.replace("login.html");
    return false;
}