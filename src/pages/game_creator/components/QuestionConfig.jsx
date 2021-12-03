import { Add, ClassSharp } from '@mui/icons-material'
import { AppBar, Button, Divider, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(10),
        flex:1,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
    },
    inputs: {
        flex:1, 
        flexDirection:'column',
    },
    input: {
        marginBottom: theme.spacing(5)
    },
    bottom: {
        padding: theme.spacing(3),
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
}))

const QuestionConfig = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div className = {classes.inputs} >
                <div className = {classes.input}>
                    <LabeledSelect/>
                </div>
                <div className = {classes.input}>
                    <LabeledSelect/>
                </div>
                <div className = {classes.input}>
                    <LabeledSelect/>
                </div>
            </div>
            <Divider />
            <div className = {classes.bottom} >
                <Button variant = 'text' >Delete</Button>
                <Button variant = 'outlined'  >Duplicate</Button>
            </div>
        </div>
    )
}

export default QuestionConfig
