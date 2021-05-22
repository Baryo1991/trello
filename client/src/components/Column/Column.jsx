import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import CreateCard from "../Card/CreateCard/CreateCard";
import styles from "./Column.module.css";

const Column = ({
  id,
  title,
  index,
  cards = [],
  createHandler,
  updateHandler,
  deleteHandler,
}) => {
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const titleRef = useRef();
  useEffect(() => {
    if (showTitleEdit) {
      titleRef.current.select();
    }
  }, [showTitleEdit]);

  useEffect(() => {
    setColumnTitle("");
    setShowTitleEdit(false);
  }, [title]);

  const columnUpdateHandler = (e) => {
    if (e.key == "Enter" && e.currentTarget.value) {
      updateHandler("column", { title: e.currentTarget.value }, id);
    }
  };

  return (
    <Draggable draggableId = {id} index = {index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef} className={styles.column}>
          <button
            onClick={() => deleteHandler("column", id)}
            className={styles.btnDelete}
          >
            <i className="fas fa-times"></i>
          </button>
          {showTitleEdit ? (
            <input
              onKeyDown={columnUpdateHandler}
              ref={titleRef}
              onBlur={() => setShowTitleEdit(false)}
              onChange={(e) => setColumnTitle(e.target.value)}
              value={columnTitle}
            />
          ) : (
            <div
              className={styles.title}
              onClick={() => setShowTitleEdit(true)}
            >
              {title}
            </div>
          )}
          <Droppable droppableId={id} type="card">
            {(provided) => (
              <div
                className={styles.droppableContent}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((col, index) => {
                  return (
                    <Card
                      key={col.id}
                      id={col.id}
                      columnId={id}
                      title={col.title}
                      index={index}
                      updateHandler={updateHandler}
                      deleteHandler={deleteHandler}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateCard columnId={id} createHandler={createHandler} />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
