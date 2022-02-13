import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import EmptyBox from '../../../../component/EmptyBox'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
import CollectionSlideItem from './CollectionSlideItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display: 'flex',
        flexDirection:'column'
    },
    item: {
        marginBottom: theme.spacing(2)
    }
}))



const CollectionList = () => {
    const classes = useStyles()
    const {collections} = useContext(CollectionContext)
    let nonEmptyCollections = collections.filter((item) => item.games.length > 0)
    return (
        <div className = {classes.container}>
            {
                nonEmptyCollections.length===0? 
                    <EmptyBox label = "This user don't has any collection..."
                        style = {{width: '85%', alignSelf: 'center', marginTop: theme.spacing(3)}}/>
                    :
                    nonEmptyCollections.map((item, index) => (
                        <div className = {classes.item}   key = {''+index}>
                            <CollectionSlideItem collection = {item}/>
                        </div>
                    ))
            }

        </div>
    )
}

export default CollectionList
