function fetchAllFromAuthRoute() {
    const fetch_url = `http://localhost:3000/authtest/getall`
    const accessToken = localStorage.getItem('SessionToken') //1

    const response = fetch(fetch_url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', //3
            'Authorization': accessToken //4
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data)
        })
}
function postToAuthRouteCreate() {
    const fetch_url = `http://localhost:3000/authtest/create` 
    const accessToken = localStorage.getItem('SessionToken')

    let authTestDataInput = document.getElementById('authTestData').value; //1

    let authInputData = { authtestdata: { item: authTestDataInput } }; //2

    const response = fetch(fetch_url, {
        method: 'POST', //3
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)  //4
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
}

// * GET item by user
function getOneByUser() {
    let postIdNumber = document.getElementById("getNumber").value; //1

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}` //2
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            console.log(response); 
            var myItem = document.getElementById('getItemValue'); //3
            myItem.innerHTML = response.authtestdata; //4
        })
}
// * PUT to authtest/update/:id
function updateItem(){
    let postIdNumber = document.getElementById('updateNumber').value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`;
    const accessToken = localStorage.getItem('SessionToken')

    let authInputData = {authtestdata: { item: authTestDataInput}};
    const response = fetch(fetch_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        var myItem = document.getElementById('newItemValue')
        myItem.innerHTML = data.authtestdata;
        fetchAllFromAuthRoute();
    })
}

// * DELETE Item

function deleteItem(){
    let postIdNumber = document.getElementById('deleteNumber').value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}` //1
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE', //2
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => { //3
        console.log(response);
        fetchAllFromAuthRoute();
    })
}
function deleteItemById(paraNum){
    const fetch_url = `http://localhost:3000/authtest/delete/${paraNum}`
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response =>{
        console.log(response);
        fetchAllFromAuthRoute();
    })
}

// * Display all items for a user
function fetchFromOneDisplayData(){
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken')

    fetch(url,{
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        })
    }).then(
        function (response){
            return response.json()
        }
    )
    .catch(
        function (error){
            console.error('Error:', error)
        }
    )
    .then(
        function (response){
            let text = '';
            var myList = document.querySelector('ul#fourteen');
            while (myList.firstChild){
                myList.removeChild(myList.firstChild)
            }
            console.log(response);
            for (r of response){
                var listItem = document.createElement('li');
                var textData = r.id + " "+ r.authtestdata;
                listItem.innerHTML = textData;
                listItem.setAttribute('id', r.id);
                myList.appendChild(listItem);
                myList.addEventListener('click'. removeItem);
            }
        }
    )
}
function removeItem(e){
    console.log(e);
    var target = e.target;
    if(target.tagName !== 'LI') return;
    else target.parentNode.removeChild(target);

    let x = target.getAttribute('id')
    deleteItemById(x);
    // console.log('The id number for this item is '+ x);
}
// * Athenticated Request
//1. Since we sorted our token in localStorage , we can access it by using the getItem method to get it back from 
//   localStorage and put it in a variable. We could also use getSessionToke() method for this task.
//2. By default, fetch runs GET request. We can use the method property to send other requests. In this case,
//   we're still sending a GET.
//3. The Content-Type header tells the server what kind of data is being sent in out PreFlight request, if any.
//4. The Authorization header provides some sort of encrypted data allowing access to the server, in this case our token.

//2.1 We will be using an input fiel in the DOM for this exercise, so we will grab whatever string that a user passes into that field.
//2.2 We package that value up inot an object. Notice that this object is similar in syntax to what we did with Postman when posting data.
//2.3 Note that we are identifying this method as a PST request. If request problems occur, its a good idea to take a look at your HTTP verb 
//    and make sure that you are using the right one.
//2.4 We package up the obect as a JSON string and add it to the body of our request. The JSON.stringify() method will take a JS object
//    and convert it into JSON.

// * GET item by user
//1.We get the postIdNumber provided in the getNumber field. Because iwe are making an
//  authenticated request, this id has to ezist in the datbase, as well as match the
//  the user.id from the database for the user that you are using currently logged in as.
//2. We pass the postIdNumber into the url with a template literal.
//3.We target an element called getItemValue. Its a label rag.
//4. We set the value of the label to the value of response.authtestdata. the means that the
//   data will be populated in the label when the DOM loads.

// * PUT to authtest/update/:id
//1. We get the value of the input provided from the use for both the updateNumber a updateValue
//   fields and assign each to a variable.
//2. Like before, we pass in the input form the user to the url with a template literal.
//3. We create an object that packages up our rewuest. We capture the value of 
//   authTestDataInput and store it in the vaiable authInputData variable.
//4. We are doing an update method, so this will be a PUT request.
//5. Just like we did in past POST methods, we use the stringify method to convert
//   the object to a JSON object.
//6. We print the response to our fetch to the console.
//7. We make a refernce to the <label> in step 12(Update Single Item), then set its value
//   to the data we put in the database.
//8. We ru the getall function again and print the new contents of the database to the console.

// * DELETE item
//1. Again we get the id number submitted by the user and pass it into the url via a 
//   template literal.
//2. Our HTTP verb is DELETE in the case, so we use the DELETE method.
//3. We print the response to the console and also run the fechallFromAuthRoute function again,
//   which will print all remaining items for our user to the console.
