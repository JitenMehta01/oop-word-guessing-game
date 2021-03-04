class Phrase {
    constructor(phrase){
        this.phrase = phrase;
    }

    /**
     * Displays phrase to gaem board
     */

    addPhraseToDisplay(){
        const phraseContainer = document.querySelector('#phrase ul');
        const arrPhrase = [...this.phrase];

        for(let i =0; i < arrPhrase.length; i++){
            phraseContainer.innerHTML += `
            <li class="hide letter ${arrPhrase[i].toLowerCase()}">${arrPhrase[i].toUpperCase()}</li>
            `
        }



    }

    checkLetter(){

    }

    showMatchedLetter(){
        
    }
}