import { SignUpReqDto } from "../models/dtos/req/auth/SignUp";
import { SignUpResDto } from "../models/dtos/res/auth/SignUp";
import { ResponseResDto } from "../models/dtos/res/common/Response";
import { BAD_REQUEST_CODE, OK_CODE } from "../constants/ApiStatusCode";
import { githubAuth, lucia } from "@/lib/common/LuciaAuth";
import { Argon2id } from "oslo/password";
import { generateIdFromEntropySize } from "lucia";
import { UserRepository } from "../repository/UserRepository";
import { LogInReqDto } from "../models/dtos/req/auth/LogIn";
import { LogInResDto } from "../models/dtos/res/auth/LogIn";
import { LogOutResDto } from "../models/dtos/res/auth/LogOut";

export class AuthService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(request: SignUpReqDto): Promise<ResponseResDto<SignUpResDto>> {
    const existingUser = await this.userRepository.getOneByEmail(request.email);
    if (existingUser) {
      return {
        success: false,
        data: null,
        error: {
          errors: [`User with email ${request.email} already exist!`]
        },
        message: "",
        statusCode: BAD_REQUEST_CODE
      };
    }

    const hashedPassword = await new Argon2id().hash(request.password);
    const userId = generateIdFromEntropySize(10);
    const createdUser = await this.userRepository.create({
      id: userId,
      email: request.email,
      password: hashedPassword,
      github_id: null,
      username: null
    });

    const session = await lucia.createSession(createdUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return {
      success: true,
      data: {
        sessionId: session.id,
        sessionCookie: sessionCookie
      },
      message: "User Sign Up Completed Successfully!",
      error: {
        errors: []
      },
      statusCode: OK_CODE
    };
  }

  async login(request: LogInReqDto): Promise<ResponseResDto<LogInResDto>> {
    const existingUser = await this.userRepository.getOneByEmail(request.email);

    if (!existingUser) {
      return {
        success: false,
        data: null,
        error: {
          errors: ["Incorrect Email or Password!"]
        },
        message: "",
        statusCode: BAD_REQUEST_CODE
      };
    }

    const validPassword = await new Argon2id().verify(
      String(existingUser.password),
      request.password
    );
    if (!validPassword) {
      return {
        success: false,
        data: null,
        error: {
          errors: ["Incorrect Email or Password!"]
        },
        message: "",
        statusCode: BAD_REQUEST_CODE
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return {
      success: true,
      data: {
        sessionId: session.id,
        sessionCookie: sessionCookie
      },
      error: {
        errors: []
      },
      message: "User Log In Completed Successfully!",
      statusCode: OK_CODE
    };
  }

  async logout(sessionId: string): Promise<ResponseResDto<LogOutResDto>> {
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      return {
        success: false,
        data: null,
        error: {
          errors: ["Session Not Found!"]
        },
        message: "",
        statusCode: BAD_REQUEST_CODE
      };
    }

    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();

    return {
      success: true,
      data: {
        sessionId: "",
        sessionCookie: sessionCookie
      },
      error: {
        errors: []
      },
      message: "User Log out Completed Successfully!",
      statusCode: OK_CODE
    };
  }

  async github(
    code: string,
    state: string
  ): Promise<ResponseResDto<SignUpResDto>> {
    const tokens = await githubAuth.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await this.userRepository.getOneByGithubId(
      githubUser.id
    );
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      return {
        success: true,
        data: {
          sessionId: session.id,
          sessionCookie: sessionCookie
        },
        message: "User Log In Completed Successfully!",
        error: {
          errors: []
        },
        statusCode: OK_CODE
      };
    }

    const userId = generateIdFromEntropySize(10);
    const createdUser = await this.userRepository.create({
      id: userId,
      email: null,
      password: null,
      github_id: BigInt(githubUser.id),
      username: githubUser.login
    });
    const session = await lucia.createSession(createdUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return {
      success: true,
      data: {
        sessionId: session.id,
        sessionCookie: sessionCookie
      },
      message: "User Sign Up Completed Successfully!",
      error: {
        errors: []
      },
      statusCode: OK_CODE
    };
  }
}

interface GitHubUser {
  id: number;
  login: string;
}
