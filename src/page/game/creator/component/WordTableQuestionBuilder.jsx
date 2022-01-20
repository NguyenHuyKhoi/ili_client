import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Button from '../../../../component/Button';
import MultiSelect from '../../../../component/MultiSelect';
import TextField from '../../../../component/TextField';
import { WORD_TABLE_SIZE } from '../../../../context/game/creator/context';
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5),
        display: 'flex',
        flex:1,
        height: '92vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.main,
        alignItems:'center'
    },
    titleBox: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(0.5)

    },
    charCell: {
        aspectRatio: 1,
    }
}))

const DIRECTIONS = [
    [0, 1],[1,0],[1,1],[-1,1]
]

const WordTableQuestionBuilder = (props) => {
    const classes = useStyles()
    const [keyword, setkeyword] = useState('');
    const [isFilled, setisFilled] = useState(false);
    const {question} = props
    
    const {title, char_table, correct_answers} = question
    const handleChange = (key, value) => {
        question[key] = value
        if (props.onChange) {
            props.onChange(question)
        }
    }

    const checkAndFill = (ox, oy, word, table, direction) => {
        console.log("Check and fill", ox, oy, word, direction, table);
        // If ok return table 
        // If not return null 
        var isOk = true
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
        var color = randomColor()

        for (var t = 0; t < len; t++ ){
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

    const handleAddAnswer = (word) => {
        console.log("handle add answer :", word);
        if (word == '') return 
        if (correct_answers.indexOf(word) != -1) {
            console.log("Exist word, return");
            return
        }
        var times = 50 
        while (times > 0) {
            var i = Math.floor(Math.random() * WORD_TABLE_SIZE)
            var j = Math.floor(Math.random() * WORD_TABLE_SIZE)
            var t = Math.floor(Math.random() * DIRECTIONS.length)

            var res = checkAndFill(i,j, word, char_table, DIRECTIONS[t])
            if (res != null) {
                handleChange('char_table', res)
                correct_answers.push(word)
                handleChange('correct_answers', correct_answers)
                setkeyword('')
                return
            }
            times = times - 1
        }
        setkeyword('')
        console.log("Add failure");
    }

    const handleRemoveAnswer = (word) => {
        for (var i = 0;i<WORD_TABLE_SIZE;i++) {
            for (var j = 0; j<WORD_TABLE_SIZE; j++) {
                var index = i * WORD_TABLE_SIZE + j
                if (char_table[index] != null && char_table[index].wordParent == word) {
                    if (isFilled) {
                        char_table[index] = randomCharCell()
                    }   
                    else {
                        char_table[index] = null
                    }
                }
            }
        }
        handleChange('char_table', char_table)
        if (correct_answers.indexOf(word) != -1) {
            correct_answers.splice(correct_answers.indexOf(word), 1)
            handleChange('correct_answers', correct_answers)
        }
    }
    
    const randomColor = () => {
        var colors = ['#82DCE1','#eb6946', '#82AF9B','#EBDCC3','#557882','#FAC846','#BE6E82', '#506E00']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const handleUnFillTable = () => {
        setisFilled(false)
        char_table.forEach((item, index) => {
            if (item != null && item.wordParent == undefined) {
                char_table[index] = null
            }
        })
        handleChange('char_table',char_table)
    }
    const randomCharCell = () => {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        return {
            char: chars[Math.floor(Math.random()*chars.length)],
            color: '#cddcdc'
        }
    }
    const handleFillTable = () => {
        setisFilled(true)
      
        char_table.forEach((item, index) => {
            if (item == null) {
                char_table[index] = randomCharCell()
            }
        })
        handleChange('char_table',char_table)
    }

    var keywords = correct_answers.map((item) => ( {
        value: item,
        label: item
    }))
    
    return ( 
        <div className = {classes.container}>
            <TextField 
                placeholder = 'Enter question ...' 
                style = {{ 
                    backgroundColor: 'white', textAlign: 'center',
                    height: theme.spacing(7),
                    width: '90%', fontSize: 30,
                    paddingLeft: theme.spacing(10),
                    paddingRight: theme.spacing(10)
                }}
                value={title == null ? '':title}
                onChange={ (value)=> handleChange('title', value)}/>

            <div style = {{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                
            }}>
                <Grid container >
                    <Grid item xs = {8} sx = {{display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                        <div style = {{
                            width: theme.spacing(60),
                            aspectRatio: 1,
                            alignItems: 'center'
                        }}>
                            <Grid container columnSpacing={0.2} rowSpacing={0.2}>
                                {
                                    char_table.map((item, index) => (
                                        <Grid item xs = {12 / WORD_TABLE_SIZE} key = {'' + index}>
                                            <div className = {classes.charCell}
                                                style = {{
                                                    backgroundColor: item == null ? '#cddcdc' : item.color,
                                                    display: 'flex',justifyContent: 'center',alignItems: 'center'
                                                }}>
                                                {
                                                    item != null &&
                                                    <Typography variant = 'btnLabel' sx = {{color: 'white'}}>
                                                        {item.char}
                                                    </Typography>
                                                }
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>  
                    </Grid>
                    <Grid item xs = {4} >
                        <div style = {{
                            flexDirection: 'column',
                            display: 'flex',
                            padding: theme.spacing(3),
                            height: '95%'
                        }}>

                            <TextField 
                                style = {{ 
                                    backgroundColor: 'white', 
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    padding: theme.spacing(1),
                                    width: '100%', fontSize: 40,
                                    paddingLeft: theme.spacing(2),
                                    paddingRight: theme.spacing(2)
                                }}
                                value={keyword}
                                onChange={ (value)=> setkeyword(value.toUpperCase())}/>
                            <Button 
                                label = 'Add'
                                variant = 'success'
                                size = 'small'
                                style = {{width: theme.spacing(20), marginTop: theme.spacing(3),alignSelf: 'center'}}
                                onClick = {() => handleAddAnswer(keyword)}/>
                            <div style = {{
                                flex: 1
                            }}>
                                <MultiSelect
                                    label = 'Keywords'
                                    selects = {correct_answers}
                                    // disabled = {true}
                                    list = {keywords}
                                    onSelectItem = {(keyword) => handleRemoveAnswer(keyword)}
                                    onChange = {(selects) => {}}
                                    style = {{marginTop: theme.spacing(3)}}/>
                            </div>
                        
                            <Button 
                                label = {isFilled ? 'Unfill table' : 'Fill table'}
                                variant = 'primary'
                                size = 'small'
                                style = {{width: theme.spacing(20), alignSelf: 'center'}}
                                onClick = {!isFilled ? handleFillTable : handleUnFillTable}/>
                        </div>
                    </Grid>
                </Grid>
          

           
            </div>
           
            
            
        </div>
    )
}

export default WordTableQuestionBuilder
