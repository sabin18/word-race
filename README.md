# word-race

Word Race is a game designed to improve QWERTY typing rate and efficiency. Words 
appear one by one at a rate that goes up as time progresses. There’s a limited “stack 
space” that fills up after a certain amount of words have appeared. Once a player types 
a word correctly, that word is removed from the stack.
        
- HOSTED UI link: https://word-race-frontend.herokuapp.com/

## PROJECT DESCRIPTION

## UI images 
``````
           Game start
```````
![score2](https://user-images.githubusercontent.com/47029978/134536082-8f923794-1169-4715-80b6-8f8d1076ff4f.PNG)


``````
           Game when you type correct letter
```````
![score4](https://user-images.githubusercontent.com/47029978/134536091-4dcf7de7-f16c-4dd8-bda5-1d07f7b82ca8.PNG)


``````
          Game when you type wrong letter
```````
![score5](https://user-images.githubusercontent.com/47029978/134536094-6f932d04-c765-494e-8ae6-d2a738f0b1c4.PNG)


``````
          Game board
```````

![score3](https://user-images.githubusercontent.com/47029978/134536087-3393e1b5-c7bc-49bb-a3d0-e72aa5fdf157.PNG)


``````
           Game whith saved results
```````

![score1](https://user-images.githubusercontent.com/47029978/134536070-e4aa6773-8409-4019-ae16-1c695ebf3adb.PNG)


To get the project up and running on your local machine, please follow these instructions.

- Clon this project on your machine , by running this command on in your command line or Terminal:
 ```
 git clone https://github.com/sabin18/PropertyPro-lite-.git
 
 ````
 - Install the required dependencies found in package.json by running this command:
 ```
 npm install
 ```
 
 - And then to start running  this project on your machine , run this command:
 ```
 npm start
 ```
 - then to run test, run this command:
 ````
 npm test
 `````
 ## Required Features
 
 - On screen feedback mechanism for the player to see what key they’ve pressed
 - Stack view displaying if they player typed a word correctly or not, and proceeding 
with removing the word from the stack on correct typing.
 - Progress view indicating the current score, level (optional) and multiplier.
 - Interface to display the score once the game is over, saving it (if the player opts for it) 
in a database.  
 - A leaderboard (top ten scores), and brief statistics display for say number of games 
played, average score, max level reached, etc. .  
 

## Optional Features

 - (Optional) Instructions before a player starts the game 
 - (Optional) Trending characters: that give bonus score if a word containing them is 
   typed successfully 
 - (Optional) Some sound effects playing for successful or failed typing of a word, 
   leveling up, multiplier change, and game over 
  
  
## Frontend

 - HTML
 - CSS -Javascript
 - React

## Backend

 - NodeJs
 - Express JS
 - Mocha
 - Chai
 ## OTHER TOOLS USED IN THIS PROJECT
 

- Linter
 #### ESLint - Linter Tool

## Style Guide
```
 Airbnb is used in this project : Airbnb maintains a very popular JavaScript Style Guide
````
- Compiler
```
  Babel - Compiler for Next Generation JavaScript(ES6).
```
- Author:
 ### izere Roger Sabin 
