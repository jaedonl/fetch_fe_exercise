import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import dogRoutes from "./routes/dogRoutes";
import locationRoutes from "./routes/locationRoutes";
import { PORT, BASE_API_URL } from "./config";

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: BASE_API_URL,
      credentials: true,
    })
);

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });


app.use("/auth", authRoutes);
app.use("/dogs", dogRoutes);
app.use("/locations", locationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`api from ${BASE_API_URL}`)
});
