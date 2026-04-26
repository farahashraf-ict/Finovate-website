import { useEffect, useRef } from "react";
import robot from "../../assets/robot.png";
import type { ChatMessageItem, ToolCallInfo } from "./types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SecureFormWidget } from "./widgets/SecureFormWidget";

export function ChatPanel({
	isOpen,
	onClose,
	messages,
	onSendMessage,
	isLoading,
	isStreaming,
	toolCalls = [],
	onFormComplete
}: {
	isOpen: boolean;
	onClose: () => void;
	messages: ChatMessageItem[];
	onSendMessage: (text: string) => void;
	isLoading: boolean;
	isStreaming: boolean;
	toolCalls: ToolCallInfo[];
	onFormComplete?: (result: unknown) => void;
}) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const endRef = useRef<HTMLDivElement | null>(null);
	const autoScrollEnabledRef = useRef(true);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
			autoScrollEnabledRef.current = isNearBottom || !isStreaming;
		};

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [isStreaming]);

	useEffect(() => {
		if (!isOpen || !autoScrollEnabledRef.current) return;
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [isOpen, messages, isStreaming, toolCalls]);

	useEffect(() => {
		if (!isOpen) return;
		autoScrollEnabledRef.current = true;
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className={
				"fixed inset-0 bg-white overflow-hidden flex flex-col border border-slate-200 z-[9999] " +
				"safe-area-top safe-area-bottom safe-area-left safe-area-right " +
				"sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[340px] sm:h-[500px] md:w-[380px] md:h-[580px] lg:w-[420px] lg:h-[640px] " +
				"sm:max-w-[calc(100vw-1rem)] sm:max-h-[calc(100vh-1rem)] sm:rounded-2xl sm:shadow-floating rounded-none"
			}>
			<div className="relative bg-gradient-to-br from-[#0066cc] via-[#0052a3] to-[#003b7a] rounded-t-2xl pt-6 pb-4 px-4 sm:pt-8 sm:pb-5 sm:px-6 flex-shrink-0">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#0052a3] hover:bg-[#003b7a] rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110 min-h-[44px] min-w-[44px]"
					aria-label="Close chat">
					<svg
						className="w-5 h-5 sm:w-6 sm:h-6 text-white"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="flex flex-col items-center text-center">
					<div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-3 sm:mb-4 relative">
						<div className="absolute inset-0 rounded-full bg-[#d9ebff] opacity-40 animate-pulse" />
						<div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full" />
						<div className="relative z-10 animate-bounce-gentle">
							<img
								src={robot}
								alt="AI Robot"
								className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
							/>
						</div>
						<div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-300 rounded-full animate-ping opacity-60" />
						<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#60a5fa] rounded-full animate-pulse opacity-50" />
						<div className="absolute inset-0 rounded-full border border-[#93c5fd] opacity-25 animate-spin animation-duration-3000" />
					</div>

					<h3 className="font-bold text-white text-base sm:text-lg mb-1">
						<span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent animate-gradient-x">
							Nabeeh
						</span>{" "}
						The Bot
					</h3>

					<p className="text-xs sm:text-sm text-blue-100 flex items-center gap-1">
						<span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
						Online
					</p>
				</div>
			</div>

			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
				{messages.length === 0 ? (
					<div className="text-center py-6 sm:py-8 animate-fade-in">
						<div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0066cc] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float shadow-lg">
							<svg
								className="w-8 h-8 sm:w-10 sm:h-10 text-white"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
							</svg>
						</div>
						<h4 className="font-semibold text-slate-900 mb-2 sm:mb-3 text-base sm:text-lg">
							Welcome to the Finovate Virtual Assistant
						</h4>
						<p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto px-2">
							I&apos;m your intelligent assistant powered by advanced AI. Ask me
							anything about Finovate.
						</p>
						<div className="mt-3 sm:mt-4 flex justify-center space-x-1 sm:space-x-2">
							<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce-gentle" />
							<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0066cc] rounded-full animate-bounce-gentle delay-100" />
							<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#003b7a] rounded-full animate-bounce-gentle delay-200" />
						</div>
					</div>
				) : (
					messages.map((m, index) => (
						<div key={m.id || index} className="animate-slide-up">
							{m.type === "secure_form" && m.token && m.fields ? (
								<SecureFormWidget
									token={m.token}
									title={m.title}
									description={m.description}
									fields={m.fields}
									onComplete={onFormComplete}
								/>
							) : (
								<ChatMessage
									message={m.text || ""}
									isBot={m.isBot}
									isError={m.isError}
									timestamp={m.timestamp}
								/>
							)}
						</div>
					))
				)}

				{isLoading && (
					<div className="flex justify-start mb-3 sm:mb-4 animate-fade-in">
						<div className="flex items-end space-x-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
							<div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#0066cc] to-[#003b7a] rounded-full flex items-center justify-center shadow-sm animate-pulse flex-shrink-0 relative">
								<img
									src={robot}
									alt="AI Robot"
									className="w-4 h-4 sm:w-5 sm:h-5 object-contain animate-bounce-gentle"
								/>
								<div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-75" />
								<div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#60a5fa] rounded-full animate-pulse opacity-60" />
							</div>
							<div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 flex-1 relative overflow-hidden shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/5 to-cyan-400/5 rounded-2xl animate-pulse" />
								<div className="relative flex items-center space-x-2">
									<div className="flex space-x-0.5">
										<div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full animate-bounce" />
										<div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full animate-bounce delay-150" />
										<div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full animate-bounce delay-300" />
									</div>
									<span className="text-xs text-slate-600 font-medium animate-pulse flex-1">
										Thinking...
									</span>
									<span className="text-[#0066cc] font-bold animate-blink text-sm">
										|
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{toolCalls.length > 0 && (
					<div className="flex justify-start mb-2 animate-fade-in">
						<div className="flex flex-wrap gap-1.5 max-w-[85%]">
							{toolCalls.map((tc, index) => (
								<div
									key={tc.id}
									className={
										"inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all duration-300 shadow-sm " +
										(tc.status === "completed"
											? "bg-emerald-100 text-emerald-700 border border-emerald-200"
											: "bg-cyan-50 text-[#0066cc] border border-cyan-200")
									}
									style={{ animationDelay: `${index * 50}ms` }}>
									<span
										className={`text-sm ${
											tc.status === "running" ? "animate-pulse" : ""
										}`}>
										{tc.icon || "⚙️"}
									</span>
									<span className="font-medium">{tc.message}</span>
									{tc.status === "completed" ? (
										<span className="text-emerald-600 font-bold">✓</span>
									) : (
										<div className="flex space-x-0.5">
											<div className="w-1 h-1 bg-[#0066cc] rounded-full animate-bounce" />
											<div className="w-1 h-1 bg-[#0066cc] rounded-full animate-bounce delay-100" />
											<div className="w-1 h-1 bg-[#0066cc] rounded-full animate-bounce delay-200" />
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				<div ref={endRef} />
			</div>

			<ChatInput
				onSend={onSendMessage}
				isLoading={isLoading}
				isStreaming={isStreaming}
			/>
		</div>
	);
}
