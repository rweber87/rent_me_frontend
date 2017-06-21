import React from 'react';
import LoginForm from './LoginForm'
import SignUp from './SignUp'

function LoginContainer(props) {

	return(
		<div className='container'>
			<div className="row card">
				<LoginForm storage={() => props.storage()} />
				<div id='form-line'className="col s1">
				</div>
				<SignUp history={props.history} storage={() => props.storage()} />
			</div>
		</div>
	)
}

export default LoginContainer