import React from 'react';
import { StateContext, state0, reducer, reset } from './state';
import Prison from './Prison';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, state0);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Prison side={12} />
      <div className="controls">
        <button onClick={() => dispatch(reset())}>Reset</button>
        <span>Moved {state.moveCount} time(s)</span>
      </div>
    </StateContext.Provider>
  );
};

export default App;
