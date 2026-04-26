import { useRef, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import robot from "../../assets/robot.png";
import {
	getDirectionStyles,
	getTextDirection,
	highlightNabeeh
} from "./textUtils";

export function ChatMessage({
	message,
	isBot,
	isError,
	timestamp
}: {
	message: string;
	isBot: boolean;
	isError?: boolean;
	timestamp?: number;
}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoadingTts, setIsLoadingTts] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleTts = async () => {
		if (!isBot) return;

		if (isPlaying) {
			audioRef.current?.pause();
			setIsPlaying(false);
			return;
		}

		setIsLoadingTts(true);
		try {
			const response = await fetch("/api/voice", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: message })
			});

			if (!response.ok) {
				throw new Error(`TTS failed: ${response.status}`);
			}

			const audioBlob = await response.blob();
			const url = URL.createObjectURL(audioBlob);

			if (audioRef.current) {
				audioRef.current.src = url;
				await audioRef.current.play();
				setIsPlaying(true);
			}
		} catch {
			setIsPlaying(false);
		} finally {
			setIsLoadingTts(false);
		}
	};

	return (
		<div
			className={`flex ${
				isBot ? "justify-start" : "justify-end"
			} mb-3 sm:mb-4 animate-fade-in`}>
			<div
				className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${
					isBot ? "order-2" : "order-1"
				}`}>
				{isBot && (
					<div className="flex items-center mb-1 sm:mb-2">
						<div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#0066cc] to-[#003b7a] rounded-full flex items-center justify-center mr-2 shadow-sm">
							<img
								src={robot}
								alt="AI Robot"
								className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
							/>
						</div>
					</div>
				)}

				<div
					className={`rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed shadow-sm transition-all duration-200 hover:shadow-md max-w-sm ${
						isBot
							? isError
								? "bg-red-50 text-red-700 border border-red-100"
								: "bg-gradient-to-r from-slate-50 to-blue-50 text-slate-800 border border-slate-200"
							: "bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white shadow-[#0066cc]/20"
					}`}
					style={{
						...getDirectionStyles(message),
						unicodeBidi: "isolate"
					}}
					dir={getTextDirection(message)}>
					<span
						className="whitespace-pre-wrap break-words"
						style={{ unicodeBidi: "isolate" }}
						dangerouslySetInnerHTML={{ __html: highlightNabeeh(message) }}
					/>
				</div>

				<div className="flex items-center justify-between mt-1 sm:mt-2">
					<span className="text-xs text-slate-500">
						{timestamp
							? new Date(timestamp).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit"
								})
							: "now"}
					</span>

					{isBot && (
						<button
							onClick={handleTts}
							disabled={isLoadingTts}
							className={`ml-2 p-1.5 rounded-full transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] min-w-[36px] flex items-center justify-center ${
								isPlaying
									? "bg-blue-100 text-[#0052a3]"
									: "hover:bg-blue-50 text-slate-500 hover:text-[#0066cc]"
							}`}
							aria-label={isPlaying ? "Stop audio" : "Play audio"}>
							{isLoadingTts ? (
								<div className="flex space-x-0.5 sm:space-x-1">
									<div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#0066cc] rounded-full animate-bounce" />
									<div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#0066cc] rounded-full animate-bounce delay-100" />
									<div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#0066cc] rounded-full animate-bounce delay-200" />
								</div>
							) : isPlaying ? (
								<Square className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
							) : (
								<Volume2 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
							)}
						</button>
					)}
				</div>

				<audio
					ref={audioRef}
					onEnded={() => setIsPlaying(false)}
					onError={() => setIsPlaying(false)}
					className="hidden"
					aria-label="Text-to-speech audio"
				/>
			</div>
		</div>
	);
}
