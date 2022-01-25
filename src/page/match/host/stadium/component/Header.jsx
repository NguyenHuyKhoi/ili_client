import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(1.5),
        paddingLeft: theme.spacing(16),
        paddingRight: theme.spacing(16)
    },
    dot: {
        height: theme.spacing(1.5),
        flex: 1,
        maxWidth: theme.spacing(20),
        marginLeft: theme.spacing(1.6),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',

    }
}))
const Header = (props) => {
    const classes = useStyles()
    const {timeTotal, time} = props
    //console.log("Time : ", time, timeTotal)
    return (
        <div className = {classes.container}>
            {
                Array.from(Array(timeTotal)).map((item, index) => (
                    <div className = {classes.dot}  
                        key = {'' + index}
                        style = {{backgroundColor: index < time ? theme.palette.success.main : theme.palette.warning.main}} />
                ))
            }
        </div>
    )
}

export default Header
