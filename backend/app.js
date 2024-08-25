const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();
const authRoutes = require('./routes/auth');

require("dotenv").config();

const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// Auth routes
app.use('/api/v1/auth', authRoutes);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port:", PORT);
  });
};

app.get("/",(req,res)=> {
  res.json("hello");
})

server();
