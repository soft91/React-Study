import { create } from "zustand";
import { FileNode } from "./types";
import { getAllDescendantIds } from "./utils/tree";
import * as api from "./api";

type HistoryState = {
  nodes: FileNode[];
  selectedFolderId: number;
  selectedIds: number[];
  filter: string;
  sort: { key: string; order: 'asc' | 'desc' };
  clipboard: FileNode[];
};

type ClipboardItem = FileNode & { type: 'copy' | 'cut' };

interface FileManagerState {
  nodes: FileNode[];
  allFolders: FileNode[];
  selectedFolderId: number;
  selectedIds: number[];
  filter: string;
  sort: { key: string; order: 'asc' | 'desc' };
  clipboard: ClipboardItem[];
  history: HistoryState[];
  future: HistoryState[];
  loading: boolean;
  error: string | null;
  undo: () => void;
  redo: () => void;
  selectFolder: (id: number) => Promise<void>;
  selectOne: (id: number, multi?: boolean) => void;
  toggleSelect: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;
  setSort: (key: string) => void;
  addFolder: (parent: number, name: string) => Promise<void>;
  addFile: (parent: number, name: string) => Promise<void>;
  reset: () => Promise<void>;
  setFilter: (filter: string) => void;
  renameNode: (id: number, name: string) => Promise<void>;
  deleteNode: (id: number) => Promise<void>;
  copyNode: (ids: number[]) => Promise<void>;
  cutNode: (ids: number[]) => void;
  moveNode: (ids: number[], parent: number) => Promise<void>;
  pasteNode: (parent: number) => Promise<void>;
  uploadFile: (parent: number, file: File) => Promise<void>;
  loadAllFolders: () => Promise<void>;
}

const initialNodes: FileNode[] = [
  { id: 1, parent: 0, name: "Root", isFolder: true },
  { id: 2, parent: 1, name: "Documents", isFolder: true },
  { id: 3, parent: 1, name: "Pictures", isFolder: true },
  { id: 4, parent: 2, name: "Resume.pdf", isFolder: false },
  { id: 5, parent: 3, name: "Vacation.png", isFolder: false },
];

function getStateSnapshot(state: FileManagerState): HistoryState {
  return {
    nodes: state.nodes,
    selectedFolderId: state.selectedFolderId,
    selectedIds: state.selectedIds,
    filter: state.filter,
    sort: state.sort,
    clipboard: state.clipboard,
  };
}

export const useFileManagerStore = create<FileManagerState>((set, get) => ({
  nodes: initialNodes,
  allFolders: initialNodes.filter(n => n.isFolder),
  selectedFolderId: 1,
  selectedIds: [],
  filter: "",
  sort: { key: "name", order: "asc" },
  clipboard: [],
  history: [],
  future: [],
  loading: false,
  error: null,
  undo: () => set((state) => {
    if (state.history.length === 0) return {};
    const prev = state.history[state.history.length - 1];
    const newHistory = state.history.slice(0, -1);
    const futureState = getStateSnapshot(state);
    return { ...prev, history: newHistory, future: [futureState, ...state.future] };
  }),
  redo: () => set((state) => {
    if (state.future.length === 0) return {};
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    const historyState = getStateSnapshot(state);
    return { ...next, history: [...state.history, historyState], future: newFuture };
  }),
  selectFolder: async (id) => {
    set({ loading: true, error: null });
    try {
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
  selectOne: (id, multi) => set((state) => {
    if (multi) {
      if (state.selectedIds.includes(id)) return { selectedIds: state.selectedIds };
      return { history: [...state.history, getStateSnapshot(state)], selectedIds: [...state.selectedIds, id], future: [] };
    } else {
      return { history: [...state.history, getStateSnapshot(state)], selectedIds: [id], future: [] };
    }
  }),
  toggleSelect: (id) => set((state) => {
    return {
      history: [...state.history, getStateSnapshot(state)],
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
      future: [],
    };
  }),
  selectAll: (ids) => set((state) => ({
    history: [...state.history, getStateSnapshot(state)],
    selectedIds: ids,
    future: [],
  })),
  clearSelection: () => set((state) => ({
    history: [...state.history, getStateSnapshot(state)],
    selectedIds: [],
    future: [],
  })),
  setSort: (key) => set((state) => {
    const order = state.sort.key === key && state.sort.order === "asc" ? "desc" : "asc";
    return { history: [...state.history, getStateSnapshot(state)], sort: { key, order }, future: [] };
  }),
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
        loading: false,
        error: null,
      }));
      await get().loadAllFolders();
    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
  setFilter: (filter) => set((state) => ({
    history: [...state.history, getStateSnapshot(state)],
    filter,
    future: [],
  })),
  renameNode: async (id, name) => {
    set({ loading: true, error: null });
    try {
      await api.renameNode(id, name);
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
  deleteNode: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deleteNode(id);
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
  copyNode: async (ids) => {
    set({ loading: true, error: null });
    try {
      // MSW는 한 번에 하나만 복사 지원, 여러 개면 순차 처리
      for (const id of ids) {
        await api.copyNode(id);
      }
      const nodes = await api.getFiles(get().selectedFolderId);
      set((state) => ({
        history: [...state.history, getStateSnapshot(state)],
        nodes,
        loading: false,
        error: null,
      }));
    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
  cutNode: (ids) => set((state) => ({
    clipboard: state.nodes.filter((n) => ids.includes(n.id)).map(n => ({ ...n, type: 'cut' })),
  })),
  pasteNode: async (parent) => {
    set({ loading: true, error: null });
    try {
      // cut(이동)만 처리, 복사는 copyNode에서 처리
      for (const item of get().clipboard) {
        if (item.type === 'cut') {
          await api.moveNode(item.id, parent);
        }
      }
      const nodes = await api.getFiles(get().selectedFolderId);
      set((state) => ({
        history: [...state.history, getStateSnapshot(state)],
        nodes,
        clipboard: [],
        loading: false,
        error: null,
      }));
    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
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
  uploadFile: async (parent, file) => {
    set({ loading: true, error: null });
    try {
      const uploaded = await api.uploadFile(parent, file);
      let previewUrl = uploaded.url;
      if (/\.(png|jpe?g|gif)$/i.test(file.name)) {
        previewUrl = URL.createObjectURL(file);
      }
      const nodes = await api.getFiles(get().selectedFolderId);
      // Replace the uploaded node's url with the local preview if image
      const updatedNodes = nodes.map(n =>
        n.id === uploaded.id && previewUrl ? { ...n, url: previewUrl } : n
      );
      set((state) => ({
        history: [...state.history, getStateSnapshot(state)],
        nodes: updatedNodes,
        loading: false,
        error: null,
      }));
      await get().loadAllFolders();
    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
  loadAllFolders: async () => {
    set({ loading: true, error: null });
    try {
      const allFolders = await api.getAllFolders();
      set({ allFolders, loading: false, error: null });
    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
})); 