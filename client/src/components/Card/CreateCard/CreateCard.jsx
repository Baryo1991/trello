import React, { useState } from "react";
import styles from "./CreateCard.module.css";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { useEffect } from "react";

const CreateCard = ({ columnId, createHandler }) => {
  const [title, setTitle] = useState("");
  const [showCreateState, setShoCreateState] = useState(false);
  const titleRef = useRef();

  useEffect(() => {
    if (showCreateState) {
      titleRef.current.select();
    }
  }, [showCreateState]);
  return (
    <div className = {styles.create}>
      {showCreateState ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShoCreateState(false);
            setTitle('');
            createHandler("card", { title }, columnId);
          }}
        >
          <textarea
            ref={titleRef}
            value={title}
            placeholder="Enter a title for this card..."
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <span className={styles.editGroup}>
            <Button
              type="submit"
              className={styles.addButton}
              disabled={!title}
            >
              Add Card
            </Button>

            <button
              onClick={() => setShoCreateState(false)}
              className={styles.deleteButton}
            >
              <i className="fas fa-times"></i>
            </button>
          </span>
        </form>
      ) : (
        <div className={styles.add} onClick={() => setShoCreateState(true)}>
          <i className="fas fa-plus"></i>
          {"  "}Add a Card
        </div>
      )}
    </div>
  );
};

export default CreateCard;
