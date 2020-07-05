const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: String,
  phone: String,
  email: { type: String, required: true, unique: true}
});
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;