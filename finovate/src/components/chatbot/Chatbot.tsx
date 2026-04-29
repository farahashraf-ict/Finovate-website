import { useCallback, useRef, useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPanel } from "./ChatPanel";
import type { ChatMessageItem, ToolCallInfo } from "./types";

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

function coerceSecureFormFields(input: unknown): ChatMessageItem["fields"] {
	if (!Array.isArray(input)) return [];
	return input
		.filter(
			(v): v is Record<string, unknown> =>
				isRecord(v) && typeof v.name === "string"
		)
		.map((v) => ({
			name: String(v.name),
			label: typeof v.label === "string" ? v.label : undefined,
			placeholder:
				typeof v.placeholder === "string" ? v.placeholder : undefined,
			helperText: typeof v.helperText === "string" ? v.helperText : undefined,
			required: typeof v.required === "boolean" ? v.required : undefined,
			multiline: typeof v.multiline === "boolean" ? v.multiline : undefined,
			validation: isRecord(v.validation)
				? {
						requiredMessage:
							typeof v.validation.requiredMessage === "string"
								? v.validation.requiredMessage
								: undefined,
						rules: Array.isArray(v.validation.rules)
							? v.validation.rules
									.filter(
										(r): r is Record<string, unknown> =>
											isRecord(r) && typeof r.name === "string"
									)
									.map((r) => ({
										name: String(r.name),
										value: r.value,
										message:
											typeof r.message === "string" ? r.message : undefined
									}))
							: undefined
					}
				: undefined
		}));
}

function toolLabel(name: string): string {
	switch (name) {
		case "search_knowledge_base":
			return "Searching knowledge base";
		case "calculator":
			return "Calculating result";
		case "amortization_calculator":
			return "Calculating loan payment";
		case "send_email":
			return "Sending email";
		case "submit_complaint":
			return "Submitting complaint";
		case "check_complaint_status":
			return "Checking complaint status";
		case "get_available_loans":
			return "Fetching available loans";
		case "calculate_loan_eligibility":
			return "Checking loan eligibility";
		case "calculate_loan_amortization":
			return "Calculating amortization schedule";
		default:
			return `Using ${name.replace(/_/g, " ")}`;
	}
}

function toolIcon(name: string): string {
	switch (name) {
		case "search_knowledge_base":
			return "📚";
		case "calculator":
			return "🧮";
		case "amortization_calculator":
			return "💰";
		case "send_email":
			return "📧";
		case "submit_complaint":
			return "📝";
		case "check_complaint_status":
			return "🔍";
		case "get_available_loans":
			return "🏦";
		case "calculate_loan_eligibility":
			return "✅";
		case "calculate_loan_amortization":
			return "📊";
		default:
			return "⚙️";
	}
}

export default function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessageItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isStreaming, setIsStreaming] = useState(false);
	const [toolCalls, setToolCalls] = useState<ToolCallInfo[]>([]);
	const isFirstMessage = useRef(true);

	const toggleChat = useCallback(() => {
		setIsOpen((prev) => !prev);
		setMessages((prev) => {
			if (prev.length > 0) return prev;
			return [
				{
					id: `welcome_${Date.now()}`,
					type: "text",
					text: "Hello! I'm Nabeeh, How can I assist you today as the Finovate Virtual Assistant?",
					isBot: true,
					timestamp: Date.now()
				}
			];
		});
	}, []);

	const closeChat = useCallback(() => {
		setIsOpen(false);
	}, []);

	const sendMessage = useCallback(async (userMessage: string) => {
		if (!userMessage.trim()) return;

		const userMsg: ChatMessageItem = {
			id: `user_${Date.now()}`,
			type: "text",
			text: userMessage,
			isBot: false,
			timestamp: Date.now()
		};

		setMessages((prev) => [...prev, userMsg]);
		setIsLoading(true);

		const endpoint = "/api/agent";
		let botId: string | null = null;
		let aggregatedText = "";
		let receivedFirstChunk = false;

		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
				Accept: "text/event-stream"
			};

			if (isFirstMessage.current) {
				headers["X-Force-New-Session"] = "true";
				isFirstMessage.current = false;
			}

			const res = await fetch(endpoint, {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify({ query: userMessage })
			});

			if (!res.ok) {
				throw new Error(`Request failed: ${res.status}`);
			}

			const reader = res.body?.getReader();
			if (!reader) {
				const data = await res.json().catch(() => ({}));
				const payload = isRecord(data) ? data : {};
				const text = (
					payload.output ||
					payload.text ||
					payload.content ||
					""
				).toString();

				setMessages((prev) => [
					...prev,
					{
						id: `bot_${Date.now()}_final`,
						type: "text",
						text: text || "Sorry, I couldn't process that.",
						isBot: true,
						timestamp: Date.now()
					}
				]);
				return;
			}

			const decoder = new TextDecoder();
			let buffer = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });

				let eventStart: number;
				while ((eventStart = buffer.indexOf("data: ")) !== -1) {
					const eventEnd = buffer.indexOf("\n\n", eventStart);
					if (eventEnd === -1) break;

					const eventData = buffer.slice(eventStart + 6, eventEnd).trim();
					buffer = buffer.slice(eventEnd + 2);

					if (eventData === "[DONE]") break;

					try {
						const obj = safeJsonParse(eventData);
						if (!isRecord(obj) || typeof obj.type !== "string") continue;

						if (obj.type === "chunk" && typeof obj.output === "string") {
							if (!receivedFirstChunk) {
								receivedFirstChunk = true;
								setIsLoading(false);
								setIsStreaming(true);
								setToolCalls([]);
								botId = `bot_${Date.now()}_stream`;
								aggregatedText = obj.output;
								setMessages((prev) => [
									...prev,
									{
										id: botId!,
										type: "text",
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
							const id = `tool_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
							setToolCalls((prev) => {
								const alreadyRunning = prev.find(
									(t) => t.name === name && t.status === "running"
								);
								if (alreadyRunning) return prev;
								return [
									...prev,
									{
										id,
										name,
										status: "running",
										message: toolLabel(name),
										icon: toolIcon(name)
									}
								];
							});
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
						} else if (obj.type === "secure_form_request") {
							const secureFormMsg: ChatMessageItem = {
								id: `secure_${Date.now()}`,
								type: "secure_form",
								isBot: true,
								token:
									typeof obj.formToken === "string" ? obj.formToken : undefined,
								title: typeof obj.title === "string" ? obj.title : undefined,
								description:
									typeof obj.description === "string"
										? obj.description
										: undefined,
								fields: coerceSecureFormFields(obj.fields),
								context: obj.context,
								timestamp: Date.now()
							};
							setMessages((prev) => [...prev, secureFormMsg]);
							receivedFirstChunk = false;
							botId = null;
							aggregatedText = "";
						} else if (obj.type === "error") {
							const msg = typeof obj.message === "string" ? obj.message : null;
							throw new Error(msg || "Server error");
						}
					} catch {
						// Ignore malformed SSE chunks.
					}
				}
			}
		} catch {
			setMessages((prev) => [
				...prev,
				{
					id: `err_${Date.now()}`,
					type: "text",
					text: "I'm sorry, I'm currently experiencing technical difficulties. Please try again in a moment or contact our support team directly.",
					isBot: true,
					isError: true,
					timestamp: Date.now()
				}
			]);
		} finally {
			setIsLoading(false);
			setIsStreaming(false);
			setTimeout(() => setToolCalls([]), 500);
		}
	}, []);

	const handleSecureFormComplete = useCallback((result: unknown) => {
		if (!isRecord(result)) return;

		const llmResponse =
			typeof result.llmResponse === "string" ? result.llmResponse : null;
		if (llmResponse && llmResponse.trim()) {
			setMessages((prev) => [
				...prev,
				{
					id: `bot_${Date.now()}_completion`,
					type: "text",
					text: llmResponse,
					isBot: true,
					timestamp: Date.now()
				}
			]);
		}

		const toolResult = isRecord(result.toolResult) ? result.toolResult : null;
		if (toolResult && typeof toolResult.token === "string") {
			const token = toolResult.token;
			setMessages((prev) => [
				...prev,
				{
					id: `secure_${Date.now()}_next`,
					type: "secure_form",
					isBot: true,
					token,
					title: typeof toolResult.title === "string" ? toolResult.title : undefined,
					description:
						typeof toolResult.description === "string"
							? toolResult.description
							: undefined,
					fields: coerceSecureFormFields(toolResult.fields),
					context: toolResult.context,
					timestamp: Date.now()
				}
			]);
		}
	}, []);

	return (
		<>
			<ChatButton onClick={toggleChat} isOpen={isOpen} />
			<ChatPanel
				isOpen={isOpen}
				onClose={closeChat}
				messages={messages}
				onSendMessage={sendMessage}
				isLoading={isLoading}
				isStreaming={isStreaming}
				toolCalls={toolCalls}
				onFormComplete={handleSecureFormComplete}
			/>
		</>
	);
}
