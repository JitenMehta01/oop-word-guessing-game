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
        const phrase = this.getRandomPhrase();
        phrase.addphrasetoDisplay();
        this.activePhrase = phrase;

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
     * checks to see if the game has ended
     * @return {boolen} returns true true is game has ended
     */

    get winOrlLose(){
    if(this.missed === 5 || this.comparePhraselength === game.activePhrase.phrase.length){
        return true;
        } 
    }
    
    /**
     * Stores all correctly guessed letters plus spaces
     * @return {number} Total length of correctly guessed characters + spaces/
     */

    get comparePhraselength(){
        const AllLetters = [...document.querySelectorAll('#phrase ul li')];
        const spaceLetters = [...document.querySelectorAll('.space')];
        const showLetters = AllLetters.filter(letter =>{
            if(letter.className.includes('show')){
                return letter;
            }    
        });
        return spaceLetters.length + showLetters.length;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase(){
        const randomNum = Math.floor((Math.random() * this.phrases.length));
        return this.phrases[randomNum];
    }

    checkforWin(){
        const letters = document.querySelectorAll('.show');
        const space = document.querySelectorAll('.space');
        const lettersandSpaces = letters.length + space.length;
        const phraseLength = this.activePhrase.phrase.length;

        lettersandSpaces === phraseLength ? true : false;
    }

    removeLife(){
            const lives = document.querySelectorAll('.tries img');
                if(lives[this.missed].src.includes('images/liveHeart.png')){
                    lives[this.missed].src = 'images/lostHeart.png';
                    this.missed += 1;
                    this.triesLeft -=1;
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
     * Displays win or loss screen if the user guesses correctly or runs out of lives
     */

    gameOver(){
        const phraseDisplay = this.comparePhraselength;
        if(phraseDisplay === game.activePhrase.phrase.length){
            this.appendtoOverlay('win',`Congratulations! You've guessed the Phrase`, 
            `Well done. You guessed the phrase with ${this.triesLeft} live(s) remaining`);
        } else if(this.missed === 5){
            this.appendtoOverlay('lose','Oh no! You have run out of lives!', 'Try again by clicking the start Game button.');
        }
    }

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



    handleinteraction(e){
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

// weather win or loose, the following will run
       if(this.winOrlLose){
        this.gameOver();
        this.reset()
      }

    }   
    




}
