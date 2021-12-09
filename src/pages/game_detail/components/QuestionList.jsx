import { Add, Check, ClassSharp, CropSquare, Square } from '@mui/icons-material'
import { AppBar, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import LabeledSelect from '../../../components/Select'
import { theme } from '../../../theme'
import { grey, blue } from '@mui/material/colors';
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        backgroundColor: grey[100],
        display: 'flex',
        flexDirection:'column',
    },
    questions: {
        display:'flex',
        flexDirection:'column'
    },
    questionContainer: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
    question: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    questionHeader: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: theme.spacing(5),
        position: 'relative'
    },
    questionInfor: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },
    questionImg: {
        height: '100%',
        width: 200,
    },
    questionTime: {
        position: 'absolute',
        bottom: theme.spacing(0.5),
        right: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'black',
        opacity: 0.8,
        zIndex: 99
    },
    answers: {
        flex:1,
        flexDirection: 'column'
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        border: '1px solid gray',
        height:7
    },
    img: {
        height:25,
        width:45,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    },
    header: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    answer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderTop: '0.5px solid gray'
    }
}))
const Answer = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.answer} >
            <Square sx = {{backgroundColor: 'red',fontSize: 15, color: 'white', p: theme.spacing(0.8), borderRadius: theme.spacing(0.5)}}/>
            <Typography sx = {{flex: 1, mx: theme.spacing(3)}} variant = 'subtitle2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci commodi impedit, nihil quo,
            </Typography>
            <Check  sx = {{ color: 'green'}}/>
        </div>
    )
}
const QuestionCard = (props) => {
    const classes = useStyles()
    const [isShow, setIsShow] = useState(false)
    const handleShowChange = () => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        setIsShow(props.isShowAll)
        return () => {
            //
        }
    }, [props.isShowAll])
    return (
        <div className = {classes.question} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <div className = {classes.questionHeader} onClick = {handleShowChange}>
              
                <div className = {classes.questionInfor}>
                    <Typography variant = 'subtitle1'>1 - Quiz</Typography>
                    <Typography variant = 'subtitle1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi, omnis debitis, distincti</Typography>
                </div>
                <img className = {classes.questionImg} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
                <div className = {classes.questionTime}>
                    <Typography variant = 'subtitle2' sx = {{color: 'white'}}> 30 sec</Typography>
                </div>
            </div>
            {
                (isShow) &&
                <div className = {classes.answers}>
                    {
                        Array.from(Array(4)).map((_, index) => (
                            <Answer/>
                        ))
                    }
                </div>
            }
           
        </div>
    )
}

const QuestionList = () => {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isShowAll, setIsShowAll] = useState(false)
    const handleShowAllChange = () => {
        setIsShowAll(!isShowAll)
    }

    return (
        <div className = {classes.container}>
            <div className = {classes.header}>
                <Typography variant = 'h6'>Question(15)</Typography>
                <div onClick = {handleShowAllChange}>
                    <Typography variant = 'h6' sx = {{textDecorationLine: 'underline'}}>
                        {
                            isShowAll?
                            'Hide Answers'
                            :
                            'Show Answers'
                        }
                    </Typography>
                </div>
           
           
            </div>
            <div className = {classes.questions} >
            {
                Array.from(Array(3)).map((_, index) => (
                    <div className = {classes.questionContainer}>
                        <QuestionCard isShowAll = {isShowAll}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default QuestionList
