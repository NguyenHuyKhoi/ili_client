import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';
import { Tabs } from '../../../game/library/component/GameList';
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
    }

}))

const QuestionCard = (props) => {
    const classes = useStyles()
    const {question} = props 
    const {title, index} = question
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
    const [index, setIndex] = useState(0)
	return (
        <div className = {classes.container}>
            <div className = {classes.tabs}>
                <Tabs tabs = {['Rounds', 'Players']}/>
            </div>
          
        </div>
	);
}

export default MatchStatus