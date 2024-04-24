import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import UseForm from "../common/UseForm";
import { useForm } from "react-hook-form";
import {
  AuthSignUpSchema,
  AuthSignUpSchemaType
} from "@/lib/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../common/LoadingButton";

interface ISignUpCardProp {
  widthClass: string;
  heightClass: string;
}

export default function SignUpCard({
  widthClass,
  heightClass
}: Readonly<ISignUpCardProp>) {
  const signUpForm = useForm<AuthSignUpSchemaType>({
    resolver: zodResolver(AuthSignUpSchema)
  });

  const onSubmit = async (values: { [x: string]: any }) => {
    console.log("Submited Values : ", values);
  };

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = signUpForm;

  return (
    <Card className={`${widthClass} ${heightClass}`}>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Get Onboarded Now!</CardDescription>
      </CardHeader>
      <CardContent>
        <UseForm
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
      <CardFooter className="flex justify-between">
        <LoadingButton variant="outline" loading={false} onClick={() => {}}>
          Log In
        </LoadingButton>
        <LoadingButton
          variant="default"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Sign Up
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
