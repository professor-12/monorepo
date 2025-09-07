import { Router } from "express";
import { protect } from "./middleware/auth.js";
import { profileController } from "./controllers/profile.controller.js";
import {
    addMember,
    createChannel,
    getChannels,
    listofProfile,
} from "./controllers/channel.controller.js";
import route from "./routes/auth.route.js";
import { handleLikePost, post } from "./controllers/post.controller.js";
import { sendMessageContoller } from "./controllers/message.controller.js";
import { sendCommentController } from "./controllers/comment.controller.js";

const app = Router();

app.get("/profile", protect, profileController);
app.get("/pubic-channels", protect, getChannels);
app.use("/auth", route);
app.get("/posts", post);
app.post("/post/like/:postId", protect, handleLikePost);
app.post("/message/send", protect, sendMessageContoller);
app.post("/comment/send", protect, sendCommentController);
app.post("/channel/create", protect, createChannel);
app.get("/user/ahead", listofProfile);

app.post("/channel/add-member", protect, addMember);
export default app;
