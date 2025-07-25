import React, { useCallback, useMemo, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useFileManager } from "../hooks/useFileManager";
import { FaRegFile, FaRegFolder } from "react-icons/fa";
import UploadModal from "./UploadModal";
import { FileNode } from "../types";

// 아이콘 컴포넌트 타입 캐스팅
const FileIcon = FaRegFile as unknown as React.FC<{ className?: string }>;
const FolderIcon = FaRegFolder as unknown as React.FC<{ className?: string }>;

// 컨텍스트 메뉴 ID 상수
const MENU_ID = "filelist-context-menu";
const BACKGROUND_MENU_ID = "background-context-menu";
const ItemTypes = { NODE: "node" };

/**
 * NodeRow 컴포넌트의 Props 인터페이스
 */
interface NodeRowProps {
	/** 표시할 노드 데이터 */
	node: any;
	/** 노드의 인덱스 */
	idx: number;
	/** 현재 선택된 노드 ID 목록 */
	selectedIds: number[];
	/** 클릭 이벤트 핸들러 */
	handleClick: (e: React.MouseEvent, node: any, idx: number) => void;
	/** 더블클릭 이벤트 핸들러 */
	handleDoubleClick: (node: any) => void;
	/** 컨텍스트 메뉴 표시 함수 */
	show: (args: any) => void;
	/** 노드 이동 함수 */
	moveNode: (ids: number[], parent: number) => void;
	/** 선택 해제 함수 */
	clearSelection: () => void;
	/** 선택 설정 함수 */
	selectAll: (ids: number[]) => void;
}

/**
 * 파일/폴더 노드를 그리드 형태로 표시하는 컴포넌트
 * 드래그 앤 드롭, 컨텍스트 메뉴, 편집 기능을 포함합니다.
 */
const NodeRow: React.FC<
	NodeRowProps & {
		/** 현재 편집 중인 노드 ID */
		editingId: number | null;
		/** 편집 중인 노드 ID 설정 함수 */
		setEditingId: (id: number | null) => void;
		/** 이미지 URL 맵 */
		imageUrls: Map<number, string>;
		/** 클립보드 아이템 목록 */
		clipboard: any[];
		/** 새 폴더 생성 모드 여부 */
		newFolderMode: boolean;
		/** 새 폴더 이름 */
		newFolderName: string;
		/** 새 폴더 이름 설정 함수 */
		setNewFolderName: (name: string) => void;
		/** 새 폴더 생성 모드 설정 함수 */
		setNewFolderMode: (mode: boolean) => void;
		/** 폴더 추가 함수 */
		addFolder: (parent: number, name: string) => Promise<void>;
		/** 현재 선택된 폴더 ID */
		selectedFolderId: number;
	}
> = React.memo(
	({
		node,
		idx,
		selectedIds,
		handleClick,
		handleDoubleClick,
		show,
		moveNode,
		clearSelection,
		selectAll,
		editingId,
		setEditingId,
		imageUrls,
		clipboard,
		newFolderMode,
		newFolderName,
		setNewFolderName,
		setNewFolderMode,
		addFolder,
		selectedFolderId,
	}) => {
		const { renameNode } = useFileManager();
		const [tempName, setTempName] = React.useState(node.name);

		// 노드 이름이 변경되면 임시 이름도 업데이트
		React.useEffect(() => {
			setTempName(node.name);
		}, [node.name]);

		const editing = editingId === node.id;
		const isTemp = (node as any).isTemp;

		// 클립보드에 있는 아이템인지 확인
		const isInClipboard = clipboard.some((item) => item.id === node.id);
		const clipboardType = clipboard.find((item) => item.id === node.id)?.type;

		// 디버깅용 로그
		if (isInClipboard) {
			console.log(
				`Node ${node.id} (${node.name}) is in clipboard with type: ${clipboardType}`
			);
		}

		// 이름 클릭 이벤트 핸들러 (편집 모드에서만 이벤트 전파 차단)
		const handleNameClick = React.useCallback(
			(e: React.MouseEvent) => {
				// 편집 모드가 아닐 때는 이벤트 전파를 차단하지 않음
				if (!editing) {
					// 편집 모드가 아닐 때는 상위 클릭 이벤트가 정상적으로 작동하도록 함
					return;
				}
				// 편집 모드일 때만 이벤트 전파 차단
				e.stopPropagation();
			},
			[editing]
		);

		// 입력값 변경 핸들러
		const handleInputChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setTempName(e.target.value);
			},
			[]
		);

		// 입력 완료 핸들러
		const handleInputBlur = React.useCallback(() => {
			if (tempName.trim() && tempName !== node.name) {
				renameNode(node.id, tempName.trim());
			}
			setEditingId(null);
		}, [tempName, node.name, node.id, renameNode, setEditingId]);

		// 입력 키보드 이벤트 핸들러
		const handleInputKeyDown = React.useCallback(
			(e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter") {
					handleInputBlur();
				} else if (e.key === "Escape") {
					setTempName(node.name);
					setEditingId(null);
				}
			},
			[handleInputBlur, node.name, setEditingId]
		);

		// 컨텍스트 메뉴 핸들러
		const handleContextMenu = React.useCallback(
			(e: React.MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();

				// 오른쪽 클릭한 아이템이 선택되지 않은 경우, 해당 아이템만 선택
				if (!selectedIds.includes(node.id)) {
					// Ctrl/Cmd 키가 눌려있지 않으면 기존 선택을 모두 해제
					if (!e.ctrlKey && !e.metaKey) {
						clearSelection();
					}
					// 해당 아이템을 선택에 추가
					selectAll([node.id]);
				}

				// 컨텍스트 메뉴 표시
				show({ event: e, props: { id: node.id, action: "rename" } });
			},
			[show, node.id, selectedIds, clearSelection, selectAll]
		);

		// 노드 클릭 핸들러
		const handleNodeClick = React.useCallback(
			(e: React.MouseEvent) => {
				handleClick(e, node, idx);
			},
			[handleClick, node, idx]
		);

		// 노드 더블클릭 핸들러
		const handleNodeDoubleClick = React.useCallback(() => {
			handleDoubleClick(node);
		}, [handleDoubleClick, node]);

		// 드래그 앤 드롭 설정
		const [{ isDragging }, drag] = useDrag({
			type: ItemTypes.NODE,
			item: {
				id: node.id,
				selectedIds: selectedIds.includes(node.id)
					? selectedIds
					: [node.id],
			},
			collect: (monitor) => ({ isDragging: monitor.isDragging() }),
		});

		const [{ isOver, canDrop }, drop] = useDrop({
			accept: ItemTypes.NODE,
			canDrop: (item: any) => {
				const canDropResult =
					node.isFolder && !item.selectedIds.includes(node.id);
				return canDropResult;
			},
			drop: (item: any) => {
				moveNode(item.selectedIds, node.id);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver({ shallow: true }),
				canDrop: monitor.canDrop(),
			}),
		});

		// 새 폴더 생성 모드일 때의 입력 처리
		const handleNewFolderKeyDown = React.useCallback(
			(e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter") {
					const name = newFolderName.trim() || "새 폴더";
					addFolder(selectedFolderId, name);
					setNewFolderMode(false);
					setNewFolderName("");
				} else if (e.key === "Escape") {
					setNewFolderMode(false);
					setNewFolderName("");
				}
			},
			[
				newFolderName,
				addFolder,
				selectedFolderId,
				setNewFolderMode,
				setNewFolderName,
			]
		);

		const handleNewFolderChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setNewFolderName(e.target.value);
			},
			[setNewFolderName]
		);

		const handleNewFolderBlur = React.useCallback(() => {
			const name = newFolderName.trim() || "새 폴더";
			addFolder(selectedFolderId, name);
			setNewFolderMode(false);
			setNewFolderName("");
		}, [
			newFolderName,
			addFolder,
			selectedFolderId,
			setNewFolderMode,
			setNewFolderName,
		]);

		// 새 폴더 생성 모드일 때
		if (isTemp) {
			return (
				<div className="border rounded p-2 w-full aspect-square flex flex-col items-center justify-center bg-blue-50 animate-pulse">
					<div className="flex justify-center items-center mb-1 flex-1">
						<FolderIcon className="text-blue-500 w-10 h-10" />
					</div>
					<input
						type="text"
						value={newFolderName}
						onChange={handleNewFolderChange}
						onKeyDown={handleNewFolderKeyDown}
						onBlur={handleNewFolderBlur}
						className="text-center bg-transparent border-none outline-none text-xs w-full px-1"
						placeholder="새 폴더"
						autoFocus
					/>
				</div>
			);
		}

		return (
			<div
				ref={(el) => {
					if (el) {
						drag(el);
						if (node.isFolder) {
							drop(el);
						}
					}
				}}
				className={`relative rounded-lg border bg-white shadow-sm flex flex-col items-center justify-center p-3 w-full aspect-square transition-all duration-200 cursor-pointer select-none
					${selectedIds.includes(node.id) ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300 shadow-md' : 'hover:shadow-md hover:bg-gray-50'}
					${isOver && canDrop ? 'ring-2 ring-green-400 bg-green-100/60 border-green-300' : ''}
					${isInClipboard ? (clipboardType === 'copy' ? 'ring-2 ring-green-400 bg-green-50 border-green-300' : 'ring-2 ring-orange-400 bg-orange-50 border-orange-300') : ''}
					${isDragging ? 'opacity-60 scale-95' : ''}`}
				onClick={handleNodeClick}
				onDoubleClick={handleNodeDoubleClick}
				onContextMenu={handleContextMenu}
				style={{ opacity: isDragging ? 0.5 : 1 }}
			>
				{/* 선택 체크 표시 */}
				{selectedIds.includes(node.id) && (
					<div className="absolute top-2 left-2 z-10 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shadow text-xs font-bold">
						✓
					</div>
				)}
				{/* 클립보드 상태 표시 */}
				{isInClipboard && (
					<div className={`absolute top-2 right-2 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow text-xs font-bold ${clipboardType === 'copy' ? 'bg-green-500/80' : 'bg-orange-500/80'} text-white`}>
						{clipboardType === 'copy' ? 'C' : 'X'}
					</div>
				)}
				{/* 드래그 중 오버레이 */}
				{isDragging && (
					<div className="absolute inset-0 bg-blue-200/60 rounded-lg flex items-center justify-center z-20">
						<div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shadow">드래그 중</div>
					</div>
				)}
				{/* 드롭 가능 오버레이 */}
				{isOver && canDrop && (
					<div className="absolute inset-0 bg-green-200/40 rounded-lg border-2 border-green-500 border-dashed z-10 flex items-center justify-center">
						<div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow">여기에 드롭</div>
					</div>
				)}
				{/* 아이콘/썸네일 */}
				<div className="flex justify-center items-center mb-2 flex-1 w-full">
					{node.isFolder ? (
						<FolderIcon className="text-yellow-500 w-14 h-14" />
					) : imageUrls.get(node.id) ? (
						<img src={imageUrls.get(node.id)} alt={node.name} className="w-14 h-14 object-cover rounded shadow-sm" />
					) : (
						<FileIcon className="text-gray-500 w-14 h-14" />
					)}
				</div>
				{/* 이름 영역 */}
				<div className="text-center text-xs font-medium w-full px-1 break-words line-clamp-2">
					{editing ? (
						<input
							ref={el => el?.focus()}
							type="text"
							value={tempName}
							onChange={handleInputChange}
							onKeyDown={handleInputKeyDown}
							onBlur={handleInputBlur}
							onClick={handleNameClick}
							className="text-center bg-white border border-blue-300 rounded px-1 text-xs w-full shadow-sm"
						/>
					) : (
						<span onClick={handleNameClick} className="block truncate" title={node.name}>
							{node.name}
						</span>
					)}
				</div>
			</div>
		);
	}
);

/**
 * 파일 리스트의 내부 컴포넌트
 * 파일/폴더 목록을 그리드 형태로 표시하고 사용자 상호작용을 처리합니다.
 */
const FileListInner: React.FC = React.memo(() => {
	const {
		nodes,
		selectedFolderId,
		selectedIds,
		sort,
		selectOne,
		toggleSelect,
		selectAll,
		clearSelection,
		setSort,
		renameNode,
		deleteNode,
		selectFolder,
		clipboard,
		copyNode,
		cutNode,
		pasteNode,
		moveNode,
		addFolder,
		loading,
		imageUrls,
		searchQuery,
		openFolder,
		folderHistory,
		folderFuture,
		goBackFolder,
		goForwardFolder,
		uploadFile,
		addImageUrl,
	} = useFileManager();

	// 로컬 상태
	const [editingId, setEditingId] = React.useState<number | null>(null);
	const [newFolderMode, setNewFolderMode] = React.useState(false);
	const [newFolderName, setNewFolderName] = React.useState("");
	const [showSortDropdown, setShowSortDropdown] = React.useState(false);
	const [showUpload, setShowUpload] = React.useState(false);

	// 현재 폴더의 파일/폴더 목록 (정렬 및 검색 포함)
	const list = useMemo(() => {
		let l = nodes.filter((n) => n.parent === selectedFolderId);

		// 검색 쿼리가 있으면 전체 노드에서 검색
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			l = nodes.filter((n) => n.name.toLowerCase().includes(query));
		}

		// 생성된 순서로 정렬 (ID 기준)
		l = [...l].sort((a, b) => {
			if (sort.key === "id") {
				return sort.order === "asc" ? a.id - b.id : b.id - a.id;
			} else if (sort.key === "name") {
				const aName = a.name || "";
				const bName = b.name || "";
				return sort.order === "asc"
					? aName.localeCompare(bName)
					: bName.localeCompare(aName);
			} else if (sort.key === "isFolder") {
				const aIsFolder = a.isFolder ? 1 : 0;
				const bIsFolder = b.isFolder ? 1 : 0;
				return sort.order === "asc"
					? aIsFolder - bIsFolder
					: bIsFolder - aIsFolder;
			}
			return 0;
		});

		// 새 폴더 생성 모드일 때 임시 아이템 추가 (검색 중이 아닐 때만)
		if (newFolderMode && !searchQuery.trim()) {
			const tempNode = {
				id: -1, // 임시 ID
				parent: selectedFolderId,
				name: newFolderName || "새 폴더",
				isFolder: true,
				isTemp: true, // 임시 아이템 표시
			};
			l = [tempNode, ...l]; // 맨 앞에 추가
		}

		return l;
	}, [
		nodes,
		selectedFolderId,
		sort,
		newFolderMode,
		newFolderName,
		searchQuery,
	]);

	// selectedIds 상태 변화 추적
	useEffect(() => {
		console.log("=== selectedIds 상태 변화 ===");
		console.log("현재 selectedIds:", selectedIds);
		console.log("현재 list:", list);
		console.log(
			"선택된 아이템들:",
			list.filter((item) => selectedIds.includes(item.id))
		);
	}, [selectedIds, list]);

	// 컨텍스트 메뉴 설정
	const { show } = useContextMenu({ id: MENU_ID });
	const { show: showBackground } = useContextMenu({ id: BACKGROUND_MENU_ID });

	// 단축키 핸들러
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedIds.length === 0) return;
			if (e.ctrlKey && e.key.toLowerCase() === "c") {
				copyNode(selectedIds);
				e.preventDefault();
			} else if (e.ctrlKey && e.key.toLowerCase() === "x") {
				cutNode(selectedIds);
				e.preventDefault();
			} else if (e.ctrlKey && e.key.toLowerCase() === "v") {
				pasteNode(selectedFolderId);
				e.preventDefault();
			} else if (e.key === "Delete") {
				selectedIds.forEach((id) => deleteNode(id));
				e.preventDefault();
			} else if (e.key === "F2" && selectedIds.length === 1) {
				const id = selectedIds[0];
				setEditingId(id);
				e.preventDefault();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		selectedIds,
		selectedFolderId,
		copyNode,
		cutNode,
		pasteNode,
		deleteNode,
		renameNode,
		setEditingId,
	]);

	// 드롭다운 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest(".sort-dropdown")) {
				setShowSortDropdown(false);
			}
		};

		if (showSortDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showSortDropdown]);

	// 더블클릭 핸들러
	const handleDoubleClick = useCallback(
		(node: (typeof list)[number]) => {
			if (node.isFolder) {
				selectFolder(node.id);
				// 폴더 트리에서도 해당 폴더를 열기
				openFolder(node.id);
			} else {
				alert(`미리보기: ${node.name}`);
			}
		},
		[selectFolder, openFolder]
	);

	// 클릭 핸들러
	const handleClick = useCallback(
		(e: React.MouseEvent, node: any, idx: number) => {
			if (e.ctrlKey || e.metaKey) {
				// Ctrl/Cmd + 클릭: 다중 선택
				toggleSelect(node.id);
			} else if (e.shiftKey && selectedIds.length > 0) {
				// Shift + 클릭: 범위 선택
				const lastSelectedIndex = list.findIndex(
					(n) => n.id === selectedIds[selectedIds.length - 1]
				);
				const currentIndex = idx;
				const start = Math.min(lastSelectedIndex, currentIndex);
				const end = Math.max(lastSelectedIndex, currentIndex);
				const rangeIds = list.slice(start, end + 1).map((n) => n.id);
				selectAll(rangeIds);
			} else {
				// 일반 클릭: 단일 선택
				selectOne(node.id);
			}
		},
		[selectedIds, list, toggleSelect, selectAll, selectOne]
	);

	// 새 폴더 버튼 클릭 핸들러
	const handleNewFolderClick = useCallback(() => {
		setNewFolderMode(true);
		setNewFolderName("");
	}, []);

	// 정렬 설정 핸들러
	const handleSort = useCallback(
		(key: string) => {
			setSort(key);
		},
		[setSort]
	);

	// 업로드 핸들러
	const handleUploadFile = async (file: File) => {
		await uploadFile(selectedFolderId, file);
	};
	const handleUploadUrl = async (url: string) => {
		// 이미지를 fetch해서 blob으로 변환 후 File 객체로 업로드
		const res = await fetch(url);
		if (!res.ok) throw new Error("이미지 다운로드 실패");
		const blob = await res.blob();
		const filename = url.split("/").pop()?.split("?")[0] || "image-from-url";
		const file = new File([blob], filename, { type: blob.type });
		const uploaded: any = await uploadFile(selectedFolderId, file);
		// 이미지 파일이면 미리보기 URL 생성
		if (/^image\//.test(blob.type) && uploaded && uploaded.id) {
			const previewUrl = URL.createObjectURL(blob);
			addImageUrl(uploaded.id, previewUrl);
		}
	};

	return (
		<div
			className="flex-1 p-4 overflow-auto"
			onContextMenu={(e) => {
				// grid 바깥 영역에서만 처리
				const grid = e.currentTarget.querySelector(".grid");
				if (!grid?.contains(e.target as Node)) {
					e.preventDefault();
					e.stopPropagation();
					clearSelection();
					showBackground({ event: e, props: { action: "background" } });
				}
			}}
			onClick={(e) => {
				// grid 바깥 영역에서만 처리
				const grid = e.currentTarget.querySelector(".grid");
				if (!grid?.contains(e.target as Node)) {
					clearSelection();
				}
			}}
		>
			{/* 정렬 컨트롤 + 앞으로/뒤로 버튼 + 업로드 버튼 */}
			<div className="flex gap-2 mb-2 text-sm items-center justify-between">
				<div className="flex gap-2 items-center">
					{/* 앞으로/뒤로 버튼 */}
					<button
						onClick={goBackFolder}
						disabled={folderHistory.length === 0}
						className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
						title="뒤로가기"
					>
						←
					</button>
					<button
						onClick={goForwardFolder}
						disabled={folderFuture.length === 0}
						className="px-2 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
						title="앞으로가기"
					>
						→
					</button>
					{/* 기존 정렬 드롭다운 */}
					<div className="relative sort-dropdown">
						<button
							onClick={() => setShowSortDropdown(!showSortDropdown)}
							className="px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1"
							title="정렬 방식 선택"
						>
							정렬:{" "}
							{sort.key === "id"
								? "생성순"
								: sort.key === "name"
								? "이름순"
								: "타입순"}
							<svg
								className={`w-3 h-3 transition-transform ${
									showSortDropdown ? "rotate-180" : ""
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{showSortDropdown && (
							<div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-32">
								<button
									onClick={() => {
										if (sort.key === "id") {
											handleSort("id"); // 같은 키면 순서만 토글
										} else {
											handleSort("id"); // 다른 키면 해당 키로 변경
										}
										setShowSortDropdown(false);
									}}
									className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
										sort.key === "id"
											? "bg-blue-50 text-blue-600"
											: ""
									}`}
								>
									생성순{" "}
								</button>
								<button
									onClick={() => {
										if (sort.key === "name") {
											handleSort("name"); // 같은 키면 순서만 토글
										} else {
											handleSort("name"); // 다른 키면 해당 키로 변경
										}
										setShowSortDropdown(false);
									}}
									className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
										sort.key === "name"
											? "bg-blue-50 text-blue-600"
											: ""
									}`}
								>
									이름순{" "}
									{sort.key === "name"
										? sort.order === "asc"
											? "▲"
											: "▼"
										: ""}
								</button>
								<button
									onClick={() => {
										if (sort.key === "isFolder") {
											handleSort("isFolder"); // 같은 키면 순서만 토글
										} else {
											handleSort("isFolder"); // 다른 키면 해당 키로 변경
										}
										setShowSortDropdown(false);
									}}
									className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
										sort.key === "isFolder"
											? "bg-blue-50 text-blue-600"
											: ""
									}`}
								>
									타입순{" "}
									{sort.key === "isFolder"
										? sort.order === "asc"
											? "▲"
											: "▼"
										: ""}
								</button>
							</div>
						)}
					</div>
				</div>

				{/* 우측 버튼들 */}
				<div className="flex gap-2 items-center">
					<button
						onClick={() => setShowUpload(true)}
						className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
						title="파일 업로드"
					>
						<svg
							className="w-3 h-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						업로드
					</button>

					{/* 새 폴더 버튼 */}
					<button
						onClick={handleNewFolderClick}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
						title="새 폴더 생성"
					>
						<svg
							className="w-3 h-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						새 폴더
					</button>
				</div>
			</div>
			<UploadModal
				open={showUpload}
				onClose={() => setShowUpload(false)}
				onUploadFile={handleUploadFile}
				onUploadUrl={handleUploadUrl}
			/>

			{/* 파일/폴더 그리드 */}
			<div
				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
				onContextMenu={(e) => {
					// grid의 빈 영역(아이템이 없는 부분)에서만 배경 컨텍스트 메뉴 표시
					const target = e.target as HTMLElement;
					if (
						target.classList.contains("grid") ||
						target === e.currentTarget
					) {
						e.preventDefault();
						e.stopPropagation();
						clearSelection();
						showBackground({ event: e, props: { action: "background" } });
					}
				}}
			>
				{list.map((node, idx) => (
					<NodeRow
						key={node.id}
						node={node}
						idx={idx}
						selectedIds={selectedIds}
						handleClick={handleClick}
						handleDoubleClick={handleDoubleClick}
						show={show}
						moveNode={moveNode}
						clearSelection={clearSelection}
						selectAll={selectAll}
						editingId={editingId}
						setEditingId={setEditingId}
						imageUrls={imageUrls}
						clipboard={clipboard}
						newFolderMode={newFolderMode}
						newFolderName={newFolderName}
						setNewFolderName={setNewFolderName}
						setNewFolderMode={setNewFolderMode}
						addFolder={addFolder}
						selectedFolderId={selectedFolderId}
					/>
				))}
			</div>

			{/* 아이템 컨텍스트 메뉴 */}
			<Menu id={MENU_ID}>
				{/* 기본 작업 */}
				<Item
					onClick={({ props }) => {
						if (selectedIds.length === 1) {
							const node = nodes.find((n) => n.id === props.id);
							if (node?.isFolder) {
								selectFolder(props.id);
							} else {
								// 파일인 경우 미리보기 또는 다운로드
								alert(`파일 미리보기: ${node?.name}`);
							}
						}
					}}
					disabled={selectedIds.length !== 1}
				>
					열기
				</Item>
				<Item
					onClick={({ props }) => {
						if (selectedIds.length === 1) {
							setEditingId(props.id);
						}
					}}
					disabled={selectedIds.length !== 1}
				>
					이름 변경
				</Item>
				<Separator />

				{/* 클립보드 작업 */}
				<Item
					onClick={() => {
						if (selectedIds.length > 0) {
							const ids =
								selectedIds.length > 1
									? selectedIds
									: [selectedIds[0]!];
							copyNode(ids);
							// 사용자 피드백
							const count = ids.length;
							const type = count === 1 ? "항목" : "항목들";
							console.log(
								`${count}개 ${type}이(가) 클립보드에 복사되었습니다.`
							);
						}
					}}
					disabled={selectedIds.length === 0}
				>
					복사
				</Item>
				<Item
					onClick={() => {
						if (selectedIds.length > 0) {
							const ids =
								selectedIds.length > 1
									? selectedIds
									: [selectedIds[0]!];
							cutNode(ids);
							// 사용자 피드백
							const count = ids.length;
							const type = count === 1 ? "항목" : "항목들";
							console.log(
								`${count}개 ${type}이(가) 클립보드에 잘라내기되었습니다.`
							);
						}
					}}
					disabled={selectedIds.length === 0}
				>
					잘라내기
				</Item>
				<Item
					onClick={() => {
						pasteNode(selectedFolderId);
					}}
					disabled={clipboard.length === 0}
				>
					붙여넣기
				</Item>

				{/* 위험한 작업 */}
				<Item
					onClick={() => {
						if (selectedIds.length > 0) {
							const count = selectedIds.length;
							const type = count === 1 ? "항목" : "항목들";
							const confirmMessage = `정말로 ${count}개 ${type}을(를) 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`;

							if (window.confirm(confirmMessage)) {
								selectedIds.forEach((id) => deleteNode(id));
								console.log(`${count}개 ${type}이(가) 삭제되었습니다.`);
							}
						}
					}}
					disabled={selectedIds.length === 0}
				>
					삭제
				</Item>
			</Menu>

			{/* 배경 컨텍스트 메뉴 */}
			<Menu id={BACKGROUND_MENU_ID}>
				{/* 폴더 관리 */}
				<Item
					onClick={() => {
						handleNewFolderClick();
					}}
				>
					새 폴더
				</Item>
				<Separator />

				{/* 클립보드 작업 */}
				<Item
					onClick={() => {
						pasteNode(selectedFolderId);
					}}
					disabled={clipboard.length === 0}
				>
					붙여넣기
				</Item>
			</Menu>
		</div>
	);
});

/**
 * 파일 리스트 컴포넌트
 * DnD 프로바이더로 감싸서 드래그 앤 드롭 기능을 제공합니다.
 */
export const FileList: React.FC = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<FileListInner />
		</DndProvider>
	);
};
