import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ListingRouter from "./controllers/Listing.js";
import AdminRouter from "./controllers/Admin.js";
import ContactRouter from "./controllers/Contact.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://joelbaycollections.netlify.app",
    ],
  }),
);
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use("/admin", AdminRouter);
app.use("/listings", ListingRouter);
app.use("/contact", ContactRouter);

app.get("/", (request, response) => {
  response.send("Server is functional");
});

const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
