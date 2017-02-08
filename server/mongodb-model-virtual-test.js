var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
personSchema.set('toJSON', { getters: true, virtuals: false });
personSchema.set('toObject', { getters: true, virtuals: false });
var Person = mongoose.model("Person", personSchema);
personSchema.virtual("name.full").get(function() {
  return this.name.first + ' ' + this.name.last;
});
var bad = new Person({
  name: { "first": "Walter", "last": "White" }
});

console.log(bad)
console.log(bad.toObject())
console.log(bad.toJSON())
console.log("%s is insane", bad.name.full); // Walter White is insane
