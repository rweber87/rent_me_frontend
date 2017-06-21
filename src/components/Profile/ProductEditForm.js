import React, { Component } from 'react'
import { Modal } from 'react-materialize'
import { Icon, Button } from 'react-materialize'

class ProductEditForm extends Component{
	constructor(props){
		super(props)
		var product = props.product
		var { name, description, cost_to_rent, image_url, category, id, avail_to_rent} = product

		this.state = {
			name: name,
			description: description,
			cost_to_rent: Number(cost_to_rent),
			image_url: image_url,
			category: category,
			id: id,
			avail_to_rent: avail_to_rent
		}
	}

	componentDidMount(){
		var product = this.props.product
		var { name, description, cost_to_rent, image_url, category, avail_to_rent} = product

		this.setState({
			name: name,
			description: description,
			cost_to_rent: Number(cost_to_rent),
			image_url: image_url,
			category: category,
			avail_to_rent: avail_to_rent
		})
	}

	handleInputChange(props, value) {
		this.setState({
			[props]: value,
			avail_to_rent: value === 'off' && this.state.avail_to_rent === true ? false : true
		})
	}

	render(){
		var product = this.state
		var availability = product.avail_to_rent ? <div className="switch"><label>Temparented<input disabled type="checkbox" onChange={ e => this.handleInputChange('avail_to_rent', e.target.value)}/><span className="lever"></span>Available to Rent</label></div> : <div className="switch"><label>Temparented<input type="checkbox" onChange={ e => this.handleInputChange('avail_to_rent', e.target.value)}/><span className="lever"></span>Available to Rent</label></div>
		return(
			<Modal		
			trigger={
				<a id='edit-icon' href="#!" ><i className="material-icons grey-text">mode_edit</i></a>
			}>
				<div id='product-form' className='card horizontal center'>
					<br/>
				 	<br/>
				 	<div className='half-container'>
			 		<h3 id='form-title' className='row'>Edit {product.name}</h3>
				 	<img alt=''  src={this.state.image_url} className='row' />
				 	</div>
				 	<form className='form half-container'>
			 			<input id='product-form' className='input-field' placeholder={product.name} type='text' onChange={ e => this.handleInputChange('name', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder={product.description} type='text' onChange={ e => this.handleInputChange('description', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder={product.cost_to_rent} type='number' onChange={ e => this.handleInputChange('cost_to_rent', e.target.value)}/>
			 			<input id='product-form' className='input-field' placeholder={product.image_url} type='text' onChange={ e => this.handleInputChange('image_url', e.target.value)}/>
			 			{availability}
			 			<select defaultValue={product.category} id='select' className='browser-default' onChange={ e => this.handleInputChange('category', e.target.value)}>
					      <option defaultValue="0">Choose Category: </option>
					      <option value="Recreational">Recreational</option>
					      <option value="Hardware">Hardware</option>
					      <option value="Kitchenware">Kitchenware</option>
					      <option value="Technology">Technology</option>
					  </select>
			 			<br/>
			 			<Button modal='close' onClick={(e) => this.props.onEdit(this.state, e)} className='grey' waves='light'>Submit<Icon left>save</Icon></Button>
				 		<br/>
				 		<br/>
				 	</form>
				 </div>
			</Modal>
		)
	}
}

export default ProductEditForm