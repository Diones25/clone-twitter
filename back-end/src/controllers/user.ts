import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import {
  checkIfFollows,
  findUserBySlug,
  follow,
  getUserFollingCount,
  getUserFollowersCount,
  getUserTweetCount,
  unfollow
} from "../services/user";
import { userTweetsSchema } from "../schemas/user-tweet";
import { findTweetByUser } from "../services/tweet";

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  
  const user = await findUserBySlug(slug);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const folowingCount = await getUserFollingCount(user.slug);
  const followersCount = await getUserFollowersCount(user.slug);
  const tweetCount = await getUserTweetCount(user.slug);

  return res.status(200).json({ user, folowingCount, followersCount, tweetCount });
}

export const getUserTweets = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;

  const safeData = userTweetsSchema.safeParse(req.query);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  let perPage = 2;
  let currentPage = safeData.data.page ?? 0;

  const tweets = await findTweetByUser(
    slug,
    currentPage,
    perPage
  );

  return res.status(200).json({ tweets, page: currentPage });
}

export const followToggle = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  const me = req.userSlug as string;

  const hasUserToBeFollowed = await findUserBySlug(slug);
  if (!hasUserToBeFollowed) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const folows = await checkIfFollows(me, slug);
  if (!folows) {
    await follow(me, slug);
    return res.status(201).json({ following: true });
  } else {
    await unfollow(me, slug);
    return res.status(201).json({ following: false });
  }
}
