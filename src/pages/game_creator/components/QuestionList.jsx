import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Button, Divider, Grid, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
    },
    questions: {
        display:'flex',
        flexDirection:'column',
    },
    questionContainer: {
        padding: theme.spacing(1),
        display:'flex',
        flexDirection:'column'
    },
    question: {
        flex:1,
        padding: theme.spacing(0.5),
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    answers: {
        flex:1,
        marginTop: theme.spacing(1)
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        border: '1px solid gray',
        height:7
    },
    img: {
        height:25,
        width:45,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    },
    bottom: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    }
}))
const QuestionCard = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.question} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <Typography variant='subtitle2' sx = {{alignSelf:'center'}}>Hell </Typography>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Equus_grevyi_mare_Kenya.jpg/300px-Equus_grevyi_mare_Kenya.jpg' 
                className = {classes.img}/>
            <div className = {classes.answers}>
                <Grid container sx = {{flex: 1}}>
                {
                    Array.from(Array(4)).map((_, index) => (
                        <Grid item xs = {6} sx = {{p: theme.spacing(0.2)}}>
                            <div className = {classes.answer}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
           
        </div>
    )
}

const QuestionList = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleSelected = (index) => {
        setSelectedIndex(index)
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.questions} >
            {
                Array.from(Array(2)).map((_, index) => (
                    <div className = {classes.questionContainer} onClick = {()=>handleSelected(index)}
                        style={{
                            backgroundColor: selectedIndex == index ? blue[100]:'white'
                        }}>
                        <Typography variant='subtitle2' sx = {{mb: theme.spacing(1)}}>1 Quiz</Typography>
                        <QuestionCard selected = {selectedIndex == index}/>
                    </div>
                ))
            }
            </div>
            <Divider />
            <div className = {classes.bottom} >
                <Button variant = 'contained' color = 'primary' size = 'small' sx = {{py: theme.spacing(1.2)}}>Add Question</Button>
                <Button variant = 'contained'  color = 'neutral' size = 'small' sx = {{mt: theme.spacing(2), py: theme.spacing(1.2)}}>Import Excel</Button>
            </div>
        </div>
    )
}

export default QuestionList
