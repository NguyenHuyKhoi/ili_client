import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    tags: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: theme.spacing(2),
        flexFlow: 'wrap'
        //overflow: 'auto'
    },
    tagContainer: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}))

const Tag = (props) => {
    const classes = useStyles()
    const {label, selected} = props 
    const limitLabel = label != null? label.substring(0, 16) + '...' : 'Question'
     
    return (
        <div 
            style = {{
                backgroundColor: selected ? '#1368CE' : 'white',
                boxShadow: '1px 3px 3px #f2f2f2',
                padding: theme.spacing(0.5),
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
                borderRadius: theme.spacing(1)
            }}
            onClick = {() => {
                if (props.onSelect) props.onSelect()
            }} 
        >
            <Typography variant='subtitle1' sx = {{color: selected? 'white' : '#333333', fontWeight: 'bold'}}>
                {limitLabel}
            </Typography>
 
        </div>
    )
}

const CollectionFilter = (props) => {
    const classes = useStyles()
    const {collections} = props
    const [selectedTags, setSelectedTags] = useState([])
    
    const handleSelect = (index) => {
        let pos = selectedTags.indexOf(index) 
        if (pos == -1) {
            setSelectedTags([...selectedTags, index])
        }
        else {
            selectedTags.splice(pos, 1)
            setSelectedTags([...selectedTags])
        }
    }
    return (
        <div className = {classes.container}>
            <Typography variant = 'subtitle2' sx = {{color: '#5f5f5f'}}>
                Filter: 
            </Typography>
            <div className = {classes.tags}>
                {

                    collections.map((item, index) => (
                        <div className = {classes.tagContainer}   key = {''+index}>
                            <Tag label={item.title} selected = {selectedTags.indexOf(index) != -1}
                                onSelect = {() => handleSelect(index)}/>
                        </div>
                    ))
                }
            </div>
        </div>
          
    )
}

export default CollectionFilter
