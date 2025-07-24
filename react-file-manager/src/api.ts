import { FileNode } from "./types";

/**
 * 특정 부모 폴더의 파일/폴더 목록을 가져옵니다.
 * @param parent - 부모 폴더의 ID
 * @returns Promise<FileNode[]> - 파일/폴더 목록
 */
export async function getFiles(parent: number): Promise<FileNode[]> {
	const res = await fetch(`/api/files?parent=${parent}`);
	if (!res.ok) throw new Error("Failed to fetch files");
	return res.json();
}

/**
 * 새로운 폴더를 생성합니다.
 * @param parent - 부모 폴더의 ID
 * @param name - 폴더 이름
 * @returns Promise<FileNode> - 생성된 폴더 정보
 */
export async function addFolder(
	parent: number,
	name: string
): Promise<FileNode> {
	const res = await fetch("/api/folder", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ parent, name }),
	});
	if (!res.ok) throw new Error("Failed to add folder");
	return res.json();
}

/**
 * 새로운 파일을 생성합니다.
 * @param parent - 부모 폴더의 ID
 * @param name - 파일 이름
 * @returns Promise<FileNode> - 생성된 파일 정보
 */
export async function addFile(parent: number, name: string): Promise<FileNode> {
	const res = await fetch("/api/file", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ parent, name }),
	});
	if (!res.ok) throw new Error("Failed to add file");
	return res.json();
}

/**
 * 파일/폴더의 이름을 변경합니다.
 * @param id - 변경할 파일/폴더의 ID
 * @param name - 새로운 이름
 * @returns Promise<void>
 */
export async function renameNode(id: number, name: string): Promise<void> {
	const res = await fetch(`/api/node/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name }),
	});
	if (!res.ok) throw new Error("Failed to rename node");
}

/**
 * 파일/폴더를 삭제합니다.
 * @param id - 삭제할 파일/폴더의 ID
 * @returns Promise<void>
 */
export async function deleteNode(id: number): Promise<void> {
	const res = await fetch(`/api/node/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete node");
}

/**
 * 파일/폴더를 다른 위치로 이동합니다.
 * @param id - 이동할 파일/폴더의 ID
 * @param parent - 새로운 부모 폴더의 ID
 * @returns Promise<void>
 */
export async function moveNode(id: number, parent: number): Promise<void> {
	const res = await fetch(`/api/node/${id}/move`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ parent }),
	});
	if (!res.ok) throw new Error("Failed to move node");
}

/**
 * 파일/폴더를 복사합니다.
 * @param id - 복사할 파일/폴더의 ID
 * @param parent - 복사될 부모 폴더의 ID
 * @returns Promise<FileNode> - 복사된 파일/폴더 정보
 */
export async function copyNode(id: number, parent: number): Promise<FileNode> {
	const res = await fetch(`/api/node/${id}/copy`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ parent }),
	});
	if (!res.ok) throw new Error("Failed to copy node");
	return res.json();
}

/**
 * 파일을 업로드합니다.
 * @param parent - 업로드할 부모 폴더의 ID
 * @param file - 업로드할 파일 객체
 * @returns Promise<FileNode & { url?: string }> - 업로드된 파일 정보 (URL 포함)
 */
export async function uploadFile(
	parent: number,
	file: File
): Promise<FileNode & { url?: string }> {
	const formData = new FormData();
	formData.append("parent", String(parent));
	formData.append("file", file);
	const res = await fetch("/api/upload", {
		method: "POST",
		body: formData,
	});
	if (!res.ok) throw new Error("Failed to upload file");
	return res.json();
}

/**
 * 모든 폴더 목록을 가져옵니다 (폴더 트리용).
 * @returns Promise<FileNode[]> - 모든 폴더 목록
 */
export async function getAllFolders(): Promise<FileNode[]> {
	const res = await fetch("/api/folders/all");
	if (!res.ok) throw new Error("Failed to fetch all folders");
	return res.json();
}
