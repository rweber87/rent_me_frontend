import axios from 'axios'

export function logIn(params){
  return fetch('http://localhost:3000/api/v1/auth', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function signUp(params){
  return fetch('http://localhost:3000/api/v1/users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function fetchProducts(id) {
  return fetch('http://localhost:3000/api/v1/products', {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function fetchUserProducts(id){
  return fetch(`http://localhost:3000/api/v1/users/${id}/products`, {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function cartCheckout(params) {
  return fetch('http://localhost:3000/api/v1/rental_transactions', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'POST',
      body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function getTransactions(id) {
  return fetch(`http://localhost:3000/api/v1/rental_transactions/${id}`, {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function createNewProduct(params){
  return fetch('http://localhost:3000/api/v1/products', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'POST',
      body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function getImageURL(name){
  var userInput = name.split(" ").join("+")
  axios.get(`http://api.walmartlabs.com/v1/search?query=${userInput}&format=json&apiKey=37jt8ht5een6m23jntubkd85`)
  .then( res => res.json())
}

export function editProduct(params){
  return fetch(`http://localhost:3000/api/v1/products/${params.id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'PATCH',
      body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function deleteProduct(params){
  return fetch(`http://localhost:3000/api/v1/products/${params.id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'DELETE'
  }).then( res => res.json() )
}

export function createReview(params){
  return fetch('http://localhost:3000/api/v1/reviews/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'POST',
      body: JSON.stringify(params)
  }).then( res => res.json() )
}


// add user input to the end of the URL
var gettyAPI = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&'