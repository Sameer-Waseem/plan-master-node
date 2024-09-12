const express = require("express");
const mongoose = require("mongoose");
const planRouter = require("./routes/plans");

const app = express();

mongoose
  .connect("mongodb://localhost/plan_master")
  .then(() => console.log("Connected to MongoDB Database successfully..."))
  .catch((e) => console.log("Could not connected to MongoDB Database", e));

app.use(express.json());
app.use("/api/plan", planRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
