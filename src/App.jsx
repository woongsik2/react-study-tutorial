import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import List from "./components/List.jsx";

import './App.css'
import { useReducer, useState, useCallback, createContext, useMemo } from "react";

const mockData = [
    {
        id: 1,
        content: '할 일 1',
        date: new Date().getTime(),
        isDone: false
    },
    {
        id: 2,
        content: '할 일 2',
        date: new Date().getTime(),
        isDone: false
    },
    {
        id: 3,
        content: '할 일 3',
        date: new Date().getTime(),
        isDone: false
    }]

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.todo];
        case 'UPDATE':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone }
                }
                return todo;
            });
        case 'DELETE':
            return state.filter((todo) => {
                return todo.id !== action.id;
            });
        default:
            return state;
    }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
    const [todos, dispatch] = useReducer(reducer, mockData);

    const onCreate = useCallback((content) => {
        dispatch({ type: 'CREATE', todo: { id: Date.now(), content, date: new Date().getTime(), isDone: false } })
    }, [])

    const onUpdate = useCallback((targetId) => {
        dispatch({ type: 'UPDATE', id: targetId })
    }, [])

    const onDelete = useCallback((targetId) => {
        dispatch({ type: 'DELETE', id: targetId })
    }, [])

    const memoizeDispatch = useMemo(() => {
        return { onCreate, onUpdate, onDelete }
    }, [])

    return (
        <div className={'App'}>
            <Header />
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={ memoizeDispatch }>
                    <Editor/>
                    <List/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    )
}

export default App
