import { makeStyles } from '@mui/styles';
import React, { useState, useContext } from 'react';
import { MatchContext } from '../../../../context/match/other/context';
import QuestionDetailModal from './QuestionDetailModal';
import QuestionsTable from './QuestionsTable';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        paddingTop: theme.spacing(3)
    }
}))



const QuestionsTab = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    const {match} = useContext(MatchContext)
  
    const [index, setIndex] = useState(0)
    const handleViewQuestion =  (index) => {
      setIndex(index)
      setModal({state: 'question_detail'})
    }
    return (
      <div className = {classes.container}>
        <QuestionsTable onClickRow = {handleViewQuestion}
          match = {match}/>
        <QuestionDetailModal 
          open = {modal.state == 'question_detail'} 
          match = {match}
          index = {index}
          onClose = {() => setModal({})}/>
      </div>
    )
}
export default QuestionsTab