import { Cookie } from "lucia";

export interface SignUpResDto {
  sessionId: string;
  sessionCookie: Cookie;
}
