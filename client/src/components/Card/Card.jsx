import { Button } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Card.module.css";
import { useRef } from "react";
import { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({
  id,
  columnId,
  title,
  src = "",
  index,
  updateHandler,
  deleteHandler,
}) => {
  const [editState, setEditState] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const inputRef = useRef();

  useEffect(() => {
    if (editState) {
      inputRef.current.select();
    }
  }, [editState]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={styles.card}
        >
          {editState ? (
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                updateHandler("card",{ title: cardTitle }, columnId, id);
                setEditState(prevState => !prevState);

              }}
            >
              <input
                ref={inputRef}
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <Button
                style={{ width: "max-content" }}
                type="submit"
                disabled={!cardTitle}
              >
                Save
              </Button>
            </form>
          ) : (
            <div className={styles.title}>{cardTitle}</div>
          )}
          <div className={styles.right}>
            <span className={styles.editBox}>
              <button
                style={{ color: editState ? "red" : "inherit" }}
                onClick={() => setEditState((prevState) => !prevState)}
                className={styles.btnEdit}
              >
                {editState ? "Close" : "Edit"}
              </button>
              |
              <button onClick = {() => deleteHandler('card', columnId, id)} className={styles.btnDelete}>
                <i className="fas fa-times"></i>
              </button>
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
