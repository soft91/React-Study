import { FileNode } from "./types";

export async function getFiles(parent: number): Promise<FileNode[]> {
  const res = await fetch(`/api/files?parent=${parent}`);
  if (!res.ok) throw new Error("Failed to fetch files");
  return res.json();
}

export async function addFolder(parent: number, name: string): Promise<FileNode> {
  const res = await fetch("/api/folder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parent, name }),
  });
  if (!res.ok) throw new Error("Failed to add folder");
  return res.json();
}

export async function addFile(parent: number, name: string): Promise<FileNode> {
  const res = await fetch("/api/file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parent, name }),
  });
  if (!res.ok) throw new Error("Failed to add file");
  return res.json();
}

export async function renameNode(id: number, name: string): Promise<void> {
  const res = await fetch(`/api/node/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to rename node");
}

export async function deleteNode(id: number): Promise<void> {
  const res = await fetch(`/api/node/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete node");
}

export async function moveNode(id: number, parent: number): Promise<void> {
  const res = await fetch(`/api/node/${id}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parent }),
  });
  if (!res.ok) throw new Error("Failed to move node");
}

export async function copyNode(id: number): Promise<FileNode> {
  const res = await fetch(`/api/node/${id}/copy`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to copy node");
  return res.json();
}

export async function uploadFile(parent: number, file: File): Promise<FileNode & { url?: string }> {
  const formData = new FormData();
  formData.append('parent', String(parent));
  formData.append('file', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload file');
  return res.json();
}

export async function getAllFolders(): Promise<FileNode[]> {
  const res = await fetch('/api/folders/all');
  if (!res.ok) throw new Error('Failed to fetch all folders');
  return res.json();
} 