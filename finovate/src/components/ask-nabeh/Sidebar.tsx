import { TEMPLATE_CARDS } from "./templateCards";

type UploadedFile = {
	fileId: string;
	name: string;
	sizeBytes?: number;
	status: "queued" | "processing" | "ready" | "failed";
};

function FileStatusDot({ status }: { status: UploadedFile["status"] }) {
	const map: Record<UploadedFile["status"], string> = {
		queued: "bg-slate-300",
		processing: "bg-blue-400 animate-pulse",
		ready: "bg-emerald-400",
		failed: "bg-red-400"
	};
	return (
		<span
			className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${map[status]}`}
		/>
	);
}

export function Sidebar({
	uploadedFiles,
	selectedTemplateId,
	onReset
}: {
	uploadedFiles: UploadedFile[];
	selectedTemplateId: string;
	onReset: () => void;
}) {
	const template = TEMPLATE_CARDS.find((t) => t.id === selectedTemplateId);

	return (
		<div className="flex flex-col gap-5 h-full">
			<div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4">
				<h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
					<span>📄</span> Your Documents
				</h3>

				{uploadedFiles.length === 0 ? (
					<p className="text-xs text-slate-500">No documents uploaded.</p>
				) : (
					<ul className="space-y-2">
						{uploadedFiles.map((f) => (
							<li key={f.fileId} className="flex items-center gap-2">
								<FileStatusDot status={f.status} />
								<span className="text-xs text-slate-700 truncate flex-1">
									{f.name}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>

			{template ? (
				<div className="bg-blue-50 rounded-3xl border border-blue-100 p-4">
					<h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
						<span>{template.icon}</span> {template.title}
					</h3>
					<p className="text-xs text-slate-600 mb-3">{template.description}</p>
					<ul className="space-y-1">
						{template.bullets.map((b) => (
							<li
								key={b}
								className="flex items-center gap-1.5 text-xs text-slate-600">
								<span className="w-1 h-1 rounded-full bg-[#0066cc] flex-shrink-0" />
								{b}
							</li>
						))}
					</ul>
				</div>
			) : null}

			<div className="bg-slate-50 rounded-3xl border border-slate-200 p-4">
				<h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
					Tips
				</h3>
				<ul className="space-y-1.5 text-xs text-slate-600">
					<li>• Ask specific questions about your documents</li>
					<li>• Try “Summarize the main points”</li>
					<li>• Ask “What does the document say about X?”</li>
				</ul>
			</div>

			<div className="mt-auto">
				<button
					type="button"
					onClick={onReset}
					className="w-full py-2.5 px-4 text-sm text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:text-slate-800 transition-colors">
					↩ Start Over
				</button>
			</div>
		</div>
	);
}
