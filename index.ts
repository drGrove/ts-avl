enum Comparison {
  GREATER,
  LESS,
  EQUAL
};

enum Rotation {
  LEFT,
  RIGHT
}

interface Stringer {
  toString(): String;
}

interface Comparable<T extends Comparable<T>> {
  compare(val: T): Comparison;
}

class ComparableNumber implements Comparable<ComparableNumber>, Stringer {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  compare(val: ComparableNumber): Comparison {
    if (val.value > this.value) return Comparison.GREATER;
    if (val.value < this.value) return Comparison.LESS;
    return Comparison.EQUAL;
  }

  toString() {
    return this.value.toString();
  }
}

class TreeNode<T extends Comparable<T>> {
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
    this.right_ = node;
    if (node) {
      node.parent_ = this;
    }
    this.updateHeight_();
    this.updateBalanceFactor_();
  }

  private updateBalanceFactor_() {
    let acc = 0;
    if (this.left_) acc -= this.left_.height_;
    if (this.right_) acc += this.right_.height_;
    this.balanceFactor_ = acc;
  }

  private updateHeight_() {
    let h = this.computeHeight_();
    if (h == this.height_) return;
    this.height_ = h;
    console.log(`Height ${this.value.toString()}: ${this.height_}`)
    if (this.parent_) this.parent_.updateHeight_();
  }

  private computeHeight_(): number {
    let lh = 0;
    if (this.left_) lh = this.left_.height_;
    let rh = 0;
    if (this.right_) lh = this.right_.height_;
    return Math.max(lh, rh) + 1;
  }
}

class AVLTree<T extends Comparable<T>> {
  private root: TreeNode<T>|null;

  insert(v: T) {
    if (!this.root) {
      this.root = new TreeNode<T>(v);
      return;
    }
    this.root = this.root.insert(v);
  }

  forEach(cb: (node:TreeNode<T>, height: number) => void) {
    if (!this.root) return;
    this.root.traverse(cb);
  }
}

let tree = new AVLTree<ComparableNumber>();
for (let i = 6; i > 0; i--) {
  tree.insert(new ComparableNumber(i));
  tree.forEach(function(node:TreeNode<ComparableNumber>, height: number) {
    let str:String = "";
    for(let i = 0; i < height; i++) {
      str += "  ";
    }
    console.log(str + node.value.toString());
  });
  console.log('')
  console.log('')
  console.log('')
}
