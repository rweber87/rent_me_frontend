import React, { Component } from 'react'
import { Modal } from 'react-materialize'
import { Icon, Button } from 'react-materialize'

class ProductForm extends Component{
	constructor(){
		super()

		this.state = {
			name: '',
			description: '',
			cost_to_rent: 0,
			image_url: '',
			category: '',
			userId: localStorage.id
		}

	}

	handleInputChange(props, value) {
		this.setState({
			[props]: value
		})
	}

	handleSubmit() {
		this.props.onSubmit(this.state)

		this.setState({
			name: '',
			description: '',
			cost_to_rent: 0,
			image_url: '',
			category: '',
			userId: localStorage.id
		})
	}

	render(){
		return(
			<Modal		
			trigger={
				<a alt='' className="btn halfway-fab waves-effect waves-light grey modal-content" ><i className="material-icons">add</i></a>
			}>
				<div id='product-form' className='card horizontal center'>
					<br/>
				 	<br/>
				 	<div className='half-container'>
			 		<h3 id='form-title' className='row'>Add a Product</h3>
				 	<img alt=''  src={this.state.image_url} className='row' />
				 	</div>
				 	<form className='form half-container' onSubmit={() => this.handleSubmit()}>
			 			<input id='product-form' className='input-field' placeholder='Name' type='text' onChange={ e => this.handleInputChange('name', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder='Description' type='text' onChange={ e => this.handleInputChange('description', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder='Cost Per Day' type='number' onChange={ e => this.handleInputChange('cost_to_rent', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder='Image URL (Optional)' type='text' onChange={ e => this.handleInputChange('image_url', e.target.value)}/>
			 			<select defaultValue="" id='select' className='browser-default' onChange={ e => this.handleInputChange('category', e.target.value)}>
					      <option defaultValue="0">Choose Category: </option>
					      <option value="Recreational">Recreational</option>
					      <option value="Hardware">Hardware</option>
					      <option value="Kitchenware">Kitchenware</option>
					      <option value="Technology">Technology</option>
					  </select>
			 			<br/>
			 			<Button modal='close' className='grey' waves='light'>Submit<Icon left>save</Icon></Button>
				 		<br/>
				 		<br/>
				 	</form>
				 </div>
			</Modal>
		)
	}
}

export default ProductForm