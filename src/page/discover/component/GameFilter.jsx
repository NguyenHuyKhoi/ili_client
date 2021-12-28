import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownSelect from '../../../component/DropdownSelect'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    searchInput: {
        padding: theme.spacing(2),
        width: '70%',
        alignSelf: 'center'
    },
    filters: {
        display: 'flex',
        width: '60%',
        alignSelf: 'center',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filter: {
        width: 300,
        marginRight: theme.spacing(2)
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
                <TextField
                    id="standard-search"
                    label="Search ..."
                    type="search"
                    variant="standard"
                    sx = {{width: '100%'}}
                    />
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
