import { WORD_TABLE_SIZE } from "../../creator/context";
const DIRECTIONS = [
    [0, 1],[1,0],[1,1],[-1,1]
]

class WordTableHelper {
    static checkAndFill = (ox, oy, word, table, direction) => {
        // If ok return table 
        // If not return null 
        var len = word.length
        var row, col
    
        for (var t = 0; t < len; t++ ){
            row = ox + direction[0] * t;
            col = oy + direction[1] * t;
            if (0<=row && row<WORD_TABLE_SIZE && 0<=col && col < WORD_TABLE_SIZE) {
                var index = row * WORD_TABLE_SIZE + col
                if (table[index] != null && table[index].wordParent != undefined ) {
                    return null
                }
            }
            else {
                return null
            }   
        }
        var color = WordTableHelper.randomColor()
    
        for ( t = 0; t < len; t++ ){
            row = ox + direction[0] * t;
            col = oy + direction[1] * t;
            table[row * WORD_TABLE_SIZE + col] = {
                char: word[t],
                wordParent: word,
                color
            }
        }
        return table
    }
    
    static randomColor = () => {
        var colors = [
            '#82DCE1',
            '#eb6946', 
            '#82AF9B',
            '#EBDCC3',
            '#557882',
            '#FAC846',
            '#BE6E82', 
            '#506E00',
            '#3e7bbc', 
            '#24486f', 
            '#9f7272', 
            '#ffcd9a',
            '#541743',
            '#FFC300',
            '#29374D',
            '#560725',
            '#3F4167',
            '#367E81',
            '#1A182E',
            '#375E89',
            '#E65239',
            '#6E65A1'
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }
    
    static tryAddAnswer = (char_table, correct_answers, word) => {
        // Return result: true/false, msg:
        if (word == '') return {
            ok: false, 
            msg: 'Word is empty...'
        }
        if (correct_answers.indexOf(word) !== -1) {
            return {
                ok: false,
                msg: 'Keyword is added before...'
            }
        }
        if (correct_answers.length >= 12) {
            return {
                ok: false,
                msg: 'Maximum keywords number is 12...'
            }
        }
        var times = 50 
        while (times > 0) {
            var i = Math.floor(Math.random() * WORD_TABLE_SIZE)
            var j = Math.floor(Math.random() * WORD_TABLE_SIZE)
            var t = Math.floor(Math.random() * DIRECTIONS.length)
    
            var res = WordTableHelper.checkAndFill(i,j, word, char_table, DIRECTIONS[t])
            if (res != null) {
                correct_answers.push(word)
                return {
                    char_table: res,
                    correct_answers,
                    ok: true, 
                    msg: 'Add keyword: ' + word
                }
            }
            times = times - 1
        }
        return {
            ok: false, 
            msg: 'Add keyword error, try again... ' 
        }
    }

    static randomCharCell = () => {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        return {
            char: chars[Math.floor(Math.random()*chars.length)],
            color: '#cddcdc'
        }
    }
    static tryRemoveAnswer = (char_table,correct_answers, word, isFilled) => {
        for (var i = 0;i<WORD_TABLE_SIZE;i++) {
            for (var j = 0; j<WORD_TABLE_SIZE; j++) {
                var index = i * WORD_TABLE_SIZE + j
                if (char_table[index] !== null && char_table[index].wordParent === word) {
                    if (isFilled) {
                        char_table[index] = WordTableHelper.randomCharCell()
                    }   
                    else {
                        char_table[index] = null
                    }
                }
            }
        }
        if (correct_answers.indexOf(word) !== -1) {
            correct_answers.splice(correct_answers.indexOf(word), 1)
        }
        return {
            char_table,
            correct_answers
        }
    }

    static handleUnFillTable = (char_table) => {
        char_table.forEach((item, index) => {
            if (item !== null && item.wordParent == undefined) {
                char_table[index] = null
            }
        })
        return char_table
    }
    static handleFillTable = (char_table) => {
        char_table.forEach((item, index) => {
            if (item == null) {
                char_table[index] = WordTableHelper.randomCharCell()
            }
        })
        return char_table
    }
}

export default WordTableHelper
