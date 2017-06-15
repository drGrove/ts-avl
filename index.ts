import {AVLTree} from './avl';
import {ComparableNumber} from './comparableNumber';
import {ComparableString} from './comparableString';
import {prettyPrint} from './prettyPrint';

let tree = new AVLTree<ComparableNumber>();
 for (let i = 40; i > 0; i--) {
   tree.insert(new ComparableNumber(i));
 }
prettyPrint(tree.root);

function makeStringTree(tree: AVLTree<any>, num: number = 10) {
  for(let i = 0; i < num; i++) {
    tree.insert(new ComparableString(makeRandomString()));
  }
}
let tree2 = new AVLTree<ComparableString>()
makeStringTree(tree2);
prettyPrint(tree2.root);
