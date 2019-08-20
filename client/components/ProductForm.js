import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProduct, fetchAndCategorizeProducts, updateProduct} from '../actions';

class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: {},
      newCategories: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNewCategories = this.handleNewCategories.bind(this);
  }

 componentDidMount() {
    const {match, getProduct, getUpdatedCategories} = this.props;
    getProduct(match.params.productId);
    getUpdatedCategories();
  }

  componentDidUpdate() {
    const {selectedProduct} = this.props;
    const {product} = this.state;
    
    if(!Object.prototype.hasOwnProperty.call(product,'id') 
    && JSON.stringify(product) !== JSON.stringify(selectedProduct)) {
      this.setState({product:selectedProduct});
    }
  }

  componentWillUnmount(){
    const {getUpdatedCategories} = this.props;
    getUpdatedCategories();
  }

  handleChange(event){
    const {product} = this.state;
    const {name, value} = event.target;
    this.setState({product:{...product, [name]:value}});
  }

  handleCategoryChange(event){
    const {product} = this.state;
    const {categories} = product;
    const {name:cat} = event.target;
    const newCheckStatus = event.target.checked;
    let newCats;
    
    if(newCheckStatus === true) newCats = [...categories, cat];
    else newCats = categories.filter(category => category!==cat);

    this.setState({product:{...product, categories: newCats}});
  }

  handleNewCategories(event){
    const {value:catStrings} = event.target;
    this.setState({newCategories: catStrings});
  }

  handleSubmit(event){
    event.preventDefault();
    const {history, userId, updateProduct} = this.props;
    const {product:productUpdates, newCategories:catStrings} = this.state;
    
    const {categories} = productUpdates;
    catStrings.split(', ')
    .forEach(catStr => {
      if (catStr && !categories.includes(catStr)) categories.push(catStr) //TODO: verify this is changing state (i.e. productUpdates) prior to updateProduct call
    })

    updateProduct(productUpdates); //TODO: remove userId from body and get from session after sessions are working
    this.setState({product:{}, newCategories:''});
    history.push(`/products/${productUpdates.id}`);
  }

  handleCancel(){
    const {history} = this.props;
    history.goBack()
  }

  render() {
    const {
      handleChange, 
      handleSubmit, 
      handleCategoryChange, 
      handleNewCategories, 
      handleCancel} = this;
    const {isAdmin, allCategories} = this.props;
    const {product:productUpdates, newCategories} = this.state;
    const {name, quantity, price, categories, description} = productUpdates

    return (
      name
      ? <div>
        {
          !isAdmin
          ? <h1>Forbidden.</h1>
          : <div>
              <h3>Product Information:</h3>
              <form type='submit' onSubmit={handleSubmit}>
              <label>Name: </label> <br/>
              <input type='text' name='name' value={name} onChange={handleChange}/><br/>
              <label>Qty: </label><br/>
              <input type='text' name='quantity' value={quantity} onChange={handleChange}/><br/>
              <label>Price: </label> <br/>
              <input type='text' name='price' value={price} onChange={handleChange}/><br/>
              <label>Categories: </label><br/>
              {
                allCategories.map((category, index) => 
                <div key={index}>
                  <input type='checkbox' id={category} name={category} onChange={handleCategoryChange} 
                  checked={categories && categories.includes(category) ? true : false}/>
                  <label>{category}</label>
                </div>)
              }
              <label>Add new (lower-cased, comma-separated) categories : </label>
              <br/>
              <input type='text' name='newCategories' value={newCategories} onChange={handleNewCategories}/>
              <br/>
              <label>Description: </label> <br/>
              <textarea rows={5} name='description' value={description} onChange={handleChange}/>
              <br/>
              <button type='submit'>Update</button>
            </form>
              <button onClick={handleCancel}>Cancel</button>
          </div>
        }
      </div>
      : ''
    )
  }
}

const mapStateToProps = state => ({
  allCategories: Object.keys(state.categorizedProducts),
  userId: state.user.id,
  isAdmin: state.user.isAdmin,
  selectedProduct: state.selectedProduct,
});

const mapDispatchToProps = dispatch => ({
  getProduct: (productId) => dispatch(fetchProduct(productId)),
  updateProduct: (productUpdates) => dispatch(updateProduct(productUpdates)),
  getUpdatedCategories: () => dispatch(fetchAndCategorizeProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);