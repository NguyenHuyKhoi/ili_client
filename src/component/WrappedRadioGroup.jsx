import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../theme'
const WrappedRadioGroup = (props) => {
    const {title, list, value, disable} = props
    if (disable == null) disable = false
    const handleChange = (value) => {
        console.log("change value :", value)
        if (disable) return
        if (props.onChange) {
            props.onChange(value)
        }
    }
    return (
        <FormControl fullWidth>
           <Typography variant = 'btnLabel' 
                sx= {{color: '#000', mt: theme.spacing(2), alignSelf: 'center'}} >
                {title}
            </Typography>
            <RadioGroup
                aria-label="gender"
                value = {value}
                name="radio-buttons-group"
                sx = {{display: 'flex',flexDirection: 'row', justifyContent: 'space-around'}}
                onChange={(e) => handleChange(e.target.value)}
            >
                {
                    list.map((item, index) => (
                        <FormControlLabel value={item.value} control={<Radio />} label={item.label} 
                            checked = {value ===item.value}
                            key = {''+index}
                            
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default WrappedRadioGroup
