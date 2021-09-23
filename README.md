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
![Screenshot (122)](https://user-images.githubusercontent.com/47029978/60966269-23ff7e80-a318-11e9-8b51-5be6afb118bd.png)


``````
           Game when you type correct letter
```````
![Screenshot (123)](https://user-images.githubusercontent.com/47029978/60966900-9de43780-a319-11e9-9e27-f28d942efa99.png)


``````
          Game when you type wrong letter
```````
![Screenshot (124)](https://user-images.githubusercontent.com/47029978/60967072-12b77180-a31a-11e9-8adf-f9ca25ff441f.png)


``````
          Game when you type board
```````

![Screenshot (125)](https://user-images.githubusercontent.com/47029978/60967176-4c887800-a31a-11e9-9535-d83b79b9b9d9.png)


``````
           Game whith saved results
```````

![Screenshot (126)](https://user-images.githubusercontent.com/47029978/60979490-1b687180-a333-11e9-9cac-377bf531a012.png)


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
