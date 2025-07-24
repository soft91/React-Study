import { create } from "zustand";
import { FileNode } from "./types";
import { getAllDescendantIds } from "./utils/tree";
import * as api from "./api";

/**
 * 히스토리에 저장될 상태 스냅샷을 정의합니다.
 */
type HistoryState = {
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
	clipboard: (FileNode & { type: "copy" | "cut"; url?: string })[];
	/** 이미지 URL 맵 (로컬 미리보기용) */
	imageUrls: Map<number, string>;
};

/**
 * 현재 상태의 스냅샷을 생성합니다.
 * @param state - 현재 상태
 * @returns HistoryState - 히스토리에 저장할 상태 스냅샷
 */
const getStateSnapshot = (state: any): HistoryState => ({
	nodes: state.nodes,
	selectedFolderId: state.selectedFolderId,
	selectedIds: state.selectedIds,
	filter: state.filter,
	sort: state.sort,
	clipboard: state.clipboard,
	imageUrls: state.imageUrls,
});

/**
 * 파일 매니저의 전체 상태와 액션을 정의합니다.
 */
interface FileManagerState {
	// === 상태 ===
	/** 파일/폴더 노드 목록 */
	nodes: FileNode[];
	/** 모든 폴더 목록 (폴더 트리용) */
	allFolders: FileNode[];
	/** 현재 선택된 폴더 ID */
	selectedFolderId: number;
	/** 현재 선택된 파일/폴더 ID 목록 */
	selectedIds: number[];
	/** 필터 문자열 */
	filter: string;
	/** 정렬 설정 */
	sort: { key: string; order: "asc" | "desc" };
	/** 클립보드 아이템 목록 */
	clipboard: (FileNode & { type: "copy" | "cut"; url?: string })[];
	/** 실행 취소 히스토리 */
	history: HistoryState[];
	/** 다시 실행 히스토리 */
	future: HistoryState[];
	/** 로딩 상태 */
	loading: boolean;
	/** 에러 메시지 */
	error: string | null;
	/** 이미지 URL 맵 (로컬 미리보기용) */
	imageUrls: Map<number, string>;
	/** 검색 쿼리 */
	searchQuery: string;
	/** 열린 폴더 ID 목록 */
	openFolders: Set<number>;
	/** 폴더 방문 히스토리 (뒤로가기용) */
	folderHistory: number[];
	/** 폴더 앞으로가기 스택 */
	folderFuture: number[];
	/** 폴더 앞으로가기 */
	goForwardFolder: () => void;
	/** 폴더 뒤로가기 */
	goBackFolder: () => void;
	/** 폴더 방문 히스토리 강제 push (내부용) */
	pushFolderHistory: (id: number) => void;
	/** 앞으로가기 스택 비우기 (내부용) */
	clearFolderFuture: () => void;
	/** 이미지 URL 추가 */
	addImageUrl: (id: number, url: string) => void;

	// === 액션 ===
	/** 실행 취소 */
	undo: () => void;
	/** 다시 실행 */
	redo: () => void;
	/** 폴더 선택 */
	selectFolder: (id: number) => Promise<void>;
	/** 단일 아이템 선택 */
	selectOne: (id: number, multi?: boolean) => void;
	/** 선택 토글 */
	toggleSelect: (id: number) => void;
	/** 전체 선택 */
	selectAll: (ids: number[]) => void;
	/** 선택 해제 */
	clearSelection: () => void;
	/** 정렬 설정 */
	setSort: (key: string) => void;
	/** 폴더 추가 */
	addFolder: (parent: number, name: string) => Promise<void>;
	/** 파일 추가 */
	addFile: (parent: number, name: string) => Promise<void>;
	/** 상태 초기화 */
	reset: () => Promise<void>;
	/** 필터 설정 */
	setFilter: (filter: string) => void;
	/** 검색 쿼리 설정 */
	setSearchQuery: (query: string) => void;
	/** 폴더 열기 */
	openFolder: (id: number) => void;
	/** 폴더 닫기 */
	closeFolder: (id: number) => void;
	/** 폴더 토글 */
	toggleFolder: (id: number) => void;
	/** 노드 이름 변경 */
	renameNode: (id: number, name: string) => Promise<void>;
	/** 노드 삭제 */
	deleteNode: (id: number) => Promise<void>;
	/** 노드 복사 */
	copyNode: (ids: number[]) => void;
	/** 노드 잘라내기 */
	cutNode: (ids: number[]) => void;
	/** 노드 이동 */
	moveNode: (ids: number[], parent: number) => Promise<void>;
	/** 노드 붙여넣기 */
	pasteNode: (parent: number) => Promise<void>;
	/** 파일 업로드 */
	uploadFile: (parent: number, file: File) => Promise<void>;
	/** 모든 폴더 로드 */
	loadAllFolders: () => Promise<void>;
	/** 이미지 URL 정리 */
	cleanupImageUrl: (id: number) => void;
	/** 모든 이미지 URL 정리 */
	cleanupAllImageUrls: () => void;
}

// 초기 데이터
const initialNodes: FileNode[] = [
	{ id: 1, parent: 0, name: "Root", isFolder: true },
	{ id: 2, parent: 1, name: "Documents", isFolder: true },
	{ id: 3, parent: 1, name: "Pictures", isFolder: true },
	{ id: 4, parent: 2, name: "Work", isFolder: true },
	{ id: 5, parent: 2, name: "Personal", isFolder: true },
	{ id: 6, parent: 4, name: "report.txt", isFolder: false },
	{ id: 7, parent: 3, name: "vacation.jpg", isFolder: false },
];

/**
 * Zustand 스토어를 생성합니다.
 * 파일 매니저의 모든 상태와 액션을 관리합니다.
 */
export const useFileManagerStore = create<FileManagerState>((set, get) => ({
	// === 초기 상태 ===
	nodes: initialNodes,
	allFolders: initialNodes.filter((n) => n.isFolder),
	selectedFolderId: 1,
	selectedIds: [],
	filter: "",
	sort: { key: "id", order: "asc" },
	clipboard: [],
	history: [],
	future: [],
	loading: false,
	error: null,
	imageUrls: new Map(), // 로컬 미리보기 URL 저장소
	searchQuery: "", // 검색 쿼리
	openFolders: new Set([1]), // Root는 기본적으로 열림
	folderHistory: [],
	folderFuture: [],

	// === 히스토리 관리 ===
	/**
	 * 실행 취소: 이전 상태로 되돌립니다.
	 */
	undo: () =>
		set((state) => {
			if (state.history.length === 0) return {};
			const prev = state.history[state.history.length - 1];
			const newHistory = state.history.slice(0, -1);
			const futureState = getStateSnapshot(state);
			return {
				...prev,
				history: newHistory,
				future: [futureState, ...state.future],
			};
		}),

	/**
	 * 다시 실행: 취소된 작업을 다시 실행합니다.
	 */
	redo: () =>
		set((state) => {
			if (state.future.length === 0) return {};
			const next = state.future[0];
			const newFuture = state.future.slice(1);
			const historyState = getStateSnapshot(state);
			return {
				...next,
				history: [...state.history, historyState],
				future: newFuture,
			};
		}),

	// === 폴더 방문 히스토리 관리 ===
	goBackFolder: () => {
		const { folderHistory, selectedFolderId, folderFuture } = get();
		if (folderHistory.length === 0) return;
		const prevId = folderHistory[folderHistory.length - 1];
		set({
			folderHistory: folderHistory.slice(0, -1),
			folderFuture: [selectedFolderId, ...folderFuture],
			selectedFolderId: prevId,
		});
		// 폴더 내용도 갱신
		get().selectFolder(prevId);
	},
	goForwardFolder: () => {
		const { folderFuture, selectedFolderId, folderHistory } = get();
		if (folderFuture.length === 0) return;
		const nextId = folderFuture[0];
		set({
			folderFuture: folderFuture.slice(1),
			folderHistory: [...folderHistory, selectedFolderId],
			selectedFolderId: nextId,
		});
		get().selectFolder(nextId);
	},
	pushFolderHistory: (id) => {
		set((state) => ({
			folderHistory: [...state.folderHistory, id],
		}));
	},
	clearFolderFuture: () => {
		set({ folderFuture: [] });
	},

	// === 폴더 선택 ===
	/**
	 * 폴더를 선택하고 해당 폴더의 내용을 로드합니다.
	 */
	selectFolder: async (id) => {
		set({ loading: true, error: null });
		try {
			const prevId = get().selectedFolderId;
			if (prevId !== id) {
				get().pushFolderHistory(prevId);
				get().clearFolderFuture();
			}
			const nodes = await api.getFiles(id);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				selectedFolderId: id,
				selectedIds: [],
				future: [],
				loading: false,
				error: null,
			}));
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	// === 선택 관리 ===
	/**
	 * 단일 아이템을 선택합니다.
	 */
	selectOne: (id, multi) =>
		set((state) => {
			if (multi) {
				if (state.selectedIds.includes(id))
					return { selectedIds: state.selectedIds };
				return {
					history: [...state.history, getStateSnapshot(state)],
					selectedIds: [...state.selectedIds, id],
					future: [],
				};
			} else {
				return {
					history: [...state.history, getStateSnapshot(state)],
					selectedIds: [id],
					future: [],
				};
			}
		}),

	/**
	 * 아이템의 선택 상태를 토글합니다.
	 */
	toggleSelect: (id) =>
		set((state) => {
			return {
				history: [...state.history, getStateSnapshot(state)],
				selectedIds: state.selectedIds.includes(id)
					? state.selectedIds.filter((sid) => sid !== id)
					: [...state.selectedIds, id],
				future: [],
			};
		}),

	/**
	 * 여러 아이템을 선택합니다.
	 */
	selectAll: (ids) => {
		set((state) => {
			const newState = {
				history: [...state.history, getStateSnapshot(state)],
				selectedIds: ids,
				future: [],
			};
			return newState;
		});
	},

	/**
	 * 모든 선택을 해제합니다.
	 */
	clearSelection: () =>
		set((state) => ({
			history: [...state.history, getStateSnapshot(state)],
			selectedIds: [],
			future: [],
		})),

	// === 정렬 관리 ===
	/**
	 * 정렬 방식을 설정합니다.
	 */
	setSort: (key) =>
		set((state) => {
			const order =
				state.sort.key === key && state.sort.order === "asc"
					? "desc"
					: "asc";
			return {
				history: [...state.history, getStateSnapshot(state)],
				sort: { key, order },
				future: [],
			};
		}),

	// === 파일/폴더 관리 ===
	/**
	 * 새로운 폴더를 생성합니다.
	 */
	addFolder: async (parent, name) => {
		set({ loading: true, error: null });
		try {
			await api.addFolder(parent, name);
			const nodes = await api.getFiles(get().selectedFolderId);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				loading: false,
				error: null,
			}));
			await get().loadAllFolders();
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	/**
	 * 새로운 파일을 생성합니다.
	 */
	addFile: async (parent, name) => {
		set({ loading: true, error: null });
		try {
			await api.addFile(parent, name);
			const nodes = await api.getFiles(get().selectedFolderId);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				loading: false,
				error: null,
			}));
			await get().loadAllFolders();
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	/**
	 * 상태를 초기화합니다.
	 */
	reset: async () => {
		set({ loading: true, error: null });
		try {
			const nodes = await api.getFiles(1);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				selectedFolderId: 1,
				selectedIds: [],
				filter: "",
				sort: { key: "name", order: "asc" },
				clipboard: [],
				future: [],
				imageUrls: new Map(), // 리셋 시 이미지 URL도 초기화
				loading: false,
				error: null,
			}));
			await get().loadAllFolders();
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	// === 필터/검색 관리 ===
	/**
	 * 필터를 설정합니다.
	 */
	setFilter: (filter) =>
		set((state) => ({
			history: [...state.history, getStateSnapshot(state)],
			filter,
			future: [],
		})),

	/**
	 * 검색 쿼리를 설정합니다.
	 */
	setSearchQuery: (query) => set({ searchQuery: query }),

	// === 폴더 트리 관리 ===
	/**
	 * 폴더를 엽니다.
	 */
	openFolder: (id) =>
		set((state) => {
			// 이미 열려있으면 업데이트하지 않음
			if (state.openFolders.has(id)) return state;
			return {
				openFolders: new Set(Array.from(state.openFolders).concat([id])),
			};
		}),

	/**
	 * 폴더를 닫습니다.
	 */
	closeFolder: (id) =>
		set((state) => {
			// 이미 닫혀있으면 업데이트하지 않음
			if (!state.openFolders.has(id)) return state;
			const newOpenFolders = new Set(Array.from(state.openFolders));
			newOpenFolders.delete(id);
			return { openFolders: newOpenFolders };
		}),

	/**
	 * 폴더의 열림/닫힘 상태를 토글합니다.
	 */
	toggleFolder: (id) =>
		set((state) => {
			const newOpenFolders = new Set(Array.from(state.openFolders));
			if (newOpenFolders.has(id)) {
				newOpenFolders.delete(id);
			} else {
				newOpenFolders.add(id);
			}
			return { openFolders: newOpenFolders };
		}),

	// === 노드 조작 ===
	/**
	 * 노드의 이름을 변경합니다.
	 */
	renameNode: async (id, name) => {
		set({ loading: true, error: null });
		try {
			await api.renameNode(id, name);
			const nodes = await api.getFiles(get().selectedFolderId);
			const allFolders = await api.getAllFolders();
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				allFolders,
				loading: false,
				error: null,
			}));
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	/**
	 * 노드를 삭제합니다.
	 */
	deleteNode: async (id) => {
		set({ loading: true, error: null });
		try {
			await api.deleteNode(id);
			const nodes = await api.getFiles(get().selectedFolderId);
			const allFolders = await api.getAllFolders();
			set((state) => {
				// 삭제된 노드의 이미지 URL도 제거
				const newImageUrls = new Map(state.imageUrls);
				newImageUrls.delete(id);
				return {
					history: [...state.history, getStateSnapshot(state)],
					nodes,
					allFolders,
					imageUrls: newImageUrls,
					loading: false,
					error: null,
				};
			});
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	// === 클립보드 관리 ===
	/**
	 * 노드를 클립보드에 복사합니다.
	 */
	copyNode: (ids) => {
		set((state) => ({
			clipboard: state.nodes
				.filter((n) => ids.includes(n.id))
				.map((n) => ({
					...n,
					type: "copy",
					url: state.imageUrls.get(n.id), // 이미지 URL도 클립보드에 포함
				})),
		}));
	},

	/**
	 * 노드를 클립보드에 잘라냅니다.
	 */
	cutNode: (ids) =>
		set((state) => ({
			clipboard: state.nodes
				.filter((n) => ids.includes(n.id))
				.map((n) => ({
					...n,
					type: "cut",
					url: state.imageUrls.get(n.id), // 이미지 URL도 클립보드에 포함
				})),
		})),

	/**
	 * 클립보드의 노드를 붙여넣습니다.
	 */
	pasteNode: async (parent) => {
		set({ loading: true, error: null });
		try {
			const newImageUrls = new Map(get().imageUrls);

			for (const item of get().clipboard) {
				if (item.type === "cut") {
					// 잘라내기: 이동
					await api.moveNode(item.id, parent);
				} else if (item.type === "copy") {
					// 복사: 새 노드 생성
					const copiedNode = await api.copyNode(item.id, parent);

					// 이미지 URL이 있다면 새 노드에도 저장
					if (item.url) {
						newImageUrls.set(copiedNode.id, item.url);
					}
				}
			}

			const nodes = await api.getFiles(get().selectedFolderId);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				imageUrls: newImageUrls,
				clipboard: [],
				loading: false,
				error: null,
			}));
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	/**
	 * 노드를 다른 위치로 이동합니다.
	 */
	moveNode: async (ids, parent) => {
		set({ loading: true, error: null });
		try {
			for (const id of ids) {
				await api.moveNode(id, parent);
			}
			const nodes = await api.getFiles(get().selectedFolderId);
			set((state) => ({
				history: [...state.history, getStateSnapshot(state)],
				nodes,
				loading: false,
				error: null,
			}));
			await get().loadAllFolders();
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	// === 파일 업로드 ===
	/**
	 * 파일을 업로드합니다.
	 */
	uploadFile: async (parent, file) => {
		set({ loading: true, error: null });
		try {
			const uploaded = await api.uploadFile(parent, file);
			let previewUrl: string | undefined;

			// 이미지 파일인 경우 로컬 미리보기 URL 생성
			if (
				/\.(png|jpe?g|gif|webp|svg)$/i.test(file.name) ||
				(file.type && file.type.startsWith("image/"))
			) {
				previewUrl = URL.createObjectURL(file);
			}

			const nodes = await api.getFiles(get().selectedFolderId);

			set((state) => {
				const newImageUrls = new Map(state.imageUrls);
				if (previewUrl) {
					newImageUrls.set(uploaded.id, previewUrl);
				}

				return {
					history: [...state.history, getStateSnapshot(state)],
					nodes,
					imageUrls: newImageUrls,
					loading: false,
					error: null,
				};
			});
			await get().loadAllFolders();
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	// === 이미지 URL 관리 ===
	/**
	 * 특정 노드의 이미지 URL을 정리합니다.
	 */
	cleanupImageUrl: (id: number) => {
		set((state) => {
			const url = state.imageUrls.get(id);
			if (url && url.startsWith("blob:")) {
				URL.revokeObjectURL(url);
			}
			const newImageUrls = new Map(state.imageUrls);
			newImageUrls.delete(id);
			return { imageUrls: newImageUrls };
		});
	},

	/**
	 * 모든 이미지 URL을 정리합니다.
	 */
	cleanupAllImageUrls: () => {
		set((state) => {
			// blob URL들 정리
			state.imageUrls.forEach((url) => {
				if (url.startsWith("blob:")) {
					URL.revokeObjectURL(url);
				}
			});
			return { imageUrls: new Map() };
		});
	},

	// === 데이터 로드 ===
	/**
	 * 모든 폴더 목록을 로드합니다.
	 */
	loadAllFolders: async () => {
		set({ loading: true, error: null });
		try {
			// 실제 API에서 폴더 목록을 받아옴
			const folders = await api.getAllFolders();
			set({ allFolders: folders, loading: false, error: null });
		} catch (e: any) {
			set({ loading: false, error: e.message });
		}
	},

	/**
	 * 이미지 URL을 추가합니다.
	 */
	addImageUrl: (id, url) =>
		set((state) => {
			const newImageUrls = new Map(state.imageUrls);
			newImageUrls.set(id, url);
			return { imageUrls: newImageUrls };
		}),
}));
