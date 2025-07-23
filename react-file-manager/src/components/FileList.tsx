import React, { useCallback, useMemo, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useFileManager } from "../hooks/useFileManager";
import { FaRegFile, FaRegFolder } from "react-icons/fa";

const FileIcon = FaRegFile as unknown as React.FC<{ className?: string }>;
const FolderIcon = FaRegFolder as unknown as React.FC<{ className?: string }>;

const MENU_ID = "filelist-context-menu";
const ItemTypes = { NODE: "node" };

interface NodeRowProps {
  node: any;
  idx: number;
  selectedIds: number[];
  handleClick: (e: React.MouseEvent, node: any, idx: number) => void;
  handleDoubleClick: (node: any) => void;
  show: (args: any) => void;
  moveNode: (ids: number[], parent: number) => void;
}

const NodeRow: React.FC<NodeRowProps & { editingId: number | null; setEditingId: (id: number | null) => void }> = ({ node, idx, selectedIds, handleClick, handleDoubleClick, show, moveNode, editingId, setEditingId }) => {
  const { renameNode } = useFileManager();
  const [tempName, setTempName] = React.useState(node.name);
  React.useEffect(() => { setTempName(node.name); }, [node.name]);

  const editing = editingId === node.id;

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // setEditingId(node.id); // 이름 클릭으로는 편집 비활성화
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };
  const handleInputBlur = () => {
    if (tempName.trim() && tempName !== node.name) {
      renameNode(node.id, tempName.trim());
    }
    setEditingId(null);
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setTempName(node.name);
      setEditingId(null);
    }
  };
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NODE,
    item: { id: node.id, selectedIds: selectedIds.includes(node.id) ? selectedIds : [node.id] },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.NODE,
    canDrop: (item: any) => node.isFolder && !item.selectedIds.includes(node.id),
    drop: (item: any) => {
      moveNode(item.selectedIds, node.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={node.isFolder ? (el => { if (el) drop(el); }) : undefined}
      className={`border rounded p-3 w-full h-full flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer select-none ${
        selectedIds.includes(node.id) ? "ring-2 ring-blue-400 bg-blue-50" : ""
      } ${isOver && canDrop ? "bg-green-100" : ""}`}
      onClick={(e) => handleClick(e, node, idx)}
      onDoubleClick={() => handleDoubleClick(node)}
      onContextMenu={(e) => show({ event: e, props: { id: node.id, action: 'rename' } })}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div ref={el => { if (el) drag(el); }} className="w-full h-full flex flex-col items-center justify-center">
        <span className="text-3xl mb-2 w-full text-center" role="img" aria-label={node.isFolder ? "folder" : "file"}>
          {node.isFolder ? (
            <FolderIcon />
          ) : node.url && /\.(png|jpe?g|gif)$/i.test(node.name) ? (
            <img src={node.url} alt={node.name} className="w-12 h-12 object-cover rounded mx-auto" />
          ) : (
            <FileIcon />
          )}
        </span>
        {editing ? (
          <input
            className="w-full text-center border rounded px-1 py-0.5"
            value={tempName}
            autoFocus
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span
            className="truncate w-full text-center cursor-pointer"
          >
            {node.name}
          </span>
        )}
      </div>
      {/* 기존 미리보기는 제거, 위에서 아이콘 대신 이미지로 대체 */}
    </div>
  );
};

const FileListInner: React.FC = React.memo(() => {
  const {
    nodes,
    selectedFolderId,
    selectedIds,
    filter,
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
  } = useFileManager();

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [newFolderMode, setNewFolderMode] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");

  // 현재 폴더의 파일/폴더 목록 (정렬/필터 포함)
  const list = useMemo(() => {
    let l = nodes.filter((n) => n.parent === selectedFolderId);
    if (filter) {
      l = l.filter((n) => n.name.toLowerCase().includes(filter.toLowerCase()));
    }
    l = [...l].sort((a, b) => {
      const key = sort.key as keyof typeof a;
      if (a[key] < b[key]) return sort.order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
    return l;
  }, [nodes, selectedFolderId, filter, sort]);

  const { show } = useContextMenu({ id: MENU_ID });

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
        selectedIds.forEach(id => deleteNode(id));
        e.preventDefault();
      } else if (e.key === "F2" && selectedIds.length === 1) {
        const id = selectedIds[0];
        setEditingId(id);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds, selectedFolderId, copyNode, cutNode, pasteNode, deleteNode, renameNode, setEditingId]);

  const handleDoubleClick = useCallback((node: typeof list[number]) => {
    if (node.isFolder) {
      selectFolder(node.id);
    } else {
      alert(`미리보기: ${node.name}`);
    }
  }, [selectFolder]);

  const handleClick = useCallback((e: React.MouseEvent, node: typeof list[number], idx: number) => {
    if (e.ctrlKey || e.metaKey) {
      toggleSelect(node.id);
    } else if (e.shiftKey && selectedIds.length > 0) {
      const last = list.findIndex((n) => n.id === selectedIds[selectedIds.length - 1]);
      const range = [last, idx].sort((a, b) => a - b);
      const ids = list.slice(range[0], range[1] + 1).map((n) => n.id);
      selectAll(Array.from(new Set([...selectedIds, ...ids])));
    } else {
      selectOne(node.id);
    }
  }, [toggleSelect, selectAll, selectOne, selectedIds, list]);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === list.length) {
      clearSelection();
    } else {
      selectAll(list.map((n) => n.id));
    }
  }, [selectedIds, list, selectAll, clearSelection]);

  return (
    <div className="flex-1 h-full bg-white p-4 overflow-y-auto">
      <div className="font-bold mb-2 flex items-center gap-2">
        파일/폴더 리스트
        <button
          className="ml-auto text-xs px-2 py-1 border rounded hover:bg-gray-100"
          onClick={handleSelectAll}
        >
          {selectedIds.length === list.length ? "전체 해제" : "전체 선택"}
        </button>
        <button
          className="ml-2 text-xs px-2 py-1 border rounded hover:bg-blue-100 bg-blue-500 text-white"
          onClick={() => setNewFolderMode(true)}
          disabled={newFolderMode || loading}
        >
          새 폴더
        </button>
        {newFolderMode && (
          <input
            className="ml-2 px-2 py-1 border rounded w-32 text-xs"
            placeholder="폴더 이름 입력..."
            value={newFolderName}
            autoFocus
            onChange={e => setNewFolderName(e.target.value)}
            onBlur={async () => {
              if (newFolderName.trim()) {
                await addFolder(selectedFolderId, newFolderName.trim());
              }
              setNewFolderMode(false);
              setNewFolderName("");
            }}
            onKeyDown={async e => {
              if (e.key === "Enter" && newFolderName.trim()) {
                await addFolder(selectedFolderId, newFolderName.trim());
                setNewFolderMode(false);
                setNewFolderName("");
              } else if (e.key === "Escape") {
                setNewFolderMode(false);
                setNewFolderName("");
              }
            }}
          />
        )}
      </div>
      <div className="flex gap-2 mb-2 text-sm">
        <button onClick={() => setSort("name")}>이름{sort.key === "name" ? (sort.order === "asc" ? " ▲" : " ▼") : ""}</button>
        <button onClick={() => setSort("isFolder")}>타입{sort.key === "isFolder" ? (sort.order === "asc" ? " ▲" : " ▼") : ""}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.length === 0 && (
          <div className="col-span-full text-gray-400 text-center">비어 있음</div>
        )}
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
            editingId={editingId}
            setEditingId={setEditingId}
          />
        ))}
      </div>
      <Menu id={MENU_ID}>
        <Item onClick={({ props }) => setEditingId(props.id)}>이름 변경</Item>
        <Item onClick={({ props }) => {
          if (window.confirm("정말 삭제하시겠습니까?")) deleteNode(props.id);
        }}>삭제</Item>
        <Item onClick={({ props }) => copyNode([props.id])}>복사</Item>
        <Item onClick={({ props }) => cutNode([props.id])}>잘라내기</Item>
        <Item disabled={!clipboard.length} onClick={({ props }) => pasteNode(selectedFolderId)}>붙여넣기</Item>
        <Item onClick={({ props }) => alert(`속성: ${JSON.stringify(nodes.find(n => n.id === props.id), null, 2)}`)}>속성 보기</Item>
      </Menu>
    </div>
  );
});

export const FileList = FileListInner; 