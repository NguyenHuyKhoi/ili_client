import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState} from 'react'
import { MATCH_SETTINGS } from '..'
import DropdownSelect from '../../../../../component/DropdownSelect'
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
    },
    options: {
        width: theme.spacing(20)
    }
}))

const OptionItem = (props) => {
    const classes = useStyles()
    const {item, value} = props 
    const {title, description, key, values } = item

    const handleChange = (key, value) => {
        if (props.onChange) props.onChange(key, value)
    }

    return (
        <div className = {classes.item}>
            <div className = {classes.infor}>
                <Typography variant = 'h6' sx = {{color: 'white', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                {
                    description &&
                    <Typography variant = 'subtitle2' sx = {{color: 'white'}}>
                        {description}
                    </Typography>
                }
               
            </div>
            <div className = {classes.options} >
                <DropdownSelect 
                    title = ''
                    list = {values}
                    value = {value}
                    onChange = {(v)=>handleChange(key,v)}/>
            </div>
           
        </div>
    )
}

const MatchSetting = () => {
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
                MATCH_SETTINGS.map((item, index) => (
                    <div className = {classes.itemContainer}   key = {''+index}>
                        <OptionItem item = {item} onChange = {() => handle}/>
                    </div>
                ))
            }
        </div>
    )
}

export default MatchSetting
