import { useCallback, useEffect, useRef, useState } from "react";

const MAX_FILES = 3;
const POLL_INTERVAL_MS = 1500;

type UploadFileState = {
	fileId: string;
	name: string;
	sizeBytes: number;
	status: "queued" | "processing" | "ready" | "failed";
	errorMessage?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isStatus(value: unknown): value is UploadFileState["status"] {
	return (
		value === "queued" ||
		value === "processing" ||
		value === "ready" ||
		value === "failed"
	);
}

function FileStatusBadge({ status }: { status: UploadFileState["status"] }) {
	const map: Record<UploadFileState["status"], { label: string; cls: string }> =
		{
			queued: { label: "Queued", cls: "bg-slate-100 text-slate-500" },
			processing: {
				label: "Processing",
				cls: "bg-blue-50 text-[#0066cc] animate-pulse"
			},
			ready: { label: "Ready", cls: "bg-emerald-50 text-emerald-700" },
			failed: { label: "Failed", cls: "bg-red-50 text-red-700" }
		};
	const { label, cls } = map[status];
	return (
		<span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
			{label}
		</span>
	);
}

export function StepUpload({
	sessionId,
	onComplete
}: {
	sessionId: string;
	onComplete: (files: UploadFileState[]) => void;
}) {
	const [files, setFiles] = useState<UploadFileState[]>([]);
	const [dragActive, setDragActive] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const pollRef = useRef<number | null>(null);

	const allReady =
		files.length > 0 &&
		files.every((f) => f.status === "ready" || f.status === "failed");
	const anyReady = files.some((f) => f.status === "ready");

	const pollStatus = useCallback(async () => {
		if (!sessionId) return;
		try {
			const res = await fetch(
				`/api/playground/session/status?sessionId=${encodeURIComponent(sessionId)}`
			);
			if (!res.ok) return;
			const data: unknown = await res.json().catch(() => ({}));
			if (!isRecord(data) || !Array.isArray(data.files)) return;

			const nextFiles: UploadFileState[] = data.files
				.filter((f): f is Record<string, unknown> => isRecord(f))
				.map((f) => {
					const statusValue = f.status;
					return {
						fileId: String(f.fileId ?? ""),
						name: String(f.name ?? ""),
						sizeBytes: Number(f.sizeBytes ?? 0),
						status: isStatus(statusValue) ? statusValue : "processing",
						errorMessage:
							typeof f.errorMessage === "string" ? f.errorMessage : null
					};
				});

			setFiles(nextFiles);
		} catch {
			// polling failures are non-critical
		}
	}, [sessionId]);

	useEffect(() => {
		if (!sessionId || files.length === 0) return;
		if (allReady) {
			if (pollRef.current) window.clearInterval(pollRef.current);
			pollRef.current = null;
			return;
		}

		if (pollRef.current) window.clearInterval(pollRef.current);
		pollRef.current = window.setInterval(pollStatus, POLL_INTERVAL_MS);

		return () => {
			if (pollRef.current) window.clearInterval(pollRef.current);
			pollRef.current = null;
		};
	}, [sessionId, files.length, allReady, pollStatus]);

	const uploadFile = async (file: File) => {
		setError("");

		if (files.length >= MAX_FILES) {
			setError(`Maximum ${MAX_FILES} documents allowed.`);
			return;
		}
		if (file.type !== "application/pdf") {
			setError("Only PDF files are accepted.");
			return;
		}
		if (file.size > 20 * 1024 * 1024) {
			setError("File exceeds 20 MB limit.");
			return;
		}

		setUploading(true);
		try {
			const form = new FormData();
			form.append("sessionId", sessionId);
			form.append("file", file);

			const res = await fetch("/api/playground/upload", {
				method: "POST",
				body: form
			});
			const data: unknown = await res.json().catch(() => ({}));

			if (!res.ok) {
				const msg =
					isRecord(data) && typeof data.error === "string" ? data.error : null;
				setError(msg || "Upload failed.");
				return;
			}

			if (!isRecord(data)) {
				setError("Upload failed.");
				return;
			}

			const statusValue = data.status;
			const status: UploadFileState["status"] = isStatus(statusValue)
				? statusValue
				: "queued";

			setFiles((prev) => [
				...prev,
				{
					fileId: String(data.fileId ?? ""),
					name: String(data.name ?? ""),
					sizeBytes: Number(data.sizeBytes ?? 0),
					status
				}
			]);
		} catch {
			setError("Upload failed. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	const handleFiles = (fileList: FileList | null) => {
		if (!fileList) return;
		const pdfs = Array.from(fileList).filter(
			(f) => f.type === "application/pdf"
		);
		if (pdfs.length === 0) {
			setError("Only PDF files are accepted.");
			return;
		}

		const remaining = MAX_FILES - files.length;
		pdfs.slice(0, remaining).forEach(uploadFile);
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(e.type === "dragenter" || e.type === "dragover");
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(false);
		handleFiles(e.dataTransfer.files);
	};

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-slate-900">
					Upload Your Documents
				</h2>
				<p className="text-slate-500 mt-1">
					Upload up to {MAX_FILES} PDF files. Your chatbot will learn from them.
				</p>
			</div>

			<div
				onDragEnter={handleDrag}
				onDragOver={handleDrag}
				onDragLeave={() => setDragActive(false)}
				onDrop={handleDrop}
				onClick={() =>
					!uploading && files.length < MAX_FILES && inputRef.current?.click()
				}
				className={
					"relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 " +
					(dragActive
						? "border-[#0066cc] bg-blue-50 scale-[1.01]"
						: files.length >= MAX_FILES
							? "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60"
							: "border-slate-200 bg-white hover:border-[#0066cc] hover:bg-blue-50")
				}>
				<input
					ref={inputRef}
					type="file"
					accept="application/pdf"
					multiple
					className="hidden"
					onChange={(e) => handleFiles(e.target.files)}
					disabled={uploading || files.length >= MAX_FILES}
				/>

				<div className="flex flex-col items-center gap-3 pointer-events-none">
					<div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
						<svg
							className="w-7 h-7 text-[#0066cc]"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
					</div>

					<div>
						<p className="font-semibold text-slate-800">
							{dragActive ? "Drop your PDFs here" : "Drag & drop PDFs here"}
						</p>
						<p className="text-sm text-slate-500 mt-0.5">
							or click to browse — PDF only, max 20 MB each
						</p>
					</div>

					{uploading ? (
						<div className="flex items-center gap-2 text-[#0066cc] text-sm font-medium">
							<svg
								className="w-4 h-4 animate-spin"
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
							Uploading…
						</div>
					) : null}
				</div>
			</div>

			{error ? (
				<p className="text-sm text-red-600 text-center">{error}</p>
			) : null}

			{files.length > 0 ? (
				<ul className="space-y-2">
					{files.map((f) => (
						<li
							key={f.fileId}
							className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
							<div className="flex items-center gap-3 min-w-0">
								<span className="text-2xl">📄</span>
								<div className="min-w-0">
									<p className="text-sm font-medium text-slate-800 truncate">
										{f.name}
									</p>
									<p className="text-xs text-slate-500">
										{(f.sizeBytes / 1024).toFixed(0)} KB
									</p>
								</div>
							</div>
							<FileStatusBadge status={f.status} />
						</li>
					))}
				</ul>
			) : null}

			<div className="text-right pt-2">
				<button
					type="button"
					onClick={() => anyReady && onComplete(files)}
					disabled={!anyReady}
					className={
						"px-8 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 " +
						(anyReady
							? "bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-md hover:shadow-lg active:scale-95"
							: "bg-slate-100 text-slate-400 cursor-not-allowed")
					}>
					{allReady ? "Next: Pick a Template →" : "Waiting for processing…"}
				</button>
			</div>
		</div>
	);
}
