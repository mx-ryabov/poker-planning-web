import { z, ZodRawShape } from "zod";

export function pickSchemaValidator<TShape extends ZodRawShape>(
	schema: z.ZodObject<TShape>,
	field: keyof TShape,
) {
	const fieldSchema = schema.shape[field];
	return (value: unknown) => {
		const result = fieldSchema.safeParse(value);
		if (result.success) return null;

		return result.error.errors[0].message;
	};
}
