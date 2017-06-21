
import React from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'


function NavBar(props) {
	return(	
		<div className="navbar-fixed">
			<nav>
	        	<div className="Main-header fixed">
	        		<div className='container'>
	        			<div id='navbar-row' className='row'>
			          		<h5><a id='drowndown-button' className="right dropdown-button" href="#!" data-activates="dropdown">Menu<i className="material-icons right"></i></a></h5>
			          		<h2 id='logo' className='page-title tooltipped' data-position="bottom" data-delay="50" data-tooltip="Temparental: share your things or borrow from others!">{props.brand}</h2>
			          	</div>
			          	<ul id="dropdown" className="dropdown-content">
						  <li><Link to='/products'>Products</Link></li>
						  <li className="divider"></li>
						  <li><Cart history={props.history} state={props.state} updateProductOnCheckout={props.updateProductOnCheckout} /></li>
						  <li className="divider"></li>
						  <li><Link to='/profile'>Profile</Link></li>
						  <li className="divider"></li>
						  <li><a onClick={ () => props.logout() } >Log out</a></li>
						</ul>
		          	</div>
		        </div>
			</nav>
		</div>
	)
}

export default NavBar