import {Comparable} from './comparable';
import {TreeNode} from './treeNode';

export class AVLTree<T extends Comparable<T>> {
  private root_: TreeNode<T>|null;

  get root(): TreeNode<T>|null {
    return this.root_;
  }

  insert(v: T) {
    if (!this.root_) {
      this.root_ = new TreeNode<T>(v);
      return;
    }
    this.root_ = this.root_.insert(v);
  }

  forEach(cb: (node:TreeNode<T>, height: number) => void) {
    if (!this.root_) return;
    this.root_.traverse(cb);
  }
}
