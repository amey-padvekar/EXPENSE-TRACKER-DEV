require("dotenv").config()
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors")
const db = require("./db/db");
const {readdirSync} = require("fs");
// const { route } = require("./routes/transactions");
const connectDb = require("./config/connectDb");
const app = express();
const PORT =5000 || process.env.PORT;

//database
 connectDb();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
//user routes
app.use("/api/v1/users", require('./routes/userRoute'))
// transaction routes
app.use("/api/v1/transactions",require("./routes/transactionRoute"));
// readdirSync("./routes").map((route)=>app.use('/api/v1', require("./routes/" + route)));

//listen server
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})