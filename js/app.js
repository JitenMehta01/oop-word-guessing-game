/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */



 // click event to start game

 const game = new Game();

 document
 .addEventListener('click', e =>{
    if(e.target.id === 'btn__reset'){
    game.startGame();
    }
    if(e.target.className === 'key'){
      game.handleInteraction(e);
    }
 })
 