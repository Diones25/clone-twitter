import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { feedSchema } from "../schemas/feed";
import { getUserFollowing } from "../services/user";
import { findTweetFedd } from "../services/tweet";

export const getFeed = async (req: ExtendedRequest, res: Response) => {
  const safeData = feedSchema.safeParse(req.query);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  let perPage = 2;
  let currentPage = safeData.data.page ?? 0;

  const following = await getUserFollowing(req.userSlug as string);
  const tweets = await findTweetFedd(following, currentPage, perPage);

  return res.status(200).json({ tweets, currentPage });
}