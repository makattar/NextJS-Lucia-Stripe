import { luciaValidateRequest } from "@/lib/common/LuciaValidate";
import { UNAUTHORIZED_CODE } from "@/lib/constants/ApiStatusCode";
import { AuthService } from "@/lib/services/AuthService";

export async function POST(req: Request, res: Response) {
  const authorizationHeader = req.headers.get("Authorization");
  const { session } = await luciaValidateRequest(authorizationHeader);
  if (!session) {
    return Response.json({}, { status: UNAUTHORIZED_CODE });
  }

  const authService = new AuthService();
  const logoutData = await authService.logout(session.id);
  if (!logoutData.success) {
    return Response.json(
      { ...logoutData.error },
      { status: logoutData.statusCode }
    );
  }

  return Response.json(
    { ...logoutData.data, message: logoutData.message },
    {
      status: logoutData.statusCode,
      headers: {
        "Set-Cookie": logoutData?.data?.sessionCookie.serialize() ?? ""
      }
    }
  );
}
