import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
    },
    inputContainer: {
        paddingBottom: theme.spacing(1.5),
        paddingTop: theme.spacing(1.5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}))


const Form = (props) => {
    const classes = useStyles()
    const handleChange = (e) => {
        if (props.onChange) {
            props.onChange(e.target.value)
        }
    }

    const handleSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit()
        }
    }
    return (
        <div className = {classes.container}>
            <input className = {classes.inputContainer} onChange = {handleChange} 
                value = {props.value}
                style = {{
                    borderColor: props.showAlert? 'red':'gray',
                    backgroundColor: props.showAlert? red[100]:'white'
                    
                }}
                placeholder = {props.placeholder}/>
            <Button variant = 'contained' sx = {{mt: theme.spacing(1),py: theme.spacing(),px: theme.spacing(15), backgroundColor: 'black'}}
                onClick = {handleSubmit}>
                {props.btnTitle}
            </Button>
       </div>
    )
}

export default Form
