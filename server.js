require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const InstrumentRouter = require("./controllers/Instrument");

const app = express();

app.get("/", (request, response) => {
    response.send("Server is functional");
})

app.use(cors({}))
app.use(express.json());
app.use(morgan("tiny"));
app.use("/instrument", InstrumentRouter);

PORT = 7777
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})