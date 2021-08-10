const moment = require("moment");
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Виртуальнео своейство для полного имени автора
AuthorSchema.virtual("name").get(function () {
  return this.family_name + "," + this.first_name;
});

// Виртуальное своейство - URL автора
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

// Виртуальное своейство - date_of_birth автора
AuthorSchema.virtual("date_birth").get(function () {
  return this.date_of_birth
    ? moment(this.date_of_birth).format("YYYY-MM-DD")
    : "";
});

// Виртуальное своейство - date_of_death автора
AuthorSchema.virtual("date_death").get(function () {
  return this.date_of_death
    ? moment(this.date_of_death).format("YYYY-MM-DD")
    : "";
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
