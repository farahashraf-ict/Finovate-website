import { useCallback, useState } from "react";
import { Sparkles } from "lucide-react";
import { AccessGate } from "../components/ask-nabeh/AccessGate";
import { StepIndicator } from "../components/ask-nabeh/StepIndicator";
import { StepUpload } from "../components/ask-nabeh/StepUpload";
import { StepTemplates } from "../components/ask-nabeh/StepTemplates";
import { StepChat } from "../components/ask-nabeh/StepChat";
import { usePlaygroundSession } from "../hooks/usePlaygroundSession";

type UploadedFile = {
	fileId: string;
	name: string;
	sizeBytes?: number;
	status: "queued" | "processing" | "ready" | "failed";
};

export default function AskNabeh() {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isAccessVerified, setIsAccessVerified] = useState(false);
	const { sessionId, sessionError, createSession, resetSession } =
		usePlaygroundSession();

	const [step, setStep] = useState(1);
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const [selectedTemplateId, setSelectedTemplateId] =
		useState("general_assistant");

	const handleUploadComplete = useCallback((files: UploadedFile[]) => {
		setUploadedFiles(files);
		setStep(2);
	}, []);

	const handleTemplateComplete = useCallback((templateId: string) => {
		setSelectedTemplateId(templateId);
		setStep(3);
	}, []);

	const handleReset = useCallback(() => {
		setUploadedFiles([]);
		setSelectedTemplateId("general_assistant");
		setStep(1);
		resetSession();
		if (accessToken) createSession(accessToken);
	}, [accessToken, createSession, resetSession]);

	return (
		<div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-3 mb-4">
						<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
							<Sparkles className="text-white" size={32} />
						</div>
						<h1 className="text-4xl bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
							Ask Nabeeh
						</h1>
					</div>
					<p className="text-slate-600">
						Upload your documents, pick a style, and test a live chatbot.
					</p>
				</div>

				<div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 p-6 sm:p-10">
					{!isAccessVerified ? (
						<AccessGate
							onVerified={({ accessToken: token }) => {
								setAccessToken(token);
								setIsAccessVerified(true);
								createSession(token);
							}}
						/>
					) : (
						<>
							<StepIndicator currentStep={step} />

							{!sessionId && !sessionError ? (
								<div className="flex flex-col items-center justify-center py-16 gap-4">
									<svg
										className="w-8 h-8 animate-spin text-[#0066cc]"
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
									<p className="text-sm text-slate-500">
										Setting up your sandbox…
									</p>
								</div>
							) : null}

							{sessionError ? (
								<div className="text-center py-16">
									<p className="text-red-600 font-medium mb-2">
										Failed to start playground
									</p>
									<p className="text-sm text-slate-500">{sessionError}</p>
									<button
										onClick={() => window.location.reload()}
										className="mt-4 px-6 py-2.5 bg-[#0066cc] text-white rounded-2xl text-sm font-semibold hover:bg-[#0052a3] transition-colors">
										Try Again
									</button>
								</div>
							) : null}

							{sessionId && !sessionError ? (
								<>
									{step === 1 ? (
										<StepUpload
											sessionId={sessionId}
											onComplete={handleUploadComplete}
										/>
									) : null}
									{step === 2 ? (
										<StepTemplates onComplete={handleTemplateComplete} />
									) : null}
									{step === 3 ? (
										<StepChat
											sessionId={sessionId}
											uploadedFiles={uploadedFiles}
											selectedTemplateId={selectedTemplateId}
											onReset={handleReset}
										/>
									) : null}
								</>
							) : null}
						</>
					)}
				</div>

				<p className="text-center text-xs text-slate-500 mt-6">
					Your documents are processed in an isolated sandbox and automatically
					deleted after 30 minutes.
				</p>
			</div>
		</div>
	);
}
