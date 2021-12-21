import { Button, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import logo from '../../../../asset/image/logo.jpg'
import OwnerInfor from '../../../../component/OwnerInfor'
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
    }
}))
const InforsCard = (props) => {
    const classes = useStyles()
    const {collection} = useContext(CollectionContext)
    const {description} = collection
    return (
        <div className= {classes.infors}>
            <Typography variant = 'h6' sx = {{fontWeight: 'bold', p: theme.spacing(1.5)}}>
                 Description
            </Typography>
            <Divider/>
            <Typography variant= 'subtitle1' sx = {{p: theme.spacing(1.5)}}>
                {
                    description
                }
            </Typography>
            <Button variant = 'contained' 
                color= 'info'
                sx = {{alignSelf: 'center',mb: theme.spacing(2)}}
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
