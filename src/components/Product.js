import React from 'react'
import ProductShow from './ProductShow'


function Product(props) {
	let product = props.product
	return (
		<div id='product-card' key={product.id} className="card horizontal">
	        <div id='img-product' className="card-image half-container">
	        	<div className="image-container">
		        	<ProductShow state={props.state} handleSubmit={props.handleSubmit} handleSelectBox={props.handleSelectBox} product={product} />
		        </div>
	        </div>
	        <div id='card-content' className="right card-content half-container">
	          <h5 className="card-title center">{product.name}</h5>
	          <p className="center">Category: {product.category}</p>
	          <p className="center">{product.description}</p>
	        </div>
	    </div>
	)
}

export default Product