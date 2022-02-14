import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Button from '../../../../component/Button';
import MultiSelect from '../../../../component/MultiSelect';
import TextField from '../../../../component/TextField';
import { WORD_TABLE_SIZE } from '../../../../context/question/creator/context';
import WordTableHelper from '../../../../context/question/helper/word_table';
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


const WordTableQuestionBuilder = (props) => {
    const classes = useStyles()
    const [keyword, setkeyword] = useState('');
    const [isFilled, setisFilled] = useState(false);
    const {question} = props
    const [alert, setAlert] = useState({});
    const {title, char_table, correct_answers} = question

    const handleChange = (key, value) => {
        question[key] = value
        if (props.onChange) {
            props.onChange(question)
        }
    }

    const handleAddAnswer = (word) => {
        if (word == '') return 
        let res = WordTableHelper.tryAddAnswer(char_table, correct_answers, word)
        console.log("Res add answer:", res)
        if (res.ok == false) {
            setAlert({
                type: 'error',
                msg: res.msg
            })
            return
        }
        handleChange('char_table', res.char_table)
        handleChange('correct_answers', res.correct_answers)
        setkeyword('')
    }

    const handleRemoveAnswer = (word) => {
        setAlert({
            type: 'info',
            msg: 'Remove keyword: ' + word
        })
        let res = WordTableHelper.tryRemoveAnswer(char_table, correct_answers, word, isFilled)
        handleChange('char_table', res.char_table)
        handleChange('correct_answers', res.correct_answers)
    }
    

    const handleUnFillTable = () => {
        setisFilled(false)
        handleChange('char_table', WordTableHelper.handleUnFillTable(char_table))
    }
   
    const handleFillTable = () => {
        setisFilled(true)
    
        handleChange('char_table', WordTableHelper.handleFillTable(char_table))
    }

    var keywords = correct_answers.map((item) => ( {
        value: item,
        label: item
    }))
    
    return ( 
        <div className = {classes.container}>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
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
                                onSubmit = {() => handleAddAnswer(keyword)}
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
