import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
	FaFolder,
	FaFolderOpen,
	FaChevronRight,
	FaChevronDown,
} from "react-icons/fa";
import { useFileManager } from "../hooks/useFileManager";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "foldertree-context-menu";
const ItemTypes = { FOLDER: "folder" };
const FolderIcon = FaFolder as React.FC<{ className?: string }>;
const FolderOpenIcon = FaFolderOpen as React.FC<{ className?: string }>;
const ChevronRightIcon = FaChevronRight as React.FC<{ className?: string }>;
const ChevronDownIcon = FaChevronDown as React.FC<{ className?: string }>;

interface TreeNodeProps {
	folder: any;
	depth: number;
	selectedFolderId: number;
	openFolders: Set<number>;
	onFolderClick: (id: number) => void;
	onToggle: (id: number) => void;
	onContextMenu: (e: React.MouseEvent, id: number) => void;
	selectedRef: React.RefObject<HTMLDivElement | null>;
	moveNode: (ids: number[], parent: number) => void;
	editingFolderId: number | null;
	setEditingFolderId: (id: number | null) => void;
	editingName: string;
	setEditingName: (name: string) => void;
	renameNode: (id: number, name: string) => Promise<void>;
}

const TreeNode: React.FC<TreeNodeProps> = ({
	folder,
	depth,
	selectedFolderId,
	openFolders,
	onFolderClick,
	onToggle,
	onContextMenu,
	selectedRef,
	moveNode,
	editingFolderId,
	setEditingFolderId,
	editingName,
	setEditingName,
	renameNode,
}) => {
	const isOpen = openFolders.has(folder.id);
	const isSelected = folder.id === selectedFolderId;
	const hasChildren = folder.children && folder.children.length > 0;
	const isEditing = editingFolderId === folder.id;

	// 편집 시작 핸들러
	const handleStartEdit = useCallback(() => {
		setEditingFolderId(folder.id);
		setEditingName(folder.name);
	}, [folder.id, folder.name, setEditingFolderId, setEditingName]);

	// 편집 완료 핸들러
	const handleFinishEdit = useCallback(async () => {
		if (editingName.trim() && editingName !== folder.name) {
			try {
				await renameNode(folder.id, editingName.trim());
			} catch (error) {
				// 에러 발생 시 원래 이름으로 복원
				setEditingName(folder.name);
			}
		}
		setEditingFolderId(null);
		setEditingName("");
	}, [
		editingName,
		folder.name,
		folder.id,
		renameNode,
		setEditingFolderId,
		setEditingName,
	]);

	// 편집 취소 핸들러
	const handleCancelEdit = useCallback(() => {
		setEditingFolderId(null);
		setEditingName("");
	}, [setEditingFolderId, setEditingName]);

	// 편집 키보드 이벤트 핸들러
	const handleEditKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				handleFinishEdit();
			} else if (e.key === "Escape") {
				handleCancelEdit();
			}
		},
		[handleFinishEdit, handleCancelEdit]
	);

	// 드래그 기능
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.FOLDER,
		item: { id: folder.id },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	});

	// 드롭 기능
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.FOLDER,
		canDrop: (item: any) => {
			if (item.id === folder.id) return false; // 자기 자신 금지
			// 자기 자신의 하위 폴더로 드롭 금지
			const isDescendant = (target: any, id: number): boolean => {
				if (!target.children) return false;
				for (const child of target.children) {
					if (child.id === id) return true;
					if (isDescendant(child, id)) return true;
				}
				return false;
			};
			if (isDescendant(folder, item.id)) return false;
			return true;
		},
		drop: (item: any) => {
			moveNode([item.id], folder.id);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<div>
			<div
				ref={(node) => {
					drag(drop(node));
					if (isSelected) {
						selectedRef.current = node;
					}
				}}
				style={{ marginLeft: depth * 16 }}
				className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${
					isSelected
						? "!bg-blue-100 !text-blue-700 !font-medium"
						: "hover:bg-gray-200"
				} ${depth === 0 ? "font-bold text-base" : ""} ${
					isDragging ? "opacity-50" : ""
				} ${
					isOver && canDrop
						? "bg-green-200 border-2 border-green-500"
						: isOver && !canDrop
						? "bg-red-200 border-2 border-red-500"
						: ""
				}`}
				onClick={() => {
					if (isSelected) {
						onToggle(folder.id);
					} else {
						onFolderClick(folder.id);
					}
				}}
				onContextMenu={(e) => {
					// Root 폴더에서는 컨텍스트 메뉴 비활성화
					if (depth === 0 || folder.id === 1) {
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					onContextMenu(e, folder.id);
				}}
			>
				{hasChildren && (
					<span
						onClick={(e) => {
							e.stopPropagation();
							onToggle(folder.id);
						}}
						className="w-4 h-4 flex items-center justify-center hover:bg-gray-300 rounded"
					>
						{isOpen ? (
							<ChevronDownIcon className="w-3 h-3 text-gray-600" />
						) : (
							<ChevronRightIcon className="w-3 h-3 text-gray-600" />
						)}
					</span>
				)}
				<span className="flex items-center">
					{isOpen ? (
						<FolderOpenIcon className="text-yellow-500 w-4 h-4" />
					) : (
						<FolderIcon className="text-yellow-500 w-4 h-4" />
					)}
				</span>

				{/* 폴더 이름 또는 편집 입력 필드 */}
				<span className="ml-1 truncate">
					{isEditing ? (
						<input
							ref={(el) => el?.focus()}
							type="text"
							value={editingName}
							onChange={(e) => setEditingName(e.target.value)}
							onKeyDown={handleEditKeyDown}
							onBlur={handleFinishEdit}
							className="bg-white border border-blue-300 rounded px-1 text-sm w-full"
							onClick={(e) => e.stopPropagation()}
						/>
					) : (
						<span>{folder.name}</span>
					)}
				</span>
			</div>
			{isOpen && hasChildren && (
				<div>
					{folder.children.map((child: any) => (
						<TreeNode
							key={child.id}
							folder={child}
							depth={depth + 1}
							selectedFolderId={selectedFolderId}
							openFolders={openFolders}
							onFolderClick={onFolderClick}
							onToggle={onToggle}
							onContextMenu={onContextMenu}
							selectedRef={selectedRef}
							moveNode={moveNode}
							editingFolderId={editingFolderId}
							setEditingFolderId={setEditingFolderId}
							editingName={editingName}
							setEditingName={setEditingName}
							renameNode={renameNode}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const FolderTree: React.FC = React.memo(() => {
	const {
		allFolders,
		selectedFolderId,
		selectFolder,
		renameNode,
		deleteNode,
		copyNode,
		cutNode,
		pasteNode,
		moveNode,
		addFolder,
		clipboard,
		openFolders,
		openFolder,
		toggleFolder,
	} = useFileManager();
	const { show } = useContextMenu({ id: MENU_ID });

	// 편집 중인 폴더 ID 상태
	const [editingFolderId, setEditingFolderId] = React.useState<number | null>(
		null
	);
	const [editingName, setEditingName] = React.useState("");

	// 트리 구조로 변환 - useMemo로 최적화
	const treeData = useMemo(() => {
		const buildTree = (folders: any[], parentId: number = 0): any[] => {
			const children = folders.filter((f) => f.parent === parentId);
			return children.map((folder) => ({
				...folder,
				children: buildTree(folders, folder.id),
			}));
		};

		const result = buildTree(allFolders);
		return result;
	}, [allFolders]);

	// 선택된 폴더가 트리에서 항상 보이도록 ref 관리
	const selectedRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({ block: "nearest" });
		}
	}, [selectedFolderId]);

	// 폴더 경로 자동 펼침 (파일리스트에서 더블클릭 등으로 이동 시)
	useEffect(() => {
		if (selectedFolderId && allFolders.length > 0) {
			let currentId = selectedFolderId;
			while (currentId && currentId !== 0) {
				openFolder(currentId);
				const parent = allFolders.find((f) => f.id === currentId)?.parent;
				if (parent && parent !== currentId) {
					currentId = parent;
				} else {
					break;
				}
			}
		}
	}, [selectedFolderId, allFolders, openFolder]);

	const handleFolderClick = useCallback(
		(id: number) => {
			selectFolder(id);
		},
		[selectFolder]
	);

	const handleToggle = useCallback(
		(id: number) => {
			toggleFolder(id);
		},
		[toggleFolder]
	);

	const handleContextMenu = useCallback(
		(e: React.MouseEvent, id: number) => {
			e.preventDefault();
			e.stopPropagation();
			show({ event: e, props: { id } });
		},
		[show]
	);

	return (
		<div className="w-64 h-full bg-gray-100 p-2 border-r overflow-y-auto">
			<div className="font-bold mb-2">
				폴더 트리 ({allFolders.length}개 폴더)
			</div>
			<div>
				{treeData.map((folder) => (
					<TreeNode
						key={folder.id}
						folder={folder}
						depth={0}
						selectedFolderId={selectedFolderId}
						openFolders={openFolders}
						onFolderClick={handleFolderClick}
						onToggle={handleToggle}
						onContextMenu={handleContextMenu}
						selectedRef={selectedRef}
						moveNode={moveNode}
						editingFolderId={editingFolderId}
						setEditingFolderId={setEditingFolderId}
						editingName={editingName}
						setEditingName={setEditingName}
						renameNode={renameNode}
					/>
				))}
			</div>

			{/* 아이템 컨텍스트 메뉴 */}
			<Menu id={MENU_ID}>
				<Item
					onClick={({ props }) => {
						selectFolder(props.id);
					}}
				>
					열기
				</Item>
				<Item
					onClick={({ props }) => {
						// 인라인 편집 시작
						setEditingFolderId(props.id);
						setEditingName(
							allFolders.find((f) => f.id === props.id)?.name || ""
						);
					}}
				>
					이름 변경
				</Item>
				<Separator />
				<Item
					onClick={({ props }) => {
						const folderName =
							allFolders.find((f) => f.id === props.id)?.name || "폴더";
						if (
							window.confirm(
								`정말로 "${folderName}" 폴더를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`
							)
						) {
							deleteNode(props.id);
						}
					}}
				>
					삭제
				</Item>
			</Menu>
		</div>
	);
});
