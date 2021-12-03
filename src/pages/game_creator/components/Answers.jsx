import { AppBar, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../../../theme'
import CropDinSharpIcon from '@mui/icons-material/CropDinSharp';
import { CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%'   
    },
    answer: {
        backgroundColor: 'white ',
        flex:1,
        borderRadius: theme.spacing(1),
        boxShadow: `1px 3px 1px #f0f0f0`,
        display:'flex',
        flexDirection: 'row',
        height: 85,
        alignItems:'center',
        padding: theme.spacing(1)
    },
    shapeContainer: {
        height: '100%',
        backgroundColor: 'red',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    titleInput: {
        flex:1,
        fontSize: 20,
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        flex: 1,
        "&$focused": {
            outline: 'none'
        }

    }
}))
const Answer = () => {
    const classes = useStyles()
    const [answer, setAnswer] = useState("")
    const [selected, setSelected] = useState(false)
    const handleAnswerChange = (e) => {
        console.log("Change answer :",e.target.value)
        var value = e.target.value
        setAnswer(value)
        if (answer =="" ) setSelected(false)
    }

    const handleSelectedChange = () => {
        setSelected(!selected)
    }
    return (
        <div className = {classes.answer} style={{backgroundColor: answer == "" ?'white':'red'}}>
            <div className = {classes.shapeContainer}>
                <CropDinSharpIcon sx = {{backgroundColor: 'white', color: 'white'}} />
            </div>
            <input type = 'text' placeholder = '' className = {classes.titleInput} onChange = {handleAnswerChange}/>
            <div onClick = {handleSelectedChange}>
            {
                !selected?
                <CircleOutlined sx = {{color: 'white', fontSize: 60}}/>
                :
                <CheckCircleOutlineOutlined sx = {{color: 'white', fontSize: 60}}/>
            }
            </div>
            
        </div>
    )
}
const Answers = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1.5 }} sx = {{width:'100%',height:'100%'}}>
                {Array.from(Array(4)).map((_, index) => (
                    <Grid item xs={6}>
                        <Answer/>
                    </Grid>
                ))}
            </Grid>
        </div>
        
    )
}

export default Answers
