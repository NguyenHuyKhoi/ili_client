import React from 'react'
import {makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#032585'
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
