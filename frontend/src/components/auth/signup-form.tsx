"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";

const SignupForm = () => {
  const router = useRouter();
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  //Depois fazer a validação dos campos usando o zod

  const handleEnterButton = async () => {
    router.replace('/home');
  }

  return (
    <>
      <Input
        placeholder='Digite seu nome'
        value={nameField}
        onChange={t => setNameField(t)}
      />
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

      <Button
        label="Criar conta"
        onClick={handleEnterButton}
        size={1}
      />
    </>
  )
}

export default SignupForm
