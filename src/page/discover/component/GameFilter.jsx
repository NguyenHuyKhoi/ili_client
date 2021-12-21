import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownSelect from '../../../component/DropdownSelect'
import TextField from '@mui/material/TextField'


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    searchInput: {
        padding: theme.spacing(3),
        width: '70%',
    },
    filters: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filter: {
        width: 300
    }
}))


const GameFilter = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const handleSearch = () => {
        if (props.onSearch) props.onSearch()
    }
    return (
        <div className = {classes.container} onClick={(handleSearch)}>
            <div className= {classes.searchInput}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" 
                    sx = {{width: '100%'}} />
            </div>
         
            <div className= {classes.filters} >
                <div className= {classes.filter}>
                    <DropdownSelect
                        title = { 'Subject'}
                        list = {[
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                    ]}/>  
                </div>
                <div className= {classes.filter}>
                    <DropdownSelect
                        title = { 'Subject'}
                        list = {[
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                    ]}/>  
                </div>
                <div className= {classes.filter}>
                    <DropdownSelect
                        title = { 'Subject'}
                        list = {[
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                    ]}/>  
                </div>
                <div className= {classes.filter}>
                    <DropdownSelect
                        title = { 'Subject'}
                        list = {[
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                            {label: 'Math', value: 'math'},
                    ]}/>  
                </div>
            </div>     
        </div>
    )
}

export default GameFilter
