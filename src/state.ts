import { Pos, randomId, filterObj } from './tools';

export class Clone {
  private pos: Pos;
  public id: string;

  constructor(x: number, y: number) {
    this.pos = new Pos(x, y);
    this.id = randomId();
  }

  static fromPos(pos: Pos): Clone {
    return new Clone(pos.x, pos.y);
  }

  at(pos: Pos): boolean {
    return this.pos.eq(pos);
  }

  canMove(clones: Clone[]): boolean {
    const br1Pos = this.pos.up();
    const br2Pos = this.pos.right();
    return !clones.some(c => c.at(br1Pos)) && !clones.some(c => c.at(br2Pos));
  }

  move(): { [id: string]: Clone } {
    const up = Clone.fromPos(this.pos.up());
    const right = Clone.fromPos(this.pos.right());
    return { [up.id]: up, [right.id]: right };
  }
}

export interface State {
  clones: { [id: string]: Clone };
}

export const state0: State = {
  clones: [new Clone(0, 0), new Clone(1, 0), new Clone(0, 1)].reduce(
    (clones, c) => ({ ...clones, [c.id]: c }),
    {}
  ),
};

export enum ActionType {
  moveClone = 'MOVE_CLONE',
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export function moveClone(id: string): Action {
  return { type: ActionType.moveClone, payload: { id } };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.moveClone: {
      const { id } = action.payload;
      const clone = state.clones[id];
      if (!clone) {
        console.error(`missing clone with id = "${id}"`);
        return state;
      }
      const newClones = clone.move();
      return {
        ...state,
        clones: {
          ...filterObj(state.clones, cId => cId !== id),
          ...newClones,
        },
      };
    }
    default:
      return state;
  }
}

export function selectClones(state: State): Clone[] {
  return Object.values(state.clones);
}

export function selectCloneAt(state: State, pos: Pos): Clone | undefined {
  return selectClones(state).find(c => c.at(pos));
}
