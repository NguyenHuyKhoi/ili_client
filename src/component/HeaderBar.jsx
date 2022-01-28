import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/context'
import HeaderBarAdmin from './HeaderBarAdmin'
import HeaderBarAuth from './HeaderBarAuth'
import HeaderBarGuest from './HeaderBarGuest'

const HeaderBar = (props) => {
    const {user} = useContext(AuthContext)

    const {selectedIndex} = props
    return (
        <div> 
            {
                user == null ?
                <HeaderBarGuest  selectedIndex = {selectedIndex}/>
                :
                user.isAdmin == false ?
                    <HeaderBarAuth selectedIndex = {selectedIndex}/>
                :
                    <HeaderBarAdmin selectedIndex = {selectedIndex}/>
                
            }
        </div>
    )
}

export default HeaderBar
