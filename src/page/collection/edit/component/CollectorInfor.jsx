import { Divider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import Button from '../../../../component/Button'
import { CollectionContext } from '../../../../context/collection/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        height: '100vh',
        flexDirection: 'column'
    },
    infors: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(0.5)
    },
    descEmpty: {
        height: 200,
        backgroundColor: theme.palette.background.main,
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
            <Typography variant = 'bigLabel' sx = {{color: '#000', p: theme.spacing(1.5), alignSelf: 'center'}}>
                 Description
            </Typography>
            <Divider/>
            {
                description == null || description == '' ? 
                    <Typography variant= 'btnLabel' sx = {{color: '#000', textAlign: 'center'}}>
                        Please add a description of your collection.
                    </Typography>
                :
                <Typography variant= 'btnLabel' sx = {{p: theme.spacing(1.5)}}>
                {
                    description
                }
                </Typography>
            }
          
            <Button 
                variant = 'primary' 
                size = 'small'
                style = {{alignSelf: 'center',marginTop : theme.spacing(2), width: theme.spacing(20)}}
                onClick = {() => {
                    if (props.onSetting) props.onSetting()
                }}
                label = 'Edit'/>
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
