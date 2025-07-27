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
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden">
				{/* 헤더 */}
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">파일 업로드</h2>
						<button
							className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
							onClick={onClose}
							aria-label="닫기"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* 탭 네비게이션 */}
				<div className="flex bg-gray-50">
					<button
						className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
							tab === "file"
								? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
								: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
						}`}
						onClick={() => setTab("file")}
					>
						<div className="flex items-center justify-center space-x-2">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<span>로컬 파일</span>
						</div>
					</button>
					<button
						className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
							tab === "url"
								? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
								: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
						}`}
						onClick={() => setTab("url")}
					>
						<div className="flex items-center justify-center space-x-2">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
							<span>이미지 URL</span>
						</div>
					</button>
				</div>

				{/* 컨텐츠 */}
				<div className="p-6">
					{/* 드래그&드롭/파일선택 통합 영역 */}
					{tab === "file" && (
						<>
							<div
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								onClick={() => fileInputRef.current?.click()}
								className={`mb-6 transition-all duration-300 cursor-pointer select-none rounded-xl border-2 border-dashed ${
									dragActive
										? "border-blue-400 bg-blue-50 scale-105"
										: "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
								}`}
								style={{
									minHeight: 120,
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
								<div className="text-center">
									<div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
									</div>
									{dragActive ? (
										<p className="text-blue-600 font-medium">
											여기에 파일을 드롭하세요
										</p>
									) : (
										<div>
											<p className="text-gray-600 mb-1">
												파일을 드래그하거나 클릭하여 선택하세요
											</p>
											<p className="text-sm text-gray-400">
												지원 형식: 이미지, PDF, ZIP, Word
											</p>
										</div>
									)}
								</div>
							</div>

							{/* 파일 리스트 */}
							{files.length > 0 && (
								<div className="mb-6 bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto">
									<h3 className="text-sm font-medium text-gray-700 mb-3">
										선택된 파일 ({files.length})
									</h3>
									<div className="space-y-2">
										{files.map((f, i) => (
											<div
												key={i}
												className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border"
											>
												<div className="flex items-center space-x-3 flex-1 min-w-0">
													<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
														<svg
															className="w-4 h-4 text-blue-600"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
															/>
														</svg>
													</div>
													<div className="flex-1 min-w-0">
														<p
															className="text-sm font-medium text-gray-900 truncate"
															title={f.name}
														>
															{f.name}
														</p>
														<p className="text-xs text-gray-500">
															{(f.size / 1024).toFixed(1)} KB
														</p>
													</div>
												</div>
												<button
													className="ml-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
													onClick={(e) => {
														e.stopPropagation();
														handleRemoveFile(i);
													}}
													title="제거"
												>
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
										))}
									</div>
								</div>
							)}

							<button
								className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
								onClick={handleUploadFiles}
								disabled={files.length === 0 || loading}
							>
								{loading ? (
									<div className="flex items-center justify-center space-x-2">
										<svg
											className="animate-spin w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										<span>업로드 중...</span>
									</div>
								) : (
									<div className="flex items-center justify-center space-x-2">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
										<span>파일 업로드</span>
									</div>
								)}
							</button>
						</>
					)}

					{tab === "url" && (
						<div>
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									이미지 URL
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg
											className="h-5 w-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
											/>
										</svg>
									</div>
									<input
										type="text"
										placeholder="https://example.com/image.jpg"
										value={url}
										onChange={(e) => setUrl(e.target.value)}
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										disabled={loading}
									/>
								</div>
							</div>

							<button
								className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
								onClick={handleUploadUrl}
								disabled={!url.trim() || loading}
							>
								{loading ? (
									<div className="flex items-center justify-center space-x-2">
										<svg
											className="animate-spin w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										<span>업로드 중...</span>
									</div>
								) : (
									<div className="flex items-center justify-center space-x-2">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
											/>
										</svg>
										<span>URL 업로드</span>
									</div>
								)}
							</button>
						</div>
					)}

					{error && (
						<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-red-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span className="text-red-700 text-sm font-medium">
									{error}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
