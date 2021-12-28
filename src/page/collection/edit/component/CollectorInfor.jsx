import { Button, Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    infors: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5)
    },
    descEmpty: {
        height: 200,
        backgroundColor: '#f2f2f2',
        margin: theme.spacing(1.5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
const InforsCard = (props) => {
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    const {description} = collection
    return (
        <div className= {classes.infors}>
            <Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333', p: theme.spacing(1.5)}}>
                 Description
            </Typography>
            <Divider/>
            {
                description == null || description == '' ? 
                <div className= {classes.descEmpty}>
                    <Typography variant= 'subtitl2' sx = {{color: '#5c5c5c'}}>
                        Please add a description of your collection.
                    </Typography>
                </div>
                :
                <Typography variant= 'subtitle1' sx = {{p: theme.spacing(1.5)}}>
                {
                    description
                }
                </Typography>
            }
          
            <Button variant = 'contained' 
                color= 'info'
                sx = {{alignSelf: 'center',mb: theme.spacing(2), fontWeight: 'bold', textTransform: 'none'}}
                onClick = {() => {
                    if (props.onSetting) props.onSetting()
                }}>
                Edit
            </Button>
        </div>
    )
}

const CollectorInfor = (props) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <InforsCard 
                onSetting = {() => {
                    if (props.onSetting) props.onSetting()
                }}/>
           
        </div>
    )
}

export default CollectorInfor
