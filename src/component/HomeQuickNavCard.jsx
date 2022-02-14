
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'
import Button from './Button'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        height: theme.spacing(40),
        backgroundColor: theme.palette.default.main,
        boxShadow: `1px 3px 12px #f0f0f0`,
        borderRadius: theme.spacing(2)
    },
    leftCol: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',    
        padding: theme.spacing(4)
    },
    rightCol: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        paddingRight: theme.spacing(5)
    },
    img: {
        height: theme.spacing(60),
        width:  theme.spacing(60),
        borderRadius: theme.spacing(30),
        position: 'absolute',
        top: 0,
        bottom: 0,
        right:  theme.spacing(-25),
        margin: 'auto'
    },
    shade: {
        height: theme.spacing(60),
        width:  theme.spacing(60),
        borderRadius: theme.spacing(30),
        backgroundColor: theme.palette.neutral.main,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right:  theme.spacing(-23),
        margin: 'auto'
    }
}))


const HomeQuickNavCard = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {item} = props 
    var {title, description, btnLabel, style, link, image} = item
    
    
    const handleClick = () => {
        if (link != undefined) {
            return navigate(link, {replace: true})
        }
        else {
            console.log("Handle click prop");
            if (props.onClick) props.onClick()
        }

    }
    return (
        <div className = {classes.container}
            onClick = {(e) => {
                if (props.onClick) props.onClick(e)
            }}
            style = {{
                ...style,
            }}>
            <div className = {classes.leftCol}>
                <Typography variant = 'bigLabel'>
                    {title}
                </Typography>
                <Typography variant = 'btnLabel' style = {{flex: 1, marginTop: theme.spacing(2)}}>
                    {description}
                </Typography>

                <div style = {{width: theme.spacing(25)}} >
                    <Button     
                        variant = 'success'
                        size = {'small'}
                        label = {btnLabel}
                        onClick = {handleClick}/>
                </div>
            </div>
            <div className = {classes.rightCol}>
                <div className = {classes.shade}/>
                <img src = {image} className = {classes.img} alt = 'Empty'/>
              
            </div>
        </div>

    )
}

export default HomeQuickNavCard
