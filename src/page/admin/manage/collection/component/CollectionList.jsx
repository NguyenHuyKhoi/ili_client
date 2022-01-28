import { makeStyles } from '@mui/styles'
import React from 'react'
import EmptyBox from '../../../../../component/EmptyBox'
import { theme } from '../../../../../theme'
import CollectionRowItem from '../../../../collection/component/CollectionRowItem'
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


const CollectionList = (props) => {
    const classes = useStyles()
    const {collections} = props
    return (
        <div className = {classes.container}>
            <div className = {classes.list} >
            {
                collections.length ===0 ? 
                <EmptyBox
                    style= {{width: '100%', marginTop: theme.spacing(5)}}
                    label = " You don't have yet any collections. Create one?"
                    onClick = {() => {
                        if (props.onClickEmpty) props.onClickEmpty()
                    }}/>
                :
                collections.map((item, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <CollectionRowItem collection = {item}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default CollectionList
