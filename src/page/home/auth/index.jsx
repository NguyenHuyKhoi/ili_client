import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import card_img_0 from '../../../asset/image/home_card_0.PNG'
import card_img_1 from '../../../asset/image/home_card_1.PNG'
import card_img_2 from '../../../asset/image/home_card_2.jpg'
import card_img_3 from '../../../asset/image/home_card_3.PNG'
import HeaderBar from '../../../component/HeaderBar'
import HomeQuickNavCard from '../../../component/HomeQuickNavCard'
import { startCreateGame } from '../../../context/game/creator/actions'
import { GameCreatorContext, sample_game } from '../../../context/game/creator/context'
import { initQuestions } from '../../../context/question/creator/actions'
import { QuestionCreatorContext, QUESTION_TYPES } from '../../../context/question/creator/context'
import { cloneQuestion } from '../../../context/question/creator/reducer'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh'
    },
    body: {
        // backgroundImage: `url(${background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat  : 'repeat',
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: theme.spacing(18),
        paddingRight: theme.spacing(18),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    }
}))

const cards = [
    {
        title: 'Create new game...',
        description: 'Create game with multi types of question...',
        btnLabel : 'Create',
        image: card_img_0
    },
    {
        title: 'Manage Resources',
        description: 'Manage your games, collections, ...',
        btnLabel : 'Go',
        link: '/game/library',
        image: card_img_3
    },
    {
        title: 'Join game',
        description: 'Join game as member, see history when games ended.',
        btnLabel : 'Join',
        link: '/match/player/entrance',
        image: card_img_1
    },
    {
        title: 'Discover content...',
        description: 'You can view and enjoy shared contents in this platform .',
        btnLabel : 'Discover',
        link: '/game/search',
        image: card_img_2
    },
   
]
const HomePage = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const gameCreatorDispatch = useContext(GameCreatorContext).dispatch
    const questionCreatorDispatch = useContext(QuestionCreatorContext).dispatch
    const handleCreate = () => {
        gameCreatorDispatch(startCreateGame())
        questionCreatorDispatch(initQuestions([cloneQuestion(QUESTION_TYPES[0].sample)]))
        setTimeout(() => {
            return navigate('/game/creator',{replace: true})
        }, 1000)
        
    }
    const handleClickItem = (index) => {
        if (index == 0) {
            handleCreate()
        }
        else if (index == 2) {

        }
    }
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {0}/>
            <div className = {classes.body}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    {
                        cards.map((item, index) => (
                            <Grid item xs = {6} key = {'' + index} >
                                <HomeQuickNavCard item = {item}
                                    onClick = {() => handleClickItem(index)} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default HomePage
