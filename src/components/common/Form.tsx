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
import ButtonComponent from "./Button";

interface IFormComponentProps {
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

export default function FormComponent({
  form,
  onSubmit = () => {},
  inputs = []
}: Readonly<IFormComponentProps>) {
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
                  key={name}
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
              return <div key={name}>Select - TODO</div>;
            case "checkbox":
              return <div key={name}>Checkbox - TODO</div>;
            case "radio":
              return <div key={name}>Radio - TODO</div>;
            default:
              return <div key={name}>Input - TODO</div>;
          }
        })}
        <ButtonComponent
          variant="default"
          className="hidden"
          type="submit"
          loading={isSubmitting}
        >
          Submit
        </ButtonComponent>
      </form>
    </Form>
  );
}
