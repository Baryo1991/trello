import React, { useEffect, useRef, useState } from "react";
import styles from './CreateColumn.module.css';
import { Button } from "react-bootstrap";

const CreateColumn = ({createHandler}) => {
  const [title, setTitle] = useState("");
  const [showCreateState, setShoCreateState] = useState(false);

  const titleRef = useRef();

  useEffect(() => {
    if(showCreateState) {
        titleRef.current.focus();
    }
  }, [showCreateState])

  const handleSubmit = (e) => {
      e.preventDefault();
      setShoCreateState(false);
      setTitle('');
      createHandler('column', { title });
  }
  return (
    <div className = {styles.create}>
      {showCreateState ? (
        <form className = {styles.form} onSubmit = {handleSubmit}>
          <input ref = {titleRef} onChange = {e => setTitle(e.target.value)} value={title} />
          <span className = {styles.editBox}>
            <Button disabled = {!title} className = {styles.btnSave} type ='submit'>Add column</Button>
            <button onClick = {() => {setShoCreateState(false); setTitle(false);}} className = {styles.btnDelete}>
              <i className="fas fa-times"></i>
            </button>
          </span>
        </form>
      ) : (
        <div className = {styles.first} onClick = {() => setShoCreateState(true)}>
            <i className = 'fas fa-plus'></i>{'  '}Add another column
        </div>
      )}
    </div>
  );
};

export default CreateColumn;
