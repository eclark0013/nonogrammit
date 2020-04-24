// console.log("testing...")
// const BACKEND_URL = 'http://localhost:3000/';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

let currentUser
let puzzleNumber
let currentPuzzle = 7
let time
let test

document.addEventListener("DOMContentLoaded", () => {
  addNewPuzzleButtonFunctionality()
  addUserInfoSubmitButtonFunctionality()
})

function addNewPuzzleButtonFunctionality(){
  let newPuzzleButton = document.querySelector("#new-puzzle-button")
  newPuzzleButton.addEventListener("click", () => {
    makePuzzleDiv()
    fetchPuzzle(Math.floor(Math.random()*20))
    // addSquaresToPuzzleDiv(testPuzzle)
  });
}

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
  return puzzleDiv
}

function addSquaresToPuzzleDiv(puzzle){
  // let body = document.body
  createColumnParametersDivs(puzzle)
}

function createColumnParametersDivs(puzzle){
  let puzzleDiv = document.querySelector("#puzzle")
  let columnParametersDiv
  // console.log(currentPuzzle["columnMax"])
  for (let i=0; i<puzzle.column_max; i++){
    columnParametersDiv = document.createElement("div")
    columnParametersDiv.id = "column-paramaters"
    puzzleDiv.appendChild(columnParametersDiv)
    let blankSquareDiv = document.createElement("div")
    blankSquareDiv.className = "blank-square"
    puzzleDiv.appendChild(blankSquareDiv)
    for (let i=0; i<25; i++){
      let squareDiv = document.createElement("div")
      squareDiv.className = "puzzle-square"
      squareDiv.id = `${i}-00`
      squareDiv.innerHTML = `${i}`
      columnParametersDiv.appendChild(squareDiv)
    }
  }
  
}

function fetchPuzzle(puzzleNumber){
  fetch(`http://localhost:3000/puzzles/${puzzleNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      displayPuzzleNumber(puzzleNumber)
      if (currentUser){
        currentUser.currentPuzzle = puzzleNumber
      }
      let attributes = object["data"]["attributes"]
      currentPuzzle = new Puzzle(attributes["column_parameters"], attributes["row_parameters"], attributes["column_max"], attributes["row_max"])
      addSquaresToPuzzleDiv(currentPuzzle)
    })
}

// create puzzle data object with column and row max lengths
// function createPuzzleDataObject(puzzleData){
//   puzzleData = puzzleData.split("/")
//   puzzleData = puzzleData.map(set => set.split("."))
//   let columnData = puzzleData.slice(0,25)
//   let rowData = puzzleData.slice(25,50)
//   let puzzleDataObject = {
//     columns: columnData,
//     rows: rowData,
//     columnMax: findMaxArraySize(columnData),
//     rowMax: findMaxArraySize(rowData)
//   }
//   return puzzleDataObject
// }

// function findMaxArraySize(arrayOfArrays){
//   let maxLength = 0
//   for (i=0; i<arrayOfArrays.length; i++){
//     if(arrayOfArrays[i].length > maxLength){
//       maxLength = arrayOfArrays[i].length
//     }
//   }
//   return maxLength
// }

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

class Puzzle{
  constructor(column_parameters, row_parameters, column_max, row_max){
    this.column_parameters = column_parameters
    this.row_parameters = row_parameters
    this.column_max = column_max
    this.row_max = row_max
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

