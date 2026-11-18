
"use server";

import { string } from "zod";
import { generateTokenJWT } from "../lib/auth/generateTokenJWT";
import { passwordCompare } from "../lib/passwordCompare";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




type LoginState = {
  success: boolean;
  message: string;
} | null;


export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      success: false,
      message: 'Preencha corretamente os campos.'
    }
  }


  try {
    const user = await prisma.users.findFirst({
      where: { email: email }
    })

    if (!user) {
      return {
        success: false,
        message: "Email ou senha inválidos"
      };
    }

    const passwordTrue = await passwordCompare(password, user.password_hash)
    if (!passwordTrue) {
      return {
        success: false,
        message: "Email ou senha inválidos"
      };
    }

    const token = await generateTokenJWT(String(user.id), user.email, user.role)



    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    
  } catch (error) {
    
    return {
      success: false,
      message: "Não foi possível realizar o login."
    };
  }
  
  redirect('/cadastro-produtos')

}