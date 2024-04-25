import { z } from "zod";

export type ValidateResDto<T> =
  | {
      success: true;
      result: T;
      errors: {};
    }
  | {
      success: false;
      result: null;
      errors: { errors: string[] };
    };

export function validateZodSchema(
  inputData: unknown,
  schema: z.Schema
): ValidateResDto<z.infer<typeof schema>> {
  try {
    const parsed = schema.parse(inputData);
    return {
      success: true,
      errors: [],
      result: parsed
    };
  } catch (err) {
    let errors: string[] = [];
    if (err instanceof z.ZodError) {
      errors = err.issues.map((e) => {
        return `${e.path[0]}: ${e.message}`;
      });
    } else {
      errors = ["Internal Server Error"];
    }
    return {
      success: false,
      errors: { errors },
      result: null
    };
  }
}
