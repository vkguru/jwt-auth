const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()) //res.body
app.use(cors())

//ROUTES//


//register and login routes

app.use("/auth", require("./routes/jwtAuth"))


app.listen(5000, () => {
    console.log("Server is running on port 5000")
})