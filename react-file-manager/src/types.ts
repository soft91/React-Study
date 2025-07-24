/**
 * 파일/폴더 노드의 기본 정보를 정의합니다.
 */
export interface FileNode {
	/** 노드의 고유 ID */
	id: number;
	/** 부모 폴더의 ID (0은 루트를 의미) */
	parent: number;
	/** 파일/폴더 이름 */
	name: string;
	/** 폴더 여부 (true: 폴더, false: 파일) */
	isFolder: boolean;
	/** 파일 URL (이미지 파일의 경우) */
	url?: string;
}

/**
 * 클립보드에 저장되는 아이템의 정보를 정의합니다.
 */
export interface ClipboardItem {
	/** 노드의 고유 ID */
	id: number;
	/** 부모 폴더의 ID */
	parent: number;
	/** 파일/폴더 이름 */
	name: string;
	/** 폴더 여부 */
	isFolder: boolean;
	/** 클립보드 작업 타입 ("copy" | "cut") */
	type: "copy" | "cut";
	/** 이미지 URL (이미지 파일의 경우) */
	url?: string;
}

/**
 * 히스토리 상태를 저장하기 위한 인터페이스입니다.
 */
export interface HistoryState {
	/** 파일/폴더 노드 목록 */
	nodes: FileNode[];
	/** 현재 선택된 폴더 ID */
	selectedFolderId: number;
	/** 현재 선택된 파일/폴더 ID 목록 */
	selectedIds: number[];
	/** 필터 문자열 */
	filter: string;
	/** 정렬 설정 */
	sort: { key: string; order: "asc" | "desc" };
	/** 클립보드 아이템 목록 */
	clipboard: FileNode[];
	/** 이미지 URL 맵 */
	imageUrls: Map<number, string>;
}

/**
 * 검색 결과를 정의합니다.
 */
export interface SearchResult {
	/** 노드의 고유 ID */
	id: number;
	/** 파일/폴더 이름 */
	name: string;
	/** 전체 경로 (예: "Root > Documents > Work") */
	path: string;
	/** 폴더 여부 */
	isFolder: boolean;
	/** 부모 폴더 ID */
	parentId: number;
}
