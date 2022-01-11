import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth/context'
import HeaderBarAuth from './HeaderBarAuth'
import HeaderBarGuest from './HeaderBarGuest'
const useStyles = makeStyles((theme) => ({

}))
const HeaderBar = (props) => {
    const {user} = useContext(AuthContext)

    const {selectedIndex} = props
    return (
        <div> 
            {
                user ?
                <HeaderBarAuth selectedIndex = {selectedIndex}/>
                :
                <HeaderBarGuest  selectedIndex = {selectedIndex}/>
            }
        </div>
    )
}

export default HeaderBar
