const express = require("express");
const cors = require("cors");
const transactionsRoute = require("./routes/transactions");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/transactions", transactionsRoute);

app.listen(3001, () => {
  console.log("🚀 Backend running on http://localhost:3001");
});
