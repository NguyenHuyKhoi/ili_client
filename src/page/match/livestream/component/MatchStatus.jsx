import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState, useContext} from 'react';
import {MatchPlayContext} from '../../../../context/match/play/context'
import QuestionRowItem from './QuestionRowItem';
import { updateMatch, viewQuestion } from '../../../../context/match/play/actions';
import PlayerRowItem from './PlayerRowItem';
import Tabbar from '../../../../component/Tabbar';
import { theme } from '../../../../theme';
import axios from 'axios';
import { AuthContext } from '../../../../context/auth/context';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: theme.spacing(2)
    },
    tabs: {

    },
    question: {
        display: 'flex', 
        flexDirection: 'row',
        padding: 1,
        borderRadius: theme.spacing(1),
        backgroundColor: '#f2f2f2',
        boxShadow: '1px 3px 1px #f2f2f2',
        backgroundColor: 'blue'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',

    },
    item: {
        marginTop: theme.spacing(3)
    }

}))

const QuestionCard = (props) => {
    const classes = useStyles()
    const {question} = props 
    const {title, index} = question
    console.log("Questions", question)
	return (
        <div className = {classes.question}>
            <Typography variant = 'subtitle2'>
                {index + '. ' + title}
            </Typography>
          
        </div>
	);
}
const MatchStatus = (props) => {
	const classes = useStyles()
    const {dispatch, match} = useContext(MatchPlayContext)
    const {token} = useContext(AuthContext)
    const {game, players} = match 
    const {questions} = game
    const [index, setIndex] = useState(0)

    const handleUpdateMatch = () => {
        if (match._id == undefined) {
            console.log("Match not created ,emit")
            return
        }

        axios.get('match/detail/' + match._id, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            dispatch(updateMatch(res.data))
        })
        .catch((err) => {
            console.log('Get detail match error:', err)
        })
    }

    const handleSelectQuestion = (question) => {
        console.log("Handle select question")
        dispatch(viewQuestion(question))
        if (props.onSelectQuestion) props.onSelectQuestion()
    }

    const handleSelectPlayer = (player) => {
        console.log("Handle select player")
    }

    const handleSelectTab = (index) => {
        setIndex(index)
        handleUpdateMatch()
    }
	return (
        <div className = {classes.container}>
            <div className = {classes.tabs}>
                <Tabbar tabs = {['Rounds', 'Players']} onClickTab = {(index) => handleSelectTab(index)}/>
            </div>

            <div className = {classes.list}>
                {
                    index==0 && questions != undefined && 
                    questions.map((item, index) => (
                        <div className = {classes.item} key = {'' + index}>
                           <QuestionRowItem 
                                question = {item} 
                                index = {index}
                                onSelect = {() => handleSelectQuestion(item)}/>
                        </div>
                    ))
                }
                {
                    index==1 &&  players != undefined &&
                        players.map((item, index) => (
                            <div className = {classes.item} key = {'' + index}>
                               <PlayerRowItem 
                                    player = {item} 
                                    index = {index}
                                    onSelect = {() => handleSelectPlayer(item)}/>
                            </div>
                        ))
                }
                {
                    index==1 &&  players == undefined &&
                        <Typography variant = 'btnLabel' sx = {{color: '#000', textAlign: 'center', mt: theme.spacing(3)}}>
                            Livestream is not started or none player join .
                        </Typography>
                }
            </div>  
          
        </div>
	);
}

export default MatchStatus