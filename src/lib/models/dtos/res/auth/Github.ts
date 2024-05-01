import { Cookie } from "lucia";

export interface GithubResDto {
  sessionId: string;
  sessionCookie: Cookie;
}
