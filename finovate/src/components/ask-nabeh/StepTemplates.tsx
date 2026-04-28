import { useState } from "react";
import { TEMPLATE_CARDS } from "./templateCards";

export function StepTemplates({
	onComplete
}: {
	onComplete: (templateId: string) => void;
}) {
	const [selected, setSelected] = useState<string>(TEMPLATE_CARDS[0].id);

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-slate-900">
					Choose Your Chatbot Style
				</h2>
				<p className="text-slate-500 mt-1">
					Pick how you want your chatbot to respond to questions.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{TEMPLATE_CARDS.map((card) => {
					const isSelected = selected === card.id;
					return (
						<button
							key={card.id}
							type="button"
							onClick={() => setSelected(card.id)}
							className={
								"relative text-left p-5 rounded-3xl border-2 transition-all duration-200 " +
								(isSelected
									? "border-[#0066cc] bg-blue-50 shadow-md"
									: "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40")
							}>
							{isSelected ? (
								<span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0066cc] flex items-center justify-center">
									<svg
										className="w-3 h-3 text-white"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={3}
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								</span>
							) : null}

							<span className="text-3xl mb-3 block">{card.icon}</span>
							<h3 className="font-semibold text-slate-900 mb-1">
								{card.title}
							</h3>
							<p className="text-xs text-slate-600 mb-3 leading-relaxed">
								{card.description}
							</p>

							<ul className="space-y-1">
								{card.bullets.map((b) => (
									<li
										key={b}
										className="flex items-center gap-1.5 text-xs text-slate-600">
										<span className="w-1 h-1 rounded-full bg-[#0066cc] flex-shrink-0" />
										{b}
									</li>
								))}
							</ul>
						</button>
					);
				})}
			</div>

			<div className="text-right pt-2">
				<button
					type="button"
					onClick={() => onComplete(selected)}
					className="px-8 py-3 rounded-2xl font-semibold text-sm bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-md hover:shadow-lg active:scale-95 transition-all duration-200">
					Launch My Chatbot →
				</button>
			</div>
		</div>
	);
}
