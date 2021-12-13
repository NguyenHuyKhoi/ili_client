import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FiltersPopover from './FiltersPopover'

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: 100,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column'
    },
}))


const GameFilter = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const handleSearch = () => {
        navigate('/discover/search', {replace: false})
    }
    return (
        <div className = {classes.container} onClick={handleSearch}>
            <FiltersPopover/>
        </div>
    )
}

export default GameFilter
