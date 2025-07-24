import React, { useState, useMemo, useCallback } from "react";
import { useFileManager } from "../hooks/useFileManager";
import { useDropzone } from "react-dropzone";
import { FaSearch, FaTimes, FaChevronRight } from "react-icons/fa";

const SearchIcon = FaSearch as unknown as React.FC<{ className?: string }>;
const CloseIcon = FaTimes as unknown as React.FC<{ className?: string }>;
const ChevronIcon = FaChevronRight as unknown as React.FC<{
	className?: string;
}>;

const Toolbar: React.FC = React.memo(() => {
	const {
		nodes,
		allFolders,
		selectedFolderId,
		addFolder,
		reset,
		sort,
		setSort,
		selectFolder,
		loading,
		error,
		uploadFile,
		clipboard,
		searchQuery,
		setSearchQuery,
	} = useFileManager();

	const [newFolderMode, setNewFolderMode] = React.useState(false);
	const [newFolderName, setNewFolderName] = React.useState("");

	// 검색 결과 타입 정의
	interface SearchResult {
		id: number;
		name: string;
		path: string;
		isFolder: boolean;
		parentId: number;
	}

	// 노드의 경로를 가져오는 함수 - useCallback으로 최적화
	const getNodePath = useCallback(
		(nodeId: number): string => {
			const path: string[] = [];
			let currentId = nodeId;

			while (currentId !== 0) {
				const node = nodes.find((n) => n.id === currentId);
				if (node) {
					path.unshift(node.name);
					currentId = node.parent;
				} else {
					break;
				}
			}

			return path.join(" > ");
		},
		[nodes]
	);

	// 전체 폴더에서 검색하는 함수
	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.toLowerCase();
		const results: SearchResult[] = [];

		// 모든 노드에서 검색
		nodes.forEach((node) => {
			if (node.name.toLowerCase().includes(query)) {
				// 경로 구성
				const path = getNodePath(node.id);
				results.push({
					id: node.id,
					name: node.name,
					path: path,
					isFolder: node.isFolder,
					parentId: node.parent,
				});
			}
		});

		// 이름 순으로 정렬
		return results.sort((a, b) => a.name.localeCompare(b.name));
	}, [searchQuery, nodes, getNodePath]);

	// breadcrumb 경로 계산 - useMemo로 최적화
	const path = useMemo(() => {
		// Root 폴더인 경우 (id: 1)
		if (selectedFolderId === 1) {
			return [{ id: 1, name: "Root" }];
		}

		const path: { id: number; name: string }[] = [];
		let currentId = selectedFolderId;

		// 현재 폴더부터 부모 폴더들을 찾아서 경로 구성
		while (currentId !== 0) {
			const folder = allFolders.find((f) => f.id === currentId);
			if (folder) {
				path.unshift({ id: folder.id, name: folder.name });
				currentId = folder.parent;
			} else {
				break;
			}
		}

		return path;
	}, [selectedFolderId, allFolders]);

	const onDrop = React.useCallback(
		async (acceptedFiles: File[]) => {
			for (const file of acceptedFiles) {
				await uploadFile(selectedFolderId, file);
			}
		},
		[selectedFolderId, uploadFile]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div className="w-full h-12 bg-gray-200 flex items-center px-4 border-b gap-4">
			{/* 검색 - 맨 왼쪽 */}
			<div className="relative flex-shrink-0">
				<div className="relative">
					<SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
					<input
						type="text"
						placeholder="전체 폴더에서 검색..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-8 py-1 border rounded text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					{searchQuery && (
						<button
							onClick={() => setSearchQuery("")}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							<CloseIcon className="w-3 h-3" />
						</button>
					)}
				</div>
			</div>

			{/* 브레드크럼 - 가운데 (주소표시줄 스타일) */}
			<div className="flex-1 flex justify-center">
				<div className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm text-gray-700 shadow-sm min-w-0 max-w-2xl">
					{path.map((p, i) => (
						<span key={p.id} className="flex items-center min-w-0">
							{i > 0 && (
								<span className="mx-1 text-gray-400 flex-shrink-0">
									<ChevronIcon className="w-3 h-3" />
								</span>
							)}
							<button
								className={`truncate hover:text-blue-600 transition-colors ${
									p.id === selectedFolderId
										? "text-blue-600 font-medium"
										: "text-gray-600"
								}`}
								onClick={() => selectFolder(p.id)}
								title={p.name}
							>
								{p.name}
							</button>
						</span>
					))}
				</div>
			</div>

			{/* 버튼들 - 맨 오른쪽 */}
			<div className="flex items-center gap-2 flex-shrink-0">
				<button
					className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
					onClick={() => reset()}
				>
					새로고침
				</button>
				{/* 클립보드 상태 표시 */}
				{clipboard.length > 0 && (
					<div className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-xs flex items-center gap-1">
						<span>📋</span>
						<span>
							클립보드: {clipboard.length}개 항목
							{clipboard[0]?.type === "copy"
								? " (복사됨)"
								: " (잘라내기됨)"}
						</span>
					</div>
				)}
				{/* 업로드 버튼 제거됨 */}
			</div>
		</div>
	);
});

export default Toolbar;
