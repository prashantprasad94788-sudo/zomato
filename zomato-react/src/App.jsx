
import { useState } from "react";
import "./App.css";

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 199,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 149,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    id: 3,
    name: "French Fries",
    category: "Snacks",
    price: 99,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  },
  {
    id: 4,
    name: "Veg Sandwich",
    category: "Snacks",
    price: 119,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  function addToCart(food) {
    setCart((previousCart) => [...previousCart, food]);
  }

  const total = cart.reduce((sum, food) => sum + food.price, 0);

  return (
    <div className="app">
      <header className="navbar">
        <h1>zomato</h1>
        <span>Discover the best food near you</span>
        <button onClick={() => alert("Login page coming soon!")}>
          Login
        </button>
      </header>

      <section className="hero">
        <h2>Order food you love!</h2>
        <p>Find your favourite meals in one place.</p>

        <input
          type="text"
          placeholder="Search pizza, burger..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <main className="container">
        <h2>Food Categories</h2>

        <div className="categories">
          {["All", "Pizza", "Burger", "Snacks"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <h2>Popular Restaurants & Food</h2>

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <article className="food-card" key={food.id}>
              <img src={food.image} alt={food.name} />

              <div className="food-info">
                <h3>{food.name}</h3>
                <p>⭐ {food.rating} · {food.category}</p>
                <strong>₹{food.price}</strong>

                <button onClick={() => addToCart(food)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <p>No food items found. Try another search.</p>
        )}

        <section className="cart">
          <h2>Your Cart ({cart.length})</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((food, index) => (
                <p key={`${food.id}-${index}`}>
                  {food.name} — ₹{food.price}
                </p>
              ))}

              <h3>Total: ₹{total}</h3>

              <button
                onClick={() =>
                  alert("Demo project: checkout is not connected.")
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      </main>

      <footer>
        <p>© 2026 Food Ordering Demo | React Project</p>
      </footer>
    </div>
  );
}

export default App;
