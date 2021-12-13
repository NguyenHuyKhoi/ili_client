import { Check, Square } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'gray'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: theme.spacing(5),
        position: 'relative'
    },
    infor: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        backgroundColor: 'white',
    },  
    time: {
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
const QuestionRowItem = (props) => {
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
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}>
            <div className = {classes.header} onClick = {handleShowChange}>
              
                <div className = {classes.infor}>
                    <Typography variant = 'subtitle1'>1 - Quiz</Typography>
                    <Typography variant = 'subtitle1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi, omnis debitis, distincti</Typography>
                </div>
                <img className = {classes.img} src = 'https://vnn-imgs-a1.vgcloud.vn/image-english.vov.vn/h500/uploaded/vn1pm7jlycly8uzveukg/2019_11_28/1_LDJZ.jpg'/>
                <div className = {classes.time}>
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
export default QuestionRowItem
