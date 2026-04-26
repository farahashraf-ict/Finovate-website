import { PlaygroundChatPanel } from "./PlaygroundChatPanel";
import { Sidebar } from "./Sidebar";

type UploadedFile = {
	fileId: string;
	name: string;
	sizeBytes?: number;
	status: "queued" | "processing" | "ready" | "failed";
};

export function StepChat({
	sessionId,
	uploadedFiles,
	selectedTemplateId,
	onReset
}: {
	sessionId: string;
	uploadedFiles: UploadedFile[];
	selectedTemplateId: string;
	onReset: () => void;
}) {
	return (
		<div className="space-y-4">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-slate-900">
					Test Your Chatbot
				</h2>
				<p className="text-slate-500 mt-1">
					Ask questions — your chatbot will answer using only your documents.
				</p>
			</div>

			<div
				className="flex flex-col lg:flex-row gap-4"
				style={{ height: "520px" }}>
				<div className="flex-1 lg:flex-[3] min-h-0 h-72 lg:h-full">
					<PlaygroundChatPanel
						sessionId={sessionId}
						templateId={selectedTemplateId}
					/>
				</div>

				<div className="lg:flex-[2] lg:h-full overflow-y-auto">
					<Sidebar
						uploadedFiles={uploadedFiles}
						selectedTemplateId={selectedTemplateId}
						onReset={onReset}
					/>
				</div>
			</div>
		</div>
	);
}
