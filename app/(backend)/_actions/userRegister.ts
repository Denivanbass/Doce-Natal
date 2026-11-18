
'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { passwordHash } from "@/app/(backend)/lib/passwordHash";
import { prisma } from "@/app/(backend)/lib/prisma";
import { generateTokenJWT } from "../lib/auth/generateTokenJWT";

type RegisterState = {
    error?: string;
} | null;

export async function userRegister(
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {

    // 1. Obtém os dados do formulário
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // 2. Validação básica
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !password
    ) {
        return {
            error: "Preencha todos os campos corretamente."
        };
    }

    // 3. Normaliza o e-mail
    const normalizedEmail = email.trim().toLowerCase();

    try {
        // 4. Verifica se o e-mail já está cadastrado
        const existingUser = await prisma.users.findUnique({
            where: {
                email: normalizedEmail
            }
        });

        if (existingUser) {
            return {
                error: "Erro ao cadastrar usuário"
            };
        }

        // 5. Gera o hash da senha
        const password_hash = await passwordHash(password);

        // 6. Cria o usuário no banco de dados
        const userCreated = await prisma.users.create({
            data: {
                name: name,
                email: normalizedEmail,
                password_hash
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        // 7. Gera o JWT
        const token = await generateTokenJWT(
            String(userCreated.id),
            userCreated.email,
            userCreated.role
        );

        // 8. Armazena o JWT no cookie
        const cookieStore = await cookies();

        cookieStore.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        // 9. Redireciona após o cadastro
        redirect(`/profile/${userCreated.id}`);

    } catch (error) {

        // Evita tratar o redirect do Next.js como erro
        if (
            error &&
            typeof error === "object" &&
            "digest" in error &&
            typeof error.digest === "string" &&
            error.digest.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        console.error("Erro ao registrar usuário:", error);

        return {
            error: "Ocorreu um erro ao registrar o usuário. Por favor, tente novamente."
        };
    }
}
