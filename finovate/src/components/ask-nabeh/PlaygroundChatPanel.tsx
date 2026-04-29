import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "../chatbot/ChatInput";
import { ChatMessage } from "../chatbot/ChatMessage";

type Msg = {
	id: string;
	text: string;
	isBot: boolean;
	timestamp: number;
	isError?: boolean;
};

type ToolCall = { id: string; name: string; status: "running" | "completed" };

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function safeJsonParse(text: string): unknown {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}

const WELCOME_MSG: Msg = {
	id: "welcome",
	text: "Hello! I’m ready to answer questions based on your uploaded documents. What would you like to know?",
	isBot: true,
	timestamp: Date.now()
};

export function PlaygroundChatPanel({
	sessionId,
	templateId
}: {
	sessionId: string;
	templateId: string;
}) {
	const [messages, setMessages] = useState<Msg[]>([WELCOME_MSG]);
	const [isBusy, setIsBusy] = useState(false);
	const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);

	const endRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const autoScrollRef = useRef(true);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			autoScrollRef.current = scrollHeight - scrollTop - clientHeight < 100;
		};

		container.addEventListener("scroll", onScroll);
		return () => container.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (autoScrollRef.current)
			endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, toolCalls]);

	const sendMessage = useCallback(
		async (userMessage: string) => {
			if (!userMessage.trim() || isBusy) return;

			setMessages((prev) => [
				...prev,
				{
					id: `user_${Date.now()}`,
					text: userMessage,
					isBot: false,
					timestamp: Date.now()
				}
			]);
			setIsBusy(true);
			autoScrollRef.current = true;

			let botId: string | null = null;
			let aggregatedText = "";
			let receivedFirstChunk = false;

			try {
				const res = await fetch("/api/playground/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "text/event-stream"
					},
					body: JSON.stringify({ sessionId, query: userMessage, templateId })
				});

				if (!res.ok) {
					const data: unknown = await res.json().catch(() => ({}));
					const msg =
						isRecord(data) && typeof data.error === "string"
							? data.error
							: null;
					throw new Error(msg || `Request failed: ${res.status}`);
				}

				const reader = res.body?.getReader();
				if (!reader) throw new Error("No response body");

				const decoder = new TextDecoder();
				let buffer = "";

				while (true) {
					const { value, done } = await reader.read();
					if (done) break;
					buffer += decoder.decode(value, { stream: true });

					let start: number;
					while ((start = buffer.indexOf("data: ")) !== -1) {
						const end = buffer.indexOf("\n\n", start);
						if (end === -1) break;

						const raw = buffer.slice(start + 6, end).trim();
						buffer = buffer.slice(end + 2);

						if (raw === "[DONE]") break;

						try {
							const obj = safeJsonParse(raw);
							if (!isRecord(obj) || typeof obj.type !== "string") continue;

							if (obj.type === "chunk" && typeof obj.output === "string") {
								if (!receivedFirstChunk) {
									receivedFirstChunk = true;
									setToolCalls([]);
									botId = `bot_${Date.now()}`;
									aggregatedText = obj.output;
									setMessages((prev) => [
										...prev,
										{
											id: botId!,
											text: aggregatedText,
											isBot: true,
											timestamp: Date.now()
										}
									]);
								} else {
									aggregatedText += obj.output;
									setMessages((prev) =>
										prev.map((m) =>
											m.id === botId ? { ...m, text: aggregatedText } : m
										)
									);
								}
							} else if (obj.type === "tool_call_requested") {
								const name = typeof obj.name === "string" ? obj.name : "tool";
								setToolCalls((prev) => [
									...prev,
									{ id: `tc_${Date.now()}`, name, status: "running" }
								]);
							} else if (obj.type === "tool_call_result") {
								setToolCalls((prev) => {
									const updated = [...prev];
									for (let i = updated.length - 1; i >= 0; i--) {
										if (updated[i].status === "running") {
											updated[i] = { ...updated[i], status: "completed" };
											break;
										}
									}
									return updated;
								});
							} else if (obj.type === "error") {
								const msg =
									typeof obj.message === "string" ? obj.message : null;
								throw new Error(msg || "An error occurred");
							}
						} catch {
							// ignore malformed SSE events
						}
					}
				}
			} catch {
				setMessages((prev) => [
					...prev,
					{
						id: `err_${Date.now()}`,
						text: "Sorry, something went wrong. Please try again.",
						isBot: true,
						isError: true,
						timestamp: Date.now()
					}
				]);
			} finally {
				setIsBusy(false);
				setTimeout(() => setToolCalls([]), 600);
			}
		},
		[sessionId, templateId, isBusy]
	);

	const toolRunning = toolCalls.some((t) => t.status === "running");

	return (
		<div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
			<div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 flex-shrink-0">
				<div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
				<span className="text-sm font-semibold text-slate-800">
					Your Chatbot
				</span>
				<span className="text-xs text-slate-500 ml-auto">
					Powered by your documents
				</span>
			</div>

			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
				{messages.map((msg) => (
					<ChatMessage
						key={msg.id}
						message={msg.text}
						isBot={msg.isBot}
						isError={msg.isError}
					/>
				))}

				{toolRunning ? (
					<div className="flex items-center gap-2 text-xs text-slate-500 pl-10">
						<svg
							className="w-3.5 h-3.5 animate-spin text-[#0066cc]"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8H4z"
							/>
						</svg>
						<span>Searching your documents…</span>
					</div>
				) : null}

				{isBusy ? (
					<div className="flex items-center gap-2 text-xs text-slate-500 pl-10">
						<span className="inline-flex gap-1">
							<span
								className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
								style={{ animationDelay: "0ms" }}
							/>
							<span
								className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
								style={{ animationDelay: "150ms" }}
							/>
							<span
								className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
								style={{ animationDelay: "300ms" }}
							/>
						</span>
						<span>Thinking…</span>
					</div>
				) : null}

				<div ref={endRef} />
			</div>

			<ChatInput
				onSend={sendMessage}
				disabled={isBusy}
				placeholder="Ask about your documents…"
			/>
		</div>
	);
}
