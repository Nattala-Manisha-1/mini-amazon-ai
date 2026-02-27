import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const API_BASE = "https://mini-amazon-nm-2026.onrender.com";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setDisplayProducts(data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAsk = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      setAiSummary(data.summary);

      if (data.productIds && data.productIds.length > 0) {
        const filtered = allProducts.filter((product) =>
          data.productIds.includes(product.id)
        );
        setDisplayProducts(filtered);
      } else {
        setDisplayProducts([]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDisplayProducts(allProducts);
    setAiSummary("");
    setQuery("");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#232f3e",
          color: "white",
          padding: "15px 30px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Mini Amazon
      </div>

      <div style={{ padding: "30px" }}>
        {/* Search Section */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search products (e.g., Gaming under 70000)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleAsk}
            style={{
              padding: "10px 20px",
              background: "#ff9900",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Search
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              background: "#ccc",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* AI Summary */}
        {aiSummary && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              background: "#e7f3ff",
              borderRadius: "5px",
            }}
          >
            <strong>AI Suggestion:</strong> {aiSummary}
          </div>
        )}

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {displayProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;