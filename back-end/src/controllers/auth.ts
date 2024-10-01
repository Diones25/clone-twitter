import { Request, Response } from "express";
import { signupSchema } from "../schemas/signup";
import { findUserByEmail, findUserBySlug } from "../services/user";
import slug from "slug";

export const signup = async (req: Request, res: Response) => {
  //validar dados recebidos
  const safeData = signupSchema.safeParse(req.body);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  //verificar email
  const hasEmail = await findUserByEmail(safeData.data.email);
  if (hasEmail) {
    return res.status(400).json({ error: 'E-mail já existe' })
  }
  //verificar slug
  let genSlug = true;
  let userSlug = slug(safeData.data.name);
  while (genSlug) {
    const hasSlug = await findUserBySlug(userSlug);
    if (hasSlug) {
      let slugSuffix = Math.floor(Math.random() * 999999).toString();
      userSlug = slug(safeData.data.name + slugSuffix);
    }
    else {
      genSlug = false;
    }
  }

  //gerar hash de senha
  //criar usuário
  //criar token
  //retornar o resultado (token, user)

  res.status(200).json({});
}
