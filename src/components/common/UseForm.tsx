"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "./LoadingButton";

interface IUseFormProps {
  form: UseFormReturn<any, any, undefined>;
  inputs: {
    type: "input" | "select" | "radio" | "checkbox";
    subType: "email" | "password" | "text";
    title: string;
    name: string;
    placeholder: string;
  }[];
  onSubmit: any;
}

export default function UseForm({
  form,
  onSubmit = () => {},
  inputs = []
}: Readonly<IUseFormProps>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = form;

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        {inputs.map(({ type, title, name, placeholder, subType }) => {
          switch (type) {
            case "input":
              return (
                <FormField
                  control={control}
                  name={name}
                  render={({ field, fieldState, formState }) => (
                    <FormItem>
                      <FormLabel>{title}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholder}
                          type={subType}
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            case "select":
              return <>Select - TODO</>;
            case "checkbox":
              return <>Checkbox - TODO</>;
            case "radio":
              return <>Radio - TODO</>;
            default:
              return <>Input - TODO</>;
          }
        })}
        <LoadingButton
          variant="default"
          className="hidden"
          type="submit"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
