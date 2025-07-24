import React, { useEffect } from "react";
import Toolbar from "./components/Toolbar";
import { FolderTree } from "./components/FolderTree";
import { FileList } from "./components/FileList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFileManager } from "./hooks/useFileManager";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
	const { cleanupAllImageUrls, loadAllFolders, selectFolder } =
		useFileManager();

	// 애플리케이션 초기화
	useEffect(() => {
		const initializeApp = async () => {
			try {
				console.log("App - 초기화 시작");
				// 모든 폴더 로드
				await loadAllFolders();
				console.log("App - 모든 폴더 로드 완료");
				// Root 폴더 선택 (기본값)
				await selectFolder(1);
				console.log("App - Root 폴더 선택 완료");
			} catch (error) {
				console.error("앱 초기화 중 오류 발생:", error);
			}
		};

		initializeApp();
	}, [loadAllFolders, selectFolder]);

	// 컴포넌트 언마운트 시 이미지 URL 정리
	useEffect(() => {
		return () => {
			cleanupAllImageUrls();
		};
	}, [cleanupAllImageUrls]);

	return (
		<ErrorBoundary>
			<DndProvider backend={HTML5Backend}>
				<div className="flex flex-col h-screen">
					<Toolbar />
					<div className="flex flex-1 min-h-0">
						<FolderTree />
						<FileList />
					</div>
				</div>
			</DndProvider>
		</ErrorBoundary>
	);
}

export default App;
