import { useMemo, useState } from "react";

type ValidationRule = { name: string; value?: unknown; message?: string };

type SecureFormField = {
	name: string;
	label?: string;
	placeholder?: string;
	helperText?: string;
	required?: boolean;
	multiline?: boolean;
	validation?: {
		requiredMessage?: string;
		rules?: ValidationRule[];
	};
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function SecureFormWidget({
	token,
	title,
	description,
	fields,
	onComplete
}: {
	token: string;
	title?: string;
	description?: string;
	fields: SecureFormField[];
	onComplete?: (result: unknown) => void;
}) {
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [errors, setErrors] = useState<Record<string, string | null>>({});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [status, setStatus] = useState<"active" | "submitted">("active");

	const normalizedFields = useMemo(() => fields || [], [fields]);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		for (const field of normalizedFields) {
			if (!field?.name) continue;
			const rawValue = formData[field.name];
			const value = (rawValue ?? "").toString();
			const label = field.label || field.name;
			const hasValue = value.trim().length > 0;

			if (field.required && !hasValue) {
				newErrors[field.name] =
					field.validation?.requiredMessage || `${label} is required`;
				continue;
			}
			if (!hasValue) continue;

			const rules = Array.isArray(field.validation?.rules)
				? field.validation!.rules!
				: [];

			for (const rule of rules) {
				if (!rule?.name) continue;
				switch (rule.name) {
					case "minLength": {
						const min = Number(rule.value);
						if (Number.isFinite(min) && value.length < min) {
							newErrors[field.name] =
								rule.message || `${label} must be at least ${min} characters`;
						}
						break;
					}
					case "maxLength": {
						const max = Number(rule.value);
						if (Number.isFinite(max) && value.length > max) {
							newErrors[field.name] =
								rule.message || `${label} must be ${max} characters or less`;
						}
						break;
					}
					case "pattern": {
						try {
							const regex = new RegExp(String(rule.value));
							if (!regex.test(value)) {
								newErrors[field.name] =
									rule.message || `${label} format is invalid`;
							}
						} catch {
							newErrors[field.name] = "Validation pattern is invalid";
						}
						break;
					}
					case "email": {
						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						if (!emailRegex.test(value)) {
							newErrors[field.name] =
								rule.message || `${label} must be a valid email`;
						}
						break;
					}
					case "min": {
						const min = Number(rule.value);
						const num = Number(value);
						if (!Number.isFinite(num)) {
							newErrors[field.name] =
								rule.message || `${label} must be a number`;
						} else if (Number.isFinite(min) && num < min) {
							newErrors[field.name] =
								rule.message || `${label} must be at least ${min}`;
						}
						break;
					}
					case "max": {
						const max = Number(rule.value);
						const num = Number(value);
						if (!Number.isFinite(num)) {
							newErrors[field.name] =
								rule.message || `${label} must be a number`;
						} else if (Number.isFinite(max) && num > max) {
							newErrors[field.name] =
								rule.message || `${label} must be at most ${max}`;
						}
						break;
					}
					default:
						break;
				}

				if (newErrors[field.name]) break;
			}
		}

		setErrors(
			Object.fromEntries(Object.entries(newErrors).map(([k, v]) => [k, v]))
		);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);

		if (!validate()) return;

		setSubmitting(true);
		try {
			const res = await fetch(
				`/api/secure-form/${encodeURIComponent(token)}/submit`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData)
				}
			);
			const data: unknown = await res.json().catch(() => ({}));
			if (!res.ok) {
				if (isRecord(data) && isRecord(data.fieldErrors)) {
					const nextErrors: Record<string, string | null> = {};
					for (const [k, v] of Object.entries(data.fieldErrors)) {
						nextErrors[k] = typeof v === "string" ? v : null;
					}
					setErrors(nextErrors);
				}
				const msg =
					isRecord(data) && typeof data.error === "string" ? data.error : null;
				throw new Error(msg || "Submission failed");
			}
			onComplete?.(data);
			setStatus("submitted");
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "Submission failed");
		} finally {
			setSubmitting(false);
		}
	};

	if (status === "submitted") {
		return (
			<div className="w-full max-w-sm mx-auto bg-emerald-50 border border-emerald-100 rounded-2xl my-2 p-5 text-center">
				<div className="text-emerald-600 text-2xl mb-2">✓</div>
				<div className="text-sm font-semibold text-emerald-800">
					Request received
				</div>
				<div className="text-xs text-emerald-700 mt-1">
					Thanks — we’re processing it now.
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 my-2 overflow-hidden">
			<div className="p-5">
				<div className="text-base font-semibold text-slate-900">
					{title || "Provide details"}
				</div>
				<div className="text-xs text-slate-500 mt-1">
					{description || "Please fill in the fields below to continue."}
				</div>

				{submitError && (
					<div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100">
						{submitError}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					{normalizedFields.map((field) => {
						const hasError = Boolean(errors[field.name]);
						const value = formData[field.name] || "";
						const InputTag = field.multiline ? "textarea" : "input";

						return (
							<div key={field.name}>
								<label className="block text-xs font-semibold text-slate-700 mb-1">
									{field.label || field.name}
									{field.required ? (
										<span className="text-red-500"> *</span>
									) : null}
								</label>

								<InputTag
									name={field.name}
									value={value}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => {
										setFormData((prev) => ({
											...prev,
											[field.name]: e.target.value
										}));
										if (errors[field.name]) {
											setErrors((prev) => ({ ...prev, [field.name]: null }));
										}
									}}
									placeholder={field.placeholder}
									rows={field.multiline ? 4 : undefined}
									disabled={submitting}
									className={
										"w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none " +
										(hasError
											? "border-red-300 focus:border-red-500"
											: "border-slate-200 focus:border-[#0066cc]")
									}
								/>

								{field.helperText && !hasError ? (
									<div className="text-[11px] text-slate-500 mt-1">
										{field.helperText}
									</div>
								) : null}
								{hasError ? (
									<div className="text-[11px] text-red-600 mt-1">
										{errors[field.name]}
									</div>
								) : null}
							</div>
						);
					})}

					<button
						type="submit"
						disabled={submitting}
						className="w-full px-5 py-3 rounded-xl bg-[#0066cc] text-white text-sm font-semibold hover:bg-[#0052a3] disabled:opacity-60 transition-colors">
						{submitting ? "Submitting…" : "Continue"}
					</button>
				</form>
			</div>
		</div>
	);
}
