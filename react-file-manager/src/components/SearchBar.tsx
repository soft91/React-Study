import React, { useState, useMemo } from "react";
import { useFileManager } from "../hooks/useFileManager";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchIcon = FaSearch as unknown as React.FC<{ className?: string }>;
const CloseIcon = FaTimes as unknown as React.FC<{ className?: string }>;

interface SearchResult {
	id: number;
	name: string;
	path: string;
	isFolder: boolean;
	parentId: number;
}

export const SearchBar: React.FC = () => {
	const { nodes, allFolders, selectFolder } = useFileManager();
	const [searchQuery, setSearchQuery] = useState("");
	const [showResults, setShowResults] = useState(false);

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
	}, [searchQuery, nodes]);

	// 노드의 경로를 가져오는 함수
	const getNodePath = (nodeId: number): string => {
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
	};

	// 검색 결과 클릭 시 해당 폴더로 이동
	const handleResultClick = (result: SearchResult) => {
		if (result.isFolder) {
			selectFolder(result.id);
		} else {
			// 파일인 경우 부모 폴더로 이동
			selectFolder(result.parentId);
		}
		setShowResults(false);
		setSearchQuery("");
	};

	return (
		<div className="relative mb-4">
			<div className="relative">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<input
					type="text"
					placeholder="전체 폴더에서 검색..."
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setShowResults(e.target.value.length > 0);
					}}
					onFocus={() => setShowResults(searchQuery.length > 0)}
					className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				{searchQuery && (
					<button
						onClick={() => {
							setSearchQuery("");
							setShowResults(false);
						}}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
					>
						<CloseIcon className="w-4 h-4" />
					</button>
				)}
			</div>

			{/* 검색 결과 드롭다운 */}
			{showResults && searchResults.length > 0 && (
				<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
					{searchResults.map((result) => (
						<button
							key={result.id}
							onClick={() => handleResultClick(result)}
							className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
						>
							<span
								className={`text-lg ${
									result.isFolder ? "text-blue-500" : "text-gray-500"
								}`}
							>
								{result.isFolder ? "📁" : "📄"}
							</span>
							<div className="flex-1 min-w-0">
								<div className="font-medium text-gray-900 truncate">
									{result.name}
								</div>
								<div className="text-xs text-gray-500 truncate">
									{result.path}
								</div>
							</div>
						</button>
					))}
				</div>
			)}

			{/* 검색 결과가 없을 때 */}
			{showResults && searchQuery && searchResults.length === 0 && (
				<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 z-50">
					검색 결과가 없습니다.
				</div>
			)}
		</div>
	);
};
