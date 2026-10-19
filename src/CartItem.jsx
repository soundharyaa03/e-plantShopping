import { Plus, Minus, Trash2, ShoppingCart, Leaf } from 'lucide-react';

export default function CartItem({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  onContinueShopping
}) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <header className="navbar">
        <a
          className="brand"
          href="#plants"
          onClick={(event) => {
            event.preventDefault();
            onContinueShopping?.();
          }}
        >
          <Leaf size={26} />
          Paradise Nursery
        </a>

        <span className="cart-button">
          <ShoppingCart size={20} />
          Cart ({totalItems})
        </span>
      </header>

      <main className="content">
        <h2>Your Shopping Cart</h2>
        <p className="subtitle">
          Review your selected plants and update your order.
        </p>

        {cartItems.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty. Discover your favourite plants!</p>
            <button
              className="primary-button"
              onClick={() => onContinueShopping?.()}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <span className="plant-emoji">
                  {item.emoji || '🪴'}
                </span>

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit price: ₹{item.price}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>

                <div className="quantity">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => onDecrease?.(item.id)}
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => onIncrease?.(item.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <strong>₹{item.price * item.quantity}</strong>

                <button
                  className="remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => onRemove?.(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}

            <div className="total">
              <div>
                <p>Total items: {totalItems}</p>
                <h3>Total Amount: ₹{totalPrice}</h3>
              </div>

              <button
                className="primary-button"
                onClick={() => alert('Checkout Coming Soon!')}
              >
                Checkout
              </button>
            </div>
          </>
        )}

        <button
          className="secondary-button"
          onClick={() => onContinueShopping?.()}
        >
          Continue Shopping
        </button>
      </main>

      <footer>
        <Leaf size={18} />
        Paradise Nursery · Grow something beautiful.
      </footer>
    </div>
  );
}
