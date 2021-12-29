import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState} from 'react'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(10)
    },
    itemContainer: {
        marginBottom: theme.spacing(0.5)
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.5),
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: 'white',
        marginBottom: theme.spacing(2)
    }
}))

const options = [
    {
        title: 'Random order of questions',     
        defaultValue: false
    },
    {
        title: 'Random order of answers',
        defaultValue: false

    }
]
const OptionItem = (props) => {
    const classes = useStyles()
    const {option} = props 
    const {title, desc, defaultValue } = option
    return (
        <div className = {classes.item}>
            <div className = {classes.infor}>
                <Typography variant = 'h6' sx = {{color: 'white', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                {
                    desc &&
                    <Typography variant = 'subtitle2' sx = {{color: 'white'}}>
                        {desc}
                    </Typography>
                }
               
            </div>
            <Switch {...{inputProps: {'aria-label': 'Turn on/off'}}} defaultChecked = {defaultValue} />
        </div>
    )
}

const GameOptions = () => {
    const classes = useStyles()
    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold', flex: 1}}>
                    Game options
                </Typography>
                {
                    !showOptions? 
                    <ArrowLeft onClick = {handleShowOptions} sx = {{color: 'black', fontSize: 30}}/>
                    :
                    <ArrowDropDown onClick = {handleShowOptions} sx = {{color: 'black', fontSize: 30}}/>
                }
                
            </div>
            {
                showOptions && 
                options.map((option, index) => (
                    <div className = {classes.itemContainer}   key = {''+index}>
                        <OptionItem option = {option}/>
                    </div>
                ))
            }
        </div>
    )
}

export default GameOptions
