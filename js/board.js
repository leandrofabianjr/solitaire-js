class Board {

    _$board
    _$pool
    _$poolFace
    _$piles
    _$decks

    constructor(boardQuery) {
        this._$board = document.querySelector(boardQuery);
        this._$pool = this._$board.querySelector('#pool');
        this._$poolFace = this._$board.querySelector('#pool-face');
        this._$piles = this._$board.querySelector('#piles');
        this._$decks = Array.from(this._$board.querySelectorAll('#decks .deck'));
        
        this._$decks.map($d => {
            $d.ondragover = (ev) => ev.preventDefault();
            $d.ondrop = (ev) => {
                ev.preventDefault();
                var data = ev.dataTransfer.getData('card');
                $d.appendChild(document.getElementById(data));
            };
        });

        let cards = this._shuffle(this._buildCards());
        this._initGame(cards);
    }

    /**
     * @returns {Card[]}
     */
    _buildCards() {
        let cards = [];
        Object.keys(Suit).map(suit => {
            for (let i = 1; i <= 13; i++) {
                let c = new Card(i, suit);
                c.$card.onclick = (ev) => {
                    const $card = ev.target.closest('.card');
                    const $parent = $card.parentElement;
                    if ($parent.id === 'pool') {
                        $parent.removeChild($card);
                        this._$poolFace.appendChild($card);
                    }
                };
                cards.push(c);
            }
        });
        return cards;
    }

    /**
     *
     *
     * @param {Card[]} cards
     * @returns {Card[]}
     * @memberof Board
     */
    _shuffle(cards) {
        var copy = [], n = cards.length, i;
        while (n) {
            i = Math.floor(Math.random() * n--);  
            copy.push(cards.splice(i, 1)[0]);
        }
        return copy;
    }

    _initGame(cards) {
        for (let i = 0; i < 12; i++) {
            let position = Math.floor(Math.random() * cards.length);
            this._$decks[position % 7].appendChild(cards.pop().$card);
        }
        cards.map(c => this._$pool.appendChild(c.$card));
    }

}