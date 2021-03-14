class Phrase {
    constructor(phrase){
        this.phrase = [...phrase];
    }

    /**
     * Displays phrase to gaem board
     */

    addPhraseToDisplay(){
        const phraseContainer = document.querySelector('#phrase ul');

        for(let i =0; i < this.phrase.length; i++){
            // first checks for whitespace
            if(this.phrase[i].match(/\s/g)){
            phraseContainer.innerHTML += `
            <li class="space"> </li>
                `
            } else {
                phraseContainer.innerHTML += `
                <li class="hide letter ${this.phrase[i].toLowerCase()}">${this.phrase[i].toUpperCase()}</li>
                `;       
            }

        }

    }

    /**
     * checks if selected letter is in phrase and reveals in DOM if true.
     * @param (string) letter - letter to check
     */

    checkLetter(selectedLetter){
        const UppercasePhrase = this.phrase.map(letter => letter.toUpperCase());
        if(UppercasePhrase.includes(selectedLetter.toUpperCase())){
            return true;
        }
    }
    

    showMatchedLetter(selectedLetter){
        console.log(selectedLetter);
        this.phrase.forEach(letter => {
            if(letter.toUpperCase() === selectedLetter.toUpperCase()){
                
              console.log(selectedLetter);
              let character = document.querySelectorAll(`.${letter.toLowerCase()}`);
              for(let i =0; i < character.length; i++){
              character[i].classList.replace('hide', 'show');
              }
            }
        });
    }
}