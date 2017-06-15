export enum Comparison {
  GREATER,
  LESS,
  EQUAL
};

export interface Comparable<T extends Comparable<T>> {
  compare(val: T): Comparison;
}
