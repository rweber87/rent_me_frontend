import React from 'react'
import ProductEditForm from './ProductEditForm'

function MyProduct(props){
		var { product } = props
		var available = product.avail_to_rent ? "Yes" : "Temparented" 
		return(
			<li key={product.id} className='collection-item avatar'>
				<img height='150' width='150' src={product.image_url} alt='' className='circle'/>
					<p><span className="title">Name: {product.name}</span>
					<br/>
					<span className="description">Description: {product.description}</span>
					<br/>
					<span className="price">Listed Price: ${product.cost_to_rent}.00</span>
					<br/>
					<span className="price">Available to Rent: {available}</span>
					</p>
					<ProductEditForm onEdit={props.onEdit} product={product}/>
					<a onClick={ () => props.onDelete(product)} id='delete-icon' href="#!" className="secondary-content"><i className="material-icons red-text">delete</i></a>
			</li>
		)
}

export default MyProduct