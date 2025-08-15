import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import contactRoutes from "./src/routes/contact.routes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["POST", "OPTIONS"]
}));

app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20
}));

app.use("/api", contactRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
