'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    const _PUZZLE = puzzle.reduce((res, val) => [...res, ...val], []),
          STEP    = puzzle[0].length;

    let visitedStack, toVisitStack = [];

    let isWillVisit = (puzzleIdx, searchIdx) => toVisitStack.push({ puzzleIdx, searchIdx }) == true,
        isVisited = (node) => {
            let [isContinue, searchIdx] = [false, node.searchIdx + 1],
                top    = node.puzzleIdx - STEP,
                right  = node.puzzleIdx + 1,
                bottom = node.puzzleIdx + STEP,
                left   = node.puzzleIdx - 1,
                isSnaking = (node) => {
                    return node > -1 
                           && node < _PUZZLE.length
                           && !visitedStack.includes(node) 
                           && _PUZZLE[node] === searchStr[searchIdx];
                };

            if (isSnaking(top)) isContinue = isWillVisit(top, searchIdx);
            if (isSnaking(right)) isContinue = isWillVisit(right, searchIdx);
            if (isSnaking(bottom)) isContinue = isWillVisit(bottom, searchIdx);
            if (isSnaking(left)) isContinue = isWillVisit(left, searchIdx);
            return isContinue;
        },
        visited = (node) => visitedStack.push(node.puzzleIdx);
        
    for (let i in _PUZZLE) {
        visitedStack = [];
        if (_PUZZLE[i] === searchStr[0]) isWillVisit(Number(i), 0);

        while(toVisitStack.length > 0) {
            let node = toVisitStack.pop();
            if (node.searchIdx === searchStr.length - 1) return true;
            if (isVisited(node)) visited(node);
            //else visitedStack.pop();
        }
    }
    return false;
    // throw new Error('Not implemented');
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    // let seq = chars.split('');

    throw new Error('Not implemented');
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let max, maxIdx = 0, quot = quotes, profit = 0; 
    while (true) {
        max = Math.max(...quot);
        maxIdx = quot.indexOf(max);
        if (maxIdx > 0) 
            profit += quot.slice(0, maxIdx)
                          .reduce((res, val) => res -= val, 0) + max * maxIdx;
        if (maxIdx + 1 < quot.length) quot = quot.slice(maxIdx + 1);
        else return profit;
    }
    // throw new Error('Not implemented');
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        throw new Error('Not implemented');
    },
    
    decode: function(code) {
        throw new Error('Not implemented');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
