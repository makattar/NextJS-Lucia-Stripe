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
import UseForm from "../common/UseForm";
import LoadingButton from "../common/LoadingButton";
import { useRouter } from "next/navigation";

interface ILoginCardProp {
  widthClass: string;
  heightClass: string;
}

export default function LoginCard({
  widthClass,
  heightClass
}: Readonly<ILoginCardProp>) {
  const router = useRouter();
  const loginForm = useForm<AuthLoginSchemaType>({
    resolver: zodResolver(AuthLoginSchema)
  });

  const onSubmit = async (values: { [x: string]: any }) => {
    console.log("Submited Values : ", values);
  };

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = loginForm;

  return (
    <Card className={`${widthClass} ${heightClass}`}>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>
        <UseForm
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
      <CardFooter className="flex justify-between">
        <LoadingButton
          variant="outline"
          loading={false}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign Up
        </LoadingButton>
        <LoadingButton
          variant="default"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Log In
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
