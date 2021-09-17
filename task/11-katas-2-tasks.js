'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    throw new Error('Not implemented');
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    throw new Error('Not implemented');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let isPair, isTwoPair, isThree, isStraight, isFlush, isFullHouse, isFour;
    let firstPair, secondPair;
    
    const RANKS = [
        '2', '3', '4', '5', '6', '7', '8', '9', 
        '10', 'J', 'Q', 'K', 'A'];

    let hasPair = cardsArr => {
        for (let i in cardsArr) {
            let idx = [...cardsArr.slice(0, i), ...cardsArr.slice(i + 1)].indexOf(cardsArr[i]);
            if (idx > -1) {
                return { card: cardsArr[i], 
                         firstIdx: Math.min(i, idx), 
                         secondIdx: Math.max(i, idx)};
            };
        }
        return { 
            card: undefined, 
            firstIdx: -1, 
            secondIdx: -1
        }
    };

    let deletePair = (cardsArr, card) => {
        let i = 0, arr = cardsArr;
        while (i < 2) {
            let idx = arr.indexOf(card);
            arr = [
                ...arr.slice(0, idx), 
                ...arr.slice(idx + 1)];
            i++;
        }
        return arr;
    }

    let cards = hand.map(val => val.slice(0, -1))
                    .sort((a, b) => RANKS.indexOf(a) - RANKS.indexOf(b));

    firstPair = hasPair(cards);
    if (typeof firstPair.card !== 'undefined') isPair = true;

    if (!isPair) {
        isFlush = hand.every(val => val.slice(-1) === hand[0].slice(-1));

        let isAinCards = cards[cards.length - 1] === 'A';
        if (isAinCards) cards.pop();

        isStraight = ((isAinCards && RANKS.indexOf(cards[cards.length - 1]) === 3) ||
                      (isAinCards && RANKS.indexOf(cards[0]) === 8) || 
                      (!isAinCards && RANKS.indexOf(cards[cards.length - 1]) - RANKS.indexOf(cards[0]) === 4));
    } else {

        let threeCards = deletePair(cards, firstPair.card);
        secondPair = hasPair(threeCards);

        if (typeof secondPair.card !== 'undefined') {
            if (firstPair.card === secondPair.card) isFour = true;
            else if (threeCards.includes(firstPair.card) 
                || deletePair(threeCards, secondPair.card)[0] === secondPair.card)
                isFullHouse = true;
            else isTwoPair = true;
        } else if (threeCards.includes(firstPair.card)) isThree = true;
    }
    if (isFlush && isStraight) return PokerRank.StraightFlush;
    else if (isFour) return PokerRank.FourOfKind;
    else if (isFullHouse) return PokerRank.FullHouse;
    else if (isFlush) return PokerRank.Flush;
    else if (isStraight) return PokerRank.Straight;
    else if (isThree) return PokerRank.ThreeOfKind;
    else if (isTwoPair) return PokerRank.TwoPairs;
    else if (isPair) return PokerRank.OnePair;
    else return PokerRank.HighCard;
    // throw new Error('Not implemented');
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
