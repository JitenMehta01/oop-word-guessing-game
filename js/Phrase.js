class Phrase {
    constructor(phrase){
        this.phrase = [...phrase.toLowerCase()];
    }
    
    /**
     * Displays phrase on game board
     */

    addphrasetoDisplay(){
        const phraseUL = document.querySelector('#phrase ul');
        this.phrase.forEach(letter => {
            if(letter.match(/^\s+$/)){
                phraseUL.innerHTML += `
                <li class="space"> </li>
                `;
            } else{
                phraseUL.innerHTML += `
                <li class="hide letter ${letter}">${letter.toUpperCase()}</li>`;
            }
        })
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */

    checkLetter(e){
        const phraseJoin = this.phrase.join('');
        return phraseJoin.includes(e.toLowerCase()) ? true : false;
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */

    showMatchedLetter(e){
        const matchedLi = document.querySelectorAll(`.${e}`);
        for(let i =0; i < matchedLi.length; i++){
            matchedLi[i].classList.remove('hide');
            matchedLi[i].classList.add('show');
            this.flipAnimation(matchedLi[i]);
        }
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
