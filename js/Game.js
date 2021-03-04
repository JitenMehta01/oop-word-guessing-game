class Game {
    constructor(){
        this.missed = 0;
        this.phrase = this.createPhrases();
        this.activePhrase;
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
    const phraseLength = this.phrase.length;
    const randomNum = Math.floor(Math.random() * phraseLength);
    
    return this.phrase[randomNum];
    }

    /**
     * Starts the game by selecting a random phrase and displaying to screen
     */

    startGame(){
        document.getElementById('overlay').style.opacity = '0';
        const phrase = new Phrase(this.getRandomPhrase().phrase);
        this.activePhrase = phrase.phrase;
        phrase.addPhraseToDisplay();

        console.log(this.activePhrase);


    }
}