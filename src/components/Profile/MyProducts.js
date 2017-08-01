import React, { Component } from 'react'
import MyProduct from './MyProduct'
import ProductForm from './ProductForm'
import fetchJsonp from 'fetch-jsonp'
import { createNewProduct, editProduct, deleteProduct, fetchUserProducts, getImageURL } from '../../api'



class MyProducts extends Component {
	constructor(props){
		super(props)

		this.state = {
			products: []
		}
	}

	componentDidMount() {
		fetchUserProducts(localStorage.id)
		.then ( products => this.setState({
			products: products
		}) )
		.catch(err => console.log(err))
		
	}

	handleAddProduct(params){  
		if(params.name === "" || params.description === "" || params.category === "" || params.cost_to_rent === 0){
			alert("Please fill out all necessary fields")
			return
		} else if(params.image_url === "") {
			var userInput = params.name.split(" ").join("+")
			fetchJsonp(`https://api.walmartlabs.com/v1/search?query=${userInput}&format=json&apiKey=37jt8ht5een6m23jntubkd85`)
  			.then(res => res.json())
  			.then(function(data){
  				params.image_url = data.items[0].thumbnailImage
  				return params
  			})
  			.then((params) => createNewProduct(params)
  				.then(res => 
		      	this.setState( prevState =>({
		        	products: [...prevState.products, res ]
		    }))))
		} else {
			createNewProduct(params)
  				.then(res => 
		      	this.setState( prevState =>({
		        	products: [...prevState.products, res ]
		    })))
		}
	 }

	handleDeleteProduct(params){
		deleteProduct(params)
		.then( () => {
			this.setState( prevState => ({
				products: prevState.products.filter( product => product.id !== params.id)
			}))
		})
	}

	handleEditProduct(params, e){
		e.preventDefault()
		console.log("before edit fires", params)
		editProduct(params).then( () => {
			this.setState(prevState => {
				return {
					products: prevState.products.map(p => {
						if (p.id === params.id)	{
							console.log(params)
							console.log(p)
							return params
						} else {
							return p
						}
					})
				}
			})
			console.log("my products", params)
		})
		
	}

	render() {
		console.log("my products", this.state)
		if(!this.state){
			return (<div>
					Loading...
				</div>)
		}

		var products = this.state.products.map( product => <MyProduct onDelete={this.handleDeleteProduct.bind(this)} onEdit={this.handleEditProduct.bind(this)} key={product.id} product={product}/>)
		return (
			<div id='' className="col s12">
				<h2 className='header'>My Products</h2>
				<ul className='collection'>
					{products}
				</ul>
				<h3 className='header'>Add a Product</h3>
				<ProductForm onSubmit={this.handleAddProduct.bind(this)} />
			</div>
		)
	}

}

export default MyProducts