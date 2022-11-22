import React from 'react';
import { className, curry2, Pos, range } from './tools';
import { StateContext, selectClones, selectCloneAt, moveClone } from './state';

export interface PrisonProps {
  side: number;
}

const Prison: React.FC<PrisonProps> = ({ side }) => {
  const { state, dispatch } = React.useContext(StateContext);
  const cells = range(0, side * side)
    .map(computePos(side))
    .map(pos => {
      const clone = selectCloneAt(state, pos);
      return { pos, clone };
    });

  const prisonStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    width: '540px',
    height: '540px',
  };

  return (
    <div className="prison" style={prisonStyle}>
      {cells.map((c, i) => {
        const canMove = c.clone?.canMove(selectClones(state));
        return (
          <div
            className={className('prison__cell', {
              left: c.pos.x === 0,
              top: c.pos.y === side - 1,
              'can-move': canMove,
            })}
            key={i}
            role={canMove ? 'button' : undefined}
            onClick={
              canMove ? () => dispatch(moveClone(c.clone!.id)) : undefined
            }
          >
            {c.clone && (
              <div className={className('prison__clone')}>
                {!canMove && '×'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const computePos = curry2((side: number, index: number): Pos => {
  const row = Math.floor(index / side);
  const col = index % side;
  const y = side - row - 1;
  return new Pos(col, y);
});

export default Prison;
