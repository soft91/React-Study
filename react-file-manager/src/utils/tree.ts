import { FileNode } from "../types";

export function getChildNodes(nodes: FileNode[], parentId: number) {
  return nodes.filter((n) => n.parent === parentId);
}

export function getAllDescendantIds(nodes: FileNode[], parentId: number): number[] {
  const children = nodes.filter((n) => n.parent === parentId);
  return children.reduce<number[]>(
    (acc, child) => [...acc, child.id, ...getAllDescendantIds(nodes, child.id)],
    []
  );
} 