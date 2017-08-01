import React, { Component } from 'react'
import { getTransactions, createReview } from '../../api'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import ReviewForm from './ReviewForm'

class HistoricalSales extends Component {
	constructor(props){
		super(props)

		this.state = {
			transactions: []
		}
		
	}

	componentDidMount(){
		getTransactions(localStorage.id)
		.then( transactions => this.setState({
			transactions: transactions
		}))
	}

	render() {
		if(!this.state){
			return (<div>
					Loading...
				</div>)
		}
		var addReview = (params, e) =>  
						{
							console.log("handling review", params, e)
							e.preventDefault()
							createReview(params)
							.then(res => console.log("this is the response", res, this.state))
							
						}
		var transactions = this.state.transactions.map(function(transaction){	
			var products = transaction.products.map(function(product){
				var sale = transaction.sales.filter(sale => sale.rental_transaction_id === transaction.id && sale.product_id === product.id)
			return(
					<li className='collection-item avatar'>
						<img height='150' width='150' src={product.image_url} alt='' className='circle'/>
						<p><span className="title">Name: {product.name}</span>
						<br/>
						<span className="description">Description: {product.description}</span>
						<br/>
						<span className="description">Cost of Item: ${sale[0].cost}.00</span>
						<br/>
						<span className="returnDate">Return Date: {sale[0].expected_date_of_return}</span>
						</p>
						<ReviewForm product={product} sale={sale[0]} review={addReview} />
					</li>
				)
			})
			var createdAt = `Purchased Made On: ${transaction.created_at}` 		 
			return(
					<li className='historical-list'>
				      	<CollapsibleItem header={createdAt} icon='list black'>
		 	      			<ul className='collection'>
			      				{products}
			      				<br/>
								<span className="costOfPurchase">Total Purchase: ${transaction.total_cost}.00</span>	
			      			</ul>
				      	</CollapsibleItem>
				    </li>
			)		
		})

		return(
				<div>
					<Collapsible popout>
						{transactions}
					</Collapsible>
				</div>		
		)

	}
}

export default HistoricalSales