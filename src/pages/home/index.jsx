import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    container: {
    }
}))

const HomePage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            Hello world
        </div>
    )
}

export default HomePage
