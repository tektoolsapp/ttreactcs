const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: 'A',
    required: true,
    trim: true,
  }
});

const myDB = mongoose.connection.useDb('contactsDB')

console.log("CONNECTING CONTACTS");

const Contacts = myDB.model('Contacts', ContactsSchema)

module.exports = Contacts