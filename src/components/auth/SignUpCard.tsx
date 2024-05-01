"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import FormComponent from "../common/Form";
import { useForm } from "react-hook-form";
import {
  AuthSignUpSchema,
  AuthSignUpSchemaType
} from "@/lib/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "../common/Button";
import { useRouter } from "next/navigation";
import { HttpService } from "@/lib/common/HttpService";
import useAlert from "@/hooks/useAlert";
import AlertComponent from "../common/Alert";
import { SUCCESFUL_REQUEST_CODE } from "@/lib/constants/ApiStatusCode";
import { PagePath } from "@/lib/constants/Path";

interface ISignUpCardProp {
  widthClass: string;
  heightClass: string;
}

export default function SignUpCard({
  widthClass,
  heightClass
}: Readonly<ISignUpCardProp>) {
  const router = useRouter();
  const { get, post } = HttpService();
  const { alert, showAlert, hideAlert } = useAlert();

  const signUpForm = useForm<AuthSignUpSchemaType>({
    resolver: zodResolver(AuthSignUpSchema)
  });

  const onSubmit = async (values: { [x: string]: any }) => {
    hideAlert();
    const { status, data } = await post("/api/auth/signup", values);
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
  } = signUpForm;

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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Get Onboarded Now!</CardDescription>
        </CardHeader>
        <CardContent>
          <FormComponent
            form={signUpForm}
            inputs={[
              {
                name: "name",
                type: "input",
                subType: "text",
                title: "Name",
                placeholder: "Name"
              },
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
              },
              {
                name: "confirmPassword",
                type: "input",
                subType: "password",
                title: "Confirm Password",
                placeholder: "Confirm Password"
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
                router.push(PagePath.LOGIN);
              }}
            >
              Log In
            </ButtonComponent>
            <ButtonComponent
              variant="default"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </ButtonComponent>
          </div>
          <ButtonComponent
            variant="default"
            loading={false}
            onClick={onGithubLogin}
            className="w-full"
          >
            Sign Up with Github
          </ButtonComponent>
        </CardFooter>
      </Card>
    </div>
  );
}
