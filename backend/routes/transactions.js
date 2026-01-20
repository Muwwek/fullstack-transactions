const express = require("express");
const router = express.Router();

const DATASET_URL =
  "https://raw.githubusercontent.com/plengslowtoad/dataset/refs/heads/main/dataset.md";

router.get("/", async (req, res) => {
  const {
    search = "",
    sortBy = "date",
    order = "desc",
    page = 1,
    limit = 10,
    status
  } = req.query;

  const response = await fetch(DATASET_URL);
  let text = await response.text();
  text = text.replace(/},\s*"id":/g, '}, { "id":');

  let data = [];
  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse dataset:", error);
    data = []; 
  }

  data = data.map(item => ({
    ...item,
    amount: Number(item.amount)
  }));

  if (search) {
    data = data.filter(d =>
      d.customer_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status && status !== "All") {
    data = data.filter(
      d => d.status.toLowerCase() === status.toLowerCase()
    );
  }

  data.sort((a, b) => {
    const A = sortBy === "amount" ? a.amount : new Date(a.date);
    const B = sortBy === "amount" ? b.amount : new Date(b.date);
    return order === "asc" ? A - B : B - A;
  });

  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + Number(limit));

  res.json({
    total: data.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
});

module.exports = router;
