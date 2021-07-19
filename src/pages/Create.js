import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import {FormHelperText, Input, InputLabel, makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {useHistory} from 'react-router-dom'
import SimpleMenu from "../components/ControlledOpenSelect";
import ControlledOpenSelect from "../components/ControlledOpenSelect";

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block'
	}
})

export default function Create() {
	const classes = useStyles()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [details, setDetails] = useState('')
	const [titleError, setTitleError] = useState(false)
	const [detailsError, setDetailsError] = useState(false)
	const [importanceError, setImportanceError] = useState(false)
	const [category, setCategory] = useState('money')
	const [importance, setImportance] = useState("")
	const importanceOptions = [
			{value: "Low"},
			{value: "Medium"},
			{value: "High"}
	]

	const handleSubmit = (e) => {
		e.preventDefault()
		setTitleError(false)
		setDetailsError(false)
		setImportanceError(false)

		if (title === '')
			setTitleError(true)
		if (details === '')
			setDetailsError(true)
		if (importance === '')
			setImportanceError(true)

		if (title && details && importance) {
			fetch('http://localhost:8000/notes', {
				method: 'POST',
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({title, details, category, importance})
			}).then(() => history.push('/'))
		}
	}

	return (
			<Container size="sm">
				<Typography
						variant="h6"
						color="textSecondary"
						component="h2"
						gutterBottom
				>
					Create a New Note
				</Typography>

				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField className={classes.field}
					           onChange={(e) => {setTitleError(false); setTitle(e.target.value)}}
					           label="Note Title"
					           variant="outlined"
					           color="secondary"
					           fullWidth
					           required
					           error={titleError}
					/>
					<TextField className={classes.field}
					           onChange={(e) => {setDetailsError(false); setDetails(e.target.value)}}
					           label="Details"
					           variant="outlined"
					           color="secondary"
					           multiline
					           rows={4}
					           fullWidth
					           required
					           error={detailsError}
					/>

					{/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

					<FormControl className={classes.field}>
						<FormLabel color="secondary">Note Category</FormLabel>
						<RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
							<FormControlLabel value="money" control={<Radio/>} label="Money"/>
							<FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
							<FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>
							<FormControlLabel value="work" control={<Radio/>} label="Work"/>
						</RadioGroup>
					</FormControl>

					 {/*controlled select (drop down menu)*/}
					<ControlledOpenSelect
							option={importance}
							options={importanceOptions}
							setOption={setImportance}
							label={"Importance"}
							error={importanceError}
							setError={setImportanceError}
							required={true}
					/>

					{/*<FormControl color="secondary">*/}
					{/*	<InputLabel htmlFor="my-input">Email address</InputLabel>*/}
					{/*	<Input id="my-input" aria-describedby="my-helper-text"/>*/}
					{/*	<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
					{/*</FormControl>*/}

					<Button
							type="submit"
							color="secondary"
							variant="contained"
							endIcon={<KeyboardArrowRightIcon/>}>
						Submit
					</Button>
				</form>


			</Container>
	)
}