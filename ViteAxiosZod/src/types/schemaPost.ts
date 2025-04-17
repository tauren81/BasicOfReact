import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.string(),
  id: z.number(),
  title: z.string(),
});

export type PostsDTO = z.infer<typeof PostSchema>;
