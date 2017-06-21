import React from 'react'
import { withRouter } from 'react-router'
import { Button, Icon } from 'react-materialize';
import { logIn } from '../api' 	

class LoginForm extends React.Component {
	
	constructor() {
		super()

		this.state = {
			username: '',
			password: '',
			address: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange(props, value) {
		this.setState({
			[props]: value
		})
	}

	handleSubmit(e) {
		e.preventDefault()
		logIn( this.state )
		.then( res => {
			if(res.error){
				return this.props.history.push('/login')	
			}
			//possible use sesionStorage instead?
 			localStorage.setItem('jwt', res.token)
			localStorage.setItem('id', res.user.id)
			this.props.storage()
			this.props.history.push('/products')
 		})
	}

	render() {
		return(
			 <div id='login-form'>
			 	<br/>
			 	<form className='form col s4 offset-s1' onSubmit={this.handleSubmit}>
			 		<h2 className="center">Log In</h2>
		 			<input id='login-form' className='input-field' placeholder='Username' type='text' onChange={ e => this.handleInputChange('username', e.target.value)}/>
		 			<input id='login-form' className='input-field' placeholder='Password' type='password' onChange={ e => this.handleInputChange('password', e.target.value)}/>
		 			<br/>
		 			<Button className='blue' waves='light'>Submit<Icon left>save</Icon></Button>
			 		<br/>
			 		<br/>
			 	</form>
			 </div>
		)
	}
}

export default withRouter(LoginForm)