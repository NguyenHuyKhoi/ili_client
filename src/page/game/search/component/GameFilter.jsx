import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import DropdownSelect from '../../../../component/DropdownSelect'
import MultiSelect from '../../../../component/MultiSelect'
import TextField from '../../../../component/TextField'
import { GAME_SUBJECTS } from '../../../../context/game/creator/context'
import { getGamesSuccess } from '../../../../context/game/other/actions'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'


const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    inputs: {
        display: 'flex',
        flex: 1, 
        flexDirection: 'column'
    },
   
}))


const GameFilter = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const {dispatch} = useContext(GameContext)
    const [filter, setFilter] = useState({keyword: '', subjects: [], question_ranges: []})

    const handleSearch = () => {
        var params = {}
        if (keyword != '') {
            params.keyword = keyword
        }
        if (subjects.length > 0) {
            params.subjects = subjects.join(',')
        }
        if (question_ranges.length > 0) {
            params.question_ranges = question_ranges.join(',')
        }
        console.log("Params: ", params)
        
        if (props.onSearch) props.onSearch(params)
    }

    const handleChange = (key, value) => {
        setFilter({
            ...JSON.parse(JSON.stringify(filter)),
            [key]: value
        })
    }
    const {keyword, subjects, question_ranges} = filter
    return (
        <div className = {classes.container}>
            <div className = {classes.inputs}>
                <TextField 	
                    placeholder='Enter  keyword ...'	
                    value = {keyword} 
                    fontSize = {22}
                    size='small'
                    onChange = {(value) => handleChange('keyword',value)} 
                    style = {{marginTop: theme.spacing(5)}}/>
                <MultiSelect
                    label = 'Subject'
                    selects = {subjects}
                    list = {GAME_SUBJECTS}
                    onChange = {(selects) => handleChange('subjects',selects)}
                    style = {{marginTop: theme.spacing(3)}}/>
                <MultiSelect
                    label = 'Questions'
                    selects = {question_ranges}
                    list = {[
                        {label : '<5', value: '0-4'},
                        {label : '5-10', value: '5-10'},
                        {label : '10-20', value: '10-20'},
                        {label : '>20', value: '21-100'},
                    ]}
                    onChange = {(selects) => handleChange('question_ranges',selects)}
                    style = {{marginTop: theme.spacing(3)}}/>
            </div>
            

            <Button 
                variant = 'success'
                label = 'Search'
                size = 'small' 
                onClick = {handleSearch}
                style = {{
                    width: theme.spacing(20), alignSelf: 'center',
                    marginTop: theme.spacing(10)
                }}/>
        </div>
    )
}

export default GameFilter
