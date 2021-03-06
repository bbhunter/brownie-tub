import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import "./shell-list.css";

class ShellCreateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ipOrHostname: "",
			commandParamType: "",
			commandParam: "",
			commandEncoding: "",
			passwordEnabled: false,
			passwordParamType: "none",
			passwordParam: "",
			password: "",
			os: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStringChanged = this.handleStringChanged.bind(this);
		this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
	}

	handleSubmit = () => {
		window.ipcRenderer.send("shell:create", this.state);
		this.props.onClose();
	}

	handleStringChanged = name => event => {
		this.setState({ ...this.state, [name]: event.target.value });
	}

	handleCheckboxChanged = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked });
	}

	render = () => {
		return (
			<Dialog open={this.props.open} onClose={this.props.onClose}>
				<DialogContent>
					<DialogTitle>Register a New Shell</DialogTitle>
					<div>
						<TextField required autoFocus size="small" id="ipOrHostname" label="IP or URL" onChange={this.handleStringChanged("ipOrHostname")} fullWidth />
					</div>
					
					<div>
						<FormControl>
							<InputLabel required size="small" id="commandParamType-label">Param Type</InputLabel>
							<Select
								required 
								labelId="commandParamType-label"
								id="commandParamType"
								value={this.state.paramType}
								onChange={this.handleStringChanged("commandParamType")}
								size="small" 
							>
								<MenuItem value={"header"}>Header</MenuItem>
								<MenuItem value={"cookie"}>Cookie</MenuItem>
								<MenuItem value={"POST"}>POST Param</MenuItem>
								<MenuItem value={"GET"}>GET Param</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="commandEncoding-label">Encoding</InputLabel>
							<Select
							  required 
								labelId="commandEncoding-label"
								id="commandEncoding"
								value={this.state.paramType}
								onChange={this.handleStringChanged("commandEncoding")}
								size="small" 
							>
								<MenuItem value="None">None</MenuItem>
								<MenuItem value={"base64"}>Base64</MenuItem>
							</Select>
						</FormControl>
						<TextField required id="commandParam" size="small" label="Command Parameter" onChange={this.handleStringChanged("commandParam")} fullWidth />
					</div>
	
					<div>
						<FormControlLabel size="small" control={
							<Checkbox checked={this.state.passwordEnabled} onChange={this.handleCheckboxChanged("passwordEnabled")} value="passwordEnabled" />
						} 
						label="Enable Password" />
					</div>
		
					<div>
						<FormControl>
							<InputLabel id="passwordParamType-label">Param Type</InputLabel>
							<Select
								labelId="passwordParamType-label"
								id="passwordParamType"
								value={this.state.passwordParamType}
								onChange={this.handleStringChanged("passwordParamType")}
								size="small"
							>
								<MenuItem selected value={"none"}>None</MenuItem>
								<MenuItem value={"header"}>Header</MenuItem>
								<MenuItem value={"cookie"}>Cookie</MenuItem>
								<MenuItem value={"POST"}>POST Param</MenuItem>
								<MenuItem value={"GET"}>GET Param</MenuItem>
							</Select>
						</FormControl>
						<TextField id="passwordParam" label="Password Parameter" size="small" onChange={this.handleStringChanged("passwordParam")} fullWidth />
						<TextField id="password" label="Password" size="small" onChange={this.handleStringChanged("password")} fullWidth />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} variant="contained" color="secondary">Cancel</Button>
					<Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
				</DialogActions>		
			</Dialog>
		);
	}
}

ShellCreateForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default ShellCreateForm;