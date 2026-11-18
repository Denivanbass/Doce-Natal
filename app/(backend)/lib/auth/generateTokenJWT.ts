import 'server-only';
import { SignJWT } from "jose";

export async function generateTokenJWT(
    id: string,
    email: string,
    role: string
) {
    const secret = process.env.SESSION_SECRET;

    if (!secret) {
        throw new Error("SESSION_SECRET não configurada.");
    }

    const secret_key = new TextEncoder().encode(secret);
    const alg = "HS256";

    const payload = {
        email,
        role,
    };

    const url = process.env.APPLICATION_NAME;

    if (!url) {
        throw new Error("APPLICATION_NAME não configurada.");
    }

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setSubject(id)
        .setIssuedAt()
        .setIssuer(url)
        .setAudience(url)
        .setExpirationTime("1d")
        .sign(secret_key);

    return token;
}
