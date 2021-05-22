import AppError from "../errors/AppError.js";
import catchAsync from "../errors/catchAsync.js";
import User from "../models/userModel.js";

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: documents,
    });
  });

export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const desiredDoc = await Model.findOne({ id });
    if (!desiredDoc) return next(new AppError("Incorrect Id", 400));

    res.status(200).json({
      status: "success",
      data: desiredDoc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body)
    const createdDoc = await Model.create({
        ...req.body,
        user: req.user._id
    });

    res.status(201).json({
      status: "success",
      data: createdDoc,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let updatedDoc;
    if(req.body?.cards?.length === 0) {
        updatedDoc = await Model.findOneAndUpdate({ id }, { cards: { id: req.body.cardId } } 
        , { safe: true, upsert: true })
        updatedDoc.cards = [];
        await updatedDoc.save();
        console.log(updatedDoc.cards);
    } else {
        updatedDoc = await Model.findOneAndUpdate({ id }, req.body, {
            new: true,
            runValidators: true,
            
        });
    }
   
    if (!updatedDoc)
      return next(new AppError("Could not find any doc by that Id", 404));

    res.status(200).json({
      status: "success",
      data: updatedDoc,
    });
  });
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedDoc = await Model.findOneAndDelete({ id });
    if (!deletedDoc) return next(new AppError("No document found with that Id", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
