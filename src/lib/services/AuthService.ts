import { SignUpReqDto } from "../models/dtos/req/auth/SignUp";
import { SignUpResDto } from "../models/dtos/res/auth/SignUp";
import { ResponseResDto } from "../models/dtos/res/common/Response";
import { BAD_REQUEST_CODE, OK_CODE } from "../constants/ApiStatusCode";
import { lucia } from "@/lib/common/LuciaAuth";
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
    const hashedPassword = await new Argon2id().hash(request.password);
    const userId = generateIdFromEntropySize(10);
    const createdUser = await this.userRepository.create({
      id: userId,
      email: request.email,
      password: hashedPassword
    });

    const session = await lucia.createSession(createdUser.id, {});
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
        statusCode: BAD_REQUEST_CODE
      };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      request.password
    );
    if (!validPassword) {
      return {
        success: false,
        data: null,
        error: {
          errors: ["Incorrect Email or Password!"]
        },
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
      statusCode: OK_CODE
    };
  }
}
