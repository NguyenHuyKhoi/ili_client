import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectMatch } from '../../../../context/match/other/actions'
import { MatchContext } from '../../../../context/match/other/context'
import { createUrl, printDate } from '../../../../util/helper'
import youtube_icon from '../../../../asset/image/youtube_icon.png'
import facebook_icon from '../../../../asset/image/facebook_icon.png'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        border: 'solid 1px #000000',
        borderRadius: '255px 5px 225px 5px/5px 225px 5px 255px',
        padding: theme.spacing(0.5),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    left: {
        position: 'relative'
    },
    img: {
        aspectRatio: 1.6,
        width: 180,
        objectFit: 'center'
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightTop: {
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1.5)
    },
    rightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.neutral.main,
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(2)
    },
    questionNums: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.6),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 99
    }
}))

export const MatchRowItem = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(MatchContext)
    const {match} = props
    const {game, host, livestream} = match
    const {title, cover, questions} = game

    // Replate with match.mode = classic : livestream
    const mode = match.livestream == null ? 'classic' : 'livestream'
    const date = printDate(new Date(match.finishAt))
	const playerNums = match.players.length

    const handleViewDetail = () => {
		dispatch(selectMatch(match))
		return navigate('/match/detail/'+match._id, {replace: false})
    }

    return (
        <div className = {classes.container} style={{backgroundColor: '#fff'}}
            onClick={handleViewDetail}>
            <div className = {classes.left}>
                <img className = {classes.img} 
                    alt = 'Cover'
                    src = {createUrl(cover)}/>
                <div className = {classes.questionNums}>
                    <Typography variant = 'caption' 
                        sx = {{color: 'white', fontWeight: 'bold'}}> {playerNums} players </Typography>
                </div>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'btnLabel' sx = {{color: '#000', flex: 1}}> 
                        {title + ' (' + questions.length + ' rounds)'}
                    </Typography>
                    {
                        livestream != null && 
                        <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <img src = {
                                livestream.platform == 'youtube' ? youtube_icon : 
                                livestream.platform == 'facebook' ? facebook_icon :
                                null}   
                                style = {{
                                    width: theme.spacing(4),
                                    height: theme.spacing(4),
                                    borderRadius: theme.spacing(2)
                                }}
                                alt = 'Platform'/>
                             <Typography variant = 'btnLabel' sx = {{color: '#000', ml: theme.spacing(1)}}> 
                                {livestream.type}
                            </Typography>
                        </div>
                    }
                      
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1}}>
                        {'Host: ' + host.name}
                    </Typography>
                    
                    <Typography variant = 'label' sx = {{color: '#000'}}>
                        {date}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default MatchRowItem