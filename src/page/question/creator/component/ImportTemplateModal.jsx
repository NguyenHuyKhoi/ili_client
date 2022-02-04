import { Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useRef, useState } from 'react';
import Button from '../../../../component/Button';
import IconButton from '../../../../component/IconButton';
import { addQuestionsFromTemplate } from '../../../../context/question/creator/actions';
import { QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../../context/question/creator/context';
import { readQuestionTemplate } from '../../../../context/question/helper/xlsx';
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '40vw',
		height: '50vh',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		flexDirection: 'column',
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		padding: theme.spacing(3)
    }
}))


const ImportTemplateModal = (props) => {
	const classes = useStyles()
	const {dispatch} = useContext(QuestionCreatorContext);
	const [index, setIndex] = useState(0);
	const [xlsxFile, setXlsxFile] = useState(null);
	const inputFile = useRef(null) 
	var {open} = props
	if (open == undefined) open = false
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}


	const handleUploadTemplate = async () => {
		if (xlsxFile == null) return 
		var questions = await readQuestionTemplate(xlsxFile)
		questions.forEach((question) => {
			if (question.typeId == QUESTION_TYPES_ID.WORD_TABLE) {
				
			}
		})

		dispatch(addQuestionsFromTemplate(questions))
		setXlsxFile(null)
		handleClose()

	}

	const handleImportTemplate = async  (e) => {
		if (e.target.files.length > 0) {
            let file = e.target.files[0]
            setXlsxFile(file)
			console.log("Import File :", file);

			setTimeout(() => {
				e.target.value = null;
			}, 2000)
        }
	}

	const handleDeleteTemplate = () => {
		console.log("Delete template");
		setXlsxFile(null)
		
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
				<Typography variant = 'btnLabel' sx = {{color: '#000', alignSelf: 'center', mt: theme.spacing(5)}}>
					1. <a href='/files/import_questions.xlsx' download>Download the template </a>
				</Typography>
				<Typography variant = 'btnLabel' sx = {{color: '#000', alignSelf: 'center', mt: theme.spacing(2)}}>
					2. Fill it and save as .xlsx
				</Typography>
				<Typography variant = 'btnLabel' sx = {{color: '#000', alignSelf: 'center', mt: theme.spacing(2)}}>
					3. Upload file here.
				</Typography>
				{
					xlsxFile == null ?
					<Button
						variant = 'primary'
						label = 'Import'
						onClick = {() => inputFile.current.click()}
						size = 'small'
						style = {{width: theme.spacing(16), alignSelf: 'center', marginTop: theme.spacing(2)}}/>
					: 
					<div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%',
						marginTop: theme.spacing(2),
						alignSelf: 'center',
						justifyContent: 'space-evenly'}}>
						<Typography variant = 'label' sx = {{color: '#000'}}>
							{xlsxFile.name}
						</Typography>
						<IconButton 
							icon = 'Delete'
							size = 'small'
							variant = 'error'
							onClick = {handleDeleteTemplate}/>
					</div>
				}

  				<input
                    ref={inputFile}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange= {handleImportTemplate}
                    hidden
                        
                />
				<div style = {{display: 'flex',width: '80%', alignSelf: 'center',marginTop: theme.spacing(3),
					 flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
					<Button
						variant = 'warning'
						label = 'Cancel'
						onClick = {handleClose}
						size = 'small'
						style = {{width: theme.spacing(16)}}/>
					<Button
						variant ={xlsxFile == null ? 'warning': 'success'}
						
						label = 'Upload'
						onClick = {handleUploadTemplate}
						size = 'small'
						style = {{width: theme.spacing(16)}}/>
				</div>
			</div>
		</Modal>
	);
}

export default ImportTemplateModal