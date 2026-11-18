import 'server-only';
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function verifyToken() {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
        return null;
    }

    const secret = process.env.SESSION_SECRET;
    const applicationName = process.env.APPLICATION_NAME;

    if (!secret || !applicationName) {
        throw new Error("Configurações de autenticação ausentes.");
    }

    const secretKey = new TextEncoder().encode(secret);

    try {
        const { payload } = await jwtVerify(
            token,
            secretKey,
            {
                algorithms: ["HS256"],
                issuer: applicationName,
                audience: applicationName
            }
        );
        console.log(payload)
        return payload;

    } catch (error) {
        return null;
    }
}
