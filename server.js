const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 }
];

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: Number(req.body.price)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
