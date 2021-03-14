
 // click event to start game

 const game = new Game();

 document
 .addEventListener('click', e =>{
    if(e.target.id === 'btn__reset'){ // click event for start button
    game.startGame();
    }
    if(e.target.className === 'key'){
      game.handleInteraction(e); // click event for keyboard buttons
    }
 })
 