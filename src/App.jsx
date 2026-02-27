import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) })
    });
    setName("");
    setPrice("");
    fetchProducts();
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Product App 🚀</h1>

      <form onSubmit={addProduct} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {formatPrice(p.price)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
