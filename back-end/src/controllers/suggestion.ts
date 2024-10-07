import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getUserSuggestions } from "../services/user";

export const getSugesstions = async (req: ExtendedRequest, res: Response) => {
  const suggestions = await getUserSuggestions(req.userSlug as string);
  return res.status(200).json({ suggestions });
}