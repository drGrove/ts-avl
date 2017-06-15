import {Comparable, Comparison} from './comparable';
import {Stringer} from './stringer';

export class ComparableNumber implements Comparable<ComparableNumber>, Stringer {
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
