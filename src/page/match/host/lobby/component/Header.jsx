import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { MatchPlayContext } from '../../../../../context/match/play/context'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1.5)
    },
    pinContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(60),
        backgroundColor: theme.palette.success.main,
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        padding: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    center: {
        alignSelf: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))
export const Header = (props) => {
    const classes = useStyles()
    const {match} = useContext(MatchPlayContext)
    const {pinCode} = match
    return (
        <div className = {classes.container}>   
            <div/>

            <div className = {classes.center}>
                <div className = {classes.pinContainer}>
                    <Typography variant = 'btnLabel' sx  ={{ color: '#000'}}>
                        Game pin
                    </Typography>
                    <Typography variant = 'h1'  sx  ={{ color: '#000', fontWeight: 'semi-bold', alignSelf: 'center'}}> 
                        {
                            pinCode == null ? 'XXXXXX' : pinCode
                        }
                    </Typography>
                </div>     
            </div>

            <div/>
            
           
        </div>
    )
}

export default Header
