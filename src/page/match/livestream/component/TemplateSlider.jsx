import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';

import waiting_template from '../../../../asset/image/game_template/waiting.png'
import question_template from '../../../../asset/image/game_template/question.png'
import question_end_template from '../../../../asset/image/game_template/question_end.png'
import leader_board_template from '../../../../asset/image/game_template/leader_board.png'
import complete_template from '../../../../asset/image/game_template/complete.png'
import Tabbar from '../../../../component/Tabbar';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '90%',
        height: '80%',
        margin: 0
    },
    screens: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(7),
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    screen: {
        border: '1px solid gray',
        borderRadius:theme.spacing(0.6),
        padding: theme.spacing(0.8),
        marginRight: theme.spacing(1)
    }

}))
const images = [
    waiting_template,
    question_template,
    question_end_template,
    leader_board_template,
    complete_template
];

const TemplateSlider = (props) => {
	const classes = useStyles()
    const [index, setIndex] = useState(0)
	return (
        <div className = {classes.container}>
            <img src = {images[index]}
                className = {classes.img}/>
            <div className = {classes.screens}>
                <Tabbar tabs = {['Lobby', 'Round', 'Round end', 'Leaderboard', 'Game end']}
                    onClickTab = {setIndex}/>
            </div>
          
        </div>
	);
}

export default TemplateSlider