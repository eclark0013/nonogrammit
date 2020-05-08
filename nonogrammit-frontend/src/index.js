let currentUser
let puzzleNumber
let currentPuzzle
let time
let test

document.addEventListener("DOMContentLoaded", () => {
  addLeftMenu()
  addRightMenu()
  createMainPageContainers()
  createRightMenuContainers()
  addPageTitleHeader()
  addLogInFormAndSubmitButton()
  addLoginLogoutButton()
  addNewPuzzleButton()
  addSelectPuzzleButton()
  fetchUser("guest", "password")
  fetchNewPuzzle()
})

function addLeftMenu(){
  let leftMenu = document.createElement("div")
  leftMenu.id = "left-menu"
  document.querySelector("body").appendChild(leftMenu)
}

function addRightMenu(){
  let rightMenu = document.createElement("div")
  rightMenu.id = "right-menu"
  document.querySelector("body").appendChild(rightMenu)
}

function createMainPageContainers(){
  let body = document.querySelector("body")
  let mainPage = document.createElement("div")
  mainPage.id = "main-page"
  body.appendChild(mainPage)
  let pageTitleContainer = document.createElement("div")
  pageTitleContainer.id = "page-title-container"
  mainPage.appendChild(pageTitleContainer)
  let logInFormContainer = document.createElement("div")
  logInFormContainer.id = "login-form-container"
  mainPage.appendChild(logInFormContainer)
  let puzzleNumberHeaderContatiner = document.createElement("div")
  puzzleNumberHeaderContatiner.id = "puzzle-number-header-container"
  mainPage.appendChild(puzzleNumberHeaderContatiner)
  let puzzleTimerContainer = document.createElement("div")
  puzzleTimerContainer.id = "puzzle-timer-container"
  mainPage.appendChild(puzzleTimerContainer)
  let puzzleMessageContainter = document.createElement("div")
  puzzleMessageContainter.id = "puzzle-message-container"
  mainPage.appendChild(puzzleMessageContainter)
  let puzzleContainer = document.createElement("div")
  puzzleContainer.id = "puzzle-container"
  mainPage.appendChild(puzzleContainer)
  let pageBottomButtonsContainer = document.createElement("div")
  pageBottomButtonsContainer.id = "page-bottom-buttons-container"
  mainPage.appendChild(pageBottomButtonsContainer)
}

function createRightMenuContainers(){
  let userInfoContainer = document.createElement("div")
  userInfoContainer.id = "user-info-container"
  document.getElementById("right-menu").appendChild(userInfoContainer)
  let loginLogoutButtonContainer = document.createElement("div")
  loginLogoutButtonContainer.id = "login-logout-button-container"
  document.getElementById("right-menu").appendChild(loginLogoutButtonContainer)
}

function addLoginLogoutButton(){
  let loginLogoutButton = document.createElement("button")
  loginLogoutButton.id = "login-logout-button"
  loginLogoutButton.classname = "menu-button"
  loginLogoutButton.innerHTML = "Log in"
  loginLogoutButton.addEventListener("click", () => {
    if (loginLogoutButton.innerHTML === "Log out"){
      fetchUser("guest", "password")
      loginLogoutButton.innerHTML = "Log in"
    }
    else {
      if (document.getElementById("login-form-container").style.display === ""){
        document.getElementById("login-form-container").style.display = "none"
      }
      else if (document.getElementById("login-form-container").style.display === "none"){
        document.getElementById("login-form-container").style.display = ""
      }
    }
  })
  document.getElementById("login-logout-button-container").appendChild(loginLogoutButton)
}

function addPageTitleHeader(){
  let pageTitleHeader = document.createElement("h1")
  pageTitleHeader.id = "page-title"
  pageTitleHeader.innerHTML = "Nonogrammit"
  document.getElementById("page-title-container").appendChild(pageTitleHeader)
}

function addLogInFormAndSubmitButton(){
  let userInfoForm = document.createElement("form")
  document.getElementById("login-form-container").style.display = "none"
  userInfoForm.innerHTML = "<div>Sign in or Sign up below:</div><label>Username: </label><input type='text' name='username' id='username'> <label>Password: </label><input type='text' name='password' id='password'> <input type='submit' id='submit' value='Submit'><br><br>"
  document.getElementById("login-form-container").appendChild(userInfoForm)
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
    fetchNewPuzzle()
  });
  document.getElementById("left-menu").appendChild(newPuzzleButton)
}

function addSelectPuzzleButton(){
  let selectPuzzleButton = document.createElement("button")
  selectPuzzleButton.id = "select-puzzle-button"
  selectPuzzleButton.innerHTML = "Select Puzzle by Number"
  document.getElementById("left-menu").appendChild(selectPuzzleButton)
  let puzzleInput = document.createElement("input")
  let submitPuzzleNumberButton = document.createElement("input")
  selectPuzzleButton.addEventListener("click", () => {
    if (!document.getElementById("puzzle-input")){
      puzzleInput.id = "puzzle-input"
      puzzleInput.type = "text"
      selectPuzzleButton.appendChild(puzzleInput)
      submitPuzzleNumberButton.type = "submit"
      submitPuzzleNumberButton.id = "submit-puzzle-number-button"
      submitPuzzleNumberButton.value = "Select"
      selectPuzzleButton.appendChild(submitPuzzleNumberButton)
    }
  });
  submitPuzzleNumberButton.addEventListener("click", () => {
    fetchSpecifiedPuzzle(puzzleInput.value)
    puzzleInput.value = ""
  })
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
      let newTime = parseInt(timerDiv.innerHTML.slice(6))+1
      timerDiv.innerHTML = `Time: ${newTime}`
    }, 1000)
  }
  timerDiv.innerHTML = "Time: 0"
}

function addRestartPuzzleButton(puzzleContainer){
  if (!document.getElementById("restart-puzzle-button")){
    let restartPuzzleButton = document.createElement("button")
    restartPuzzleButton.id = "restart-puzzle-button"
    restartPuzzleButton.className = "page-bottom-button"
    restartPuzzleButton.innerHTML = "Restart"
    restartPuzzleButton.addEventListener("click", () => {
      resetAllSquares()
    })
    document.getElementById("left-menu").appendChild(restartPuzzleButton)
  }
}

function resetAllSquares(){
  let shadedSquares = document.querySelectorAll('div[status="1"]')
  for (let i=0; i<shadedSquares.length; i++){
    shadedSquares[i].setAttribute("status", "0")
  }
  let wrongSquares = document.querySelectorAll('div[status="incorrect"]')
  for (let i=0; i<wrongSquares.length; i++){
    wrongSquares[i].setAttribute("status", "0")
  }
}

function addCheckSolutionPuzzleButton(){
  if (!document.getElementById("check-solution-button")){
    let checkSolutionButton = document.createElement("button")
    checkSolutionButton.id = "check-solution-button"
    checkSolutionButton.className = "page-bottom-button"
    checkSolutionButton.innerHTML = "Check Solution"
    checkSolutionButton.addEventListener("click", () => {
      currentUser.checkSolution()
    })
    document.getElementById("left-menu").appendChild(checkSolutionButton)
  }
}

function addRevealSolutionButton(){
  if (!document.getElementById("reveal-solution-button")){
    let revealSolutionButton = document.createElement("button")
    revealSolutionButton.id = "reveal-solution-button"
    revealSolutionButton.className = "page-bottom-button"
    revealSolutionButton.innerHTML = "Reveal Solution"
    revealSolutionButton.addEventListener("click", () => {
      resetAllSquares()
      for (i=0; i<currentPuzzle.solution.length; i++){
        document.getElementById(currentPuzzle.solution[i]).setAttribute("status", "1")
      }
    })
    document.getElementById("left-menu").appendChild(revealSolutionButton)
  }
}

function addRevealMistakesButton(){
  if (!document.getElementById("reveal-mistakes-button")){
    let revealMistakesButton = document.createElement("button")
    revealMistakesButton.id = "reveal-mistakes-button"
    revealMistakesButton.className = "page-bottom-button"
    revealMistakesButton.innerHTML = "Reveal Mistakes"
    revealMistakesButton.addEventListener("click", () => {
      currentUser.revealMistakes()
      console.log("awyeah")
    })
    document.getElementById("left-menu").appendChild(revealMistakesButton)
  }
}

// puzzle set up start
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
  for (let i=1; i<=25; i++){
    let rowDiv = document.createElement("div")
    rowDiv.className = "row"
    rowDiv.id = `row-${i}`
    puzzleDiv.appendChild(rowDiv)
    let rowParamsDiv = document.createElement("div")
    rowParamsDiv.className = "row-params"
    if (i%5 === 1){
      rowParamsDiv.className = "bold-top-row-params"
    }
    rowParamsDiv.id = `row-${i}-params`
    rowParamsDiv.innerHTML = puzzle.row_params[i].split(", ").join("...")
    rowDiv.appendChild(rowParamsDiv)
  }
}

function addPuzzleSquares(puzzle){
  for (let i=0; i<25; i++){
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
        else {
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
  for (let k=1; k<26; k++){
    let parameter = puzzle.column_params[k].split(", ")
    for (let e=0; e<parameter.length; e++){
      let targetSquare = document.getElementById(`column-param-${k}-${e+1+(puzzle.column_max-parameter.length)}`)
      targetSquare.innerHTML= parameter[e]
    }
  }
}
// puzzle set up finish

function clearMessage(){
  document.getElementById("puzzle-message-container").innerHTML = ""
}

function fetchSpecifiedPuzzle(puzzleNumber){
  fetch(`http://localhost:3000/puzzles/${puzzleNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      setUpNewPuzzle(object)
    })
}

function fetchNewPuzzle(){
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
    })
  };
fetch("http://localhost:3000/puzzles", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      console.log(object)
      setUpNewPuzzle(object)
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

function fetchNewGame(user){
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "user_id": user.id,
      "puzzle_id": user.currentPuzzle.id
    })
  };
fetch("http://localhost:3000/games", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      console.log(object)
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

function setUpNewPuzzle(object){
  let puzzleContainer = makePuzzleDiv()
  let puzzleNumber = object["data"]["id"]
  addCheckSolutionPuzzleButton()
  addRestartPuzzleButton()
  addRevealSolutionButton()
  addRevealMistakesButton()
  addPuzzleNumberHeader(puzzleNumber)
  if (currentUser){
    currentUser.currentPuzzle = {id: puzzleNumber}
  }
  setCurrentPuzzle(object)
  displayNewPuzzle(currentPuzzle)
  addTimer()
  stopParty()
  clearMessage()
  // fetchNewGame(currentUser)
}

function setCurrentPuzzle(object){
  let attributes = object["data"]["attributes"]
  currentPuzzle = new Puzzle(object.data.id, attributes["column_params"], attributes["row_params"], attributes["column_max"], attributes["row_max"], attributes["solution"])
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
        console.log(object)
        if (object.message){
          let errorMessageDiv
          if (document.getElementById("error-message")){
            errorMessageDiv = document.getElementById("error-message")
          }
          else {
            errorMessageDiv = document.createElement("div")
            errorMessageDiv.id = "error-message"
            document.getElementById("login-form-container").appendChild(errorMessageDiv)
          }
          errorMessageDiv.innerHTML = object.message
        }
        else {
          let userAttributes = object["data"]["attributes"]
          currentUser = new User(userAttributes.id, userAttributes.username)
          if (currentUser.username){
            if (document.getElementById("error-message")){
              document.getElementById("error-message").style.display = "none"
            }
            addUsernameDiv(currentUser.username)
            if (currentUser.username !== "guest"){
              document.getElementById("login-logout-button").innerHTML = "Log out"
              document.getElementById("login-form-container").style.display = "none"
            }
          }
          if (puzzleNumber){
            currentUser.currentPuzzle = {id: puzzleNumber}
            // time = time
          }
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
    let puzzleNumberHeader = document.createElement("h3")
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
  constructor(id, username, currentPuzzle, games){
    this.id = id
    this.username = username    
    this.currentPuzzle = currentPuzzle
    this.games = games
  }
  sayHello() {
    console.log(`Hi, i'm ${this.username} with id of ${this.id}`)
  }
  
  postCurrentPuzzleStatus(){
    let currentPuzzleStatus = {}
    currentPuzzleStatus.id = currentPuzzle.id
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
      if (currentPuzzle.solution.length === correctShadedSquares.length){
        puzzleMessage.innerHTML = `PARTY LIKE ITS YOUR BIRTHDAY. YOU DID IT! All ${currentPuzzleShaded.length} squares!`
        puzzleParty(150, 40)
        setTimeout(stopParty, 5000)
      }
      else{
        puzzleMessage.innerHTML = `You submitted ${currentPuzzleShaded.length} shaded squares. ${correctShadedSquares.length} of those are correct.`
        console.log(`You submitted ${currentPuzzleShaded.length} shaded squares. ${correctShadedSquares.length} of those are correct.`)
      }
    }
  }

  revealMistakes(){
    let user = this.postCurrentPuzzleStatus()
    if (user.currentPuzzle.shaded){
      let incorrectShadedSquares = currentUser.currentPuzzle.shaded.filter(e=>!(currentPuzzle.solution.includes(e)))
      for (let i = 0; i<incorrectShadedSquares.length; i++){
        document.getElementById(incorrectShadedSquares[i]).setAttribute("status", "incorrect")
      }
    }
  }

  updateUser(){
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          "current_puzzle": this.currentPuzzle,
          "games": this.games
        }
      )
    };
    fetch(`http://localhost:3000/users/${this.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
          console.log(object)
        })
        .catch(function(error) {
            console.log(error.message);
        }
    );
  }
}

class Puzzle{
  constructor(id, column_params, row_params, column_max, row_max, solution){
    this.id = id
    this.column_params = column_params
    this.row_params = row_params
    this.column_max = column_max
    this.row_max = row_max
    this.solution = solution
  }
}

// games class can keep track of users puzzle records and history, best times feature on right menu with a user's best times so far (just time and puzzle #)
// # of puzzles started, # of puzzles completed, best completion time, last completed puzzle
// organize functions into classes (html handling, puzzle making, etc.)
// remove dots in betwen numbers in row paramters
// center numbers in column parameters
// make puzzzle scroll below certain px
// change menu bar to top if screen is too thin, or even to opening three-line menu
// when to create new puzzles...? and if I don't create on fetchNewPuzzle then I should generate random number (but how to know the bounds?) here and find puzzle
// user on database end does not know current puzzle

