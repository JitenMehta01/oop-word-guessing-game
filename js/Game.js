class Game {
    constructor(){
        this.missed = 0;
        this.triesLeft = 5;
        this.phrases = this.createPhrases();
        this.activePhrase = this.getRandomPhrase();
    }
    /**
     * Phrases to be used in the game
     * @return {array} returns an array of phrases.
     */

    createPhrases(){
    const phrases = [{phrase: 'The Godfather'}, 
    {phrase:'Shawshank Redemption'},
    {phrase: 'The Lion King'}, 
    {phrase:'Forrest Gump'}, 
    {phrase:'The Silence Of the Lambs'}];

    return phrases;
    }

    /**
     * Generates a random phrase, and adds it to the DOM via the addPhraseToDisplay method.
     * @return {object} An object containing a phrase.
     */

    getRandomPhrase(){
    const phraseLength = this.phrases.length;
    const randomNum = Math.floor(Math.random() * phraseLength);
    
    const phrase = new Phrase(this.phrases[randomNum].phrase);
    phrase.addPhraseToDisplay();

    return phrase
    }

    /**
     * Starts the game by selecting a random phrase and displaying to screen
     * removes win or lose classes from overlay so the restart conditional works
     */

    startGame(){
        const overLay = document.getElementById('overlay');
        overLay.style.display = 'none';
        if(overLay.classList.contains('win') || overLay.classList.contains('lose')){
            overlay.classList.remove('win');
            overlay.classList.remove('lose');
            overlay.classList.add('start');
        }

    }

    /**
     * Checks if the user has matched all letters in phrase
     * @return {boolean} True if all letters have been matched. False if not.
     */

    checkforWin(){
        const phraseLength = this.activePhrase.phrase.length;
        let showCharacter = document.querySelectorAll('.show');
        let spaceCharacter = document.querySelectorAll('.space');

        if(spaceCharacter.length + showCharacter.length === phraseLength){
            return true;
        } else {
            return false;
        }
        }

    /**
     * Stores all correctly guessed letters plus spaces
     * @return {number} Total length of correctly guessed characters + spaces/
     */

    comparePhraselength(){
        const AllLetters = [...document.querySelectorAll('#phrase ul li')];
        const hideLetters = [...document.querySelectorAll('.space')];
        const showLetters = AllLetters.filter(letter =>{
            if(letter.className.includes('show')){
                return letter;
            }    
        });
        return hideLetters.length + showLetters.length;
    }

    /**
     * Removes heart image if user guesses incorrectly
     */

    removeLife(){
        const lives = document.querySelectorAll('.tries img');
        for(let i =0; i < lives.length; i++){
            if(lives[i].src.includes('images/liveHeart.png')){
                lives[i].src = 'images/lostHeart.png';
                break;
            }
        }
    }

    /**
     * a refactoring method that helps to build out win or loss message
     */

    appendtoOverlay(winOrLose, h1Message, pMessage){
    const overLay = document.getElementById('overlay');
    const h1 = document.querySelector('#game-over-message');
    const p = document.createElement('p');
    overLay.className = winOrLose;
    overLay.style.display = 'block';
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
     * Displays win or loss screen if the user guesses correctly or runs out of lives
     */

    gameOver(){
        const phraseDisplay = this.comparePhraselength();
        const overLay = document.getElementById('overlay');
        if(phraseDisplay === game.activePhrase.phrase.length){
            this.appendtoOverlay('win',`Congratulations! You've guessed the Phrase`, 
            `Well done. You guessed the phrase with only ${this.triesLeft} live(s) remaining`);
        } else if(this.missed === 5){
            this.appendtoOverlay('lose',`Oh no! You have run out of lives!`, 'Try again by clicking the restart Game button.');
        }
    }
    
    /**
     * Restarts game
     */

    restartGame(){
        const overlay = document.querySelector('#overlay');        
        if(overlay.classList.contains('win') || overlay.classList.contains('lose')){
            // resets this missed and this triesLeft
            this.missed = 0;
            this.triesLeft = 5;
            // removes completed / uncompleted phrase
            const restartButton = document.querySelector('#btn__reset');
            restartButton.addEventListener('click', e =>{
               const ul = document.querySelector('#phrase ul');
               while(ul.firstElementChild){
                   ul.removeChild(ul.firstElementChild);
               }
               // creates a new prhase and appends to DOM
               this.activePhrase = this.getRandomPhrase();
               // resets the keyboard buttons
               const buttons = document.querySelectorAll('.keyrow button');
               for(let i = 0; i < buttons.length; i++){
                   if(buttons[i].disabled){
                    buttons[i].disabled = false;
                    buttons[i].classList.remove('wrong');
                    buttons[i].classList.remove('chosen');
                   }
               }
               // resets the heart images
               const hearts = [...document.querySelectorAll('.tries img')];
               hearts.forEach(heart => {
                   heart.src = 'images/liveHeart.png';
               });
               // removes winning message
               const h1 = document.querySelector('#game-over-message');
               h1.textContent = '';
               const p = overlay.querySelector('p');
               overlay.removeChild(p);
               
            })
        }
    }      

          
    /**
     * Handles the interaction of the game and calls many of the methods above.
     */

    handleInteraction(e){
        e.target.disabled = true; // disables clicked letter on keyboard
        const checkLetter = this.activePhrase.checkLetter(e.target.textContent);
        this.activePhrase.showMatchedLetter(e.target.textContent);
        if(!checkLetter){
            this.removeLife();
            e.target.classList.add('wrong');
            this.missed += 1;
            this.triesLeft -= 1;
        } else{
            e.target.classList.add('chosen');
        }
        this.gameOver();
        this.restartGame();
    }
}