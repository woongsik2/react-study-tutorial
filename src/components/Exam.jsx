import { useReducer } from 'react';

function reducer(state, action) {
  console.log(state, action);
  // if (action.type === 'TOGGLE_PLUS') {
  //   return state + action.data;
  // } else if (action.type === 'TOGGLE_MINUS') {
  //   return state - action.data;
  // }

  switch (action.type) {
    case 'TOGGLE_PLUS':
      return state + action.data;
    case 'TOGGLE_MINUS':
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    dispatch({
      type: 'TOGGLE_PLUS',
      data: 1,
    });
  };
  const onClickMinus = () => {
    dispatch({
      type: 'TOGGLE_MINUS',
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
