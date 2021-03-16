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
        const phraseUL = document.querySelector('#phrase ul');
        this.upperCasePhrase.forEach(letter => {
            if(letter === e.toUpperCase()){
              let character = document.querySelectorAll(`.${letter.toLowerCase()}`);
              for(let i =0; i < character.length; i++){
              character[i].classList.replace('hide', 'show');
              this.flipAnimation(character[i]);
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

    /**
     * transforms the phrase to all capital letters
     * @return {array} an array containing captalized letters.
     */
    get upperCasePhrase(){
        return this.phrase.map(letter => letter.toUpperCase());
    }

    /**
     * adds transofrm effects for flip animation
     * @param {element} an element wll be passed through 
     */

    flipAnimation(element){
        element.style.transformStyle = 'preserve-3d';
        element.style.transition = 'transform 0.65s cubic-bezier(0.8, 1.8, 0.32, 0.5)';
        element.style.transform = 'rotateY(180deg) scaleX(-1)';

    }
}


