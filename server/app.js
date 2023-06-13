const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/budget-app").then(() => {
  console.log("Connected to database");
});

const BankSchema = mongoose.Schema({ name: String, user: String });
const TransactionSchem = mongoose.Schema({
  name: String,
  user: String,
  amount: Number,
  bank: String,
  date: String,
});

const Bank = new mongoose.model("Bank", BankSchema);
const Transaction = new mongoose.model("Transaction", TransactionSchem);

app.post("/addbank", async (req, res) => {
  const bank = new Bank(req.body);
  try {
    const response = await bank.save();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({
      message:
        "There was an error while saving the bank in the database server.",
    });
  }
});

app.post("/addtransaction", async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    const response = transaction.save();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deletebank", async (req, res) => {
  const response = await Bank.findOneAndDelete({ _id: req.body.id });
  res.json(response);
});

app.get("/banks", async (req, res) => {
  const response = await Bank.find();
  res.json(response);
});
app.get("/transactions", async (req, res) => {
  const response = await Transaction.find();
  res.json(response);
});

app.listen(3500, () => {
  console.log("Server open on port 3500");
});
