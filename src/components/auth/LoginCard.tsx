"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { AuthLoginSchema, AuthLoginSchemaType } from "@/lib/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "../common/Form";
import ButtonComponent from "../common/Button";
import { redirect, useRouter } from "next/navigation";
import { HttpService } from "@/lib/common/HttpService";
import useAlert from "@/hooks/useAlert";
import AlertComponent from "../common/Alert";
import { SUCCESFUL_REQUEST_CODE } from "@/lib/constants/ApiStatusCode";
import { PagePath } from "@/lib/constants/Path";

interface ILoginCardProp {
  widthClass: string;
  heightClass: string;
}

export default function LoginCard({
  widthClass,
  heightClass
}: Readonly<ILoginCardProp>) {
  const router = useRouter();
  const { get, post } = HttpService();
  const { alert, showAlert, hideAlert } = useAlert();

  const loginForm = useForm<AuthLoginSchemaType>({
    resolver: zodResolver(AuthLoginSchema)
  });

  const onSubmit = async (values: { [x: string]: any }) => {
    hideAlert();
    const { status, data } = await post("/api/auth/login", values);
    if (!SUCCESFUL_REQUEST_CODE.includes(status)) {
      showAlert({
        title: `Error : ${data?.errors?.[0]}`,
        variant: "destructive",
        visible: true
      });
      return;
    }

    showAlert({
      title: `Success : ${data?.message}`,
      variant: "default",
      visible: true
    });
    router.push(PagePath.DASHBOARD);
  };

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = loginForm;

  const onGithubLogin = async () => {
    const { status, data } = await get("/api/auth/login/github");
    if (SUCCESFUL_REQUEST_CODE.includes(status)) {
      try {
        router.replace(data.url);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <AlertComponent
        visible={alert.visible}
        variant={alert.variant}
        title={alert.title}
        description={alert.description}
      />

      <Card className={`${widthClass} ${heightClass}`}>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <FormComponent
            form={loginForm}
            inputs={[
              {
                name: "email",
                type: "input",
                subType: "email",
                title: "Email",
                placeholder: "Email"
              },
              {
                name: "password",
                type: "input",
                subType: "password",
                title: "Password",
                placeholder: "Password"
              }
            ]}
            onSubmit={onSubmit}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <ButtonComponent
              variant="outline"
              loading={false}
              onClick={() => {
                router.push(PagePath.SIGNUP);
              }}
            >
              Sign Up
            </ButtonComponent>
            <ButtonComponent
              variant="default"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Log In
            </ButtonComponent>
          </div>
          <ButtonComponent
            variant="default"
            loading={false}
            onClick={onGithubLogin}
            className="w-full"
          >
            Login with Github
          </ButtonComponent>
        </CardFooter>
      </Card>
    </div>
  );
}
