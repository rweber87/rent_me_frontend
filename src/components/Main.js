import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { fetchProducts } from '../api'
import LoginContainer from './LoginContainer'
import isAuthenticated from './hocs/isAuthenticated'
import Products from './Products'
import ProfilePage from './Profile/ProfilePage'
import NavBar from './NavBar'
import '../App.css';

const AuthedProductsContainer = isAuthenticated(Products)
const AuthedProfileContainer = isAuthenticated(ProfilePage)

class Main extends Component {
  constructor() {
    super()
    this.state = {
      userId: 0,
      products: [],
      days_to_rent: 0,
      cart: [],
      cart_total: 0,
      transactions: []
    }
  }

  setLocalStorage = () => {
    if(!!localStorage.id) {
      this.setState({
        userId: Number(localStorage.id),
        cart: localStorage.cart || [],
        cart_total: Number(localStorage.cart_total) || 0

      })
    }
  }

  componentDidMount() {
    this.setLocalStorage()
    fetchProducts(this.state.userId)
    .then( products => this.setState({
      userId: this.state.userId,
      products: products,
      cart: !!localStorage.cart ? JSON.parse(localStorage.cart) : []
    }))
    console.log(this.state)
  }

  logOut() {
    localStorage.clear()
    this.props.history.push('/')  
  }

  handleSelectBox(e){
    let days_to_rent = Number(e.target.value)
    this.setState({
      days_to_rent: days_to_rent
    })
  }

  addItemToStorage(product, cost, days_to_rent){
    if(!localStorage.cart && localStorage.id){
      localStorage.setItem('cart', JSON.stringify([product]))
      localStorage.setItem('cart_total', cost)
    } else if(localStorage.cart && localStorage.id){
      var cart = JSON.parse(localStorage.cart)
      cart.push(product)
      localStorage.setItem('cart',JSON.stringify(cart))
      localStorage.cart_total = Number(localStorage.cart_total) + cost
    }
  }

  checkCart(product) {
    var cart = null
    if(!localStorage.cart){
      return
    } else {
      cart = JSON.parse(localStorage.cart)
      for (var i = 0; i < cart.length ; i++) {
        var cart_product = cart[i]
        if(product.id === cart_product.id){
          return true
        }
      }
    }
  }

  updateProductOnCheckout(cart){
   var prodIds = JSON.parse(cart).map(prod => Number(prod.id))
   var updatedProds = this.state.products.map(function(prod){
    if(prodIds.includes(prod.id)){
      prod.avail_to_rent = false
      return prod
    } else {
      return prod
    }
   })
   return (prevState) => this.setState({
      products: updatedProds
    })
  }

  handleSubmit(product){
    if (this.checkCart(product)) {
      alert(`${product.name} is already in your cart!`)
      return
    } else if (this.state.days_to_rent === 0) {
      alert('Please specify duration of rental')
      return
    }
    product.days_to_rent = this.state.days_to_rent 
    let prevState = this.state
    let days_to_rent = prevState.days_to_rent
    let cost = days_to_rent * product.cost_to_rent
    this.addItemToStorage(product, cost, days_to_rent)
    this.setState({
      products: [...prevState, product],
      cart_total: prevState.cart_total,
      days_to_rent: 0
    })
    alert(`Successfully added ${product.name} to cart`)
  }

  render() {
    console.log("state of main app")
    return (
      <div>
        <NavBar state={this.state} history={this.props.history} logout={this.logOut.bind(this)} brand='Temparental' updateProductOnCheckout={this.updateProductOnCheckout.bind(this)}/>
        <Switch>
          <Route exact path='/' render={() => <LoginContainer user={this.state.userId} history={this.props.history} storage={this.setLocalStorage.bind(this)} />} />
          <Route exact path='/products' render={() => <AuthedProductsContainer handleSubmit={this.handleSubmit.bind(this)} handleSelectBox={this.handleSelectBox.bind(this)} setStorage={this.setLocalStorage.bind(this)} state={this.state} user={this.state.userId} products={this.state.products}/>}/>
          <Route exact path='/profile' render={() => <AuthedProfileContainer user={this.state.userId} history={this.props.history} products={this.state.products} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main)


