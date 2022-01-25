import { Check, Close } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Icon from '../../../../../component/Icon'
import { theme } from '../../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        height: theme.spacing(10),
        display: 'flex',
        flexDirection:'row',
        alignItems : 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'red',
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        boxShadow: `1px 3px 1px #f0f0f0`,
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))

const Answer = (props) => {
    const classes = useStyles()
    var {answer, isCorrect, isSelected, style} = props 
    const {color, icon} = style
    return (
        <div className = {classes.container} 
            style={{backgroundColor: color, opacity: isCorrect ===  false || isSelected ===  false ? 0.3 : 1}}
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}>
            <Icon name = {icon} style = {{fontSize: 40, color: theme.palette.background.main}}/>
            <Typography variant = 'header' sx = {{flex: 1, ml: theme.spacing(2),color: '#000'}}>
                {answer}
            </Typography>
            {
                isCorrect !==  undefined && 
                (
                    isCorrect ?
                    <Check sx = {{color: '#000', fontSize: 40}}/>
                    : 
                    <Close sx = {{color: '#000', fontSize: 40}}/>
                )
            }
            {
                isSelected ===  true && 
                <Check sx = {{color: '#000', fontSize: 40}}/>
            }
        </div>
    )
}


export default Answer
