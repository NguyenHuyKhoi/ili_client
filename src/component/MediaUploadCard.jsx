import {Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, {useRef} from 'react'
import { theme } from '../theme'
import Button from './Button'
import { createUrl } from '../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(0.6),
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position: 'relative'
    },
    img: {
        width: '100%',
        maxHeight: '100%'
    }
}))

const MediaUploadCard = (props) => {
    const classes = useStyles()
    const {image, label} = props
    const inputFile = useRef(null) 
    //console.log('src :', src)
    const handleSelectImage = (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0]
            console.log("Select file: ", file)
            if (props.onSelectImage) {
                props.onSelectImage(file)
            }
        }
    }

    const handleRemoveImage = () => {
        if (props.onRemoveImage) {
            props.onRemoveImage()
        }
    }

    return (
        <div className = {classes.container}>
            {
                image == undefined? 
                <>
                <Button 
                    variant='primary' 
                    size = 'small'
                    component="label"
                    label = 'Select image'
                    onClick = {() => inputFile.current.click()}/>
                <input
                    ref={inputFile}
                    type="file"
                    accept="image/*"
                    onChange= {handleSelectImage}
                    hidden
                        
                />
                <Typography variant='bigLabel' sx = {{color: '#000', mt: theme.spacing(3)}} >
                    {label}
                </Typography>
                </>
                :
                <>
                    <img src = {createUrl(image)} className = {classes.img}/>
                    <Button 
                        variant = 'primary'
                        onClick = {handleRemoveImage}
                        size = 'small'
                        style = {{
                            color: '#000',
                            position: 'absolute', 
                            bottom: 10,
                            right: 10
                        }}
                        label = 'Remove'/>
                </>
            }
         
        </div>
    )
}

export default MediaUploadCard
