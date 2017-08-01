import axios from 'axios'

var baseURL = 'https://immense-castle-60319.herokuapp.com/api/v1'

// var baseURL = 'http://localhost:3000/api/v1'

export function logIn(params){
  return fetch(baseURL + '/auth', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function signUp(params){
  return fetch(baseURL + '/users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => res.json() )
}

export function fetchProducts(id) {
  return fetch(baseURL + '/products', {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function fetchUserProducts(id){
  return fetch(baseURL + `/users/${id}/products`, {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function cartCheckout(params) {
  return fetch(baseURL + '/rental_transactions', {
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
  return fetch(baseURL + `/rental_transactions/${id}`, {
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'userId': id
      }
  }).then( res => res.json() )
}

export function createNewProduct(params){
  return fetch(baseURL + '/products', {
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
  return fetch(baseURL + `/products/${params.id}`, {
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
  return fetch(baseURL + `/products/${params.id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
      method: 'DELETE'
  }).then( res => res.json() )
}

export function createReview(params){
  return fetch(baseURL + '/reviews/', {
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