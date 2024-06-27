const express = require("express");
const cors = require("cors");
const dbConnect = require("./db");
const userRouter = require("./routes/user.routes");
const accountRouter = require("./routes/account.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

dbConnect();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



