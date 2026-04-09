const express = require("express");
const cors = require("cors");
const inventory = require("./data");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Search API is running");
});

app.get("/search", (req, res) => {
  const { q = "", category = "", minPrice, maxPrice } = req.query;

  const parsedMin = minPrice !== undefined ? Number(minPrice) : undefined;
  const parsedMax = maxPrice !== undefined ? Number(maxPrice) : undefined;

  if (
    (minPrice !== undefined && Number.isNaN(parsedMin)) ||
    (maxPrice !== undefined && Number.isNaN(parsedMax))
  ) {
    return res
      .status(400)
      .json({ message: "minPrice and maxPrice must be valid numbers." });
  }

  if (
    parsedMin !== undefined &&
    parsedMax !== undefined &&
    parsedMin > parsedMax
  ) {
    return res.status(400).json({
      message: "Invalid price range: minPrice cannot be greater than maxPrice."
    });
  }

  let results = [...inventory];

  if (q.trim()) {
    results = results.filter((item) =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category.trim()) {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (parsedMin !== undefined) {
    results = results.filter((item) => item.price >= parsedMin);
  }

  if (parsedMax !== undefined) {
    results = results.filter((item) => item.price <= parsedMax);
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
