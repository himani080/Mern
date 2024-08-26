require("dotenv").config(); //for database connection through .env
const express = require("express");
const cors=require('cors')
const app = express();
const router = require("./server/router/auth");
const dbconnect = require("./utils/db");
const errormiddleware = require("./middlewares/error-middleware");

const port = 5000;
const corsOptions={
  origin:'http://localhost:5173',
  methods:"POST,GET,DELETE,UPDATE,PUT",
  credentials:true
}
app.use(cors(corsOptions))
app.use(express.json());
app.use("/", router);

// app.use("/login",router)

app.use(errormiddleware);
dbconnect().then(() => {
  app.listen(port, () => {
    console.log("server connected");
  });
});
