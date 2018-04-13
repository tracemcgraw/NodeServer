// import { reverse } from "dns";

// var wordList = ['Hey','There','You'];

// function remove3(word){
//     for(var i = 0; i <= word.length; i++){
//         if(word[i].length == 3){
//          word = word.push(word);
//          return console.log(word);
//         }
//     }
// };

// remove3(wordList);



// var wordList = ['Hey','There','You'];
// wordList = wordList.map(word =>{
// word.length == 3

// });

// console.log(wordList);

// var word
// reverseString(“Howdy”) 

// const arr = ['tom','kenn'];
// let threeLWords =arr.filter(a => a.length === 3);

// threeLWords.forEach( w => {
//   w.reverseString();
// })

const wordList = ['Hey', 'There', 'Trace'];

let remove3 = wordList.filter(word => word.length === 3);

remove3.forEach(element => {
    reverseString(element);
    
});
