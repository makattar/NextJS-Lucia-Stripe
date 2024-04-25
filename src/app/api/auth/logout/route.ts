import { validateZodSchema } from "@/lib/common/Validate";
import { BAD_REQUEST_CODE } from "@/lib/constants/ApiStatusCode";
import { AuthLogOutSchema } from "@/lib/schemas/AuthSchema";
import { AuthService } from "@/lib/services/AuthService";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const authService = new AuthService();

  const validation = validateZodSchema(reqBody, AuthLogOutSchema);
  if (!validation.success) {
    return Response.json(
      { ...validation.errors },
      { status: BAD_REQUEST_CODE }
    );
  }

  const logoutData = await authService.logout(validation.result);
  if (!logoutData.success) {
    return Response.json(
      { ...logoutData.error },
      { status: logoutData.statusCode }
    );
  }

  return Response.json(logoutData.data, {
    status: logoutData.statusCode,
    headers: {
      "Set-Cookie": logoutData?.data?.sessionCookie.serialize() ?? ""
    }
  });
}
