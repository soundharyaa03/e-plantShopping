import { useState } from 'react';
import { ShoppingCart, Leaf, Plus, Minus, Trash2, Sprout } from 'lucide-react';
import './App.css';

const plants = [
  { id: 1, name: 'Snake Plant', category: 'Air Purifying', price: 350, emoji: '🪴' },
  { id: 2, name: 'Peace Lily', category: 'Flowering Plants', price: 450, emoji: '🌿' },
  { id: 3, name: 'Monstera', category: 'Indoor Plants', price: 600, emoji: '🌱' },
  { id: 4, name: 'Aloe Vera', category: 'Succulents', price: 200, emoji: '🌵' },
  { id: 5, name: 'Jade Plant', category: 'Succulents', price: 250, emoji: '🪴' },
  { id: 6, name: 'Areca Palm', category: 'Indoor Plants', price: 500, emoji: '🌴' }
];

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (plant) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === plant.id);
      if (exists) return current;
      return [...current, { ...plant, quantity: 1 }];
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

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      {page !== 'home' && (
        <header className="navbar">
          <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); setPage('home'); }}>
            <Leaf size={28} /> Paradise Nursery
          </a>
          <nav className="nav-links">
            <button className="secondary-button" onClick={() => setPage('home')}>Home</button>
            <button className="secondary-button" onClick={() => setPage('plants')}>Plants</button>
            <button className="cart-button" onClick={() => setPage('cart')}>
              <ShoppingCart size={20} /> Cart ({totalItems})
            </button>
          </nav>
        </header>
      )}

      {page === 'home' && (
        <section className="hero">
          <Sprout size={52} />
          <p className="eyebrow">BRING NATURE HOME</p>
          <h1>Welcome to Paradise Nursery</h1>
          <p>
            Discover beautiful houseplants and transform your living space
            into a greener, happier sanctuary. Find the perfect plant for
            every corner of your home.
          </p>
          <button className="primary-button" onClick={() => setPage('plants')}>
            Get Started <Leaf size={18} />
          </button>
        </section>
      )}

      {page === 'plants' && (
        <main className="content">
          <h2>Our Plant Collection</h2>
          <p className="subtitle">Choose your favourites and create your own green sanctuary.</p>
          <div className="plant-grid">
            {plants.map((plant) => {
              const added = cart.some((item) => item.id === plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-art">{plant.emoji}</div>
                  <div className="plant-info">
                    <span className="category">{plant.category}</span>
                    <h3>{plant.name}</h3>
                    <p className="price">₹{plant.price}</p>
                    <button
                      className="add-button"
                      disabled={added}
                      onClick={() => addToCart(plant)}
                    >
                      <Plus size={17} /> {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      )}

      {page === 'cart' && (
        <main className="content">
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
                    <p>Unit price: ₹{item.price}</p>
                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                  </div>
                  <div className="quantity">
                    <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">
                      <Plus size={16} />
                    </button>
                  </div>
                  <strong>₹{item.price * item.quantity}</strong>
                  <button className="remove" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <Trash2 size={18} />
                  </button>
                </article>
              ))}
              <div className="total">
                <h3>Total: ₹{totalPrice}</h3>
                <button className="primary-button" onClick={() => alert('Checkout Coming Soon!')}>
                  Checkout
                </button>
              </div>
            </>
          )}
          <button className="secondary-button" onClick={() => setPage('plants')}>
            Continue Shopping
          </button>
        </main>
      )}

      <footer>
        <Leaf size={18} /> Paradise Nursery · Grow something beautiful.
      </footer>
    </div>
  );
}
