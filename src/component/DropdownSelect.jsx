import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
}))

const DropdownSelect = (props) => {
    const classes = useStyles()
    const {title, list, value, color, size} = props
    const handleChange = (e) => {
        let value = e.target.value
        if (props.onChange) {
            props.onChange(value)
        }
    }

    if (size == undefined) size = 'medium'
    console.log("Color: ", color)

    var fontSize = size == 'small'? 16 :
        size == 'medium' ? 20 :
         24
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"
                sx = {{
                    fontSize,
                    color: '#000'}}>
                {
                    title
                }
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value == null ?'':value}
                defaultValue={''}
                size = 'small'
                label="Age"
                onChange={handleChange}
                style = {{
                    fontSize,
                    color
                }}>
                {
                    list != undefined &&
                    list.map((item, index) => (
                        <MenuItem 
                            value={item.value}  key = {''+index} 
                            style = {{fontColor: color ? color : '#000', 
                                fontSize
                            }}>
                            {item.label }
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default DropdownSelect
