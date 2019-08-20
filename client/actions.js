//Actions
const ACT = {
  ADDTOCART: 'ADDTOCART',
  REMOVEFROMCART: 'REMOVEFROMCART',
  EDITCART: 'EDITCART',
  GETCART: 'GETCART',
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCT: 'GET_PRODUCT',
  DESELECT: 'DESELECT',
  CHECKOUT: 'CHECKOUT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  UPDATE_PRODUCT:'UPDATE_PRODUCT',
  CATEGORIZE_PRODUCTS: 'CATEGORIZE_PRODUCTS',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  SIGNUP_USER: 'SIGNUP_USER',
  GETORDERS: 'GETORDERS',
  GETORDER: 'GETORDER',
}


//Thunk Creators
const fetchProducts = () => (dispatch, getState, axios) => {
  axios.get('/api/products')
  .then(({data: products}) => {
    dispatch({type: ACT.GET_PRODUCTS, products})
    return products
  })
  .catch(err => console.error(err));
};


const fetchProduct = (productId) => (dispatch, getState, axios) => {
  axios.get(`/api/products/${productId}`)
  .then(({data: foundProduct}) => dispatch({type: ACT.GET_PRODUCT, foundProduct}))
  .catch(err => console.error(err));
};

const categorizeProducts = () => (dispatch, getState) => {
  const {products} = getState();
  dispatch({type: ACT.CATEGORIZE_PRODUCTS, products})
};

const fetchAndCategorizeProducts = () => (dispatch, getState, axios) => {
  axios.get('/api/products')
  .then(({data: products}) => {
    dispatch({type: ACT.GET_PRODUCTS, products})
    return products
  })
  .then(products => dispatch({type: ACT.CATEGORIZE_PRODUCTS, products}))
  .catch(err => console.error(err));
};

const deselectProduct = () => (dispatch) => {
  dispatch({type: ACT.DESELECT})
};

const createProduct = (product) => (dispatch, getState, axios) => {
  axios.post('/api/products', product)
    .then(({data:product})=> dispatch({type: ACT.CREATE_PRODUCT, product}))
    .catch(err => console.error(err));
}

const deleteProduct = (productId) => (dispatch, getState, axios) => {
  axios.delete(`/api/products/${productId}`)
    .then(() => dispatch({type: ACT.DELETE_PRODUCT, productId}))
    .catch(err => console.error(err));
}

const updateProduct = (productUpdates) => (dispatch, getState, axios) => {
  //TODO: remove userId from body and get from session after sessions are working (changing adminProductUpdates to only productUpdates)
  axios.put(`/api/products/${productUpdates.id}`, productUpdates)
  .then(({data:updatedProduct}) => dispatch({type: ACT.UPDATE_PRODUCT, updatedProduct}))
  .catch(err => console.error(err));
};

const getCart = () => (dispatch, getState, axios) => {
  axios.get('/api/orders/cart')
  .then(({data: orderLines}) => dispatch({type: ACT.GETCART, orderLines}))
  .catch(err => console.error(err));
};

const addToCart = (product) => (dispatch, getState, axios) => {
  axios.post('/api/orders', product)
    .then(({data: line}) => dispatch({
        type: ACT.ADDTOCART,
        line,
    }))
    .catch(err => console.error(err));
};

const removeFromCart = (product) => (dispatch, getState, axios) => {
  axios.delete('/api/orders', {data: product})
    .then(({data: line}) => dispatch({
      type: ACT.REMOVEFROMCART,
      line,
  }))
    .catch(err => console.error(err));
}

const checkout = (info) => (dispatch, getState, axios) => {
  axios.put('/api/orders/checkout', info) 
    .then(() => dispatch({
      type: ACT.CHECKOUT,
    }
    ))
    .catch(err => console.error(err));
}

const getCurrentUser = () => (dispatch, getState, axios) => {
  axios.get('/api/users/currentUser')
    .then(({data: currentUser}) => dispatch({type:ACT.GET_CURRENT_USER, currentUser}))
    .catch(err => console.error(err));
};

const getOrders = () => (dispatch, getState, axios) => {
  axios.get('/api/orders/')
  .then(({data: orders}) => dispatch({type: ACT.GETORDERS, orders}))
  .catch(err => console.error(err));
};

const getSelectedOrder = (orderId) => (dispatch, getState, axios) => {
  axios.get(`/api/orders/${orderId}`)
  .then(({data: order}) => dispatch({type: ACT.GETORDER, order}))
  .catch(err => console.error(err));
};

export {
  ACT, 
  getCart, 
  addToCart, 
  removeFromCart, 
  checkout, 
  fetchProduct,
  fetchProducts,
  categorizeProducts, 
  fetchAndCategorizeProducts, 
  deselectProduct,
  createProduct,
  deleteProduct,
  updateProduct, 
  getCurrentUser,
  getOrders,
  getSelectedOrder
}
