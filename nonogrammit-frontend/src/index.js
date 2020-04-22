// console.log("testing...")
// const BACKEND_URL = 'http://localhost:3000/';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

document.addEventListener("DOMContentLoaded", () => {
    let newPuzzleButton = document.querySelector("#new-puzzle-button")
    newPuzzleButton.addEventListener("click", () => {
      newPuzzleButton.innerHTML = "i've been clicked. well done."
    })
    fetch("http://localhost:3000/puzzleInfo")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });

})

