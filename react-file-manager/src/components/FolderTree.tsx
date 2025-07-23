import React from "react";
import { Tree, NodeModel } from "@minoru/react-dnd-treeview";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useFileManager } from "../hooks/useFileManager";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "foldertree-context-menu";
const FolderIcon = FaFolder as unknown as React.FC<{ className?: string }>;
const FolderOpenIcon = FaFolderOpen as unknown as React.FC<{ className?: string }>;

export const FolderTree: React.FC = React.memo(() => {
  const { allFolders, loadAllFolders, selectedFolderId, selectFolder, renameNode, deleteNode, copyNode, cutNode, pasteNode, moveNode, clipboard } = useFileManager();
  const { show } = useContextMenu({ id: MENU_ID });
  const [openIds, setOpenIds] = React.useState<number[]>([1]);

  React.useEffect(() => {
    loadAllFolders();
  }, [loadAllFolders]);

  // Remove Root folder from the tree, show all folders with parent: 0 as roots
  const treeData: NodeModel[] = allFolders
    .filter(n => n.name !== "Root")
    .map((n) => ({
      id: Number(n.id),
      parent: n.parent === 1 ? -1 : Number(n.parent), // Only Root's children become root, others keep their parent
      text: n.name,
      droppable: true,
    }));

  return (
    <div className="w-64 h-full bg-gray-100 p-2 border-r overflow-y-auto">
      <div className="font-bold mb-2">폴더 트리</div>
      <Tree
        key={allFolders.map(f=>f.id+':'+f.parent).join(',')}
        tree={treeData}
        rootId={-1}
        onDrop={(newTree, { dragSourceId, dropTargetId }) => {
          if (typeof dragSourceId === 'number' && typeof dropTargetId === 'number') {
            moveNode([dragSourceId], dropTargetId);
          }
        }}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            style={{ marginLeft: depth * 16 }}
            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${
              node.id === selectedFolderId ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
            } ${depth === 0 ? "font-bold text-base" : ""}`}
            onClick={() => selectFolder(Number(node.id))}
            onContextMenu={(e) => show({ event: e, props: { id: node.id } })}
          >
            <span onClick={(e) => { e.stopPropagation(); onToggle(); }}>
              {isOpen ? <FolderOpenIcon className="text-yellow-500" /> : <FolderIcon className="text-yellow-500" />}
            </span>
            <span>{node.text}</span>
          </div>
        )}
        dragPreviewRender={(node: any) => <span>{node.text ?? ''}</span>}
      />
      <Menu id={MENU_ID}>
        <Item onClick={({ props }) => {
          const name = prompt("새 이름을 입력하세요");
          if (name) renameNode(props.id, name);
        }}>이름 변경</Item>
        <Item onClick={({ props }) => {
          if (window.confirm("정말 삭제하시겠습니까?")) deleteNode(props.id);
        }}>삭제</Item>
        <Item onClick={({ props }) => copyNode([props.id])}>복사</Item>
        <Item onClick={({ props }) => cutNode([props.id])}>잘라내기</Item>
        <Item disabled={!clipboard.length} onClick={({ props }) => pasteNode(props.id)}>붙여넣기</Item>
      </Menu>
    </div>
  );
}); 