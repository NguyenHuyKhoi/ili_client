import match from './data.json'
import XLSX  from 'xlsx';

const appendOverviewSheet = (wb, match) => {
    const data = [{
        title: match.title, 
        mode: match.mode, 
        createAt: match.createAt, 
        players: match.players.length
    }]
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'Overview')
    return wb
}

const appendLeaderBoardSheet = (wb, match) => {
    const {players} = match
    var arr =  players.map((player, index) => {
        const {correctNum, incorrectNum, unanswerNum} = player
        let answerNum = correctNum + incorrectNum
        return {
            'Rank': player.rank,
            'Name': player.username,
            'Avatar': player.avatar,
            'Total Score (pts)': player.score,
            'Correct Answers': correctNum,
            'Incorrect Answers': incorrectNum,
            'Correct Percent': answerNum === 0? '0 %' : Math.round( 100 * correctNum / answerNum) + ' %',
        }})
    const ws = XLSX.utils.json_to_sheet(arr)
    XLSX.utils.book_append_sheet(wb, ws, 'Leaderboard')
    return wb
}

const appendProgressSheet = (wb, progress, index) => {
    const {question, answers, correctNum, incorrectNum, answerNum, answerTimeAvg} = progress
    var arr = []
    const ws = XLSX.utils.json_to_sheet(arr)
    XLSX.utils.book_append_sheet(wb, ws, 'Quiz_'+index)
    return wb
}
export const writeMatchReport = async (data) => {
    var wb = XLSX.utils.book_new();
    wb = appendOverviewSheet(wb, match)
    wb = appendLeaderBoardSheet(wb, match)
    wb = appendProgressSheet(wb, match)
    // Writing to our file
    XLSX.writeFile(wb,`match_report.xlsx`)
}