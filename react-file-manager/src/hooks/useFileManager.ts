import { useFileManagerStore } from "../store";

/**
 * 파일 매니저의 상태와 액션에 접근하기 위한 커스텀 훅입니다.
 * Zustand 스토어의 모든 기능을 컴포넌트에서 쉽게 사용할 수 있도록 제공합니다.
 *
 * @returns {Object} 파일 매니저의 모든 상태와 액션
 */
export function useFileManager() {
	// === 상태 ===
	/** 파일/폴더 노드 목록 */
	const nodes = useFileManagerStore((s) => s.nodes);
	/** 현재 선택된 폴더 ID */
	const selectedFolderId = useFileManagerStore((s) => s.selectedFolderId);
	/** 현재 선택된 파일/폴더 ID 목록 */
	const selectedIds = useFileManagerStore((s) => s.selectedIds);
	/** 필터 문자열 */
	const filter = useFileManagerStore((s) => s.filter);
	/** 정렬 설정 */
	const sort = useFileManagerStore((s) => s.sort);
	/** 클립보드 아이템 목록 */
	const clipboard = useFileManagerStore((s) => s.clipboard);
	/** 실행 취소 히스토리 */
	const history = useFileManagerStore((s) => s.history);
	/** 다시 실행 히스토리 */
	const future = useFileManagerStore((s) => s.future);
	/** 로딩 상태 */
	const loading = useFileManagerStore((s) => s.loading);
	/** 에러 메시지 */
	const error = useFileManagerStore((s) => s.error);
	/** 이미지 URL 맵 */
	const imageUrls = useFileManagerStore((s) => s.imageUrls);
	/** 검색 쿼리 */
	const searchQuery = useFileManagerStore((s) => s.searchQuery);
	/** 모든 폴더 목록 */
	const allFolders = useFileManagerStore((s) => s.allFolders);
	/** 열린 폴더 ID 목록 */
	const openFolders = useFileManagerStore((s) => s.openFolders);
	/** 폴더 방문 히스토리 */
	const folderHistory = useFileManagerStore((s) => s.folderHistory);
	const folderFuture = useFileManagerStore((s) => s.folderFuture);
	const goBackFolder = useFileManagerStore((s) => s.goBackFolder);
	const goForwardFolder = useFileManagerStore((s) => s.goForwardFolder);

	// === 액션 ===
	/** 폴더 선택 */
	const selectFolder = useFileManagerStore((s) => s.selectFolder);
	/** 단일 아이템 선택 */
	const selectOne = useFileManagerStore((s) => s.selectOne);
	/** 선택 토글 */
	const toggleSelect = useFileManagerStore((s) => s.toggleSelect);
	/** 전체 선택 */
	const selectAll = useFileManagerStore((s) => s.selectAll);
	/** 선택 해제 */
	const clearSelection = useFileManagerStore((s) => s.clearSelection);
	/** 정렬 설정 */
	const setSort = useFileManagerStore((s) => s.setSort);
	/** 폴더 추가 */
	const addFolder = useFileManagerStore((s) => s.addFolder);
	/** 파일 추가 */
	const addFile = useFileManagerStore((s) => s.addFile);
	/** 상태 초기화 */
	const reset = useFileManagerStore((s) => s.reset);
	/** 필터 설정 */
	const setFilter = useFileManagerStore((s) => s.setFilter);
	/** 검색 쿼리 설정 */
	const setSearchQuery = useFileManagerStore((s) => s.setSearchQuery);
	/** 노드 이름 변경 */
	const renameNode = useFileManagerStore((s) => s.renameNode);
	/** 노드 삭제 */
	const deleteNode = useFileManagerStore((s) => s.deleteNode);
	/** 노드 복사 */
	const copyNode = useFileManagerStore((s) => s.copyNode);
	/** 노드 붙여넣기 */
	const pasteNode = useFileManagerStore((s) => s.pasteNode);
	/** 실행 취소 */
	const undo = useFileManagerStore((s) => s.undo);
	/** 다시 실행 */
	const redo = useFileManagerStore((s) => s.redo);
	/** 노드 잘라내기 */
	const cutNode = useFileManagerStore((s) => s.cutNode);
	/** 노드 이동 */
	const moveNode = useFileManagerStore((s) => s.moveNode);
	/** 파일 업로드 */
	const uploadFile = useFileManagerStore((s) => s.uploadFile);
	/** 모든 폴더 로드 */
	const loadAllFolders = useFileManagerStore((s) => s.loadAllFolders);
	/** 폴더 열기 */
	const openFolder = useFileManagerStore((s) => s.openFolder);
	/** 폴더 닫기 */
	const closeFolder = useFileManagerStore((s) => s.closeFolder);
	/** 폴더 토글 */
	const toggleFolder = useFileManagerStore((s) => s.toggleFolder);
	/** 이미지 URL 정리 */
	const cleanupImageUrl = useFileManagerStore((s) => s.cleanupImageUrl);
	/** 모든 이미지 URL 정리 */
	const cleanupAllImageUrls = useFileManagerStore(
		(s) => s.cleanupAllImageUrls
	);
	/** 이미지 URL 추가 */
	const addImageUrl = useFileManagerStore((s) => s.addImageUrl);

	return {
		// === 상태 ===
		nodes,
		selectedFolderId,
		selectedIds,
		filter,
		sort,
		clipboard,
		history,
		future,
		loading,
		error,
		imageUrls,
		searchQuery,
		allFolders,
		openFolders,
		folderHistory,
		folderFuture,

		// === 액션 ===
		selectFolder,
		selectOne,
		toggleSelect,
		selectAll,
		clearSelection,
		setSort,
		addFolder,
		addFile,
		reset,
		setFilter,
		setSearchQuery,
		renameNode,
		deleteNode,
		copyNode,
		pasteNode,
		undo,
		redo,
		cutNode,
		moveNode,
		uploadFile,
		loadAllFolders,
		openFolder,
		closeFolder,
		toggleFolder,
		cleanupImageUrl,
		cleanupAllImageUrls,
		addImageUrl,
		goBackFolder,
		goForwardFolder,
	};
}
