import React from 'react'

export default class Filter extends React.Component{
	constructor() {
		super()
		this.state = {
			filter: ''
		}
	}
	
	render () {
		return (
			<input id='filter' className='col s6' type='text' placeholder='search by keyword' value={this.props.filter} onChange={ this.props.onChange } />
		)
	}
}