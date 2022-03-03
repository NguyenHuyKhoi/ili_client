import * as XLSX  from 'xlsx';
import { QUESTION_TYPES, WORD_TABLE_SIZE } from '../../creator/context';
import { cloneQuestion } from '../../creator/reducer';
import WordTableHelper from '../word_table';
const mappingProps = (obj1, obj2, arrProp) => {
    arrProp.forEach((pair) => {
        var i1 = pair[0], i2 = pair[1]
        if (obj1[i1] != undefined) {
            obj2[i2] = obj1[i1]
        }
    })
    return obj2
}
const convertMultipleQuestion = (row) => {
    var question =  cloneQuestion(QUESTION_TYPES[0].sample)
    var mapping = [
        ['Title', 'title'], 
        ['Image (Link)', 'image'], 
        ['Correct Answer (1,2,3 or 4)','correct_answer'], 
        ['Time Limit (s)', 'time_limit'],
        ['Score', 'score']
    ]
    question = mappingProps(row, question, mapping)

    Array.from(Array(4)).forEach((item, index) => {
        let key = 'Answer '+ (index + 1)
        if (row[key] != undefined) {
            question.answers[index] = row[key] + ''
        }
    })
    return question
}
const convertTFQuestion = (row) => {
    var question =  cloneQuestion(QUESTION_TYPES[1].sample)
    var mapping = [
        ['Title', 'title'], 
        ['Image (Link)', 'image'], 
        ['Correct Answer (T/F)','correct_answer'], 
        ['Time Limit (s)', 'time_limit'],
        ['Score', 'score']
    ]
    question = mappingProps(row, question, mapping)
    if (question.correct_answer != null) {
        if (question.correct_answer == 'T') {
            question.correct_answer = '0'
        }
        else if (question.correct_answer == 'F') {
            question.correct_answer = '1'
        }
        else {
            question.correct_answer = null
        }
    }
    return question
}
const convertPicWordQuestion = (row) => {
    var question =  cloneQuestion(QUESTION_TYPES[2].sample)
    var mapping = [
        ['Title', 'title'], 
        ['Keyword', 'correct_answer'], 
        ['Time Limit (s)', 'time_limit'],
        ['Score', 'score']
    ]
    question = mappingProps(row, question, mapping)

    Array.from(Array(4)).forEach((item, index) => {
        let key = `Hint Image ${index+1} (Link)`
        if (row[key] != undefined) {
            question.images[index] = row[key] + ''
        }
    })
    return question
}

const convertWordTableQuestion = (row) => {
    var question = cloneQuestion(QUESTION_TYPES[3].sample)
    var mapping = [
        ['Title', 'title'], 
        ['Keyword List', 'correct_answers'], 
        ['Time Limit (s)', 'time_limit'],
        ['Score', 'score']
    ]
    question = mappingProps(row, question, mapping)

    var temps = question.correct_answers
    if (typeof temps === 'string' || temps instanceof String) {
        var keywords = temps.replace(/ /g,"").split(',').filter((item) => item != '' && item != ' ')
        question.correct_answers = []

        // Fill char_table
        keywords.forEach((item) => {
            let res = WordTableHelper.tryAddAnswer(question.char_table, question.correct_answers, item)
            if (res.ok == true) {
                question.char_table = res.char_table
                question.correct_answers = res.correct_answers
            }
            else {
                console.log("Add answer failed:", res);
            }
        })

        question.char_table = WordTableHelper.handleFillTable(question.char_table)
        
    }
    return question
}

export const readQuestionTemplate = async (xlsxFile) =>  {
    const fileBuffer = await xlsxFile.arrayBuffer();
    var workbook = XLSX.read(fileBuffer) 
    var questions = []
    var question = {}
    var worksheet
    var sheet_names = ['Multiple', 'True_False', 'Pic Word', 'Word Table']

    sheet_names.forEach((sheet_name, index) => {
        worksheet = workbook.Sheets[sheet_name];
        if (worksheet == null) {
            return
        }
        var data = XLSX.utils.sheet_to_json(worksheet)
        data.forEach((row) => {
            if (index == 0) {
                question = convertMultipleQuestion(row)
            }
            else if (index == 1) {
                question = convertTFQuestion(row)
            }
            else if (index == 2) {
                question = convertPicWordQuestion(row)
            }
            else {
                question = convertWordTableQuestion(row)
            }

            if (question != null) questions.push(question)
        })
    })
    return questions
}