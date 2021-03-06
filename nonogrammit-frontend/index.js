let currentUser
let currentPuzzle
let currentGame
let highlightedSquares = []

document.addEventListener("DOMContentLoaded", () => {
  addMenus()
  createMainPageContainers()
  createRightMenuContainers()
  addPageTitleHeader()
  addLogInFormAndSubmitButton()
  addLoginLogoutButton()
  addNewPuzzleButton()
  addSelectPuzzleButton()
  fetchUser("guest", "password")
  setUpPuzzleContainers()
  fetchNewPuzzle()
  addInfoDiv()
})

// initial set up - start
function addMenus(){
  let leftMenu = document.createElement("div")
  leftMenu.id = "left-menu"
  leftMenu.className = "menu"
  document.querySelector("body").appendChild(leftMenu)
  let rightMenu = document.createElement("div")
  rightMenu.id = "right-menu"
  rightMenu.className = "menu"
  document.querySelector("body").appendChild(rightMenu)
}

function createMainPageContainers(){
  let body = document.querySelector("body")
  let pageHeader = document.createElement("div")
  pageHeader.id = "page-header"
  body.appendChild(pageHeader)
  let pageTitleContainer = document.createElement("div")
  pageTitleContainer.id = "page-title-container"
  pageHeader.appendChild(pageTitleContainer)
  let logInFormContainer = document.createElement("div")
  logInFormContainer.id = "login-form-container"
  pageHeader.appendChild(logInFormContainer)
  let puzzleNumberHeaderContainer = document.createElement("div")
  puzzleNumberHeaderContainer.id = "puzzle-number-header-container"
  pageHeader.appendChild(puzzleNumberHeaderContainer)
  let puzzleTimerContainer = document.createElement("div")
  puzzleTimerContainer.id = "puzzle-timer-container"
  pageHeader.appendChild(puzzleTimerContainer)
  let puzzleMessageContainter = document.createElement("div")
  puzzleMessageContainter.id = "puzzle-message-container"
  pageHeader.appendChild(puzzleMessageContainter)
}

function createRightMenuContainers(){
  let userInfoContainer = document.createElement("div")
  userInfoContainer.id = "user-info-container"
  document.getElementById("right-menu").appendChild(userInfoContainer)
  let userRecordsContainer = document.createElement("div")
  userRecordsContainer.id = "user-records-container"
  document.getElementById("right-menu").appendChild(userRecordsContainer)
  let loginLogoutButtonContainer = document.createElement("div")
  loginLogoutButtonContainer.id = "login-logout-button-container"
  document.getElementById("right-menu").appendChild(loginLogoutButtonContainer)
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
  userInfoForm.innerHTML = "<div>Sign in or Sign up below:</div><label>Username: </label><input type='text' name='username' id='username'> <label>Password: </label><input type='password' name='password' id='password'> <input type='submit' id='submit' value='Submit'><br><br>"
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

function addLoginLogoutButton(){
  let loginLogoutButton = document.createElement("button")
  loginLogoutButton.id = "login-logout-button"
  loginLogoutButton.classname = "menu-button"
  loginLogoutButton.innerHTML = "Log in"
  loginLogoutButton.addEventListener("click", () => {
    if (loginLogoutButton.innerHTML === "Log out"){
      fetchUser("guest", "password")
      document.getElementById("user-records-container").innerHTML = ""
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

function setUpPuzzleContainers(){
  let topColumnParams = document.createElement("div")
  topColumnParams.id = "top-column-params"
  topColumnParams.className = "params"
  document.querySelector("body").appendChild(topColumnParams)
  let bottomColumnParams = document.createElement("div") // for future extension
  bottomColumnParams.id = "bottom-column-params"
  bottomColumnParams.className = "params"
  document.querySelector("body").appendChild(bottomColumnParams)
  let leftRowParams = document.createElement("div")
  leftRowParams.id = "left-row-params"
  leftRowParams.className = "params"
  document.querySelector("body").appendChild(leftRowParams)
  let rightRowParams = document.createElement("div") // for future extension
  rightRowParams.id = "right-row-params"
  rightRowParams.className = "params"
  document.querySelector("body").appendChild(rightRowParams)
  let puzzleBoard = document.createElement("div")
  puzzleBoard.id = "puzzle-board"
  document.querySelector("body").appendChild(puzzleBoard)
}

function addInfoDiv(){
  let infoDiv = document.createElement("div")
  infoDiv.id = "info"
  document.querySelector("body").appendChild(infoDiv)
  let gameRules = document.createElement("div")
  gameRules.id = "game-rules"
  gameRules.innerHTML = "Nonograms are logical puzzles in which each row and column has consecutive sets of shaded squares that correspond to the numbers at the end of that column or row. For example 3, 5, 1 would mean a consecutive set of 3, then 5, then 1 shaded square with some amount of unshaded squares between each set."
  infoDiv.appendChild(gameRules)
  let createdByDiv = document.createElement("div")
  createdByDiv.id = "created-by-div"
  createdByDiv.innerHTML = `Created by ${"<a href='https://github.com/eclark0013' target='_blank'>Eric Clark</a>"}`
  infoDiv.appendChild(createdByDiv)
}
// initial set up - end

// buttons and additional functionality set up - start
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

function resetAllSquares(){
  let shadedSquares = document.querySelectorAll('div[status="shaded"]')
  for (let i=0; i<shadedSquares.length; i++){
    shadedSquares[i].setAttribute("status", "unshaded")
  }
  let wrongSquares = document.querySelectorAll('div[status="incorrect"]')
  for (let i=0; i<wrongSquares.length; i++){
    wrongSquares[i].setAttribute("status", "unshaded")
  }
}

function addRestartPuzzleButton(){
  if (!document.getElementById("restart-puzzle-button")){
    let restartPuzzleButton = document.createElement("button")
    restartPuzzleButton.id = "restart-puzzle-button"
    restartPuzzleButton.innerHTML = "Restart"
    restartPuzzleButton.addEventListener("click", () => {
      resetAllSquares()
    })
    document.getElementById("left-menu").appendChild(restartPuzzleButton)
  }
}

function addCheckProgressPuzzleButton(){
  if (!document.getElementById("check-progress-button")){
    let checkProgressButton = document.createElement("button")
    checkProgressButton.id = "check-progress-button"
    checkProgressButton.innerHTML = "Check Progress"
    checkProgressButton.addEventListener("click", () => {
      fetchNewOrUpdateGame("incomplete")
      currentGame.checkProgress()
    })
    document.getElementById("left-menu").appendChild(checkProgressButton)
  }
}

function addRevealSolutionButton(){
  if (!document.getElementById("reveal-solution-button")){
    let revealSolutionButton = document.createElement("button")
    revealSolutionButton.id = "reveal-solution-button"
    revealSolutionButton.innerHTML = "Reveal Solution"
    revealSolutionButton.addEventListener("click", () => {
      resetAllSquares()
      for (i=0; i<currentPuzzle.solution.length; i++){
        document.getElementById(currentPuzzle.solution[i]).setAttribute("status", "shaded")
      }
      fetchNewOrUpdateGame("incomplete")
    })
    document.getElementById("left-menu").appendChild(revealSolutionButton)
  }
}

function addRevealMistakesButton(){
  if (!document.getElementById("reveal-mistakes-button")){
    let revealMistakesButton = document.createElement("button")
    revealMistakesButton.id = "reveal-mistakes-button"
    revealMistakesButton.innerHTML = "Reveal Mistakes"
    revealMistakesButton.addEventListener("click", () => {
      currentGame.revealMistakes()
    })
    document.getElementById("left-menu").appendChild(revealMistakesButton)
  }
}
// buttons and additional functionality set up - end


// timekeeping, login, and puzzle party functions - start
function handleLoginError(objectWithErrorMessage){
  let errorMessageDiv
  if (document.getElementById("error-message")){
    errorMessageDiv = document.getElementById("error-message")
  }
  else {
    errorMessageDiv = document.createElement("div")
    errorMessageDiv.id = "error-message"
    document.getElementById("login-form-container").appendChild(errorMessageDiv)
  }
  errorMessageDiv.style.display = "inline-block"
  errorMessageDiv.innerHTML = objectWithErrorMessage.error_message
}

function removeErrorMessage(){
  if (document.getElementById("error-message")){
    document.getElementById("error-message").style.display = "none"
  }
}

function time(){
  return parseInt(document.getElementById("time").innerHTML.slice(6))
}

let startParty
function puzzleParty(speed, quantity){
  startParty = setInterval(partySquare, parseInt(speed)) 
  function partySquare(){
    let shadedSquares = document.querySelectorAll('div[status="shaded"]')
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
          partySquare.setAttribute("status", "shaded")
        }, parseInt(speed)
      )
    }
  }
}

function stopParty(){
  clearInterval(startParty)
}
// timekeeping, login, and puzzle party functions - end

// Games
function fetchNewOrUpdateGame(status){
  if (!currentGame){
    fetchNewGame()
  }
  else{
    currentGame.updateGame(status)
  }
}

function fetchNewGame(){
  if (!currentUser){
    currentUser = new User(0)
  }
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "user_id": currentUser.id,
      "puzzle_id": currentPuzzle.id
    })
  };
fetch("http://localhost:3000/games", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      currentGame = new Game(object["data"]["attributes"]["id"], currentUser, currentPuzzle, undefined, "incomplete")
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

class Game {
  constructor(id, user, puzzle, time, status){
    this.id = id
    this.user = user
    this.puzzle = puzzle
    this.time = time
    this.status = status
  }

  updateGame(status){
    this.user = currentUser
    this.puzzle = currentPuzzle
    this.time = time()
    if (status){
      this.status = status
    }
    let shaded = document.querySelectorAll("[status='shaded']")
    let shadedArray = Array.from(shaded)
    let shadedSquaresCoordinates
    for (let i=0; i<shadedArray.length; i++){
      shadedSquaresCoordinates = shadedArray.map(e => e.id)
    }    
    this.shadedSquares = shadedSquaresCoordinates
    let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "puzzle": this.puzzle,
            "user": this.user,
            "time": this.time,
            "shaded_squares": this.shadedSquares,
            "status": this.status
        })
      };
    fetch(`http://localhost:3000/games/${this.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
          console.log("Game has updated in the database.")
        })
        .catch(function(error) {
          console.log(error.message);
        });
  }

  checkProgress(){
    if (this.shadedSquares){
      let currentlyShadedSquares = this.shadedSquares
      let correctShadedSquares = this.puzzle.solution.filter(e => currentlyShadedSquares.includes(e))
      let puzzleMessage
      if (document.getElementById("puzzle-message")){
        puzzleMessage = document.getElementById("puzzle-message")
      }
      else {
        puzzleMessage = document.createElement("div")
        puzzleMessage.id = "puzzle-message"
        document.getElementById("puzzle-message-container").appendChild(puzzleMessage)
      }
      if (this.puzzle.solution.length === correctShadedSquares.length){
        puzzleMessage.innerHTML = `PARTY LIKE IT'S YOUR BIRTHDAY. YOU DID IT! All ${currentlyShadedSquares.length} squares in just ${time()} seconds!`
        this.updateGame("complete")
        puzzleParty(150, 40)
        setTimeout(stopParty, 5000)
      }
      else{
        let mistakeCount = currentlyShadedSquares.length-correctShadedSquares.length
        let statusMessage
        if (mistakeCount === 0){
          statusMessage = `No mistakes so far. ${this.puzzle.solution.length-correctShadedSquares.length} to go.` 
        }
        else if(mistakeCount === 1){
          statusMessage = `You have ${currentlyShadedSquares.length-correctShadedSquares.length} mistake.`
        }
        else{
          statusMessage = `You have ${currentlyShadedSquares.length-correctShadedSquares.length} mistakes.`
        }
        puzzleMessage.innerHTML = statusMessage
        console.log(statusMessage)
      }
      currentUser.updateRecords()
    }
  }

  revealMistakes(){
    this.updateGame()
    if (this.shadedSquares){
      let incorrectShadedSquares = this.shadedSquares.filter(e=>!(this.puzzle.solution.includes(e)))
      for (let i = 0; i<incorrectShadedSquares.length; i++){
        document.getElementById(incorrectShadedSquares[i]).setAttribute("status", "incorrect")
      }
    }
  }
}

// Users
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
        if (object.error_message){
          handleLoginError(object)
        }
        else {
          let userAttributes = object["data"]["attributes"]
          currentUser = new User(userAttributes.id, userAttributes.username)
          addUsernameDiv = (username) => {
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
          addUsernameDiv(currentUser.username)
          removeErrorMessage()
          if (currentUser.username !== "guest"){
            document.getElementById("login-logout-button").innerHTML = "Log out"
            document.getElementById("login-form-container").style.display = "none"
          }
          currentUser.updateRecords()
        }
      })
      .catch(function(error) {
        console.log(error.message);
      });
}

class User {
  constructor(id, username){
    this.id = id
    this.username = username    
  }

  updateRecords(){
    fetch(`http://localhost:3000/users/${this.id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
          currentUser.totalGamesCount = object["data"]["attributes"]["total_games_count"]
          currentUser.completedGamesCount = object["data"]["attributes"]["completed_games_count"]
          if (object["data"]["attributes"]["fastest_game"]){
            currentUser.fastestTime = object["data"]["attributes"]["fastest_game"]["time"]
          }
          else {
            currentUser.fastestTime = "N/A"
          }
          if (currentUser.username !== "guest"){
            currentUser.displayUpdatedRecords()
          }
        })
        .catch(function(error) {
          console.log(error.message);
        }
    );
  }

  displayUpdatedRecords(){
    let totalGamesRecord
    if (!document.getElementById("total-games-record")){
      totalGamesRecord = document.createElement("div")
      totalGamesRecord.id = "total-games-record"
      totalGamesRecord.className = "user-record"
      document.getElementById("user-records-container").appendChild(totalGamesRecord)
    }
    else{
      totalGamesRecord = document.getElementById("total-games-record")
    }
    totalGamesRecord.innerHTML = `Total Games: ${this.totalGamesCount}`

    let completedGamesRecord
    if (!document.getElementById("completed-games-record")){
      completedGamesRecord = document.createElement("div")
      completedGamesRecord.id = "completed-games-record"
      completedGamesRecord.className = "user-record"
      document.getElementById("user-records-container").appendChild(completedGamesRecord)
    }
    else{
      completedGamesRecord = document.getElementById("completed-games-record")
    }
    completedGamesRecord.innerHTML = `Completed Games: ${this.completedGamesCount}`

    let fastestTimeRecord
    if (!document.getElementById("fastest-time-record")){
      fastestTimeRecord = document.createElement("div")
      fastestTimeRecord.id = "fastest-time-record"
      fastestTimeRecord.className = "user-record"
      document.getElementById("user-records-container").appendChild(fastestTimeRecord)
    }
    else{
      fastestTimeRecord = document.getElementById("fastest-time-record")
    }
    fastestTimeRecord.innerHTML = `Best time: ${this.fastestTime} seconds`
  }
}

// Puzzles
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

function setUpNewPuzzle(object){
  let puzzleNumber = object["data"]["id"]
  addCheckProgressPuzzleButton()
  addRestartPuzzleButton()
  addRevealSolutionButton()
  addRevealMistakesButton()
  addPuzzleNumberHeader(puzzleNumber)
  let attributes = object["data"]["attributes"]
  currentPuzzle = new Puzzle(object.data.id, attributes["column_params"], attributes["row_params"], attributes["column_max"], attributes["row_max"], attributes["solution"])
  currentPuzzle.displayNewPuzzle()
  addTimer()
  stopParty()
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
      setUpNewPuzzle(object)
    })
    .catch(function(error) {
      console.log(error);
    });
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


  displayNewPuzzle(){
    console.log(this)
    this.createColumnParametersDivs()
    this.createRowParametersDivs()
    this.addPuzzleSquares()
  }

  createColumnParametersDivs(){
    this.setUpColumnParams(this.column_max)
    this.enterColumnParamsData()
  }

  setUpColumnParams(){
    let topColumnParams = document.getElementById("top-column-params")
    topColumnParams.innerHTML = ""
    for (let i=0; i<this.column_max; i++){
      let columnParamsDiv = document.createElement("div")
      columnParamsDiv.id = `column-params-row-${i+1}`
      columnParamsDiv.className = "column-params"
      topColumnParams.appendChild(columnParamsDiv)
      for (let j=0; j<25; j++){
        let columnParamDiv = document.createElement("div")
        columnParamDiv.className = "column-params-square"
        if (j%5 === 0){
          columnParamDiv.className = "bold-left-column-params-square"
        }
        if (j === 24){
          columnParamDiv.className = "bold-right-column-params-square"
        }
        columnParamDiv.id = `column-param-${j+1}-${i+1}`
        columnParamsDiv.appendChild(columnParamDiv)
      }
    }
  }

  enterColumnParamsData(){
    for (let k=1; k<26; k++){
      let parameter = this.column_params[k].split(", ")
      for (let e=0; e<parameter.length; e++){
        let targetSquare = document.getElementById(`column-param-${k}-${e+1+(this.column_max-parameter.length)}`)
        targetSquare.innerHTML= parameter[e]
      }
    }
  }

  createRowParametersDivs(puzzle){
    let leftRowParams = document.getElementById("left-row-params")
    leftRowParams.innerHTML = ""
    for (let i=1; i<=25; i++){
      let individualRowParams = document.createElement("div")
      individualRowParams.className = "row"
      individualRowParams.id = `row-${i}-params`
      leftRowParams.appendChild(individualRowParams)
      if (i%5 === 1){
        individualRowParams.className = "bold-top-row-param"
      }
      else{
        individualRowParams.className = "individual-row-param"
      }
      individualRowParams.innerHTML = this.row_params[i].split(", ").join("&nbsp;&nbsp;&nbsp;") + "&nbsp;&nbsp;"
    }
  }

  addPuzzleSquares(){
    function changeStatus(square){
      if (square.getAttribute("status") === "unshaded"){
        square.setAttribute("status", "shaded")
      }
      else if (square.getAttribute("status") === "shaded"){
        square.setAttribute("status", "unshaded")
      }
      else {
        square.setAttribute("status", "unshaded")
      }
    }
    function changePotentialStatus(square){
      if (square.getAttribute("status") !== "shaded"){
        square.setAttribute("highlighted", true)
      }
    }
    let puzzleBoard = document.getElementById("puzzle-board")
    puzzleBoard.innerHTML = ""
    for (let i=0; i<25; i++){
      let rowDiv = document.createElement("div")
      puzzleBoard.appendChild(rowDiv)
      rowDiv.id = `row-${i+1}`
      rowDiv.className = "puzzle-board-row"
      for (let j=0; j<25; j++){
        let squareDiv = document.createElement("div")
        squareDiv.className = "puzzle-square"
        if (i%5 === 0 && j%5 === 0){
          squareDiv.className = "bold-top-and-left-puzzle-square"
        }
        else if (i%5 === 0){
          squareDiv.className = "bold-top-puzzle-square"
        }
        else if (j%5 === 0){
          squareDiv.className = "bold-left-puzzle-square"
        }
        squareDiv.id = `${j+1}-${i+1}`
        squareDiv.setAttribute("status", "unshaded")
        squareDiv.addEventListener("mousedown", () => {
          changePotentialStatus(squareDiv)
          squareDiv.setAttribute("click", "start")
          highlightedSquares.push(squareDiv)
        })
        squareDiv.addEventListener("mouseover", () => {
          if(document.querySelector('div[click="start"]')){
            let start = document.querySelector('div[click="start"]')
            let squareDivColumn = parseInt(squareDiv.id.split("-")[0])
            let squareDivRow = parseInt(squareDiv.id.split("-")[1])
            let startColumn = parseInt(start.id.split("-")[0])
            let startRow = parseInt(start.id.split("-")[1])
            if (squareDivRow === startRow){
              let formerlyHighlightedSqures = highlightedSquares.slice()
              highlightedSquares = []
              let leftHighlightedBound = Math.min(startColumn, squareDivColumn)
              let rightHighlightedBound = Math.max(startColumn, squareDivColumn)
              for(let k=leftHighlightedBound; k<=rightHighlightedBound; k++){
                highlightedSquares.push(document.getElementById(`${k}-${startRow}`))
              }
              for(let n=0; n<highlightedSquares.length; n++){
                changePotentialStatus(highlightedSquares[n])
              }
              for(let m=0; m<formerlyHighlightedSqures.length; m++){
                if(!(highlightedSquares.includes(formerlyHighlightedSqures[m]))){
                  formerlyHighlightedSqures[m].removeAttribute("highlighted")
                }
              }
            }
            if (squareDivColumn === startColumn){
              let formerlyHighlightedSqures = highlightedSquares.slice()
              highlightedSquares = []
              let lowerHighlightedBound = Math.min(startRow, squareDivRow)
              let upperHighlightedBound = Math.max(startRow, squareDivRow)
              for(let k=lowerHighlightedBound; k<=upperHighlightedBound; k++){
                highlightedSquares.push(document.getElementById(`${startColumn}-${k}`))
              }
              for(let n=0; n<highlightedSquares.length; n++){
                changePotentialStatus(highlightedSquares[n])
              }
              for(let m=0; m<formerlyHighlightedSqures.length; m++){
                if(!(highlightedSquares.includes(formerlyHighlightedSqures[m]))){
                  formerlyHighlightedSqures[m].removeAttribute("highlighted")
                }
              }
            }
          }
        })
        squareDiv.addEventListener("mouseup", () => {
          if(document.querySelector('div[click="start"]')){
            let start = document.querySelector('div[click="start"]')
            start.removeAttribute("click")
            for (let a=0; a<highlightedSquares.length; a++){
              if (highlightedSquares.length>1){
                highlightedSquares[a].setAttribute("status", "shaded")
              }
              else{
                changeStatus(highlightedSquares[a])
              }
              highlightedSquares[a].removeAttribute("highlighted")
            }
            console.log(highlightedSquares)
            highlightedSquares = []
          }
          fetchNewOrUpdateGame("incomplete")
        })
        document.getElementById("puzzle-board").addEventListener("mouseleave", () => {
          if(document.querySelector('div[click="start"]')){
            let start = document.querySelector('div[click="start"]')
            start.removeAttribute("click")
            for (let a=0; a<highlightedSquares.length; a++){
              if (highlightedSquares.length>1){
                highlightedSquares[a].setAttribute("status", "shaded")
              }
              else{
                changeStatus(highlightedSquares[a])
              }
              highlightedSquares[a].removeAttribute("highlighted")
            }
            console.log(highlightedSquares)
            highlightedSquares = []
          }
        })
        rowDiv.appendChild(squareDiv)
      }
    }
  }
}

// organize functions into classes (html handling, puzzle making, etc.)
// make data update when puzzle is completed successfully or when new puzzle is clicked

// features to add: 
// - change menu bar to top if screen is too thin, or even to opening three-line menu
// - add an x on boxes when right click to mark as certainly unshaded
// - allow option for right side row params and bottom side column params
// - highlight params on hover over a square
// - users can save progress on puzzle
// - users access their specific old puzzle after they have worked on it if they choose find puzzle option
// - users will not receive an already worked on puzzle if they choose new puzzle