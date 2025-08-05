import React, { useState } from 'react';
import './App.css';
import products from './products';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const alreadyInCart = cart.find((item) => item.id === product.id);
    if (!alreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <h1>🛒 Shopping Cart</h1>
      <div className="products">
        <h2>Products</h2>
        {products.map((product) => (
          <div className="product" key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <span>
                {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              </span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
        <hr />
        <h3>Total: ${getTotal()}</h3>
      </div>
    </div>
  );
}

export default App;
