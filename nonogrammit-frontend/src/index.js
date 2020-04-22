// console.log("testing...")
// const BACKEND_URL = 'http://localhost:3000/';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

document.addEventListener("DOMContentLoaded", () => {
    let newPuzzleButton = document.querySelector("#new-puzzle-button")
    newPuzzleButton.addEventListener("click", () => {
      fetch("http://localhost:3000/puzzleInfo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let puzzleNumber = Math.floor(Math.random()*20)
        let singlePuzzle = data["rawPuzzleDatabase"][puzzleNumber]
        displayPuzzleNumber(puzzleNumber)
        console.log(singlePuzzle);
      });
    })
})

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
    document.querySelector("#title").after(puzzleNumberDiv)
  }
}
