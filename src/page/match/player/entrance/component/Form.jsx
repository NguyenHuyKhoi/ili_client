import { Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Button from '../../../../../component/Button'
import TextField from '../../../../../component/TextField'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: 500,
        flexDirection: 'column',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(0.5),
        border: 'solid 2px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
    }
}))


const Form = (props) => {
    const classes = useStyles()
    const {input_type, value} = props
    const {title, desc, placeholder, btnLabel, type} = input_type
    const handleChange = (value) => {
        if (props.onChange) {
            props.onChange(value)
        }
    }

    const handleSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit()
        }
    }
    return (
        <div className = {classes.container}>
            <Typography variant = 'header' sx = {{alignSelf: 'center'}}>
                {title}
            </Typography>
            <Typography variant = 'caption' sx = {{alignSelf: 'center'}}>
                {desc}
            </Typography>
            <TextField 
                fontSize = {50}
                placeholder = {placeholder}
                value = {value}
                onChange = {handleChange} 
                type = {type}
                style = {{
                    borderColor: props.showAlert? 'red':'gray',
                    backgroundColor: props.showAlert? red[100]:'white',
                    marginTop: theme.spacing(3)
                }}
                />
            <Button 
                disabled = {value == '' }
                variant =  {value == '' ? 'warning' : 'primary'}
                label = {btnLabel}
                style = {{marginTop: theme.spacing(2)}}
                onClick = {handleSubmit}/>
    </div>
    )
}

export default Form
