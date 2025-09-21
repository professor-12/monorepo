import { Router } from "express";
import { protect } from "./middleware/auth.js";
import {
    editProfileController,
    profileController,
} from "./controllers/profile.controller.js";
import {
    addMember,
    createChannel,
    getChannels,
    listofProfile,
    replyToMessage,
} from "./controllers/channel.controller.js";
import route from "./routes/auth.route.js";
import {
    createPost,
    deletePost,
    getMyPost,
    handleLikePost,
    post,
} from "./controllers/post.controller.js";
import { sendMessageContoller } from "./controllers/message.controller.js";
import { sendCommentController } from "./controllers/comment.controller.js";
import multer from "multer";
import eventRoute, {
    createEvent,
    getEvents,
} from "./controllers/event.controller.js";
import { prompt } from "./controllers/chat.controller.js";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    },
});

const app = Router();

app.get("/profile", protect, profileController);
app.get("/pubic-channels", protect, getChannels);
app.use("/auth", route);
app.get("/posts", post);
app.post("/post/like/:postId", protect, handleLikePost);
app.post("/message/send", protect, sendMessageContoller);
app.post("/comment/send", protect, sendCommentController);
app.post("/channel/create", protect, createChannel);
app.get("/user/ahead", protect, listofProfile);
app.post("/post/create", protect, upload.single("thumbnail"), createPost);
app.get("/post/my-post", protect, getMyPost);
app.put(
    "/profile/edit",
    protect,
    upload.single("picture"),
    editProfileController
);

app.delete("/post/:postId", protect, deletePost);
app.post("/event/create", protect, upload.single("banner"), createEvent);
app.get("/event", getEvents);
app.post("/channel/add-member", protect, addMember);
app.post("/channel/reply/:messageId", protect, replyToMessage);

app.post("/chat/send", prompt);

export default app;
