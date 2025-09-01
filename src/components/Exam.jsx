import { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'INCREASE':
            return state + action.data;
        case 'DECREASE':
            return state - action.data;
        default:
            return state;
    }
}

const Exam = () => {
    const [state, dispatch] = useReducer(reducer, 1);

    const onClickPlus = () => {
        dispatch({ type: 'INCREASE', data: 1 })
    }

    const onClickMinus = () => {
        dispatch({ type: 'DECREASE', data: 1 })
    }

    return (
        <div>
            <h1>{state}</h1>
            <button onClick={onClickPlus}>증가</button>
            <button onClick={onClickMinus}>감소</button>
        </div>
    )
}

export default Exam;