import { ZodType } from "zod";

export function buildFieldValidator(validator: ZodType) {
	return (value: string | number) => {
		const errRes = validator.safeParse(value);
		if (errRes.success) {
			return null;
		}
		return errRes.error.errors.map((e) => e.message).join("; ");
	};
}
