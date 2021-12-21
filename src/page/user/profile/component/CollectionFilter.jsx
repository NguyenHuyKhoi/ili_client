import { Chip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    values: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: theme.spacing(2),
        flexFlow: 'wrap'
        //overflow: 'auto'
    },
    value: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))



const CollectionFilter = (props) => {
    const classes = useStyles()
    const {collections} = props
    return (
        <div className = {classes.container}>
            <Typography variant = 'subtitle2'>Filter</Typography>
            <div className = {classes.values}>
                {

                    collections.map((item, index) => (
                        <div className = {classes.value}   key = {''+index}>
                            <Chip label={item.title} />
                        </div>
                    ))
                }
            </div>
        </div>
          
    )
}

export default CollectionFilter
