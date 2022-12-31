function checkData(){
    var enterUser=document.getElementById('username').value;
    var enterPass= document.getElementById('password').value;

    //get data from localStorage
    var getUser=localStorage.getItem('userName');
    var getPwd=localStorage.getItem('userPwd');

    if(enterUser==getUser)
    {
        if(enterPass==getPwd)
        {
            alert("login successful");
        }
        else
        {
            alert("wrong password")
        }
    }
    else
    {
        alert("invalid details");
    }
}





