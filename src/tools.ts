export function range(from: number, to: number): number[] {
  const out = [];
  for (let i = from; i < to; i++) {
    out.push(i);
  }
  return out;
}

export function curry2<A, B, T>(fn: (x: A, y: B) => T): (x: A) => (y: B) => T {
  return x => y => fn(x, y);
}

export function className(...descs: ClassNameDesc[]): string {
  return descs
    .reduce(
      (acc: string[], desc) => [
        ...acc,
        typeof desc === 'string'
          ? desc
          : Object.entries(desc)
              .filter(([_, v]) => !!v)
              .map(([n]) => n)
              .join(' '),
      ],
      []
    )
    .join(' ');
}

export type ClassNameDesc = string | { [name: string]: any };

export class Pos {
  constructor(public x: number, public y: number) {}

  eq(rhs: Pos): boolean {
    return this.x === rhs.x && this.y === rhs.y;
  }

  up(): Pos {
    return new Pos(this.x, this.y + 1);
  }

  right(): Pos {
    return new Pos(this.x + 1, this.y);
  }
}

export function randomId(): string {
  return Math.random().toString(16).slice(2);
}

export function filterObj(
  obj: { [key: string]: any },
  pred: (key: string, value: any) => any
): { [key: string]: any } {
  return Object.entries(obj)
    .filter(([k, v]) => !!pred(k, v))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
