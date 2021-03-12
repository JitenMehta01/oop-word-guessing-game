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
     */

    startGame(){
        const overLay = document.getElementById('overlay');
        overLay.style.display = 'none';

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

        removeLife(){
            const lives = document.querySelectorAll('.tries img');

            for(let i =0; i < lives.length; i++){
                if(lives[i].src.includes('images/liveHeart.png')){
                    lives[i].src = 'images/lostHeart.png';
                    break;
                }
            }
                
        }

        gameOver(){
            const AllLetters = [...document.querySelectorAll('#phrase ul li')];
            const hideLetters = [...document.querySelectorAll('.space')];
            const overLay = document.getElementById('overlay');
            const p = document.createElement('p');
            const showLetters = AllLetters.filter(letter =>{
                if(letter.className.includes('show')){
                    return letter;
                }    
            });

            if(showLetters.length + hideLetters.length === game.activePhrase.phrase.length){
                this.appendtoOverlay('win',`Congratulations! You've guessed the Phrase`);
                if(this.missed === 0){
                    p.textContent = `Well done! You got a perfect score!`;
                    overLay.appendChild(p);
                } else{
                    p.textContent = `Well done. You guessed the phrase with only ${this.triesLeft} live(s) remaining`;
                    overLay.appendChild(p);
                }
            }

            if(this.missed === 5){
                this.appendtoOverlay('lose',`Oh no! You have run out of lives!`);
            }
        }
    

                
        appendtoOverlay(winOrLose, h1Message){
            const overLay = document.getElementById('overlay');
            const h1 = document.createElement('h1');
            overLay.className = winOrLose;
            overLay.style.display = 'block';
            h1.textContent = h1Message;
            overLay.appendChild(h1);
          } 
    

    handleInteraction(e){
        const checkLetter = this.activePhrase.checkLetter(e.target.textContent);
        this.activePhrase.showMatchedLetter(e.target.textContent);

        if(!checkLetter){
            this.removeLife();
            this.missed += 1;
            this.triesLeft -= 1;
        }

        this.gameOver();

    }
}