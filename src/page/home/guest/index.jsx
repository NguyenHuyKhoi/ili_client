import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import React from 'react'
import GuestHeaderBar from '../../../component/HeaderBarGuest'
import HomeQuickNavCard from '../../../component/HomeQuickNavCard'
import background from '../../../asset/image/background.jpg'

import card_img_0 from '../../../asset/image/home_card_0.PNG'
import card_img_1 from '../../../asset/image/home_card_1.PNG'
import card_img_2 from '../../../asset/image/home_card_2.jpg'
import card_img_3 from '../../../asset/image/home_card_3.PNG'
import HeaderBar from '../../../component/HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
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
        title: 'Join with us...',
        description: 'With becoming an user, you can create and play multi games with others.',
        btnLabel : 'Join',
        link: '/signup',
        image: card_img_0
    },
    {
        title: 'Just be a member...',
        description: 'Click here to quickly navigate to login in page.',
        btnLabel : 'Enter',
        link: '/login',
        image: card_img_1
    },
    {
        title: 'Discover content...',
        description: 'You can view and enjoy shared contents in this platform .',
        btnLabel : 'Discover',
        link: '/discover/search',
        image: card_img_2
    },
    {
        title: 'Play now...',
        description: 'Don\'t need to be a member, play as guest.',
        btnLabel : 'Play',
        link: '/match/player/entrance',
        image: card_img_3
    },
]
const HomeGuestPage = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <HeaderBar/>
            <div className = {classes.body}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    {
                        cards.map((item, index) => (
                            <Grid item xs = {6} >
                                <HomeQuickNavCard item = {item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default HomeGuestPage
