import { Add } from '@mui/icons-material'
import { AppBar, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
}))

const LabeledSelect = () => {
    const classes = useStyles()
    const handleChange = (i) => {

    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Label</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export default LabeledSelect
