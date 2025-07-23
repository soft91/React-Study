import React from "react";
import { useFileManager } from "../hooks/useFileManager";
import { useDropzone } from "react-dropzone";

const Toolbar: React.FC = React.memo(() => {
  const {
    nodes,
    selectedFolderId,
    addFolder,
    reset,
    filter,
    setFilter,
    sort,
    setSort,
    selectFolder,
    history,
    future,
    undo,
    redo,
    loading,
    error,
    uploadFile,
  } = useFileManager();

  const [newFolderMode, setNewFolderMode] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");

  // breadcrumb 경로 계산
  const getPath = (id: number): { id: number; name: string }[] => {
    const path: { id: number; name: string }[] = [];
    let current = nodes.find((n) => n.id === id);
    while (current && typeof current === 'object') {
      path.unshift({ id: current.id, name: current.name });
      current = nodes.find((n) => n.id === current?.parent && n.isFolder);
    }
    return path;
  };
  const path = getPath(selectedFolderId);

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        await uploadFile(selectedFolderId, file);
      }
    },
    [selectedFolderId, uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full h-12 bg-gray-200 flex items-center px-4 border-b gap-2">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-600">
        {path.map((p, i) => (
          <span key={p.id} className="flex items-center">
            {i > 0 && <span className="mx-1">/</span>}
            <button
              className={`hover:underline ${p.id === selectedFolderId ? "font-bold text-blue-700" : ""}`}
              onClick={() => selectFolder(p.id)}
            >
              {p.name}
            </button>
          </span>
        ))}
      </nav>
      {/* 기본 검색 */}
      <input
        className="ml-4 px-2 py-1 border rounded"
        placeholder="검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={undo}
        disabled={!history.length}
      >
        Undo
      </button>
      <button
        className="ml-2 px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        onClick={redo}
        disabled={!future.length}
      >
        Redo
      </button>
      <button
        className="ml-2 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
        onClick={() => reset()}
      >
        새로고침
      </button>
      <div
        {...getRootProps()}
        className={
          "ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer flex items-center" +
          (isDragActive ? " bg-green-700" : "")
        }
        style={{ minWidth: 100 }}
      >
        <input {...getInputProps()} />
        {loading ? "업로드 중..." : "업로드"}
      </div>
      <button
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setNewFolderMode(true)}
        disabled={newFolderMode}
      >
        새 폴더
      </button>
      {newFolderMode && (
        <input
          className="ml-2 px-2 py-1 border rounded w-32"
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
      {error && <span className="ml-2 text-red-500 text-xs">{error}</span>}
    </div>
  );
});

export default Toolbar; 