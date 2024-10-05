import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { findUserBySlug, getUserFollingCount, getUserFollowersCount, getUserTweetCount } from "../services/user";

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