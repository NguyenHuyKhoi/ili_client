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
import { PlatformContext, PLATFORM_ACCOUNT_TYPES_ID } from '../../../../context/platform/context';
import { useEffect } from 'react';
import FacebookHelper from '../../../../context/platform/helper/facebook';
import SocialRowItem from './SocialRowItem';
import { selectSocial } from '../../../../context/platform/actions';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        height: '90vh',
    //    maxHeight: '560vh',
        overflow: 'auto',
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

const MatchStatus = (props) => {
	const classes = useStyles()
    const {match} = useContext(MatchPlayContext)
    const matchPlayDispatch = useContext(MatchPlayContext).dispatch
    const platformDispatch = useContext(PlatformContext).dispatch
    const { platform, social} = useContext(PlatformContext)

    const {token} = useContext(AuthContext)
    const {game, players} = match 
    const {questions} = game
    const [index, setIndex] = useState(0)
    const [tabs, setTabs] = useState(['Round', 'Player']);
    const [socialList, setSocialList] = useState([]);

    useEffect(() => {
        const updateSocials = async () => {
            var list = []
            switch (platform.id) {
                case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_PAGE:
                    setTabs(['Round','Player','Pages'])
                    list = await FacebookHelper.getPages(platform)
                    setSocialList(list)
                    break
                case PLATFORM_ACCOUNT_TYPES_ID.FB_LIVESTREAM_GROUP:
                    setTabs(['Round','Player','Groups'])
                    list = await FacebookHelper.getGroups(platform)
                    setSocialList(list)
                    break
                default:
                    setTabs(['Round','Player'])
                    setSocialList([])
            }
        }
        if (platform != null) {
            updateSocials()
        }


        return () => {
        };
    }, [platform]);
    


    const handleUpdateMatch = () => {
        if (match._id === undefined) {
            console.log("Match not created ,emit")
            return
        }

        axios.get('match/detail/' + match._id, {
            headers: {
                'x-access-token': token
            }
        })    
        .then ((res) => {
            matchPlayDispatch(updateMatch(res.data))
        })
        .catch((err) => {
            console.log('Get detail match error:', err)
        })
    }

    const handleSelectQuestion = (question) => {
        console.log("Handle select question")
        matchPlayDispatch(viewQuestion(question))
        if (props.onSelectQuestion) props.onSelectQuestion()
    }

    const handleSelectPlayer = (player) => {
        console.log("Handle select player")
    }

    const handleSelectTab = (index) => {
        setIndex(index)
        handleUpdateMatch()
    }

    const handleSelectSocial = (social) => {
        console.log("Select social", social);
        platformDispatch(selectSocial(social))
    }
    console.log("Select social: ", socialList.length);
	return (
        <div className = {classes.container}>
            <div className = {classes.tabs}>
                <Tabbar 
                    tabs = {tabs} 
                    selectedIndex = {index}
                    onClickTab = {(index) => handleSelectTab(index)}/>
            </div>

            <div className = {classes.list}>
                {
                    index === 0 && questions !== undefined && 
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
                    index === 1 &&  players !== undefined &&
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
                    index === 2 && socialList.length > 0 &&
                    socialList.map((item, index) => (
                            <div className = {classes.item} key = {'' + index}>
                               <SocialRowItem 
                                    social = {item} 
                                    index = {index}
                                    isSelected = {social != null && social.id === item.id}
                                    onSelect = {() => handleSelectSocial(item)}/>
                            </div>
                        ))
                }
                {
                    index===2 && socialList.length === 0 &&
                    <Typography variant='btnLabel' sx = {{color: '#000', m: theme.spacing(2), textAlign: 'center'}}>
                        {`You have not any ${tabs[2]}. Please create one or choose another account.`}
                    </Typography>
                }
                {
                    index === 1 &&  players === undefined &&
                        <Typography variant = 'btnLabel' sx = {{color: '#000', textAlign: 'center', mt: theme.spacing(3)}}>
                            Livestream is not started or none player join .
                        </Typography>
                }
            </div>  
          
        </div>
	);
}

export default MatchStatus