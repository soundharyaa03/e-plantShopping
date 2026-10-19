import { useState } from 'react';
import { ShoppingCart, Plus, Leaf } from 'lucide-react';

const categories = {
  'Air Purifying': [
    { id: 1, name: 'Snake Plant', price: 350, emoji: '🪴' },
    { id: 2, name: 'Spider Plant', price: 280, emoji: '🌿' },
    { id: 3, name: 'Areca Palm', price: 500, emoji: '🌴' },
    { id: 4, name: 'Rubber Plant', price: 450, emoji: '🪴' },
    { id: 5, name: 'Peace Lily', price: 450, emoji: '🌱' },
    { id: 6, name: 'Boston Fern', price: 320, emoji: '🌿' }
  ],
  Succulents: [
    { id: 7, name: 'Aloe Vera', price: 200, emoji: '🌵' },
    { id: 8, name: 'Jade Plant', price: 250, emoji: '🪴' },
    { id: 9, name: 'Echeveria', price: 300, emoji: '🌵' },
    { id: 10, name: 'Haworthia', price: 280, emoji: '🌱' },
    { id: 11, name: 'Zebra Plant', price: 350, emoji: '🌿' },
    { id: 12, name: 'String of Pearls', price: 400, emoji: '🌱' }
  ],
  'Flowering Plants': [
    { id: 13, name: 'Anthurium', price: 550, emoji: '🌺' },
    { id: 14, name: 'African Violet', price: 300, emoji: '🌸' },
    { id: 15, name: 'Orchid', price: 650, emoji: '🌷' },
    { id: 16, name: 'Kalanchoe', price: 350, emoji: '🌺' },
    { id: 17, name: 'Begonia', price: 400, emoji: '🌼' },
    { id: 18, name: 'Geranium', price: 380, emoji: '🌸' }
  ]
};

export default function ProductList({ onAddToCart, cartItems = [], onOpenCart, onHome }) {
  const [addedIds, setAddedIds] = useState([]);

  const handleAdd = (plant) => {
    if (addedIds.includes(plant.id)) return;
    onAddToCart?.(plant);
    setAddedIds((current) => [...current, plant.id]);
  };

  return (
    <div>
      <header className="navbar">
        <a className="brand" href="#home" onClick={(event) => {
          event.preventDefault();
          onHome?.();
        }}>
          <Leaf size={26} /> Paradise Nursery
        </a>
        <nav className="nav-links">
          <button className="secondary-button" onClick={() => onHome?.()}>Home</button>
          <button className="secondary-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Plants</button>
          <button className="cart-button" onClick={() => onOpenCart?.()}>
            <ShoppingCart size={19} /> Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </nav>
      </header>

      <main className="content">
        <h2>Our Plant Collection</h2>
        <p className="subtitle">
          Explore our carefully selected plants and bring more greenery into your home.
        </p>

        {Object.entries(categories).map(([category, plants]) => (
          <section key={category}>
            <h2>{category}</h2>
            <div className="plant-grid">
              {plants.map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-art" role="img" aria-label={plant.name}>
                    {plant.emoji}
                  </div>
                  <div className="plant-info">
                    <span className="category">{category}</span>
                    <h3>{plant.name}</h3>
                    <p className="price">₹{plant.price}</p>
                    <button
                      className="add-button"
                      disabled={addedIds.includes(plant.id)}
                      onClick={() => handleAdd(plant)}
                    >
                      <Plus size={17} />
                      {addedIds.includes(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer>
        <Leaf size={18} /> Paradise Nursery · Grow something beautiful.
      </footer>
    </div>
  );
}
