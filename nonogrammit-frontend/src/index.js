// Start to make the clicks change the databse and not just the DOM
// Learn more about scope to figure out why I need to call that checkSolution function twice to maek it work
let currentUser
let puzzleNumber
let currentPuzzle
let time
let test

document.addEventListener("DOMContentLoaded", () => {
  fetchUser("guest", "password")
  addNewPuzzleButtonFunctionality()
  addUserInfoSubmitButtonFunctionality()
  displayUsernameDiv("guest")
})

function displayUsernameDiv(username){
  let usernameDisplayDiv = document.createElement("div")
  usernameDisplayDiv.id = "username-display"
  usernameDisplayDiv.innerHTML = `User: ${username}`
  document.querySelector("body").insertBefore(usernameDisplayDiv, document.querySelector("#new-puzzle-button-container"));
}

function addNewPuzzleButtonFunctionality(){
  let newPuzzleButton = document.querySelector("#new-puzzle-button")
  newPuzzleButton.addEventListener("click", () => {
    fetchPuzzle(Math.ceil(Math.random()*5))
  });
}

function addRestartPuzzleButton(puzzleWrapper){
  if (!document.getElementById("restart-puzzle-button")){
    let restartPuzzleButton = document.createElement("button")
    restartPuzzleButton.id = "restart-puzzle-button"
    restartPuzzleButton.innerHTML = "Restart"
    restartPuzzleButton.addEventListener("click", () => {
      let shadedSquares = document.querySelectorAll('div[status="1"]')
      for (let i=0; i<shadedSquares.length; i++){
        shadedSquares[i].setAttribute("status", "0")
      }
    })
    let body = puzzleWrapper.parentNode
    body.appendChild(restartPuzzleButton)
  }
}

function addCheckSolutionPuzzleButton(puzzleWrapper){
  if (!document.getElementById("check-solution-puzzle-button")){
    let checkSolutionButton = document.createElement("button")
    checkSolutionButton.id = "checkSolution-puzzle-button"
    checkSolutionButton.innerHTML = "Check Solution"
    checkSolutionButton.addEventListener("click", () => {
      currentUser.checkSolution()
    })
    let body = puzzleWrapper.parentNode
    body.appendChild(checkSolutionButton)
  }
}

function addRevealSolutionButton(puzzleWrapper){
  if (!document.getElementById("reveal-solution-button")){
    let revealSolutionButton = document.createElement("button")
    revealSolutionButton.id = "reveal-solution-button"
    revealSolutionButton.innerHTML = "Reveal Solution"
    revealSolutionButton.addEventListener("click", () => {
      // go fetch the puzzle solution from the db?
      for (i=0; i<currentPuzzle.solution.length; i++){
        document.getElementById(currentPuzzle.solution[i]).setAttribute("status", "1")
      }
    })
    let body = puzzleWrapper.parentNode
    body.appendChild(revealSolutionButton)
  }
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
  if (!document.getElementById("puzzle")){
    let body = document.body
    let puzzleDiv = document.createElement("div")
    puzzleDiv.id = "puzzle"
    puzzleWrapper = document.createElement("div")
    puzzleWrapper.id = "puzzle-wrapper"
    body.appendChild(puzzleWrapper)
    puzzleWrapper.appendChild(puzzleDiv)
    return puzzleWrapper
  }
}

function displayNewPuzzle(puzzle){
  let puzzleDiv = document.querySelector("#puzzle")
  puzzleDiv.innerHTML = ""
  puzzleDiv.className = "puzzle"
  createColumnParametersDivs(puzzleDiv, puzzle)
  createRowParametersDivs(puzzleDiv, puzzle)
  addPuzzleSquares(puzzle)
}

function createColumnParametersDivs(puzzleDiv, puzzle){
  setUpColumnParams(puzzleDiv, puzzle.column_max)
  enterColumnParamsData(puzzle)
}

function createRowParametersDivs(puzzleDiv, puzzle){
  for (let i=0; i<puzzle.row_parameters.length; i++){
    let rowDiv = document.createElement("div")
    rowDiv.className = "row"
    rowDiv.id = `row-${i+1}`
    puzzleDiv.appendChild(rowDiv)
    let rowParamsDiv = document.createElement("div")
    rowParamsDiv.className = "row-params"
    if (i%5 === 0){
      rowParamsDiv.className = "bold-top-row-params"
    }
    rowParamsDiv.id = `row-${i+1}-params`
    rowParamsDiv.innerHTML = puzzle.row_parameters[i].join("...")
    rowDiv.appendChild(rowParamsDiv)
  }
}

function addPuzzleSquares(puzzle){
  for (let i=0; i<puzzle.row_parameters.length; i++){
    let rowDiv = document.getElementById(`row-${i+1}`)
    for (let k=0; k<25; k++){
      let squareDiv = document.createElement("div")
      squareDiv.className = "puzzle-square"
      if (i%5 === 0 && k%5 === 0){
        squareDiv.className = "bold-top-and-left-puzzle-square"
      }
      else if (i%5 === 0){
        squareDiv.className = "bold-top-puzzle-square"
      }
      else if (k%5 === 0){
        squareDiv.className = "bold-left-puzzle-square"
      }
      squareDiv.id = `${k+1}-${i+1}`
      squareDiv.setAttribute("status", 0)
      squareDiv.addEventListener("click", () => {
        if (squareDiv.getAttribute("status") === "0"){
          squareDiv.setAttribute("status", 1)
        }
        else if (squareDiv.getAttribute("status") === "1"){
          squareDiv.setAttribute("status", 0)
        }
      })
      rowDiv.appendChild(squareDiv)
    }
  }
}

function setUpColumnParams(puzzleDiv, column_max){
  for (let i=0; i<column_max; i++){
    let columnParametersDiv = document.createElement("div")
    columnParametersDiv.id = `column-parameters-row-${i+1}`
    columnParametersDiv.className = "column-parameters"
    puzzleDiv.appendChild(columnParametersDiv)
    let blankSquareDiv = document.createElement("div")
    blankSquareDiv.className = "blank-square"
    columnParametersDiv.appendChild(blankSquareDiv)
    for (let j=0; j<25; j++){
      let columnParamDiv = document.createElement("div")
      columnParamDiv.className = "column-params-square"
      if (j%5 === 0){
        columnParamDiv.className = "bold-left-column-params-square"
      }
      columnParamDiv.id = `column-param-${j+1}-${i+1}`
      columnParametersDiv.appendChild(columnParamDiv)
    }
  }
}

function enterColumnParamsData(puzzle){
  for (let k=0; k<25; k++){
    let parameter = puzzle.column_parameters[k]
    for (let e=0; e<parameter.length; e++){
      let targetSquare = document.getElementById(`column-param-${k+1}-${puzzle.column_max-parameter.length+e+1}`)
      targetSquare.innerHTML= parameter[e]
    }
  }
}

function fetchPuzzle(puzzleNumber){
  fetch(`http://localhost:3000/puzzles/${puzzleNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      let puzzleWrapper = makePuzzleDiv()
      addCheckSolutionPuzzleButton(puzzleWrapper)
      addRestartPuzzleButton(puzzleWrapper)
      displayPuzzleNumber(puzzleNumber)
      if (currentUser){
        currentUser.currentPuzzle = {id: puzzleNumber}
      }
      console.log(object)
      let attributes = object["data"]["attributes"]
      currentPuzzle = new Puzzle(object.data.id, attributes["column_parameters"], attributes["row_parameters"], attributes["column_max"], attributes["row_max"], attributes["solution"])
      addRevealSolutionButton(puzzleWrapper)
      displayNewPuzzle(currentPuzzle)
      console.log(currentPuzzle)
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
        console.log(object);
        currentUser = new User(object.id, object.username, undefined, 0)
        if (currentUser.username){
          document.getElementById("username-display").innerHTML = `User: ${currentUser.username}`
        }
        if (puzzleNumber){
          currentUser.currentPuzzle = {id: puzzleNumber}
          // time = time
        }
      })
      .catch(function(error) {
          console.log(error.message);
      });
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

// classes
class User {
  constructor(id, username, currentPuzzle, time){
    this.id = id
    this.username = username    
    this.currentPuzzle = currentPuzzle
    this.time = time
  }
  sayHello() {
    console.log(`Hi, i'm ${this.username} with id of ${this.id}`)
  }
  
  postCurrentPuzzleStatus(){
    let currentPuzzleStatus = {}
    currentPuzzleStatus.id = currentUser.currentPuzzle.id
    let shaded = document.querySelectorAll("[status='1']")
    let shadedArray = Array.from(shaded)
    let shadedSquaresCoordinates
    for (let i=0; i<shadedArray.length; i++){
      shadedSquaresCoordinates = shadedArray.map(e => e.id)
    }    
    currentPuzzleStatus.shaded = shadedSquaresCoordinates
    this.currentPuzzle = currentPuzzleStatus
    let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "current_puzzle": currentPuzzleStatus
          }
        )
      };
    fetch(`http://localhost:3000/users/${this.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
        })
        .catch(function(error) {
            console.log(error.message);
        }
    );
    return currentUser
  }
  
  checkSolution(){
    let user = this.postCurrentPuzzleStatus()
    if (user.currentPuzzle.shaded){
      let currentPuzzleShaded = user.currentPuzzle.shaded
      let correctShadedSquares = currentPuzzle.solution.filter(e => currentPuzzleShaded.includes(e))
      console.log(`You submitted ${currentPuzzleShaded.length} shaded squares. ${correctShadedSquares.length} of those are correct.`)
    }
  }
}

class Puzzle{
  constructor(id, column_parameters, row_parameters, column_max, row_max, solution){
    this.id = id
    this.column_parameters = column_parameters
    this.row_parameters = row_parameters
    this.column_max = column_max
    this.row_max = row_max
    this.column_status
    this.solution = solution
  }
}

class Column{
  constructor(parameters, completion_status, puzzle_location, puzzle_id){
    this.parameters = parameters
    this.completion_status = completion_status
    this.puzzle_location = puzzle_location
    this.puzzle_id = puzzle_id
  }
}

class Row{
  constructor(parameters, completion_status, puzzle_location, puzzle_id){
    this.parameters = parameters
    this.completion_status = completion_status
    this.puzzle_location = puzzle_location
    this.puzzle_id = puzzle_id
  }
}
