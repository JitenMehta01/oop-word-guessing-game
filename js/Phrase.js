class Phrase {
    constructor(phrase){
        this.phrase = [...phrase];
    }

    /**
     * Displays phrase to game board
     */

    addPhraseToDisplay(){
        const phraseContainer = document.querySelector('#phrase ul');

        for(let i =0; i < this.phrase.length; i++){
            // first checks for whitespace
            if(this.phrase[i].match(/\s/g)){
            phraseContainer.innerHTML += `
            <li class="space"> </li>`
            } else {
                phraseContainer.innerHTML += `
                <li class="hide letter ${this.phrase[i].toLowerCase()}">${this.phrase[i].toUpperCase()}</li>`;       
            }
        }
    }

    /**
     * checks if selected letter is in phrase and reveals in DOM if true.
     * @param (string) letter - letter to check
     */

    checkLetter(e){
        const KeyBoardbuttons = document.querySelectorAll('.keyrow button');
        for(let i =0; i < KeyBoardbuttons.length; i++){

        if(this.upperCasePhrase.includes(e.toUpperCase()) &&  KeyBoardbuttons[i].textContent.toUpperCase() === e.toUpperCase()){
            KeyBoardbuttons[i].disabled = true;
            console.log(true);
            return true;
        } 
        
        else if(e.match(/^[A-Za-z]{1}$/)){
            if(!KeyBoardbuttons[i].disabled){
            KeyBoardbuttons[i].disabled = true;
            return false;
            } else{
                return true;
            }
        }
     }  
    }
    
    /**
     * Changes class of li item if it matches keyboard button.
     * @param (string) letter - letter to match
     */

    showMatchedLetter(e){
        this.phrase.forEach(letter => {
            if(letter.toUpperCase() === e.toUpperCase()){
              let character = document.querySelectorAll(`.${letter.toLowerCase()}`);
              for(let i =0; i < character.length; i++){
              character[i].classList.replace('hide', 'show');
              }
            }
        });
        const KeyBoardbuttons = document.querySelectorAll('.keyrow button');
        KeyBoardbuttons.forEach(button => {
            if(e === button.textContent && this.upperCasePhrase.includes(e.toUpperCase())){
             button.disabled = true;
             button.classList.add('chosen');
            } else if(e === button.textContent){
            button.disabled = true;
            button.classList.add('wrong');
            }
        });

    }


    get upperCasePhrase(){
        return this.phrase.map(letter => letter.toUpperCase());
    }


}


