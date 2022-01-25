import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/context'
import HeaderBarAuth from './HeaderBarAuth'
import HeaderBarGuest from './HeaderBarGuest'

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
