import { z } from 'zod';

export const challengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  accountId: z.string(),
  isDeleted: z.boolean(),
  isPublished: z.boolean(),
  isFinished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accountUsername: z.string(),
  likeCount: z.number(),
  dislikeCount: z.number(),
  pureLikeCount: z.number(),
  challengeEventCount: z.number(),
});

export const newChallengeRequestSchema = challengeSchema.pick({
  title: true,
  description: true,
  type: true,
  startDate: true,
  endDate: true,
  isDeleted: true,
  isPublished: true,
  isFinished: true,
});

export const challengeMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  isLastPage: z.boolean(),
});

export const getChallengesResponseSchema = z.object({
  data: z.array(challengeSchema),
  meta: challengeMetaSchema,
});

export const updateChallengeRequestSchema = z.object(newChallengeRequestSchema.shape);

export const challengeIdSchema = challengeSchema.pick({ id: true });

export const joinChallengeResponseSchema = challengeSchema
  .pick({
    id: true,
    accountId: true,
    isDeleted: true,
    isFinished: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({ challengeId: z.string(), isWinner: z.boolean() });

export const challengeLikeStatusResponseSchema = z.object({
  id: z.string(),
  postId: z.string(),
  accountId: z.string(),
  challengeId: z.string(),
  challengeEventId: z.string(),
  type: z.string(),
  count: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
