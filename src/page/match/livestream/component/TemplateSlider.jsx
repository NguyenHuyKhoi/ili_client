import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import end_template from '../../../../asset/image/game_template/end.jpeg';
import leader_board_template from '../../../../asset/image/game_template/leader_board.jpeg';
import question_multiple_template from '../../../../asset/image/game_template/question_multiple.jpeg';
import question_multiple_end_template from '../../../../asset/image/game_template/question_multiple_end.jpeg';
import question_pic_word_template from '../../../../asset/image/game_template/question_pic_word.jpeg';
import question_pic_word_end_template from '../../../../asset/image/game_template/question_pic_word_end.jpeg';
import question_tf_template from '../../../../asset/image/game_template/question_tf.jpeg';
import question_tf_end_template from '../../../../asset/image/game_template/question_tf_end.jpeg';
import question_word_table_template from '../../../../asset/image/game_template/question_word_table.jpeg';
import question_word_table_end_template from '../../../../asset/image/game_template/question_word_table_end.jpeg';
import waiting_template from '../../../../asset/image/game_template/waiting.jpeg';
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
        flexDirection: 'column',
        alignItems:'center'
    },
    subscreens: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    screen: {
        border: '1px solid gray',
        borderRadius:theme.spacing(0.6),
        padding: theme.spacing(0.8),
        marginRight: theme.spacing(1)
    }

}))

var tabs = [
    {
        label: 'Lobby',
        img: waiting_template,
    },
    {
        label: 'Question',
        img: null,
        subs: [
            {
                label: 'Multiple',
                img: question_multiple_template
            },
            {
                label: 'True/false',
                img: question_tf_template
            },
            {
                label: '4 pic 1 word',
                img: question_pic_word_template
            },
            {
                label: 'Word table',
                img: question_word_table_template
            }
        ]
    },
    {
        label: 'Question End',
        img: null,
        subs: [
            {
                label: 'Multiple',
                img: question_multiple_end_template
            },
            {
                label: 'True/false',
                img: question_tf_end_template
            },
            {
                label: '4 pic 1 word',
                img: question_pic_word_end_template
            },
            {
                label: 'Word table',
                img: question_word_table_end_template
            }
        ]
    },
    {
        label: 'Leader board',
        img: leader_board_template
    },
    {
        label: 'End',
        img: end_template
    }
]

const TemplateSlider = (props) => {
	const classes = useStyles()
    const [index, setIndex] = useState(0)
    const [subtabs, setsubtabs] = useState(null);
    const [subIndex, setSubIndex] = useState(0);
    const handleSelectTab = (index) => {
        setIndex(index)
        if (tabs[index].subs !== undefined) {
            setsubtabs(tabs[index].subs)
            setSubIndex(0)
        }
        else {
            setsubtabs(null)
        }
    }

    const handleSelectSubTab = (index) => {
        setSubIndex(index)
    }
     
	return (
        <div className = {classes.container}>
            <img src = {subtabs == null ? tabs[index].img : subtabs[subIndex].img}
                alt = 'Template'
                className = {classes.img}/>
            <div className = {classes.screens}>
                <Tabbar 
                    tabs = {tabs.map((item) => item.label)}
                    selectedIndex = {index}
                    onClickTab = {handleSelectTab}/>
            </div>
            {
                subtabs !== null && subtabs !== undefined && 
                <div className = {classes.subscreens}>
                    <Tabbar     
                        size = 'small'
                        tabs = {subtabs.map((item) => item.label)}
                        selectedIndex = {subIndex}
                        onClickTab = {handleSelectSubTab}/>
                </div>
            }
          
        </div>
	);
}

export default TemplateSlider