import express from "express";
import cors from "cors";
import { errorHandler } from "./controllers/error.controller.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import route from "./route.js";
config();
const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", route);
app.get("/", (req, res) => {
    res.sendFile(__dirname, "../../client/dist/index.html");
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
