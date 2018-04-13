function fetchHelloDataFromAPI(){
    fetch('http://localhost:3000/test/helloclient', { //1
        method: 'GET',
        headers: new Headers({          //2
            'Content-Type': 'application/json'
        })
    })
    .then(function(response){
        console.log('Fetch response:', response)
        return response.text();     //3
        
    })
    .then(function(text){
        console.log(text);
        
    });
}
// * 2 POST long hand: /one
function postToOne(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: 'POST',         //1
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        function(response){ //2
            return response.text()
        }
    )
    .catch(
        function(error){ //3
            console.error('Error:', error)
        }
    )
    .then(
        function(response){ //4
            console.log('Success:', response);
            
        }
    )
}
// * 3 POST /one : Arrow Function
function postToOneArrow(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, {        //1
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.text())//2
    .catch(error => console.error('Error:', error))//3
    .then(response => console.log('Success:', response));//4
}

//* Adding content to the database
function postData(){
    //1
    let content = { testdata: { item: 'This was saved!'} };

    //2
    let testDataAfterFetch = document.getElementById('test-data');
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)   //3
    })
    .then(response => response.json())
    .then(function (text){
        console.log(text);
        //4
        testDataAfterFetch.innerHTML = text.testdata.testdata;
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}
// * 4 GET FROM /ONE - Display Data
function fetchFromOneDisplayData(){
    //1
    let url = 'http://localhost:3000/test/one';
    let dataView = document.getElementById('display-one');   

    //2
    fetch(url, {
      method: 'GET', 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
        function(response){
            return response.json()
        })
    .catch(
        function(error){
            console.error('Error:', error)
        })
    .then(
        function(response){
            let myList = document.querySelector('ul'); //3

            for (r of response){  //4
                console.log('Response:', r.testdata); //5
                var listItem = document.createElement('li');  //6 
                listItem.innerHTML = r.testdata; //7
                myList.appendChild(listItem); //8
            }
        })
}

// * scripts.js set up
//1. Test endpoint with fixed value to verify server works.
//2. Send our headers to the server with the Headers() constructor object.
//   We'll talk more about this in a later module.
//3. The value received is a string, not a JSON object, so .text() is used instead of .json() .

// * 2 POST long hand: /one
//1. We are fetching the url. The route in the server handles a POST request, so our method type is POST. These two must match.
//   if a route takes a POST request, then the declared method in the request should POST.
//2. We pass the response into a Promise that returns the response as plain tezt.
//3. We handle an error, if an error comes back.
//4. In the final then(), we simple print the plain text response to the console. This section is where we can do some DOM set up.

// * 3 POST /one : Arrow Function
//1. We're reaching out to an endpoint with a POST request. We add the appropriate headers.
//2. We are asking for a plain text response.
//3. We handle an error, if there is one.
//4. In the end, we simply print the data to the console.

//* Adding content to the database
//1. We set up an object, just like we would have in Postman. We have a preset string as the value of the item property.
//2. We target some specific "ids" in the DOM. These elements will hold the value of the respnse that comes back
//   after the post is stored.

// * 4 GET FROM /ONE - Display Data
//1. We set up our UR: in one variable and target the data-one id in the DOM in another one.
//2. We create a fetch() with Headers and therequest method of GET. THere are also chained promises that handle the data when it 
//   returns or hanlde an error if one coes back.
//3. Inside the final .then(), we are going to work towards showing the returned data in the DOM. We start by targeting the first
//   ul in the DOM and attaching the value of the myList variable.
//4. We set up a for of loop.
//5. We write a console.log() statement to show how we can access the values that come back in the object inside the response.
//6. We create another variable called listItem. the creaeElement() method will create that type of element in the DOM.
//   In this case, we create a list item, li , ever time we iterate.
//7. Each time we iterate, we store the value of r.testdata in the newly crate li.
//8. We call appendChild on myList , which means that each time we iterate we put the li into the unordered list.