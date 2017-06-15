import {AVLTree} from './avl';
import {Comparable, Comparison} from './comparable';
import {Stringer} from './stringer';
import {prettyPrint} from './prettyPrint';

export class ComparableString implements Comparable<ComparableString>, Stringer {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  compare(val: ComparableString): Comparison {
    if(val.value > this.value) return Comparison.GREATER;
    if(val.value === this.value) return Comparison.EQUAL;
    return Comparison.LESS;
  }

  toString(): String {
    return this.value;
  }
};

function makeRandomString(characters: number = 6) {
  let str = "0123456789ABCDEF";
  let out = "";
  for(let i = 0; i < characters; i++) {
    let rand = Math.floor(Math.random() * str.length);
    out += str[rand];
  }
  return out;
}
