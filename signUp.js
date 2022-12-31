function addData(){
    var username=document.getElementById('username').value;
    var pass=document.getElementById('password').value;

    localStorage.setItem('userName',username);
    localStorage.setItem('userPwd',pass);
}
