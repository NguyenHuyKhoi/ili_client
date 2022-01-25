import { Grid, Typography } from '@mui/material'
import React from 'react'
import { WORD_TABLE_SIZE } from '../../../../../context/game/creator/context'
import { theme } from '../../../../../theme'

const CharTable = (props) => {
    var {table, open_word_states, correct_answers, showAll} = props 

    const selectCellColor = (item) => {
        if (showAll) return item.color
        if (item ===  null || item.wordParent ===  undefined) {
            return '#cddcdc'
        }
        var idx = correct_answers.findIndex((answer) => item.wordParent ===  answer)
        if (idx ===  -1 || open_word_states[idx] ===  0) {
            return '#cddcdc'
        }
        return item.color
    }
    return (
         <div style = {{
            width: theme.spacing(60),
            height: theme.spacing(60),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Grid container columnSpacing={0.2} rowSpacing={0.2}>
                {
                    table.map((item, index) => (
                        <Grid item xs = {12 / WORD_TABLE_SIZE} key = {'' + index}>
                            <div 
                                style = {{
                                    height: theme.spacing(4.5),
                                    backgroundColor: selectCellColor(item),
                                    display: 'flex',justifyContent: 'center',alignItems: 'center'
                                }}>
                                {
                                    item != null &&
                                    <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
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
