import React from "react";
import { useFileManager } from "../hooks/useFileManager";
import { FaChevronRight } from "react-icons/fa";

const ChevronIcon = FaChevronRight as unknown as React.FC<{
	className?: string;
}>;

export const Breadcrumb: React.FC = () => {
	const { allFolders, selectedFolderId, selectFolder } = useFileManager();

	// 현재 폴더까지의 경로를 찾는 함수
	const getBreadcrumbPath = () => {
		const path: Array<{ id: number; name: string }> = [];
		let currentId = selectedFolderId;

		// 루트 폴더부터 현재 폴더까지 경로 구성
		while (currentId !== 0) {
			const folder = allFolders.find((f) => f.id === currentId);
			if (folder) {
				path.unshift({ id: folder.id, name: folder.name });
				currentId = folder.parent;
			} else {
				break;
			}
		}

		// 루트 폴더 추가
		path.unshift({ id: 0, name: "Root" });

		return path;
	};

	const breadcrumbPath = getBreadcrumbPath();

	return (
		<div className="flex items-center gap-1 text-sm text-gray-600 mb-4 px-2 py-1 bg-gray-50 rounded">
			{breadcrumbPath.map((item, index) => (
				<React.Fragment key={item.id}>
					{index > 0 && (
						<ChevronIcon className="w-3 h-3 text-gray-400 mx-1" />
					)}
					<button
						onClick={() => selectFolder(item.id)}
						className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
							item.id === selectedFolderId
								? "bg-blue-100 text-blue-700 font-medium"
								: "text-gray-700 hover:text-gray-900"
						}`}
					>
						{item.name}
					</button>
				</React.Fragment>
			))}
		</div>
	);
};
