const Suit = {
    spades: 'spades',
    hearts: 'hearts',
    diamonds: 'diamonds',
    clubs: 'clubs'
}

class Card {

    number;
    suit;

    /**
     * @type HTMLElement
     */
    _$card;

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
    }

    get $card() {
        if (this._$card) return this._$card;

        this._$card = document.createElement('div');
        this._$card.classList.add('card', this.suit);
        this._$card.draggable = true;
        this._$card.id = `${this.suit}-${this.number}`;
        this._$card.ondragstart = (ev) => ev.dataTransfer.setData('card', ev.target.id);
        this._$card.ondrop = () => false;

        this._$card.innerHTML = `
            <span class="number number-top">${this.numberSymbol}</span>
            <span class="suit suit-top"></span>
            <span class="suit suit-center"></span>
            <span class="suit suit-bottom"></span>
            <span class="number number-bottom">${this.numberSymbol}</span>
        `;
        return this._$card;
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
