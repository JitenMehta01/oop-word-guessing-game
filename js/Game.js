class Game {
    constructor(){
        this.missed = 0;
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
        const mainContainer = document.querySelector('.main-container');
        const overLay = document.getElementById('overlay');
        mainContainer.removeChild(overLay);

    }

    /**
     * Checks if the user has matched all letters in phrase
     * @return {boolean} True if all letters have been matched. False if not.
     */

    // checkforWin(){
    //     const win = document.querySelectorAll('.hide');


    //     for(let i =0; i < win.length; i++){
    //         if(win[i].classList.contains('show')){
    //             console.log(true);
    //         } else{
    //             console.log(false);
    //         }
    //     }
    // }


    // set a variable to the length of the phrase
    // create another variable called total anf give it an initial value of 0
    // if any of the letters in the phrase changes it classname to show, add 1 to the total variable
    // if the total and phrase length are the same, return true. otherwise return false.

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
    



    handleInteraction(e){
        const checkLetter = this.activePhrase.checkLetter(e.target.textContent);
        this.activePhrase.showMatchedLetter(e.target.textContent);

        if(!checkLetter){
            this.removeLife();
        }

    }
}