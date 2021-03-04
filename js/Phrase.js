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
        console.log(arrPhrase);

        for(let i =0; i < arrPhrase.length; i++){
            // first checks for whitespace
            if(arrPhrase[i].match(/\s/g)){
            phraseContainer.innerHTML += `
            <li class="space"> </li>
                `
            }
            phraseContainer.innerHTML += `
            <li class="hide letter ${arrPhrase[i].toLowerCase()}">${arrPhrase[i].toUpperCase()}</li>
            `;

        }

        for(let i =0; i < phraseContainer.children.length; i++){
            if(phraseContainer.children[i].textContent = " "){
                phraseContainer.removeChild(phraseContainer[i]);
            }
        }

    }

    checkLetter(){

    }

    showMatchedLetter(){
        
    }
}