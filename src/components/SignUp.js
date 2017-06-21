import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import { signUp } from '../api' 	

class SignUp extends Component {
	constructor(){
		super()

		this.state = {
			username: '',
			password: '',
			password_confirmation: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange(props, value) {
		this.setState({
			[props]: value
		})
	}

	handleSubmit(e){
		e.preventDefault()
		signUp( {user: this.state} )
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

	render(){
		return(
			<div id='signup'>
			 	<form className='form col s4 offset-s1' onSubmit={this.handleSubmit}>
			 		<h2 className="center">Sign Up</h2>
		 			<input id='signup-form' className='input-field' placeholder='Username' type='text' onChange={ e => this.handleInputChange('username', e.target.value)}/>
		 			<input id='signup-form' className='input-field' placeholder='Password' type='password' onChange={ e => this.handleInputChange('password', e.target.value)}/>
		 			<input id='signup-form' className='input-field' placeholder='Confirm Password' type='password' onChange={ e => this.handleInputChange('password_confirmation', e.target.value)}/>
		 			<br/>
		 			<Button className='blue' waves='light'>Submit<Icon left>save</Icon></Button>
			 		<br/>
			 		<br/>
			 	</form>
			 </div>
		)
	}

}

export default SignUp
