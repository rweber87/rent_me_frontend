import React, { Component } from 'react'
import { Modal, Icon, Button } from 'react-materialize'


class ReviewForm extends Component{
	constructor(props){
		super(props)

		this.state = {
			body: '',
			sale_id: Number(this.props.sale.id),
			renter_id: Number(localStorage.id)
		}
		
	}

	handleInputChange(props, value) {
		this.setState({
			[props]: value,
			sale_id: Number(this.props.sale.id),
			renter_id: Number(localStorage.id)
		})

	}

	render(){
		return(
			<Modal 
				header='Add a Review'
				trigger={<a href="#!" className="secondary-content"><i className="material-icons blue-text">comment</i></a>
			}>
				<div className="container" >
					<div className='col s6'>
					<form onSubmit={ (e) => this.props.review(this.state, e)}>
						<label id="review-form">Comments</label>
						<input id="review-form" className="materialize-textarea" onChange={ (e) => this.handleInputChange('body', e.target.value)}></input>
						<Button modal='close' className='grey' waves='light'>Submit<Icon left>save</Icon></Button>
					</form>
					</div>
				</div>
				</Modal>
		)
	}

}

export default ReviewForm