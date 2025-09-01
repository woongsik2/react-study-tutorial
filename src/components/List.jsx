import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import './List.css'

import TodoItem from "./TodoItem.jsx";
import { TodoStateContext } from '../App';

const List = () => {
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState('');

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilterTodos = () => {
        return todos.filter((todo) => {
            return todo.content.toLowerCase().includes(search.toLowerCase());
        })
    }

    const filterTodos = getFilterTodos()

    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        console.log('getAnalyzedData 호출');

        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return { totalCount, doneCount, notDoneCount }
    }, [todos])

    return (
        <>
            <div className={'List'}>
                <h4>Todo List 🌱</h4>
                <div>
                    <div>전체 : {totalCount}</div>
                    <div>완료 : {doneCount}</div>
                    <div>미완료 : {notDoneCount}</div>
                </div>
                <input placeholder={'검색어를 입력하세요.'} value={search} onChange={onChangeSearch} />
                <div className={'todos_wrapper'}>
                    {filterTodos.map((todo) => {
                        return <TodoItem key={todo.id} {...todo}/>
                    })}
                </div>
            </div>
        </>
    );
}

export default List;
