console.log("testing...")
const BACKEND_URL = 'http://localhost:3000/';
fetch(`${BACKEND_URL}/test`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

let testButton
document.addEventListener("DOMContentLoaded", () => {
    console.log(document.querySelector("#test-button").innerHTML)
    let testButton = document.querySelector("#test-button")
    testButton.addEventListener("click", () => {
        testButton.innerHTML = "Oh, no I've been clicked!"
    })
})

