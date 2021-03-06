class Phrase {
    constructor(phrase){
        this.phrase = phrase;
    }

    /**
     * Displays phrase to gaem board
     */

    addPhraseToDisplay(){
        const phraseContainer = document.querySelector('#phrase ul');
        const arrPhrase = [...this.phrase.toUpperCase()];

        for(let i =0; i < arrPhrase.length; i++){
            // first checks for whitespace
            if(arrPhrase[i].match(/\s/g)){
            phraseContainer.innerHTML += `
            <li class="space"> </li>
                `
            } else {
                phraseContainer.innerHTML += `
                <li class="hide letter ${arrPhrase[i]}">${arrPhrase[i]}</li>
                `;       
            }

        }

        return arrPhrase;
    }

    /**
     * checks is selected letter is in phrase
     * @param (string) letter - letter to check
     */

    checkLetter(selectedLetter){
      let ActivePhrase = [...this.phrase];
      ActivePhrase.forEach(letter => {
          if(letter.toUpperCase() === selectedLetter){
            console.log(true);
          } else{
              console.log(false);
          }
      });
    }

    showMatchedLetter(){
        
    }
}