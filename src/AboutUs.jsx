import { Leaf, Sprout, Heart, Sun } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="content about-us">
      <div className="hero">
        <Sprout size={48} />
        <p className="eyebrow">ABOUT PARADISE NURSERY</p>
        <h1>Bringing Nature Closer to You</h1>
        <p>
          We believe every home deserves a touch of greenery.
          Paradise Nursery helps plant lovers discover beautiful
          houseplants and create healthier, happier living spaces.
        </p>
      </div>

      <h2>Our Mission</h2>
      <p>
        Our mission is to make plant shopping simple and enjoyable
        while encouraging people to bring more nature into their
        everyday lives.
      </p>

      <h2>What We Believe</h2>
      <div className="plant-grid">
        <article className="plant-card plant-info">
          <Leaf size={32} />
          <h3>Love for Nature</h3>
          <p>We celebrate the beauty and benefits of indoor plants.</p>
        </article>

        <article className="plant-card plant-info">
          <Heart size={32} />
          <h3>Customer Happiness</h3>
          <p>We want every customer to find a plant they love.</p>
        </article>

        <article className="plant-card plant-info">
          <Sun size={32} />
          <h3>Greener Living</h3>
          <p>We inspire greener spaces, one plant at a time.</p>
        </article>
      </div>
    </section>
  );
}
