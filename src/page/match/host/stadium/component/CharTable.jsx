import { Check, Close, Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Icon from '../../../../../component/Icon'
import { WORD_TABLE_SIZE } from '../../../../../context/game/creator/context'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
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

const CharTable = (props) => {
    const classes = useStyles()
    var {table, open_word_states, correct_answers, showAll} = props 

    const selectCellColor = (item) => {
        if (showAll) return item.color
        if (item == null || item.wordParent == undefined) {
            return '#cddcdc'
        }
        var idx = correct_answers.findIndex((answer) => item.wordParent == answer)
        if (idx == -1 || open_word_states[idx] == 0) {
            return '#cddcdc'
        }
        return item.color
    }
    return (
         <div style = {{
            width: theme.spacing(60),
            aspectRatio: 1,
            alignItems: 'center'
        }}>
            <Grid container columnSpacing={0.2} rowSpacing={0.2}>
                {
                    table.map((item, index) => (
                        <Grid item xs = {12 / WORD_TABLE_SIZE} key = {'' + index}>
                            <div 
                                style = {{
                                    aspectRatio: 1,
                                    backgroundColor: selectCellColor(item),
                                    display: 'flex',justifyContent: 'center',alignItems: 'center'
                                }}>
                                {
                                    item != null &&
                                    <Typography variant = 'btnLabel' sx = {{color: 'white'}}>
                                        {item.char}
                                    </Typography>
                                }
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </div>  
    )
}


export default CharTable
