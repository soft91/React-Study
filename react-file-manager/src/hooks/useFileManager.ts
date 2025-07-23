import { useFileManagerStore } from "../store";

export function useFileManager() {
  const nodes = useFileManagerStore((s) => s.nodes);
  const selectedFolderId = useFileManagerStore((s) => s.selectedFolderId);
  const selectedIds = useFileManagerStore((s) => s.selectedIds);
  const filter = useFileManagerStore((s) => s.filter);
  const sort = useFileManagerStore((s) => s.sort);
  const selectFolder = useFileManagerStore((s) => s.selectFolder);
  const selectOne = useFileManagerStore((s) => s.selectOne);
  const toggleSelect = useFileManagerStore((s) => s.toggleSelect);
  const selectAll = useFileManagerStore((s) => s.selectAll);
  const clearSelection = useFileManagerStore((s) => s.clearSelection);
  const setSort = useFileManagerStore((s) => s.setSort);
  const addFolder = useFileManagerStore((s) => s.addFolder);
  const addFile = useFileManagerStore((s) => s.addFile);
  const reset = useFileManagerStore((s) => s.reset);
  const setFilter = useFileManagerStore((s) => s.setFilter);
  const renameNode = useFileManagerStore((s) => s.renameNode);
  const deleteNode = useFileManagerStore((s) => s.deleteNode);
  const clipboard = useFileManagerStore((s) => s.clipboard);
  const copyNode = useFileManagerStore((s) => s.copyNode);
  const pasteNode = useFileManagerStore((s) => s.pasteNode);
  const history = useFileManagerStore((s) => s.history);
  const future = useFileManagerStore((s) => s.future);
  const undo = useFileManagerStore((s) => s.undo);
  const redo = useFileManagerStore((s) => s.redo);
  const cutNode = useFileManagerStore((s) => s.cutNode);
  const moveNode = useFileManagerStore((s) => s.moveNode);
  const loading = useFileManagerStore((s) => s.loading);
  const error = useFileManagerStore((s) => s.error);
  const uploadFile = useFileManagerStore((s) => s.uploadFile);
  const allFolders = useFileManagerStore((s) => s.allFolders);
  const loadAllFolders = useFileManagerStore((s) => s.loadAllFolders);

  return {
    nodes,
    selectedFolderId,
    selectedIds,
    filter,
    sort,
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
    renameNode,
    deleteNode,
    clipboard,
    copyNode,
    pasteNode,
    history,
    future,
    undo,
    redo,
    cutNode,
    moveNode,
    loading,
    error,
    uploadFile,
    allFolders,
    loadAllFolders,
  };
} 