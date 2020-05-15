# README

Nonogrammit is a single page application using rails on the backend and javascript with css on the frontend. It was originally created as part of my training through the Flatiron Software Enginnering Program.

Nonogrammit creates 25x25 nonogram games from scratch. (For more on the nonogram logic puzzle, https://en.wikipedia.org/wiki/Nonogram). These nonograms do not make a hidden picture. The algorithm instead focuses on creating reasonable parameters for ideal game play that is challenging but attainable- such as keeping a standard number of shaded squares and lowering the number of 1s and 2s in the params.

Features include:
 - selecting a puzzle by number to return to an old puzzle
 - check progress button to tell you if all is well or how many mistakes you have
 - restart option to clear work from puzzle
 - reveal solution option to clear progress and show solution
 - reveal mistakes to show exactly where your mistakes are if you do have any
 - user login to show your records of puzzles attempted, puzzles completed, and best time

To try for youself, clone down the repo, run $ rails db:seed and start a sesrver using $ rails s.

Access the app from nonogrammit/nonogrammit-backend using http://localhost:3000/ and enjoy.
