
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        border: 'solid 2px #000000',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))
const Item = (props) => {
    const classes = useStyles()
    var {item, selected} = props 
    var {label} = item 
    return (
        <div className = {classes.item}
            style = {{
                backgroundColor: selected ? theme.palette.success.main : theme.palette.warning.main,
                borderRadius: selected ? 
                    '255px 10px 225px 10px/10px 225px 10px 255px'  : 
                    '255px 20px 225px 20px/20px 225px 20px 255px',
            }}
            onClick = {() => {
                if (props.onSelect) props.onSelect()
            }}>
            <Typography variant = 'label' sx = {{color: '#000'}}>
                {label}
            </Typography>
        </div>
    )
}

const MultiSelect = (props) => {
    const classes = useStyles()
    var {selects, disabled} = props 
    if (disabled ===undefined) disabled = false 

    const onSelectItem = (value) => {
        if (disabled) return
        if (props.onSelectItem) {
            props.onSelectItem(value)
            return
        }
        var temp = JSON.parse(JSON.stringify(selects))
        if (temp.indexOf(value) ===-1) {
            temp.push(value)
        }
        else {
            temp.splice(temp.indexOf(value), 1)
        }
        console.log(" selected items: ", temp)
        if (props.onChange) {
            props.onChange(temp)
        }
    }
    var {label, list, style} = props
    
    return (
        <div className = {classes.container}
            style = {style ? style : {}}>
            <Typography variant = 'btnLabel'>
                {
                    `${label} ( ${list.length} )`
                }
            </Typography>
            <div className = {classes.list}>
                {
                    list.map((item, index) => (
                        <Item 
                            item = {item} 
                            onSelect = {() => onSelectItem(item.value)} key = {'' + index}
                            selected = {selects.indexOf(item.value) !==-1}/>
                    ))
                }
            </div>
        </div>

    )
}

export default MultiSelect
