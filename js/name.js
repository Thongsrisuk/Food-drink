let username = localStorage.getItem("username");
username = username.toUpperCase();
if (!username){
    document.getElementById("user").innerHTML = 'Sign in/up';
}
else{
document.getElementById("user").innerHTML = username + ' Log out';
}
document.getElementById("user").onclick = function(){
    localStorage.clear();
}