import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
}))

const Checkboxes = (props) => {
    const classes = useStyles()
    const {title, list, value} = props
    const handleChange = (e) => {
        let value = e.target.value
        if (props.onChange) {
            console.log("OnChange :",value)
            props.onChange(value)
        }
    }
    return (
        <FormControl fullWidth>
           <Typography variant = 'subtitle1' 
                sx= {{fontWeight: 'bold', mt: theme.spacing(2)}} >
                {title}
            </Typography>
            <RadioGroup
                aria-label="gender"
                value = {value}
                name="radio-buttons-group"
                sx = {{display: 'flex',flexDirection: 'row'}}
                onChange={(e) => handleChange('visibility', e.target.value)}
            >
                {
                    list.map((item, index) => (
                        <FormControlLabel value={item.label} control={<Radio />} label={item.value} 
                            key = {''+index}
                            />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default Checkboxes
