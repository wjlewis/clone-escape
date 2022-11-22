import React from 'react';
import { Pos, randomId, filterObj } from './tools';

export const StateContext = React.createContext<StateContextInfo>({
  state: null as any,
  dispatch: null as any,
});

export interface StateContextInfo {
  state: State;
  dispatch: React.Dispatch<Action>;
}

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
  moveCount: number;
}

export const state0: State = {
  clones: [new Clone(0, 0), new Clone(1, 0), new Clone(0, 1)].reduce(
    (clones, c) => ({ ...clones, [c.id]: c }),
    {}
  ),
  moveCount: 0,
};

export enum ActionType {
  moveClone = 'MOVE_CLONE',
  reset = 'RESET',
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export function moveClone(id: string): Action {
  return { type: ActionType.moveClone, payload: { id } };
}

export function reset(): Action {
  return { type: ActionType.reset };
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
        moveCount: state.moveCount + 1,
      };
    }
    case ActionType.reset:
      return state0;
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
