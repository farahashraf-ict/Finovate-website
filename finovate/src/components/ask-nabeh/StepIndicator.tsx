const STEPS = [
	{ number: 1, label: "Upload Documents" },
	{ number: 2, label: "Pick a Template" },
	{ number: 3, label: "Test Your Chatbot" }
] as const;

export function StepIndicator({ currentStep }: { currentStep: number }) {
	return (
		<div className="flex items-center justify-center gap-0 mb-10">
			{STEPS.map((step, idx) => {
				const isDone = currentStep > step.number;
				const isActive = currentStep === step.number;

				return (
					<div key={step.number} className="flex items-center">
						<div className="flex flex-col items-center">
							<div
								className={
									"w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 " +
									(isDone
										? "bg-[#0066cc] border-[#0066cc] text-white shadow-md"
										: isActive
											? "bg-[#0066cc] border-[#0066cc] text-white shadow-lg scale-110"
											: "bg-white border-slate-200 text-slate-400")
								}>
								{isDone ? (
									<svg
										className="w-5 h-5"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2.5}
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								) : (
									step.number
								)}
							</div>
							<span
								className={
									"mt-2 text-xs font-medium whitespace-nowrap " +
									(isActive
										? "text-[#0066cc]"
										: isDone
											? "text-slate-600"
											: "text-slate-400")
								}>
								{step.label}
							</span>
						</div>

						{idx < STEPS.length - 1 ? (
							<div
								className={
									"h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-all duration-500 " +
									(currentStep > step.number ? "bg-[#0066cc]" : "bg-slate-200")
								}
							/>
						) : null}
					</div>
				);
			})}
		</div>
	);
}
