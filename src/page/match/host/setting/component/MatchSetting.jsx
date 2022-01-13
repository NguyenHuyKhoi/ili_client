import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState, useContext} from 'react'
import { MATCH_SETTINGS } from '..'
import DropdownSelect from '../../../../../component/DropdownSelect'
import { updateMatch } from '../../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../../context/match/play/context'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(16),
    },
    itemContainer: {
        marginBottom: theme.spacing(1)
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: theme.spacing(1),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
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
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.success.main,
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        '&:hover': {
            cursor: 'pointer'
        }
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
                <Typography variant = 'btnLabel' sx = {{color: 'white'}}>
                    {title}
                </Typography>
                {
                    description &&
                    <Typography variant = 'label' sx = {{color: 'white'}}>
                        {description}
                    </Typography>
                }
               
            </div>
            <div className = {classes.options} >
                <DropdownSelect 
                    title = ''
                    size = 'small'
                    list = {values}
                    value = {value}
                    color = {'white'}
                    onChange = {(v)=>handleChange(key,v)}/>
            </div>
           
        </div>
    )
}

const MatchSetting = () => {
    const classes = useStyles()
    const [showOptions, setShowOptions] = useState(true)
    const {dispatch, match} = useContext(MatchPlayContext)
    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleChange = (key, value) => {
        dispatch(updateMatch({
            ...match,
            [key]: value
        }))
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header} onClick = {handleShowOptions}>
                <Typography variant = 'bigLabel' sx = {{color: 'white', flex: 1}}>
                    Setting
                </Typography>
                {
                    !showOptions? 
                    <ArrowLeft   sx = {{color: 'black', fontSize: 30}}/>
                    :
                    <ArrowDropDown  sx = {{color: 'black', fontSize: 30}}/>
                }
                
            </div>
            {
                showOptions && 
                MATCH_SETTINGS.map((item, index) => (
                    <div className = {classes.itemContainer}   key = {''+index}>
                        <OptionItem 
                            item = {item} 
                            onChange = {(key, value) => handleChange(key, value)}
                            value = {match[item.key]}/>
                    </div>
                ))
            }
        </div>
    )
}

export default MatchSetting
