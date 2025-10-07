"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import Input from "../ui/input";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SigninForm = () => {
  const router = useRouter();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  //Depois fazer a validação dos campos usando o zod

  const handleEnterButton = async () => {
    router.replace('/home');
  }

  return (
    <>
      <Input
        placeholder='Digite seu email'
        value={emailField}
        onChange={t => setEmailField(t)}
      />
      <Input
        placeholder='Digite sua senha'
        value={passwordField}
        onChange={t => setPasswordField(t)}
        password
      />

      <button onClick={handleEnterButton}>Entrar</button>
    </>
  )
}

export default SigninForm
