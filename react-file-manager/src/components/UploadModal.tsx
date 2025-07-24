import React, { useRef, useState, DragEvent } from "react";

interface UploadModalProps {
	open: boolean;
	onClose: () => void;
	onUploadFile: (file: File) => Promise<void>;
	onUploadUrl: (url: string) => Promise<void>;
}

const UploadModal: React.FC<UploadModalProps> = ({
	open,
	onClose,
	onUploadFile,
	onUploadUrl,
}) => {
	const [tab, setTab] = useState<"file" | "url">("file");
	const [files, setFiles] = useState<File[]>([]);
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	if (!open) return null;

	// 파일 추가(선택/드롭 모두)
	const addFiles = (fileList: FileList | File[]) => {
		const arr = Array.from(fileList);
		setFiles((prev) => [...prev, ...arr]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			addFiles(e.target.files);
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!loading) setDragActive(true);
	};
	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			addFiles(e.dataTransfer.files);
			setTab("file");
		}
	};

	const handleUploadFiles = async () => {
		if (files.length === 0) return;
		setLoading(true);
		setError(null);
		try {
			for (const file of files) {
				await onUploadFile(file);
			}
			setFiles([]);
			onClose();
		} catch (e: any) {
			setError(e.message || "업로드 실패");
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveFile = (idx: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== idx));
	};

	const handleUploadUrl = async () => {
		if (!url.trim()) return;
		setLoading(true);
		setError(null);
		try {
			await onUploadUrl(url.trim());
			setUrl("");
			onClose();
		} catch (e: any) {
			setError(e.message || "업로드 실패");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
					onClick={onClose}
					aria-label="닫기"
				>
					×
				</button>
				<div className="flex mb-4 border-b">
					<button
						className={`flex-1 py-2 ${
							tab === "file"
								? "border-b-2 border-blue-500 font-bold"
								: ""
						}`}
						onClick={() => setTab("file")}
					>
						로컬 파일
					</button>
					<button
						className={`flex-1 py-2 ${
							tab === "url" ? "border-b-2 border-blue-500 font-bold" : ""
						}`}
						onClick={() => setTab("url")}
					>
						이미지 URL
					</button>
				</div>
				{/* 드래그&드롭/파일선택 통합 영역 */}
				{tab === "file" && (
					<>
						<div
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							onClick={() => fileInputRef.current?.click()}
							className={`mb-4 transition-all cursor-pointer select-none ${
								dragActive ? "border-2 border-blue-400 bg-blue-50" : ""
							}`}
							style={{
								minHeight: 80,
								borderRadius: 8,
								border: dragActive ? undefined : "2px dashed #e5e7eb",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<input
								type="file"
								accept="image/*,application/pdf,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								ref={fileInputRef}
								onChange={handleFileChange}
								multiple
								disabled={loading}
								style={{ display: "none" }}
							/>
							{dragActive ? (
								<span className="text-blue-500 font-bold">
									여기에 파일을 드롭하세요
								</span>
							) : (
								<span className="text-gray-400 mb-2">
									마우스로 파일을 끌어다 놓거나{" "}
									<span className="underline">클릭해서 선택</span>
									해주세요
								</span>
							)}
						</div>
						{/* 파일 리스트 */}
						{files.length > 0 && (
							<div className="mb-4 bg-gray-50 rounded p-2 max-h-32 overflow-y-auto">
								{files.map((f, i) => (
									<div
										key={i}
										className="flex items-center justify-between text-xs py-1 px-2 border-b last:border-b-0"
									>
										<span
											className="truncate max-w-[140px]"
											title={f.name}
										>
											{f.name}
										</span>
										<span className="text-gray-400 ml-2">
											{(f.size / 1024).toFixed(1)} KB
										</span>
										<button
											className="ml-2 text-red-400 hover:text-red-600"
											onClick={(e) => {
												e.stopPropagation();
												handleRemoveFile(i);
											}}
											title="제거"
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
						<button
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
							onClick={handleUploadFiles}
							disabled={files.length === 0 || loading}
						>
							{loading ? "업로드 중..." : "업로드"}
						</button>
					</>
				)}
				{tab === "url" && (
					<div>
						<input
							type="text"
							placeholder="이미지 URL을 입력하세요"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="w-full border rounded px-2 py-1 mb-4"
							disabled={loading}
						/>
						<button
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
							onClick={handleUploadUrl}
							disabled={!url.trim() || loading}
						>
							{loading ? "업로드 중..." : "업로드"}
						</button>
					</div>
				)}
				{error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
			</div>
		</div>
	);
};

export default UploadModal;
