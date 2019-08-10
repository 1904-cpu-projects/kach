import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart, addToCart, removeFromCart } from '../store';

const cartId = 'ord123' //TODO: replace

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const { getCart, user } = this.props;
        //getCart();
    }


    render() { 
        const { cart, products, user, addToCart, removeFromCart } = this.props;
        console.log('the cart: ', cart)
        
        const totalPrice = cart.reduce((acc, prod) => acc + (prod.purchaseUnitPrice * prod.quantity), 0).toFixed(2);
        return ( 
            <div>
                <h1>Your Cart</h1>
                <hr/>
                {
                    cart.map(prod => 
                        <div key={prod.productId}>
                            <h3><Link to={`/products/${prod.productId}`}>Need to insert Product Name. prod.product.name</Link></h3>
                            Quantity: {prod.quantity}
                            <br/>
                            Price: ${prod.purchaseUnitPrice}
                            <br/>
                            Amount: ${(prod.purchaseUnitPrice * prod.quantity).toFixed(2)}
                            <br/>
                            <form>
                                <button onClick={() => {removeFromCart({...prod, userId: user.id})}}>-</button>
                                <button onClick={() => {addToCart({...prod, userId: user.id})}}>+</button>
                            </form>
                        </div>)
                }
                <br/>
                <h4>Total: ${totalPrice}</h4>
                <br/>
                <Link to={`/cart/${cartId}/checkout`}>Check Out</Link>
            </div>
         );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    user: state.user,
    products: state.products,
})
const mapDispatchToProps = dispatch => {
    return {
        getCart: () => dispatch(getCart()),
        addToCart: (info) => dispatch(addToCart(info)),
        removeFromCart: (info) => dispatch(removeFromCart(info)),
    }
};
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);