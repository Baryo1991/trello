import {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  } from "./factoryController.js";
  import Column from "./../models/columnModel.js";
import catchAsync from "../errors/catchAsync.js";
  
  export const getAllColumns = getAll(Column);
  export const getColumn = getOne(Column);
  export const createColumn = createOne(Column);
  export const updateColumn = updateOne(Column);
  export const deleteColumn = deleteOne(Column);

  