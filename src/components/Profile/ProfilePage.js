import React from 'react';
import MyProducts from './MyProducts'
import HistoricalSales from './HistoricalSales'

function ProfilePage (props) {
	return(
		<div className='container'>
			<div id='profile-row' className='row'>
				<MyProducts history={props.history} products={props.products} />
				<h2 className='header'>Prior Rentals</h2>
				<HistoricalSales history={props.history} />
			</div>
		</div>
	)
}

export default ProfilePage