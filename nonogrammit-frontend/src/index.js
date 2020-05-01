// finish work on making containers starting with the page title one on line 16 <h1 id="title">Nonogrammit</h1>

let currentUser
let puzzleNumber
let currentPuzzle
let time
let test

document.addEventListener("DOMContentLoaded", () => {
  createContainers()
  addPageTitleHeader()
  addUserInfoFormAndSubmitButton()
  addNewPuzzleButton()
  fetchUser("guest", "password")
})

function createContainers(){
  let body = document.querySelector("body")
  let pageTitleContainer = document.createElement("div")
  pageTitleContainer.id = "page-title-container"
  body.appendChild(pageTitleContainer)
  let logInFormContainer = document.createElement("div")
  logInFormContainer.id = "log-in-form-container"
  body.appendChild(logInFormContainer)
  let userInfoContainer = document.createElement("div")
  userInfoContainer.id = "user-info-container"
  body.appendChild(userInfoContainer)
  let newPuzzleButtonContainer = document.createElement("div")
  newPuzzleButtonContainer.id = "new-puzzle-button-container"
  body.appendChild(newPuzzleButtonContainer)
  let puzzleNumberHeaderContatiner = document.createElement("div")
  puzzleNumberHeaderContatiner.id = "puzzle-number-header-container"
  body.appendChild(puzzleNumberHeaderContatiner)
  let puzzleTimerContainer = document.createElement("div")
  puzzleTimerContainer.id = "puzzle-timer-container"
  body.appendChild(puzzleTimerContainer)
  let puzzleMessageContainter = document.createElement("div")
  puzzleMessageContainter.id = "puzzle-message-container"
  body.appendChild(puzzleMessageContainter)
  let puzzleContainer = document.createElement("div")
  puzzleContainer.id = "puzzle-container"
  body.appendChild(puzzleContainer)
  let pageBottomButtonsContainer = document.createElement("div")
  pageBottomButtonsContainer.id = "page-bottom-buttons-container"
  body.appendChild(pageBottomButtonsContainer)
}

function addPageTitleHeader(){
  let pageTitleHeader = document.createElement("h1")
  pageTitleHeader.id = "page-title"
  pageTitleHeader.innerHTML = "Nonogrammit"
  document.getElementById("page-title-container").appendChild(pageTitleHeader)
}

function addUserInfoFormAndSubmitButton(){
  let userInfoForm = document.createElement("form")
  userInfoForm.innerHTML = "<label>Username: </label><input type='text' name='username' id='username'> <label>Password: </label><input type='text' name='password' id='password'> <input type='submit' id='submit' value='Submit'>"
  document.getElementById("log-in-form-container").appendChild(userInfoForm)
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

function addUsernameDiv(username){
  let usernameDisplayDiv
  if (document.getElementById("username-display")){
    usernameDisplayDiv = document.getElementById("username-display")
  }
  else{
    usernameDisplayDiv = document.createElement("div")
    usernameDisplayDiv.id = "username-display"
    document.getElementById("user-info-container").appendChild(usernameDisplayDiv)
  }
  usernameDisplayDiv.innerHTML = `User: ${username}`
}

function addNewPuzzleButton(){
  let newPuzzleButton = document.createElement("button")
  newPuzzleButton.id = "new-puzzle-button"
  newPuzzleButton.innerHTML = "New Puzzle!"
  newPuzzleButton.addEventListener("click", () => {
    fetchPuzzle(Math.ceil(Math.random()*5))
  });
  document.getElementById("new-puzzle-button-container").appendChild(newPuzzleButton)
}

function addTimer(){
  let timerDiv
  if (document.getElementById("time")){
    timerDiv = document.getElementById("time")
  }
  else{
    timerDiv = document.createElement("div")
    timerDiv.id = "time"
    document.getElementById("puzzle-timer-container").appendChild(timerDiv)
    timerStarter = setInterval(() =>{
      let newTime = parseInt(timerDiv.innerHTML)+1
      timerDiv.innerHTML = newTime
    }, 1000)
  }
  timerDiv.innerHTML = 0
}

function addRestartPuzzleButton(puzzleContainer){
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
    document.getElementById("page-bottom-buttons-container").appendChild(restartPuzzleButton)
  }
}

function addCheckSolutionPuzzleButton(){
  if (!document.getElementById("check-solution-button")){
    let checkSolutionButton = document.createElement("button")
    checkSolutionButton.id = "check-solution-button"
    checkSolutionButton.innerHTML = "Check Solution"
    checkSolutionButton.addEventListener("click", () => {
      currentUser.checkSolution()
    })
    document.getElementById("page-bottom-buttons-container").appendChild(checkSolutionButton)
  }
}

function addRevealSolutionButton(){
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
    document.getElementById("page-bottom-buttons-container").appendChild(revealSolutionButton)
  }
}

function makePuzzleDiv(){
  if (!document.getElementById("puzzle")){
    let body = document.body
    let puzzleDiv = document.createElement("div")
    puzzleDiv.id = "puzzle"
    let puzzleContainer = document.getElementById("puzzle-container")
    puzzleContainer.appendChild(puzzleDiv)
    return puzzleContainer
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

function clearMessage(){
  document.getElementById("puzzle-message-container").innerHTML = ""
}

function fetchPuzzle(puzzleNumber){
  fetch(`http://localhost:3000/puzzles/${puzzleNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      let puzzleContainer = makePuzzleDiv()
      addCheckSolutionPuzzleButton()
      addRestartPuzzleButton()
      addPuzzleNumberHeader(puzzleNumber)
      if (currentUser){
        currentUser.currentPuzzle = {id: puzzleNumber}
      }
      console.log(object)
      let attributes = object["data"]["attributes"]
      currentPuzzle = new Puzzle(object.data.id, attributes["column_parameters"], attributes["row_parameters"], attributes["column_max"], attributes["row_max"], attributes["solution"])
      addRevealSolutionButton()
      displayNewPuzzle(currentPuzzle)
      addTimer()
      stopParty()
      clearMessage()
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
          addUsernameDiv(currentUser.username)
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
function addPuzzleNumberHeader(puzzleNumber){
  if (document.querySelector("#puzzle-number-header")){
    document.querySelector("#puzzle-number-header").innerHTML = `Puzzle #${puzzleNumber}`
  }
  else{
    let puzzleNumberHeader = document.createElement("h2")
    puzzleNumberHeader.id = "puzzle-number-header"
    puzzleNumberHeader.innerHTML = `Puzzle #${puzzleNumber}`
    document.getElementById("puzzle-number-header-container").appendChild(puzzleNumberHeader)
  }
}

let startParty

function puzzleParty(speed, quantity){
  startParty = setInterval(partySquare, parseInt(speed)) 
  function partySquare(){
    let shadedSquares = document.querySelectorAll('div[status="1"]')
    let partySquareIndices = []
    for (let i=0; i<parseInt(quantity); i++){
      let index = Math.ceil(Math.random()*shadedSquares.length-1)
      if (!(partySquareIndices.includes(index))){
        partySquareIndices.push(index)
      }
    }
    for (let j=0; j<partySquareIndices.length; j++){
      let partySquare = shadedSquares[partySquareIndices[j]]
      partySquare.setAttribute("status", "party")
      setTimeout(()=>{
          partySquare.setAttribute("status", "1")
        }, parseInt(speed)
      )
    }
  }
}

function stopParty(){
  clearInterval(startParty)
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
      let puzzleMessage
      
      if (document.getElementById("puzzle-message")){
        puzzleMessage = document.getElementById("puzzle-message")
      }
      else {
        puzzleMessage = document.createElement("div")
        puzzleMessage.id = "puzzle-message"
        document.getElementById("puzzle-message-container").appendChild(puzzleMessage)
      }
      if (currentPuzzleShaded.length === correctShadedSquares.length){
        puzzleMessage.innerHTML = "PARTY LIKE ITS YOUR BIRTHDAY. YOU DID IT!"
        puzzleParty(150, 40)
      }
      else{
        puzzleMessage.innerHTML = `You submitted ${currentPuzzleShaded.length} shaded squares. ${correctShadedSquares.length} of those are correct.`
        console.log(`You submitted ${currentPuzzleShaded.length} shaded squares. ${correctShadedSquares.length} of those are correct.`)
      }
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
