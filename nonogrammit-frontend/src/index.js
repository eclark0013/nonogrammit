// console.log("testing...")
// const BACKEND_URL = 'http://localhost:3000/';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

let currentUser
let puzzleNumber
let time

document.addEventListener("DOMContentLoaded", () => {
    newPuzzle() // create button is in html - should be moved to here, click functionality is here
    addUserInfoSubmitButtonFunctionality()
    makePuzzleDiv()
    addSquaresToPuzzleDiv()
})

function addUserInfoSubmitButtonFunctionality(){
  let userInfoSubmitButton = document.querySelector("#submit")
    userInfoSubmitButton.addEventListener("click", function(event) {
      event.preventDefault();
      let username = document.querySelector("#username")
      let password = document.querySelector("#password")
      fetchUser(username.value, password.value)
      username.value = ""
      password.value = ""
    })
}


function makePuzzleDiv(){
  let body = document.body
  let puzzleDiv = document.createElement("div")
  puzzleDiv.id = "puzzle"
  body.appendChild(puzzleDiv)
}

function addSquaresToPuzzleDiv(){
  let body = document.body
  let puzzleDiv = document.querySelector("#puzzle")
  let squareDiv = document.createElement("div")
  squareDiv.className = "puzzle-square"
  squareDiv.id = "00-00"
  squareDiv.innerHTML = "9"
  puzzle.appendChild(squareDiv)
}

function newPuzzle(){
  let newPuzzleButton = document.querySelector("#new-puzzle-button")
    newPuzzleButton.addEventListener("click", () => {
      fetch("http://localhost:3000/puzzleInfo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        puzzleNumber = Math.floor(Math.random()*20)
        let singlePuzzle = data["rawPuzzleDatabase"][puzzleNumber]
        displayPuzzleNumber(puzzleNumber)
        if (currentUser){
          currentUser.currentPuzzle = puzzleNumber
        }
        console.log(singlePuzzle);
      });
    })
}
// create a new user
function fetchUser(username, password){
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          "username": username,
          "password": password
      })
    };
  fetch("http://localhost:3000/users", configObj)
      .then(function(response) {
          return response.json();
      })
      .then(function(object) {
        currentUser = new User(object.username, undefined, 0)
        if (puzzleNumber){
          currentUser.currentPuzzle = puzzleNumber
          // time = time
        }
        console.log(currentUser);
      })
      .catch(function(error) {
          console.log(error.message);
      }); 
}

// user class
class User {
  constructor(username, currentPuzzle, time){
    this.username = username    
    this.currentPuzzle = currentPuzzle
    this.time = time
  }
}


// display puzzle number
function displayPuzzleNumber(puzzleNumber){
  if (document.querySelector("#puzzle-number-display")){
    document.querySelector("#puzzle-number-header").innerHTML = `Puzzle #${puzzleNumber}`
  }
  else{
    let puzzleNumberDiv = document.createElement("div")
    puzzleNumberDiv.id = "puzzle-number-display"
    let puzzleNumberHeader = document.createElement("h2")
    puzzleNumberHeader.id = "puzzle-number-header"
    puzzleNumberDiv.appendChild(puzzleNumberHeader)
    puzzleNumberHeader.innerHTML = `Puzzle #${puzzleNumber}`
    document.querySelector("#new-puzzle-button").after(puzzleNumberDiv)
  }
}
