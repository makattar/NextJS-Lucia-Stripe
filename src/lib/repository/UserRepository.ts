import prisma from "@/lib/common/PrismaClient";
import { User } from "@prisma/client";

export class UserRepository {
  async create(data: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: data
    });
    return createdUser;
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
  }

  async getOneByGithubId(githubId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        github_id: githubId
      }
    });
    return user;
  }
}
