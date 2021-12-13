import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import QuestionDetailModal from './QuestionDetailModal';
import QuestionsTable from './QuestionsTable';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))



const QuestionsTab = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    return (
      <div className = {classes.container}>
        <QuestionsTable onClickRow = {() => setModal({state: 'question_detail'})}/>
        <QuestionDetailModal 
          open = {modal.state == 'question_detail'} 
          onClose = {() => setModal({})}/>
      </div>
    )
}
export default QuestionsTab