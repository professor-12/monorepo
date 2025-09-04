import { string, z } from "zod";

export const sendMessageSchema = z.object({
    content: z.string(),
    authorId: z.string(),
    channelId: string(),
      threadRootId: z.string().optional(),
    
});
