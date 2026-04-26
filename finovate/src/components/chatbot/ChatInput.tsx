import { useEffect, useRef, useState } from "react";
import { Mic, Send, Square } from "lucide-react";
import { getDirectionStyles, getTextDirection } from "./textUtils";

export function ChatInput({
	onSend,
	isLoading,
	isStreaming,
	disabled,
	placeholder
}: {
	onSend: (text: string) => void;
	isLoading?: boolean;
	isStreaming?: boolean;
	disabled?: boolean;
	placeholder?: string;
}) {
	const [input, setInput] = useState("");
	const [isRecording, setIsRecording] = useState(false);
	const [recordingTime, setRecordingTime] = useState(0);
	const [isTranscribing, setIsTranscribing] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const recordingIntervalRef = useRef<number | null>(null);
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	const adjustTextareaHeight = () => {
		const ta = inputRef.current;
		if (!ta) return;
		ta.style.height = "auto";
		const max = 80;
		const newHeight = Math.min(ta.scrollHeight, max);
		ta.style.height = `${newHeight}px`;
		ta.style.overflowY = ta.scrollHeight > max ? "auto" : "hidden";
	};

	const send = () => {
		const value = input.trim();
		if (
			!value ||
			isLoading ||
			isStreaming ||
			disabled ||
			isRecording ||
			isTranscribing
		) {
			return;
		}
		onSend(value);
		setInput("");
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
				await handleTranscribe(audioBlob);
				stream.getTracks().forEach((track) => track.stop());
			};

			mediaRecorder.start();
			setIsRecording(true);
			setRecordingTime(0);
			recordingIntervalRef.current = window.setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1000);
		} catch {
			setIsRecording(false);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
			setRecordingTime(0);
			if (recordingIntervalRef.current) {
				window.clearInterval(recordingIntervalRef.current);
				recordingIntervalRef.current = null;
			}
		}
	};

	const handleTranscribe = async (audioBlob: Blob) => {
		setIsTranscribing(true);
		try {
			const formData = new FormData();
			formData.append("audio", audioBlob, "recording.webm");

			const response = await fetch("/api/transcribe", {
				method: "POST",
				body: formData
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = (await response.json()) as { userMessage?: string };
			if (data.userMessage?.trim()) {
				onSend(data.userMessage);
			}
		} finally {
			setIsTranscribing(false);
		}
	};

	const formatRecordingTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	useEffect(() => {
		adjustTextareaHeight();
		return () => {
			if (recordingIntervalRef.current) {
				window.clearInterval(recordingIntervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		adjustTextareaHeight();
	}, [input]);

	return (
		<div className="border-t border-slate-200 bg-white p-3 sm:p-4 flex-shrink-0 safe-area-bottom">
			{isRecording && (
				<div className="mb-2 sm:mb-3 flex items-center justify-center space-x-2 text-red-600">
					<div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full animate-pulse" />
					<span className="text-xs sm:text-sm font-medium">
						Recording: {formatRecordingTime(recordingTime)}
					</span>
				</div>
			)}

			{isTranscribing && (
				<div className="mb-2 sm:mb-3 flex items-center justify-center space-x-2 text-[#0066cc]">
					<svg
						className="animate-spin h-3 w-3 sm:h-4 sm:w-4"
						xmlns="http://www.w3.org/2000/svg"
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
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					<span className="text-xs sm:text-sm font-medium">
						Transcribing audio...
					</span>
				</div>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					send();
				}}
				className="flex items-center space-x-2 sm:space-x-3">
				<div className="flex-1 relative">
					<textarea
						ref={inputRef}
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
							adjustTextareaHeight();
						}}
						placeholder={
							placeholder ||
							(isStreaming
								? "AI is responding... You can type but wait to send"
								: "Type your message or use the microphone...")
						}
						disabled={isRecording || disabled}
						className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-12 sm:pr-14 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px] max-h-[120px] overflow-y-auto h-auto custom-scrollbar"
						style={getDirectionStyles(input)}
						dir={getTextDirection(input)}
						maxLength={500}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								send();
							}
						}}
					/>

					<button
						type="button"
						onClick={isRecording ? stopRecording : startRecording}
						disabled={isLoading || isTranscribing || disabled}
						className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-200 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
							isRecording
								? "bg-red-100 text-red-600 hover:bg-red-200"
								: "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#0066cc]"
						} disabled:opacity-50 disabled:cursor-not-allowed`}
						aria-label={
							isRecording ? "Stop voice recording" : "Start voice recording"
						}>
						{isRecording ? (
							<Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
						) : (
							<Mic className="w-3 h-3 sm:w-4 sm:h-4" />
						)}
					</button>
				</div>

				<button
					type="submit"
					disabled={
						!input.trim() ||
						isLoading ||
						disabled ||
						isRecording ||
						isTranscribing ||
						isStreaming
					}
					className="px-4 py-2.5 sm:px-6 sm:py-3 bg-[#0066cc] text-white rounded-xl hover:bg-[#0052a3] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center min-h-[44px] min-w-[44px]">
					{isLoading ? (
						<svg
							className="animate-spin h-3 w-3 sm:h-4 sm:w-4"
							xmlns="http://www.w3.org/2000/svg"
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
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					) : (
						<Send className="w-3 h-3 sm:w-4 sm:h-4" />
					)}
					<span className="ml-1 sm:ml-2 hidden sm:inline text-sm sm:text-base">
						Send
					</span>
				</button>
			</form>

			<div className="mt-1 sm:mt-2 text-right">
				<span
					className={`text-xs ${
						input.length > 450 ? "text-red-500" : "text-slate-400"
					}`}>
					{input.length}/500
				</span>
			</div>

			<div className="mt-1 sm:mt-2 text-center">
				<span className="text-xs text-slate-500">
					AI can make mistakes. Please verify important information.
				</span>
			</div>
		</div>
	);
}
