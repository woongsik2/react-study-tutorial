import './App.css';
import Header from './components/Header.jsx';
import Editor from './components/Editor.jsx';
import List from './components/List.jsx';
import Exam from './components/Exam.jsx';

import { useState, useRef, useReducer, useCallback, useEffect, createContext, useMemo } from 'react';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: '테스트1',
    date: new Date().getTime(),
  },

  {
    id: 1,
    isDone: false,
    content: '테스트2',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '테스트3',
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'TODO_INSERT':
      return [action.data, ...state];
    case 'TODO_UPDATE':
      return state.map(item => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
    case 'TODO_DELETE':
      return state.filter(item => item.id !== action.targetId);
    default:
      return state;
  }
};

// 컴포넌트 외부에 생성.
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onInsert = useCallback(content => {
    dispatch({
      type: 'TODO_INSERT',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // };
    // setTodos([newTodo, ...todos]);
  }, []);

  const onUpdate = useCallback(targetId => {
    dispatch({
      type: 'TODO_UPDATE',
      targetId,
    });

    // setTodos(
    //   todos.map(todo => {
    //     if (todo.id === targetId) {
    //       return { ...todo, isDone: !todo.isDone };
    //     }
    //     return todo;
    //   }),
    // );
  }, []);

  // const onDelete = targetId => {
  //   dispatch({
  //     type: 'TODO_DELETE',
  //     targetId,
  //   });
  //   // setTodos(todos.filter(todo => todo.id !== targetId));
  // };

  const onDelete = useCallback(targetId => {
    dispatch({
      type: 'TODO_DELETE',
      targetId,
    });
    // setTodos(todos.filter(todo => todo.id !== targetId));
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onInsert, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      {/*<Exam />*/}
      <Header />
      <TodoStateContext value={todos}>
        <TodoDispatchContext value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext>
      </TodoStateContext>
    </div>
  );
}

export default App;
