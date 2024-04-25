import { Cookie } from "lucia";

export interface LogInResDto {
  sessionId: string;
  sessionCookie: Cookie;
}
