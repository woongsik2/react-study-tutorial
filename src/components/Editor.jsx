import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App.jsx';

const Editor = () => {
  const { onInsert } = useContext(TodoDispatchContext);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const onKeyEnter = e => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const addItem = () => {
    if (content.length <= 1) {
      contentRef.current.focus();
      return;
    }
    onInsert(content);
    setContent('');
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeyEnter}
        onChange={onChangeContent}
        placeholder="새로운 Todo.."
      />
      <button onClick={addItem}>추가</button>
    </div>
  );
};

export default Editor;
