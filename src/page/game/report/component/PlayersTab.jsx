import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import PlayerDetailModal from './PlayerDetailModal';
import PlayersTable from './PlayersTable';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))



const PlayersTab = () => {
  const classes = useStyles()
  const [modal, setModal] = useState({})
  return (
    <div className = {classes.container}>
      <PlayersTable onClickRow = {() => setModal({state: 'player_detail'})}/>
      <PlayerDetailModal 
        open = {modal.state == 'player_detail'} 
        onClose = {() => setModal({})}/>
    </div>
  )
}
export default PlayersTab