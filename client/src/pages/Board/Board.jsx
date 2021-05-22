import React, { useState } from "react";
import styles from "./Board.module.css";
import { useEffect } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import {
  createColumn,
  deleteColum,
  getAllColumns,
  updateColumn,
} from "../../api/services/columnService";
import Column from "../../components/Column/Column";
import { compareArrayObj, initialState } from "./boardHelper";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CreateColumn from "../../components/Column/CreateColumn/CreateColumn";
import { v4 as uuid } from "uuid";

const Board = () => {
  const [data, setData] = useState({ columns: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { columns, error } = await getAllColumns();
    setLoading(false);
    if (error) return setError(error);
    setData({
      columns,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDragEndHandler = async ({
    destination,
    source,
    draggableId,
    type,
  }) => {
    if (!destination) return; //In case that there is no card to switch

    //In case the user has dropped the the item at the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    switch (type) {
      case "card":
        const sourceColumn = data.columns.find(
          ({ id }) => id === source.droppableId
        );
        const destinationColumn = data.columns.find(
          ({ id }) => id === destination.droppableId
        );

        //same columns
        if (sourceColumn.id === destinationColumn.id) {
          const columnId = source.droppableId;
          const updatedCards = [...sourceColumn.cards];
          const draggableCard = updatedCards.find(
            ({ id }) => id === draggableId
          );
          updatedCards.splice(source.index, 1);
          updatedCards.splice(destination.index, 0, draggableCard);

          sourceColumn.cards = updatedCards;

          const updatedColumns = data.columns.map((col) => {
            if (col.id === columnId) {
              return sourceColumn;
            }
            return col;
          });
          setData({
            columns: updatedColumns,
          });

          const { error } = await updateColumn(columnId, {
            cards: updatedCards,
          });
          if (error) setError(error);
        } else {
          //Different columns
          const updatedSourceCards = [...sourceColumn.cards];
          const updatedDestCards = [...destinationColumn.cards];
          const draggableCard = updatedSourceCards.find(
            ({ id }) => id === draggableId
          );

          updatedSourceCards.splice(source.index, 1);
          updatedDestCards.splice(destination.index, 0, draggableCard);
          sourceColumn.cards = updatedSourceCards;
          destinationColumn.cards = updatedDestCards;

          const updatedColumns = data.columns.map((col) => {
            if (col.id === sourceColumn.id) {
              return sourceColumn;
            } else if (col.id === destinationColumn.id)
              return destinationColumn;
            return col;
          });

          setData({ columns: updatedColumns });

          const { error: sourceError } = await updateColumn(sourceColumn.id, {
            cards: sourceColumn.cards,
          });
          if (sourceError) return setError(sourceError);

          const { error: destError } = await updateColumn(
            destinationColumn.id,
            {
              cards: destinationColumn.cards,
            }
          );
          if (destError) setError(destError);
        }
        break;
      case "column":
        const sourceCol = data.columns[source.index];
        const destinationCol = data.columns[destination.index];
        const updatedSourceColumn = { ...sourceCol, index: destination.index };
        const updatedDestColumn = { ...destinationCol, index: source.index };

        const updatedTotalColumns = data.columns
          .map((col) => {
            if (col.index === source.index) {
              return updatedSourceColumn;
            } else if (col.index === destination.index) {
              return updatedDestColumn;
            }
            return col;
          })
          .sort((a, b) => compareArrayObj(a, b, "index"));
        setData({
          columns: updatedTotalColumns,
        });

        const { error: sourceError } = await updateColumn(
          updatedSourceColumn.id,
          { index: updatedSourceColumn.index }
        );
        if (sourceError) return setError(sourceError);

        const { error: destError } = await updateColumn(updatedDestColumn.id, {
          index: updatedDestColumn.index,
        });
        if (destError) setError(destError);
        break;
    }
  };

  const createHandler = async (type, newData, columnId) => {
    //Todo
    switch (type) {
      case "column":
        debugger;
        const newColumn = {
          ...newData,
          id: uuid(),
          cards: [],
          index: data.columns.length,
        };
        //Update local
        setData({
          columns: [...data.columns, newColumn],
        });

        //Update server
        const { error: columnError } = await createColumn(newColumn);
        if (columnError) setError(columnError);
        break;
      case "card":
        debugger;
        const currentColumn = data.columns.find((col) => col.id === columnId);
        if (!currentColumn) return;

        const newCard = {
          ...newData,
          cards: [],
          id: uuid(),
        };
        currentColumn.cards = [...currentColumn.cards, newCard];
        const updatedColumns = data.columns.map((col) => {
          if (col.id === columnId) return { ...currentColumn };
          return col;
        });

        //Update local
        setData({
          ...data,
          columns: updatedColumns,
        });

        //Update server
        const { error: cardError } = await updateColumn(columnId, {
          cards: currentColumn.cards,
        });

        if (cardError) setError(cardError);
        break;
      default:
        break;
    }
  };

  const updateHandler = async (type, newData, columnId, cardId) => {
    const currentColumn = data.columns.find((col) => col.id === columnId);
    if (!currentColumn) return;
    debugger;
    switch (type) {
      case "column":
        const updatedColumn = { ...currentColumn, ...newData };

        //Update local
        setData({
          columns: data.columns.map((col) =>
            col.id === columnId ? updatedColumn : col
          ),
        });

        const { error } = await updateColumn(columnId, newData);
        if (error) setError(error);
        break;
      case "card":
        const currentCard = currentColumn.cards.find(
          (card) => card.id === cardId
        );
        if (!currentCard) return;

        const updatedCards = currentColumn.cards.map((card) =>
          card.id === cardId ? { ...card, ...newData } : card
        );
        currentColumn.cards = updatedCards;

        //Update local
        setData({
          columns: data.columns.map((col) =>
            col.id === columnId ? currentColumn : col
          ),
        });

        //Update server
        const { error: cardError } = await updateColumn(columnId, {
          cards: updatedCards,
        });
        if (cardError) setError(cardError);
        break;
      default:
        break;
    }
  };

  const deleteHandler = async (type, columnId, cardId) => {
    switch (type) {
      case "column":
        const updatedColumns = data.columns.filter(
          (col) => col.id !== columnId
        );
        //Update local
        setData({
          columns: updatedColumns,
        });

        //Update server
        const { error } = await deleteColum(columnId);
        if (error) setError(error);
        break;
      case "card":
        debugger;
        const currentColumn = data.columns.find((col) => col.id === columnId);
        if (!currentColumn) return;

        currentColumn.cards = currentColumn.cards.filter(
          (card) => card.id !== cardId
        );

        //Update local
        setData({
          columns: data.columns.map((col) =>
            col.id === columnId ? currentColumn : col
          ),
        });

        //Update  server
        const { error: cardError } = await updateColumn(columnId, {
          cards: currentColumn.cards,
          cardId,
        });

        if (cardError) setError(cardError);

        break;
      default:
        break;
    }
  };

  const columnsRendered = data.columns.map((col, index) => {
    return (
      <Column
        key={col.id}
        id={col.id}
        title={col.title}
        cards={col.cards}
        index={index}
        createHandler={createHandler}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
      />
    );
  });
  
  if (loading)
    return (
      <Spinner
        animation="border"
        variant="light"
        style={{ position: "absolute", top: "20%", left: "50%" }}
      />
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.board}
            >
              {columnsRendered}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CreateColumn createHandler={createHandler} />
      </DragDropContext>
    </div>
  );
};

export default Board;
