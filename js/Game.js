class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = this.getRandomPhrase()
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
     * returns a random phrase
     * @return {object} An object containing a phrase.
     */

    getRandomPhrase(){
    const phraseLength = this.phrases.length;
    const randomNum = Math.floor(Math.random() * phraseLength);
    
    const phrase = new Phrase(this.phrases[randomNum].phrase);
    console.log(phrase);
    phrase.addPhraseToDisplay();

    return phrase
    }

    /**
     * Starts the game by selecting a random phrase and displaying to screen
     */

    startGame(){
        document.getElementById('overlay').style.opacity = '0';
    }

    handleInteraction(e){
        this.activePhrase.checkLetter(e.target.textContent)
    }
}