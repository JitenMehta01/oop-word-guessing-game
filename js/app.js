
let game;
const startGameButton = document.querySelector('#btn__reset');

startGameButton.addEventListener('click', e =>{
    game = new Game();
    game.startGame()
});

document.addEventListener('click', e =>{
    if(e.target.className === 'key'){
    game.handleinteraction(e)
    }
});

document.addEventListener('keydown', e =>{
    const overLay = document.querySelector('#overlay');
    if(overLay.style.display === 'none'){ // only applies when game in playable.
    const KeyBoardbuttons = document.querySelectorAll('.keyrow button');
    for(let i =0; i < KeyBoardbuttons.length;i++){
      if(e.key.toUpperCase() === KeyBoardbuttons[i].textContent.toUpperCase()){ // stops individual keyboard buttons being pressed more than once.
        if(!KeyBoardbuttons[i].disabled){
          game.handleinteraction(e);
          e.stopImmediatePropagation();
          KeyBoardbuttons[i].disabled = true;
            }
          }
        }
      }
    });
