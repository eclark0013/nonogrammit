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
        console.log(singlePuzzle);
      });
    })
    

})

