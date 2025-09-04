import { Router } from "express";
import { protect } from "./middleware/auth.js";
import { profileController } from "./controllers/profile.controller.js";
import { getChannels } from "./controllers/channel.controller.js";
import route from "./routes/auth.route.js";
import { handleLikePost, post } from "./controllers/post.controller.js";
import { sendMessageContoller } from "./controllers/message.controller.js";

const app = Router();

app.get("/profile", protect, profileController);
app.get("/pubic-channels", getChannels);
app.use("/auth", route);
app.get("/posts", post);
app.post("/post/like/:postId", protect, handleLikePost);
app.post("/message/send", protect, sendMessageContoller);

export default app;
