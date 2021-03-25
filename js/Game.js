class Game{
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.triesLeft = 5;
    }

    
    /**
     * Begins Game by hiding overlay and selecting random phrase and displaying it to the user
     */

     startGame(){
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none'

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addphrasetoDisplay()

    }

    /**
     * creates a phrase object from the Phrase class.
     * @return {array} An array of phrases that could be used in the game.
     */
    createPhrases(){
        const phrases = [
          new Phrase('The Lion King'), 
          new Phrase('The Godfather'), 
          new Phrase ('Shawshank Redemption'),
          new Phrase('Forrest Gump'), 
          new Phrase('The silence of the lambs')
        ];

        return phrases;
    }
    

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase(){
        const randomNum = Math.floor((Math.random() * this.phrases.length));
        return this.phrases[randomNum];
    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */

    checkforWin(){
        const letters = document.querySelectorAll('.show');
        const space = document.querySelectorAll('.space');
        const lettersandSpaces = letters.length + space.length;
        const phraseLength = this.activePhrase.phrase.length;

        return lettersandSpaces === phraseLength ? true : false;
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */

    removeLife(){
          
        const lives = document.querySelectorAll('.tries img');
        lives[this.missed].src = 'images/lostHeart.png';
        this.missed += 1;
        this.triesLeft -=1;

        if(this.missed == 5){
            this.gameOver(false);
            this.reset()
            } 
    }

    /**
     * a refactoring method that helps to build out win or loss message
     */

    appendtoOverlay(winOrLose, h1Message, pMessage){
        const overLay = document.getElementById('overlay');
        const h1 = document.querySelector('#game-over-message');
        const p = document.querySelector('#pmessage');
        overLay.className = winOrLose;
        overLay.style.display = 'flex';
        h1.textContent = h1Message;
        overLay.appendChild(h1);
        if(this.missed === 0){
            p.textContent = `Well done! You got a perfect score!`;
            overLay.appendChild(p);
        } else{
        p.textContent = pMessage;
        overLay.appendChild(p);
        }
        } 

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */

    gameOver(gameWon){

        if(gameWon){
            this.appendtoOverlay('win',`Congratulations! You've guessed the Phrase`, 
            `Well done. You guessed the phrase with ${this.triesLeft} live(s) remaining`);
        } else{
            this.appendtoOverlay('lose','Oh no! You have run out of lives!', 'Try again by clicking the start Game button.');
        }
    }

    /**
    * resets game elements if game has ended
    */

    reset(){
        const ul = document.querySelector('#phrase ul');
        while(ul.firstElementChild){
            ul.removeChild(ul.firstElementChild);
        }
        const keys = document.querySelectorAll('.key');

        keys.forEach(key =>{
            key.disabled = false;
            if(key.classList.contains('chosen')){
                key.classList.remove('chosen');
            } else if(key.classList.contains('wrong')){
                key.classList.remove('wrong');
            }
        });

        const hearts = [...document.querySelectorAll('.tries img')];
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });
    }
    

    /**
    * Handles onscreen keyboard button clicks
    * @param (event) either click or keydown
    */
    handleInteraction(e){
        let eventContent;
    // for onScreen keyboard clicks
        if(e.type === 'click'){
            eventContent = e.target.textContent;
            if(this.activePhrase.checkLetter(eventContent) === false){
                e.target.disabled = true;
                e.target.classList.add('wrong');
            } else{
                e.target.classList.add('chosen');
                e.target.disabled = true;
            }
        } 
    // for keydown events    
        else if(e.type === 'keydown'){
            eventContent = e.key;
            const keys = [...document.querySelectorAll('.key')];
            if(this.activePhrase.checkLetter(eventContent) === false){
                keys.forEach(key =>{
                    if(key.textContent === eventContent){
                        key.classList.add('wrong');
                        key.disabled = true;
                    }
                });
            } else{
                keys.forEach(key =>{
                    if(key.textContent === eventContent){
                        key.classList.add('chosen');
                        key.disabled = true;
                    }
                });
            }
        }
    // applies to both events
       if(this.activePhrase.checkLetter(eventContent) === false){
           this.removeLife();
           } else{
            this.activePhrase.showMatchedLetter(eventContent);
            this.checkforWin();
       }
    // If user has Won, end the game and rest board
       if(this.checkforWin()){
        this.gameOver(true);
        this.reset()
      }
    }   
}