import { makeStyles } from '@mui/styles';
import React, { useState, useContext } from 'react';
import { MatchContext } from '../../../../context/match/other/context';
import PlayerDetailModal from './PlayerDetailModal';
import PlayersTable from './PlayersTable';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        paddingTop: theme.spacing(3)
    }
}))



const PlayersTab = () => {
  const classes = useStyles()
  const {match} = useContext(MatchContext)
  const [modal, setModal] = useState({})

  const [index, setIndex] = useState(0)
  const handleViewPlayer =  (index) => {
    setIndex(index)
    setModal({state: 'player_detail'})
  }
  return (
    <div className = {classes.container}>
      <PlayersTable 
        onClickRow = {handleViewPlayer}
        match = {match}/>
      <PlayerDetailModal 
        match = {match}
        open = {modal.state == 'player_detail'} 
        index = {index}
        onClose = {() => setModal({})}/>
    </div>
  )
}
export default PlayersTab