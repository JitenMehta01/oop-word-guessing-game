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
        if(this.upperCasePhrase.includes(e.toUpperCase())){
            console.log(e.toUpperCase());
            return true;
        } else if(e.match(/^[A-Za-z]{1}$/)){
            return false;
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

        for(let i =0; i < KeyBoardbuttons.length;i++){
            if(e === KeyBoardbuttons[i].textContent && this.upperCasePhrase.includes(e.toUpperCase())){
             KeyBoardbuttons[i].disabled = true;
             KeyBoardbuttons[i].classList.add('chosen');
             break;
            } else if(e === KeyBoardbuttons[i].textContent){
            if(KeyBoardbuttons[i].disabled === true){}
            KeyBoardbuttons[i].disabled = true;
            KeyBoardbuttons[i].classList.add('wrong');
            break;
            }
        };

    }


    get upperCasePhrase(){
        return this.phrase.map(letter => letter.toUpperCase());
    }
}

// letter.classList.add('wrong');
