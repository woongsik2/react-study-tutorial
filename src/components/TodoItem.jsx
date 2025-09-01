import React, { useState, useEffect, useMemo, useCallback, memo, useContext } from 'react';
import './TodoItem.css'
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, content, date, isDone }) => {
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);
    const onChangeCheckbox = () => {
        onUpdate(id);
    }
    return (
        <>
            <div className={'TodoItem'}>
                <input onChange={onChangeCheckbox} readOnly type="checkbox" checked={isDone} />
                <div className={'content'}>{content}</div>
                <div className={'date'}>{new Date(date).toLocaleDateString()}</div>
                <button onClick={() => onDelete(id)}>삭제</button>
            </div>
        </>
    );
}

// export default memo(TodoItem, (prevProps, nextProps) => {
//     if(prevProps.id !== nextProps.id) return false;
//     if(prevProps.content !== nextProps.content) return false;
//     if(prevProps.date !== nextProps.date) return false;
//     if(prevProps.isDone !== nextProps.isDone) return false;
//     return true;
// });

export default memo(TodoItem);
