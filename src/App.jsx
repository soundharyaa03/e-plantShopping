
import { useState } from 'react';
import { ShoppingCart, Leaf, Plus, Minus, Trash2 } from 'lucide-react';
import './App.css';

const plants = [
  { id: 1, name: 'Snake Plant', category: 'Air Purifying', price: 350, emoji: '🪴' },
  { id: 2, name: 'Peace Lily', category: 'Flowering Plants', price: 450, emoji: '🌿' },
  { id: 3, name: 'Monstera', category: 'Indoor Plants', price: 600, emoji: '🌱' },
  { id: 4, name: 'Aloe Vera', category: 'Succulents', price: 200, emoji: '🌵' },
  { id: 5, name: 'Jade Plant', category: 'Succulents', price: 250, emoji: '🪴' },
  { id: 6, name: 'Areca Palm', category: 'Indoor Plants', price: 500, emoji: '🌴' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (plant) => {
    setCart((current) => {
      const found = current.find((item) => item.id === plant.id);
      return found
        ? current.map((item) =>
            item.id === plant.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...current, { ...plant, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <Leaf size={28} />
          Paradise Nursery
        </a>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          <ShoppingCart size={20} />
          Cart ({totalItems})
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">BRING NATURE HOME</p>
        <h1>Find your little piece of paradise.</h1>
        <p>Beautiful plants, happier spaces. Make your home greener, one plant at a time.</p>
        <button className="primary-button" onClick={() => setShowCart(false)}>
          Explore our plants
        </button>
      </section>

      <main className="content">
        {showCart ? (
          <section>
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="empty">Your cart is empty. Add a plant to get started!</p>
            ) : (
              <>
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <span className="plant-emoji">{item.emoji}</span>
                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price} each</p>
                    </div>
                    <div className="quantity">
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <strong>₹{item.price * item.quantity}</strong>
                    <button className="remove" onClick={() => setCart((c) => c.filter((p) => p.id !== item.id))}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
                <div className="total">
                  <h3>Total: ₹{totalPrice}</h3>
                  <button className="primary-button" onClick={() => alert('Thank you for shopping at Paradise Nursery!')}>
                    Checkout
                  </button>
                </div>
              </>
            )}
            <button className="secondary-button" onClick={() => setShowCart(false)}>
              Continue Shopping
            </button>
          </section>
        ) : (
          <section>
            <h2>Our Plant Collection</h2>
            <p className="subtitle">Choose your favourites and create your own green sanctuary.</p>
            <div className="plant-grid">
              {plants.map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-art">{plant.emoji}</div>
                  <div className="plant-info">
                    <span className="category">{plant.category}</span>
                    <h3>{plant.name}</h3>
                    <p className="price">₹{plant.price}</p>
                    <button className="add-button" onClick={() => addToCart(plant)}>
                      <Plus size={17} /> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer>
        <Leaf size={18} /> Paradise Nursery · Grow something beautiful.
      </footer>
    </div>
  );
}
