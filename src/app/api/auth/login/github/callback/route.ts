import { cookies } from "next/headers";
import { AuthService } from "@/lib/services/AuthService";
import { SignUpResDto } from "@/lib/models/dtos/res/auth/SignUp";

export async function GET(request: Request): Promise<Response> {
  const authService = new AuthService();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  const authenticatedData = await authService.github(code, state);
  if (!authenticatedData.success) {
    return Response.json(
      { ...authenticatedData.error },
      { status: authenticatedData.statusCode }
    );
  }

  const { sessionCookie } = authenticatedData.data as SignUpResDto;

  cookies().set(
    sessionCookie?.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/dashboard"
    }
  });
}
