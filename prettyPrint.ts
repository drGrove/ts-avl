import {TreeNode} from './treeNode';

export function prettyPrint(node: TreeNode<any>|null, prefix: String = "") {
  if (!node) return;
  prettyPrint(node.right, prefix.replace("/--", "   ").replace("\\--", "|  ") +" /--");
  console.log(prefix + node.value.toString());
  prettyPrint(node.left, prefix.replace("\\--", "   ").replace("/--", "|  ") +" \\--");
}
