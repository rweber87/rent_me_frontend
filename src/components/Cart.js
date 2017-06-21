import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Modal} from 'react-materialize'
import CartProduct from './CartProduct'
import { cartCheckout } from '../api'

class Cart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userId: localStorage.id,
			total: 0,
			products: localStorage.cart ? JSON.parse(localStorage.cart) : [],
			cart_total: Number(localStorage.cart_total)
		}

		this.checkout = this.checkout.bind(this)
	}

	componentDidMount(){
		this.setState({
			userId: Number(localStorage.id),
			total: Number(localStorage.cart_total),
			products: !!localStorage.cart ? JSON.parse(localStorage.cart) : null,
			cart_total: !!localStorage.cart_total ? JSON.parse(localStorage.cart_total) : 0
		})
	}

	checkout(){
		if(!localStorage.cart || JSON.parse(localStorage.cart).length === 0){
			alert("You have nothing in your cart.")
			return
		}
		console.log(this.state)
		this.props.updateProductOnCheckout(localStorage.cart)
		cartCheckout(localStorage)
		.then( res => {
			this.setState({
				transactions: res
			})
		})
		console.log(this.state)
		localStorage.setItem("cart", [])
		localStorage.setItem("cart_total", 0)
		this.props.history.push('/products')
		alert("Purchase successful!")
	}

	removeItemFromCart(product){
		var cart = JSON.parse(localStorage.cart)
		var updatedCart = cart.filter(prod => prod.id !== product.id)
		var updatedTotal = Number(localStorage.cart_total) - (product.days_to_rent * product.cost_to_rent)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
		localStorage.setItem('cart_total', JSON.stringify(updatedTotal))
		this.setState({
			products: updatedCart,
			cart_total: updatedTotal
		})
	}

	render() {
		var total = localStorage.cart ? JSON.parse(localStorage.cart).length : 0
		var cart = localStorage.cart ? JSON.parse(localStorage.cart) : []
		var products = cart.length > 0 ? cart.map( (product,i) => <CartProduct onClick={this.removeItemFromCart.bind(this)} key={product.id} val={i} product={product}/>) : null
		var cart_total = Number(localStorage.cart_total) > 1 ? `Total Cost: $${Number(localStorage.cart_total)}.00` : null
		
		return(
			<Modal
				header='Cart'
				trigger={
					<Link to='/cart'>Cart ({total})</Link>
			}>
				<ul className="collection">
					{products}
				</ul>
				<div>
					{cart_total}
				</div>
				<a modal='close' action="close" onClick={this.checkout.bind(this)} className="btn halfway-fab waves-effect waves-light grey"><i className="material-icons left" >shopping_cart</i>Checkout</a>
			</Modal>
		)
	}

}

export default Cart