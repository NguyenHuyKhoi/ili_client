import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position: 'relative'
    },
    img: {
        width: '100%',
        maxHeight: 200
    }
}))

const MediaUploadCard = (props) => {
    const classes = useStyles()
    const {src} = props
    //console.log('src :', src)
    const handleSelectImage = (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0]
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
                src == undefined? 
                <>
                <Button variant='contained' size = 'large' color="primary" aria-label="upload picture"
                component="label">
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange= {handleSelectImage}
                        hidden
                    />
                </Button>
                <Typography variant='h6' sx = {{fontWeight: 'bold', mt: theme.spacing(3)}} >Upload a image</Typography>
                </>
                :
                <>
                    <img src = {src} className = {classes.img}/>
                    <Button variant = 'contained'
                        onClick = {handleRemoveImage}
                        sx = {{
                            position: 'absolute', 
                            bottom: 10,
                            right: 10
                        }}>
                        Remove
                    </Button>
                </>
            }
         
        </div>
    )
}

export default MediaUploadCard
