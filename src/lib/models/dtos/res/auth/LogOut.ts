import { Cookie } from "lucia";

export interface LogOutResDto {
  sessionId: string;
  sessionCookie: Cookie;
}
