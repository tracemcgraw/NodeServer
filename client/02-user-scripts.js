// * POST - /createuser
function userSignUp(){
    let userName = document.getElementById('userSignUp').value; //1
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let newUserData = {user: { username: userName, password: userPass}}; //2
    fetch('http://localhost:3000/api/user/createuser',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) //3
    })
    .then(response => response.json())
    .then(function(response){
        console.log(response.sessionToken); 
        let token = response.sessionToken;//4
        localStorage.setItem('SessionToken', token);//5
    });
}
function userSignIn(){
    let userName = document.getElementById('userSignin').value;
    let userPass = document.getElementById('passSignin').value;
    console.log(userName, userPass);

    let userData = { user: { username: userName, password: userPass}};
    fetch('http://localhost:3000/api/user/signin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(function (response){
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
    });
}
//* Helper function for token
function getSessionToken(){
    var data = localStorage.getItem('SessionToken');
    console.log(data);
    return data;
}

// * POST - /createuser
//1. Here, we grab the value of the user/password data from the creatuser input
//   field in the index.html file.
//2. the variables used to store the sign up info from the DOM get passed into the 
//   values of the usernme and password properties. We package everything
//   up in a user object.
//3. In the request object in our fetch() call, we pass in the newUseData variable
//   to be sent off in the body of your request to the sever.
//4. We get the sessionToken from the response and store it in a token variable.
//5. In our localStorage , we call the setItem function and store the token in 
//   localStorage. This will keep our token safely stored in our local window.