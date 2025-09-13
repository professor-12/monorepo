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

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api", route);

// // 4. Frontend SPA fallback (must come AFTER API & static routes)
// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
// });

// 5. Error handler (last)
app.use(errorHandler);

// 6. Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
