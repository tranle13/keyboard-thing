const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = new mongoose.Schema({
  author: {
    type: new mongoose.Schema({
      username: String,
      image: String,
    }),
    required: true,
  },
  topic: { type: mongoose.Types.ObjectId, required: true, ref: "Topic" },
  content: String,
  date: { type: Date, default: Date.now },
});

commentSchema.plugin(aggregatePaginate);

exports.Comment = mongoose.model("Comment", commentSchema);
