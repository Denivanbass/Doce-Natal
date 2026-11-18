
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Permite a execução de Server Actions
  if (req.headers.has("next-action")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/login";

  // Obtém o JWT armazenado no cookie
  const token = req.cookies.get("session")?.value;

  // Sem token
  if (!token) {
    // Permite acesso à página de login
    if (isLoginPage) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Token não fornecido." },
        { status: 401 }
      );
    }

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.SESSION_SECRET!
    );

    // Verifica a assinatura e a validade do JWT
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    // Usuário autenticado não pode acessar o login
    if (isLoginPage) {
      return NextResponse.redirect(
        new URL("/cadastro-produtos", req.url)
      );
    }

    // Obtém os dados do usuário autenticado
    const userId = payload.sub;
    const userRole = payload.role;

    // Proteção da página de perfil
    if (pathname.startsWith("/perfil/")) {
      const profileId = pathname.split("/")[2];

      // ADMIN pode acessar qualquer perfil
      if (userRole === "ADMIN") {
        return NextResponse.next();
      }

      // USER só pode acessar o próprio perfil
      if (!userId || profileId !== userId) {
        return NextResponse.redirect(
          new URL("/unauthorized", req.url)
        );
      }
    }

    return NextResponse.next();

  } catch {
    // Token inválido: permite exibir o login
    if (isLoginPage) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Token inválido." },
        { status: 401 }
      );
    }

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/perfil/:path*",
    "/api/user/:path*",
  ],
};
