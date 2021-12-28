import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import { AuthContext } from '../../../context/auth/context'
import { getMatchesSuccess } from '../../../context/match/other/actions'
import { MatchContext } from '../../../context/match/other/context'
import MatchTable from './component/MatchTable'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        padding: theme.spacing(10),
        backgroundColor: '#f2f2f2',
        height: '100vh'
    }
}))

const DashboardReportPage = () => {
    const classes = useStyles()

    const {token} = useContext(AuthContext)
    const {dispatch} = useContext(MatchContext)
    useEffect(() => {
        axios.get('match/library', {
            headers: {
                'x-access-token': token
            }
        })
        .then ((res) => {
            console.log("Get matches: ", res.data)
            dispatch(getMatchesSuccess(res.data))
        })
        .catch((err) => {
            console.log("Error :", err.response.data)
        })
        return () => {
            
        }
    }, [])
    return (
        <div className = {classes.container}>
            <HeaderBar selectedIndex = {3}/>
            <div className= {classes.body}>
                <MatchTable />
            </div>
          
        </div>
    )
}

export default DashboardReportPage
