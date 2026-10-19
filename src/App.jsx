import { useState } from "react";
import "./App.css";

const plants = [
  { id: 1, name: "Snake Plant", price: 15, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b77?w=400" },
  { id: 2, name: "Peace Lily", price: 20, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400" },
  { id: 3, name: "Spider Plant", price: 12, category: "Air Purifying", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400" },
  { id: 4, name: "Aloe Vera", price: 10, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
  { id: 5, name: "Jade Plant", price: 14, category: "Succulents", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
  { id: 6, name: "Echeveria", price: 11, category: "Succulents", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
  { id: 7, name: "Monstera", price: 25, category: "Decorative", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
  { id: 8, name: "Areca Palm", price: 22, category: "Decorative", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400" },
  { id: 9, name: "Rubber Plant", price: 18, category: "Decorative", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" }
];

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Display the product listing when Get Started is clicked
  const handleGetStarted = () => {
    setShowProducts(true);
    setShowCart(false);
  };

  // Add a plant to the shopping cart
  const handleAddToCart = (plant) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === plant.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...plant, quantity: 1 }];
    });
  };

  // Increase the quantity of a plant
  const handleIncrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease the quantity and remove zero-quantity items
  const handleDecrease = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a plant from the cart
  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <div className="app">
      {!showProducts && !showCart ? (
        <section className="background-image hero">
          <div className="hero-content">
            <h1>Welcome to Paradise Nursery</h1>
            <p>
              Bring nature home with our beautiful collection of indoor
              plants, air-purifying plants, and succulents.
            </p>
            <button className="get-started" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </section>
      ) : (
        <>
          <nav className="navbar">
            <h1>Paradise Nursery</h1>
            <div>
              <button
                className="btn"
                onClick={() => {
                  setShowProducts(false);
                  setShowCart(false);
                }}
              >
                Home
              </button>{" "}
              <button
                className="btn"
                onClick={() => {
                  setShowProducts(true);
                  setShowCart(false);
                }}
              >
                Plants
              </button>{" "}
              <button className="btn" onClick={() => setShowCart(true)}>
                Cart ({totalItems})
              </button>
            </div>
          </nav>

          {showProducts && !showCart && (
            <main className="container">
              <h2>Our Plants</h2>
              <p>
                Explore our collection and choose the perfect plants for
                your home.
              </p>

              {categories.map((category) => (
                <section key={category}>
                  <h2>{category}</h2>
                  <div className="plant-list">
                    {plants
                      .filter((plant) => plant.category === category)
                      .map((plant) => (
                        <article className="plant-card" key={plant.id}>
                          <img src={plant.image} alt={plant.name} />
                          <h3>{plant.name}</h3>
                          <p>Category: {plant.category}</p>
                          <p>
                            <strong>${plant.price.toFixed(2)}</strong>
                          </p>
                          <button
                            className="add-to-cart"
                            onClick={() => handleAddToCart(plant)}
                          >
                            Add to Cart
                          </button>
                        </article>
                      ))}
                  </div>
                </section>
              ))}
            </main>
          )}

          {showCart && (
            <main className="cart-container">
              <h2>Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <p>Your cart is empty. Please add some plants!</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Subtotal: $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          className="btn"
                          onClick={() => handleDecrease(item.id)}
                        >
                          −
                        </button>{" "}
                        <button
                          className="btn"
                          onClick={() => handleIncrease(item.id)}
                        >
                          +
                        </button>{" "}
                        <button
                          className="btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}

                  <div className="cart-total">
                    <p>Total items: {totalItems}</p>
                    <p>Total price: ${totalPrice.toFixed(2)}</p>
                    <button
                      className="get-started"
                      onClick={() =>
                        window.alert("Thank you for shopping at Paradise Nursery!")
                      }
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}

              <p>
                <button
                  className="btn"
                  onClick={() => {
                    setShowCart(false);
                    setShowProducts(true);
                  }}
                >
                  Continue Shopping
                </button>
              </p>
            </main>
          )}

          <footer className="footer">
            <p>© 2026 Paradise Nursery. Grow happiness naturally.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
