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
        this._$card.dataset.suit = this.suit;
        this._$card.dataset.number = this.number;
        this._$card.ondragstart = (ev) => {
            const $c = ev.target.closest('.card');
            const $parent = $c.parentElement;
            const $siblings = Array.from($parent.children);
            const cardIndex = $siblings.indexOf($c);
            if ($parent.classList.contains('deck') && $siblings.length > 1 && cardIndex + 1 !== $siblings.length) {
                console.log($siblings, cardIndex);
                const $bottomSiblings = $siblings.slice(cardIndex + 1);
                console.log($bottomSiblings);
                let $lastSibling = $c;
                for (let i = 0; i < $bottomSiblings.length; i++) {
                    if (+$bottomSiblings[i].dataset.number + 1 !== +$lastSibling.dataset.number) {
                        return false;
                    }
                    if (['spades', 'clubs'].includes($lastSibling.dataset.suit) && ['spades', 'clubs'].includes($bottomSiblings[i].dataset.suit)) {
                        return false;
                    }
                    $lastSibling = $bottomSiblings[i];
                }
            }
            ev.dataTransfer.setData('cardId', ev.target.id);
        }
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

    turn() {
        this.$card.classList.add('back');
    }
}
