
 // click event to start game
const game = new Game();
const overLay = document.getElementById('overlay');

// starts the game
 document.addEventListener('click', e =>{
    if(e.target.id === 'btn__reset'){ // click event for start button
    game.startGame();
    }
// listens out for click events on onScreen keyboard
    if(e.target.className === 'key'){
      game.handleInteraction(e.target.textContent);
    }
// listens for user Keyboard input.
    document.addEventListener('keydown', e =>{
      if(overLay.style.display === 'none'){ // only applies when game in playable.
      const KeyBoardbuttons = document.querySelectorAll('.keyrow button');
      for(let i =0; i < KeyBoardbuttons.length;i++){
        if(e.key.toUpperCase() === KeyBoardbuttons[i].textContent.toUpperCase()){ // stops individual keyboard buttons being pressed more than once.
          if(!KeyBoardbuttons[i].disabled){
            game.handleInteraction(e.key);
            e.stopImmediatePropagation();
            KeyBoardbuttons[i].disabled = true;
              }
            }
          }
        }
      });
     
 });