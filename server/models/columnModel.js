import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, "Id was not specified"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title was not specified"],
  },
  index: {
    type: Number,
    default: 0,
  },
  cards: [
    {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: [true, "title is required"],
      },
    },
  ],
});

// columnSchema.virtual('cards', {
//     ref: 'Card',
//     foreignField: 'column',
//     localField: '_id'
// });



columnSchema.pre('find', function(next) {
    this.sort('index');
    next();
})


const Column = mongoose.model("Column", columnSchema);

export default Column;
