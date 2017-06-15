import {Comparison, Comparable} from './comparable';

enum Rotation {
  LEFT,
  RIGHT
}

export class TreeNode<T extends Comparable<T>> {
  private parent_: TreeNode<T>|null = null;
  private left_: TreeNode<T>|null = null;
  private right_: TreeNode<T>|null = null;
  private value_: T;
  private height_: number = 0;
  private balanceFactor_: number = 0;

  constructor(value: T) {
    this.value_ = value;
  }

  get value(): T {
    return this.value_;
  }

  get height(): number {
    return this.height_;
  }

  insert(value: T): TreeNode<T> {
    let comp = this.value_.compare(value)
    switch (comp) {
      case Comparison.GREATER:
        if (this.right) {
          this.right = this.right.insert(value);
        } else {
          this.right = new TreeNode<T>(value);
        }
        break;
      case Comparison.LESS:
      case Comparison.EQUAL:
        if (this.left) {
          this.left = this.left.insert(value);
        } else {
          this.left = new TreeNode<T>(value);
        }
        break;
    }
    return this.balance();
  }

  private balance(): TreeNode<T> {
    switch(this.balanceFactor_) {
      case -1:
      case 0:
      case 1:
        return this;
      default:
        return this.rotate();
    }
  }

  private determineRotation(): Rotation {
    return this.balanceFactor_ > 0 ? Rotation.RIGHT : Rotation.LEFT;
  }

  private rotate(): TreeNode<T> {
    let rs = this.determineRotation();
    let cs;
    if (rs === Rotation.RIGHT) {
      if (this.right!.determineRotation() == Rotation.RIGHT) {
        return this.leftRotate();
      }
      this.right = this.right!.rightRotate();
      return this.leftRotate();
    } else {
      if (this.left!.determineRotation() == Rotation.LEFT) {
        return this.rightRotate();
      }
      this.left = this.left!.leftRotate();
      return this.rightRotate();
    }
  }

  private rightRotate(): TreeNode<T> {
    let p = this.left;
    this.left = p!.right;
    p!.right = this;
    return p!;
  }

  private leftRotate(): TreeNode<T> {
    let p = this.right;
    this.right = p!.left;
    p!.left = this;
    return p!;
  }

  traverse(cb: (node:TreeNode<T>, height: number) => void) {
    if (this.left) this.left.traverse(cb);
    cb(this, this.height_);
    if (this.right) this.right.traverse(cb);
  }

  get left(): TreeNode<T>|null {
    return this.left_;
  }

  set left(node: TreeNode<T>|null) {
    this.left_ = node;
    if (node) {
      node.parent_ = this;
    }
    this.updateHeight_();
    this.updateBalanceFactor_();
  }

  get right(): TreeNode<T>|null {
    return this.right_;
  }

  set right(node: TreeNode<T>|null) {
    // console.log(`Setting Right: ${node}`);
    this.right_ = node;
    if (node) {
      node.parent_ = this;
    }
    this.updateHeight_();
    this.updateBalanceFactor_();
  }

  private updateBalanceFactor_() {
    let lh:number = -1;
    let rh:number = -1;
    if (this.left) lh = this.left.height;
    if (this.right) rh = this.right.height;
    this.balanceFactor_ = rh - lh;
  }

  private updateHeight_() {
    let h = this.computeHeight_();
    if (h == this.height_) return;
    this.height_ = h;
    if (this.parent_) this.parent_.updateHeight_();
  }

  private computeHeight_(): number {
    let lh = -1;
    if (this.left_) lh = this.left_.height_;
    let rh = -1;
    if (this.right_) rh = this.right_.height_;
    return Math.max(lh, rh) + 1;
  }
}
