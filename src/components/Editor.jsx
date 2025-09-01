import React, {useState, useEffect, useMemo, useCallback, useRef, useContext} from 'react';
import './Editor.css'
import { TodoDispatchContext } from '../App';

const Editor = () => {
    const { onCreate } = useContext(TodoDispatchContext);
    const [content, setContent] = useState('');
    const inputRef = useRef(null);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }
    const onSubmit = () => {
        if (!content) {
            inputRef.current.focus();
            return;
        }

        onCreate(content);
        setContent('')
        inputRef.current.focus();
    }
    return (
        <>
            <div className={'Editor'}>
                <input onKeyDown={onKeyDown} ref={inputRef} placeholder={'새로운 Todo..'} value={content}
                       onChange={(e) => setContent(e.target.value)}/>
                <button onClick={onSubmit}>추가</button>
            </div>
        </>
    );
}

export default Editor;
