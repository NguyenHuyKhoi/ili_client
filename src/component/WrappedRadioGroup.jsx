import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
}))

const WrappedRadioGroup = (props) => {
    const classes = useStyles()
    const {title, list, value} = props
    const handleChange = (value) => {
        console.log("change value :", value)
        if (props.onChange) {
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
                onChange={(e) => handleChange(e.target.value)}
            >
                {
                    list.map((item, index) => (
                        <FormControlLabel value={item.value} control={<Radio />} label={item.label} 
                            checked = {value == item.value}
                            key = {''+index}
                            
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default WrappedRadioGroup
