import { useMemo, useState } from "react";

const SOURCE_OPTIONS = [
	"LinkedIn",
	"Website",
	"Facebook",
	"Google Search",
	"Referral",
	"Event",
	"Other"
] as const;

function normalizeEmail(email: string) {
	return String(email || "")
		.trim()
		.toLowerCase();
}

function validateCompanyEmail(email: string) {
	const value = normalizeEmail(email);
	const parts = value.split("@");
	if (parts.length !== 2) return "Please enter a valid email address.";
	const domain = parts[1];
	if (!domain || !domain.includes("."))
		return "Please use a valid company email domain.";
	return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function getErrorMessage(data: unknown): string | null {
	if (!isRecord(data)) return null;
	return typeof data.error === "string" ? data.error : null;
}

export function AccessGate({
	onVerified
}: {
	onVerified: (result: { accessToken: string; profile?: unknown }) => void;
}) {
	const [form, setForm] = useState({
		name: "",
		email: "",
		jobTitle: "",
		referralSource: "LinkedIn"
	});
	const [otp, setOtp] = useState("");
	const [otpRequested, setOtpRequested] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [info, setInfo] = useState("");

	const emailError = useMemo(
		() => validateCompanyEmail(form.email),
		[form.email]
	);

	const updateField = (key: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const requestOtp = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		setInfo("");

		if (
			!form.name.trim() ||
			!form.jobTitle.trim() ||
			!form.referralSource.trim()
		) {
			setError("Please complete all fields.");
			return;
		}
		if (emailError) {
			setError(emailError);
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/playground/access/request-otp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: form.name.trim(),
					email: normalizeEmail(form.email),
					jobTitle: form.jobTitle.trim(),
					referralSource: form.referralSource.trim()
				})
			});

			const data: unknown = await res.json().catch(() => ({}));
			if (!res.ok)
				throw new Error(getErrorMessage(data) || "Failed to send OTP");

			setOtpRequested(true);
			setInfo("Verification code sent. Check your inbox.");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to send verification code"
			);
		} finally {
			setLoading(false);
		}
	};

	const verifyOtp = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		setInfo("");

		if (!/^\d{6}$/.test(otp)) {
			setError("Enter the 6-digit code sent to your email.");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/playground/access/verify-otp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: normalizeEmail(form.email), otp })
			});

			const data: unknown = await res.json().catch(() => ({}));
			if (!res.ok)
				throw new Error(getErrorMessage(data) || "Verification failed");
			if (!isRecord(data) || typeof data.accessToken !== "string") {
				throw new Error("Verification succeeded but no access token returned");
			}

			onVerified({ accessToken: data.accessToken, profile: data.profile });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Verification failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto py-2 sm:py-6">
			<div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
				<h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
					Access Playground
				</h2>
				<p className="text-sm text-slate-500 mt-2">
					Verify your work email. Each email can access the playground once per
					week.
				</p>

				<form
					onSubmit={otpRequested ? verifyOtp : requestOtp}
					className="mt-6 space-y-4">
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Name
						</label>
						<input
							type="text"
							value={form.name}
							onChange={(e) => updateField("name", e.target.value)}
							className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Work Email
						</label>
						<input
							type="email"
							value={form.email}
							onChange={(e) => updateField("email", e.target.value)}
							className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]"
							required
						/>
						{emailError ? (
							<p className="text-xs text-red-600 mt-1">{emailError}</p>
						) : null}
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Job Title
						</label>
						<input
							type="text"
							value={form.jobTitle}
							onChange={(e) => updateField("jobTitle", e.target.value)}
							className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Where did you hear about the chatbot?
						</label>
						<select
							value={form.referralSource}
							onChange={(e) => updateField("referralSource", e.target.value)}
							className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]"
							required>
							{SOURCE_OPTIONS.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>

					{otpRequested ? (
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">
								OTP Code
							</label>
							<input
								type="text"
								inputMode="numeric"
								maxLength={6}
								value={otp}
								onChange={(e) =>
									setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
								}
								className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc]"
								required
							/>
						</div>
					) : null}

					{error ? <p className="text-sm text-red-600">{error}</p> : null}
					{info ? <p className="text-sm text-emerald-600">{info}</p> : null}

					<div className="flex flex-wrap gap-3 pt-2">
						<button
							type="submit"
							disabled={loading}
							className="px-5 py-2.5 rounded-2xl bg-[#0066cc] text-white text-sm font-semibold hover:bg-[#0052a3] disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
							{loading
								? "Please wait…"
								: otpRequested
									? "Verify and Continue"
									: "Send OTP"}
						</button>

						{otpRequested ? (
							<button
								type="button"
								onClick={requestOtp}
								disabled={loading}
								className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
								Resend Code
							</button>
						) : null}
					</div>
				</form>
			</div>
		</div>
	);
}
