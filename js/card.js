const Suit = {
    spades: 'spades',
    hearts: 'hearts',
    diamonds: 'diamonds',
    clubs: 'clubs'
}

class Card {

    number;
    suit;
    reverted = true;

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
    }

    get HTMLElement() {
        let $card = document.createElement('div');
        $card.classList.add('card', this.suit);
        $card.draggable = true;
        $card.id = `${this.suit}-${this.number}`;
        $card.ondragstart = (ev) => ev.dataTransfer.setData('card', ev.target.id);
        $card.ondrop = () => false;

        $card.innerHTML = `
            <span class="number number-top">${this.numberSymbol}</span>
            <span class="suit suit-top"></span>
            <span class="suit suit-center"></span>
            <span class="suit suit-bottom"></span>
            <span class="number number-bottom">${this.number}</span>
        `;
        return $card;
    }

    get numberSymbol() {
        switch (this.number) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return this.number;
        }
    }
    
}