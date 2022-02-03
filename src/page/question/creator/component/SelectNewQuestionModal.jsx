import { Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState, useEffect, useContext} from 'react';
import Tabbar from '../../../../component/Tabbar';
import QuestionList from './QuestionList';
import QuestionTypeList from './QuestionTypeList';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '55vw',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		padding: theme.spacing(3)
    },
	body: {
		maxHeight: '60vh',
		overflowY: 'auto'
	}
}))

const tabs = [
	{
		label: 'Empty question'
	},
	{
		label: 'From bank'
	}
]

const SelectNewQuestionModal = (props) => {
	const classes = useStyles()

	const [index, setIndex] = useState(0);
	var {open} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}


	const handleSelectTab = (index) => {
		setIndex(index)
	}

	const handleAddQuestion = (question) => {
		if (props.onAddQuestion) props.onAddQuestion(question)
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onBackdropClick = {handleClose}>
			<div className={classes.container}>
				<Typography variant = 'header' sx = {{color: '#000', alignSelf: 'center'}}>
					Add Questions 
				</Typography>
				<Tabbar 
					tabs = {tabs.map((item) => item.label)}
					selectedIndex = {index}
					onClickTab = {handleSelectTab}/>
				<div className = {classes.body}>
					{
						index == 0 ? 
							<QuestionTypeList onSelect = {(id) => {
								if (props.onSelectType) {
									props.onSelectType(id)
								}
							}}/>
							:
						index == 1 ? 
							<QuestionList onAddItem = {handleAddQuestion}/>
							:
							null

					}
				</div>
				
			</div>
		</Modal>
	);
}

export default SelectNewQuestionModal