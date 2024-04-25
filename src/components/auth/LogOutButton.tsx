"use client";

import { HttpService } from "@/lib/common/HttpService";
import { useRouter } from "next/navigation";
import ButtonComponent from "../common/Button";
import { SUCCESFUL_REQUEST_CODE } from "@/lib/constants/ApiStatusCode";
import { PagePath } from "@/lib/constants/Path";

export default function LogOutButton() {
  const router = useRouter();
  const { post } = HttpService();
  const logout = async () => {
    const { status, data } = await post("/api/auth/logout", {});
    if (SUCCESFUL_REQUEST_CODE.includes(status)) {
      router.push(PagePath.HOME);
    }
  };

  return (
    <ButtonComponent variant="default" loading={false} onClick={logout}>
      Log Out
    </ButtonComponent>
  );
}
