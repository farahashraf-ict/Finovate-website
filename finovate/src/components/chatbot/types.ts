export type ToolCallStatus = "running" | "completed";

export interface ToolCallInfo {
	id: string;
	name: string;
	message: string;
	status: ToolCallStatus;
	icon?: string;
}

export type ChatMessageType = "text" | "secure_form";

export interface ChatMessageItem {
	id: string;
	type?: ChatMessageType;
	text?: string;
	isBot: boolean;
	timestamp: number;
	isError?: boolean;
	token?: string;
	title?: string;
	description?: string;
	fields?: Array<{
		name: string;
		label?: string;
		placeholder?: string;
		helperText?: string;
		required?: boolean;
		multiline?: boolean;
		validation?: {
			requiredMessage?: string;
			rules?: Array<{ name: string; value?: unknown; message?: string }>;
		};
	}>;
	context?: unknown;
}
