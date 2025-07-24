import { FileNode } from "../types";

/**
 * 주어진 노드의 모든 하위 노드 ID를 재귀적으로 찾습니다.
 *
 * @param nodes - 전체 노드 목록
 * @param parentId - 부모 노드의 ID
 * @returns number[] - 하위 노드 ID 목록
 *
 * @example
 * ```typescript
 * const allNodes = [
 *   { id: 1, parent: 0, name: "Root", isFolder: true },
 *   { id: 2, parent: 1, name: "Documents", isFolder: true },
 *   { id: 3, parent: 2, name: "report.txt", isFolder: false }
 * ];
 * const descendantIds = getAllDescendantIds(allNodes, 1);
 * // 결과: [2, 3]
 * ```
 */
export function getAllDescendantIds(
	nodes: FileNode[],
	parentId: number
): number[] {
	const descendants: number[] = [];

	// 재귀적으로 하위 노드들을 찾습니다
	function findDescendants(parent: number) {
		const children = nodes.filter((node) => node.parent === parent);
		children.forEach((child) => {
			descendants.push(child.id);
			if (child.isFolder) {
				findDescendants(child.id);
			}
		});
	}

	findDescendants(parentId);
	return descendants;
}

/**
 * 주어진 노드의 경로를 구성합니다.
 *
 * @param nodes - 전체 노드 목록
 * @param nodeId - 경로를 찾을 노드의 ID
 * @returns FileNode[] - 루트부터 해당 노드까지의 경로 배열
 *
 * @example
 * ```typescript
 * const path = getNodePath(allNodes, 3);
 * // 결과: [Root, Documents, report.txt]
 * ```
 */
export function getNodePath(nodes: FileNode[], nodeId: number): FileNode[] {
	const path: FileNode[] = [];
	let currentId = nodeId;

	// 루트까지 거슬러 올라가며 경로를 구성합니다
	while (currentId !== 0) {
		const node = nodes.find((n) => n.id === currentId);
		if (node) {
			path.unshift(node);
			currentId = node.parent;
		} else {
			break;
		}
	}

	return path;
}

/**
 * 주어진 노드가 다른 노드의 하위 노드인지 확인합니다.
 *
 * @param nodes - 전체 노드 목록
 * @param childId - 확인할 자식 노드의 ID
 * @param parentId - 확인할 부모 노드의 ID
 * @returns boolean - 하위 노드 여부
 *
 * @example
 * ```typescript
 * const isChild = isDescendant(allNodes, 3, 1);
 * // 결과: true (3번 노드가 1번 노드의 하위 노드)
 * ```
 */
export function isDescendant(
	nodes: FileNode[],
	childId: number,
	parentId: number
): boolean {
	const descendants = getAllDescendantIds(nodes, parentId);
	return descendants.includes(childId);
}

/**
 * 트리 구조로 노드들을 변환합니다.
 *
 * @param nodes - 평면 구조의 노드 목록
 * @param parentId - 시작할 부모 노드의 ID (기본값: 0)
 * @returns TreeNode[] - 트리 구조의 노드 목록
 *
 * @example
 * ```typescript
 * const treeData = buildTree(allNodes);
 * // 결과: [{ id: 1, children: [{ id: 2, children: [] }] }]
 * ```
 */
export function buildTree(nodes: FileNode[], parentId: number = 0): TreeNode[] {
	return nodes
		.filter((node) => node.parent === parentId)
		.map((node) => ({
			...node,
			children: buildTree(nodes, node.id),
		}));
}

/**
 * 트리 노드의 타입 정의
 */
export interface TreeNode extends FileNode {
	children: TreeNode[];
}
