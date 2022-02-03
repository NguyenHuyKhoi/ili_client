import { makeStyles } from '@mui/styles'
import React from 'react'
import  MatchRowItem  from './MatchRowItem'
import EmptyBox from '../../../../component/EmptyBox'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection:'column',
    },
    list: {
        display:'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(4),
        display:'flex',
        flexDirection:'column'
    },
    emptyContainer: {
        display: 'flex',
        height: '70vh',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        border: '1px dashed gray'
    },
    emptyImg: {
        width: theme.spacing(20),
        aspectRatio: 1.6
    }
}))


const MatchList = (props) => {
    const classes = useStyles()
    const {matches} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                matches.length ===0 ? 
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " You have not join/host any match..."
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                matches.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <MatchRowItem match = {item}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MatchList
