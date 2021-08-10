let mongoose = require("mongoose");
let moment = require("moment");

let Schema = mongoose.Schema;

let BookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", requred: true },
  imprint: { type: String, requred: true },
  status: {
    type: String,
    requred: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now() },
});

// Virtual for bookinstance's URL and
BookInstanceSchema.virtual("url").get(function () {
  return "/catalog/bookinstance/" + this._id;
});

// Virtual for bookinstance's date and
BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return moment(this.due_back).format("MMMM Do, YYYY");
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
