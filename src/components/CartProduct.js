import React, { Component } from 'react';

class CartProduct extends Component {
	constructor(props){
		super(props)

		this.state ={
			product: props.product,
			key: props.val
		}
	}
	render() {
		return(
			<li key={this.state.key} className='collection-item avatar'>
				<img height='150' width='150' src={this.state.product.image_url} alt='' className='circle'/>
					<span className="title">Item: {this.state.product.name}</span>
					<p>Days Renting: {this.state.product.days_to_rent}
					<br/>Total Cost: ${this.state.product.days_to_rent * this.state.product.cost_to_rent}.00
					</p>
					<a onClick={() => this.props.onClick(this.state.product)} href="#!" className="secondary-content"><i className="material-icons red-text">delete</i></a>
			</li>

		)
	}
}

export default CartProduct