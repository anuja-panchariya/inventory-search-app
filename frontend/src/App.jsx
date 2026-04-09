import { useEffect, useState } from "react";
import "./App.css";

const categories = ["", "Construction", "Electrical", "Furniture", "Safety"];

function App() {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (filters.q.trim()) params.append("q", filters.q);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice !== "") params.append("minPrice", filters.minPrice);
      if (filters.maxPrice !== "") params.append("maxPrice", filters.maxPrice);

      const res = await fetch(`http://localhost:5000/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResults(data);
    } catch (err) {
      setResults([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  const handleReset = () => {
    setFilters({
      q: "",
      category: "",
      minPrice: "",
      maxPrice: ""
    });
    setError("");
    setTimeout(() => {
      fetch("http://localhost:5000/search")
        .then(res => res.json())
        .then(data => setResults(data));
    }, 0);
  };

  return (
    <div className="container">
      <h1>Inventory Search</h1>

      <form className="filters" onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          placeholder="Search product name"
          value={filters.q}
          onChange={handleChange}
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
        <button type="button" className="secondary" onClick={handleReset}>
          Reset
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <div className="empty-state">No results found.</div>
      )}

      {!loading && !error && results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.supplier}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;