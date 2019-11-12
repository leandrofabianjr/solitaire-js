class Board {

    constructor(boardQuery) {
        const $board = document.querySelector(boardQuery);
        let $pool = $board.querySelector('#pool');
        let $piles = $board.querySelector('#piles');
        let $decks = Array.from($board.querySelectorAll('#decks .deck'));
        
        $decks.map($d => {
            $d.ondragover = (ev) => ev.preventDefault();
            $d.ondrop = (ev) => {
                ev.preventDefault();
                var data = ev.dataTransfer.getData('card');
                $d.appendChild(document.getElementById(data));
            };
        });
        console.log($decks);
        let cards = this._shuffle(this._buildCards());
        console.log(cards);
        this._initGame($pool, $decks, cards);
    }

    /**
     * @returns {any}
     */
    _buildCards() {
        let cards = [];
        Object.keys(Suit).map(suit => {
            for (let i = 1; i <= 13; i++) {
                cards.push(new Card(i, suit));
            }
        });
        return cards;
    }

    _shuffle(cards) {
        var copy = [], n = cards.length, i;
        while (n) {
            i = Math.floor(Math.random() * n--);  
            copy.push(cards.splice(i, 1)[0]);
        }
        return copy;
    }

    /**
     * 
     * @param {HTMLElement[]} $decks 
     * @param {Card[]} cards 
     */
    _initGame($pool, $decks, cards) {
        for (let i = 0; i < 12; i++) {
            let position = Math.floor(Math.random() * cards.length);
            $decks[position % 7].appendChild(cards.pop().HTMLElement);
        }
        $pool.appendChild($decks[0].HTMLElement);
    }

}