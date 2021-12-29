import { Check, Close, JoinFullSharp, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Icon from '../../../../../component/Icon'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        borderBottom: '2px solid #f2f2f2',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    }
}))

const TopPlayerCard = (props) => {
    const classes = useStyles()
    const { player, highlight} = props 
    const {name, score} = player
    return (
        <div className = {classes.container} 
            style = {{
                borderRadius: highlight ? theme.spacing(1) : 0,
                backgroundColor: highlight ? 'white' : 'rgba(0,0,0,0)'
            }}
            onClick = {() => {
            }}>
            <Typography variant = 'h5' sx = {{
                mx: theme.spacing(1),
                color: highlight ? '#333333' :  'white', 
                fontWeight: 'bold'}}>
                {name}
            </Typography>
            <Typography variant = 'h5' sx = {{
                mx: theme.spacing(1),
                color: highlight ? '#333333' :  'white', 
                fontWeight: 'bold'}}>
                {score}
            </Typography>   
        </div>
    )
}


export default TopPlayerCard
