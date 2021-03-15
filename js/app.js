
 // click event to start game

 const game = new Game();
  const overLay = document.getElementById('overlay');
 document
 .addEventListener('click', e =>{
    if(e.target.id === 'btn__reset'){ // click event for start button
    game.startGame();
    }
    if(e.target.className === 'key'){
      game.handleInteraction(e.target.textContent);
    }
    if(overLay.style.display === 'none'){
      document
      .addEventListener('keydown', e =>{
       game.handleInteraction(e.key);
       e.stopImmediatePropagation();
       });
    } 
 })