import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState} from 'react';
import { Tabs } from '../../../game/library/component/GameList';
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
    "https://image.freepik.com/free-photo/chinese-new-year-still-life-tiger-celebration_23-2149210715.jpg",
    "https://image.freepik.com/free-photo/neon-frame-surrounded-by-balloons-color-year-2022_23-2149217418.jpg" ,
    "https://image.freepik.com/free-vector/2022-tiger-year-greeting-card_317396-1413.jpg" ,
    "https://image.freepik.com/free-vector/2022-tiger-year-greeting-card_317396-1413.jpg" ,
    "https://image.freepik.com/free-vector/2022-tiger-year-greeting-card_317396-1413.jpg" ,
];

const TemplateSlider = (props) => {
	const classes = useStyles()
    const [index, setIndex] = useState(0)
	return (
        <div className = {classes.container}>
            <img src = {images[index]}
                resizeMode = 'contain'
                className = {classes.img}/>
            <div className = {classes.screens}>
                <Tabs tabs = {['Lobby', 'Round', 'Round end', 'Leaderboard', 'Game end']}/>
            </div>
          
        </div>
	);
}

export default TemplateSlider